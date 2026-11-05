import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';
import { sendRequest } from '../src/databaseAPI';
import { DeletePost } from '../src/hooks/use-Delete-Post';
import {
  fetchAllPostsFromUser,
  fetchPostsCountFromUser,
  fetchRandomPosts,
  fetchSinglePost,
} from '../src/hooks/use-Fetch-Posts';
import { fetchUser } from '../src/hooks/use-Fetch-User';
import { login } from '../src/hooks/useLogin';
import { EditUser } from '../src/hooks/use-Edit-User';
import { UploadPost } from '../src/hooks/use-Upload-Post';
import { UploadUser } from '../src/hooks/use-Upload-User';

const mockFetch = jest.fn<
  (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
>();

beforeEach(() => {
  mockFetch.mockReset();
  global.fetch = mockFetch;
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('API and data helpers', () => {
  test('sends requests with string headers and logs unsuccessful responses', async () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    const success = new Response();
    mockFetch.mockResolvedValueOnce(success);

    await expect(sendRequest('post', 'POST', { title: 'Trout', limit: 5 })).resolves.toBe(success);
    expect(mockFetch).toHaveBeenLastCalledWith(
      'https://mobile-programming.emilhesmyr.workers.dev/api/v1/post',
      { method: 'POST', headers: { title: 'Trout', limit: '5' } },
    );

    const failure = new Response('Unavailable', { status: 503 });
    mockFetch.mockResolvedValueOnce(failure);
    await expect(sendRequest('user', 'GET')).resolves.toBe(failure);
    expect(error).toHaveBeenCalledWith('API request failed:', {
      endpoint: 'user',
      method: 'GET',
      status: 503,
      message: 'Unavailable',
    });
  });

  test('fetches a user and reports unsuccessful responses', async () => {
    const user = { userId: '12', username: 'Angler_1' };
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify(user)));

    await expect(fetchUser('12')).resolves.toEqual(user);
    expect(mockFetch).toHaveBeenLastCalledWith(
      expect.stringMatching(/\/api\/v1\/user$/),
      { method: 'GET', headers: { userId: '12' } },
    );

    mockFetch.mockResolvedValueOnce(new Response(null, { status: 503 }));
    await expect(fetchUser('12')).rejects.toThrow('Failed to fetch user: 503');
  });

  test('fetches single, random, and user posts and counts user posts', async () => {
    const posts = [{ postId: '1' }, { postId: '2' }];
    const post = { postId: '2', title: 'River trout' };

    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify(post)));
    await expect(fetchSinglePost('2', '12')).resolves.toEqual(post);
    expect(mockFetch).toHaveBeenLastCalledWith(
      expect.stringMatching(/\/api\/v1\/getpost$/),
      { method: 'GET', headers: { postid: '2', userId: '12' } },
    );

    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify(posts)));
    await expect(fetchRandomPosts(5)).resolves.toEqual(posts);
    expect(mockFetch).toHaveBeenLastCalledWith(
      expect.stringMatching(/\/api\/v1\/post\/random$/),
      { method: 'GET', headers: { limit: '5' } },
    );

    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify(posts)));
    await expect(fetchAllPostsFromUser('12')).resolves.toEqual(posts);
    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify(posts)));
    await expect(fetchPostsCountFromUser('12')).resolves.toBe(2);
  });

  test('logs in with a trimmed username and rejects invalid credentials or response data', async () => {
    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify([{ userId: '12' }])));

    await expect(login(' Angler_1 ', 'Abcdef1!')).resolves.toBe('12');
    expect(mockFetch).toHaveBeenLastCalledWith(
      expect.stringMatching(/\/api\/v1\/user\/getuserid$/),
      { method: 'GET', headers: { userName: 'Angler_1', passwordHash: 'Abcdef1!' } },
    );

    await expect(login('  ', 'password')).rejects.toThrow('Username or password is missing');
    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify([])));
    await expect(login('Angler_1', 'password')).rejects.toThrow('Unexpected login response');
  });

  test('uploads users and posts using current request fields', async () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {});
    const userResponse = new Response();
    mockFetch.mockResolvedValueOnce(userResponse);
    await expect(UploadUser('Angler_1', 'Abcdef1!')).resolves.toBe(userResponse);
    expect(mockFetch).toHaveBeenLastCalledWith(
      expect.stringMatching(/\/api\/v1\/user$/),
      { method: 'POST', headers: { username: 'Angler_1', passwordHash: 'Abcdef1!' } },
    );

    const postResponse = new Response();
    mockFetch.mockResolvedValueOnce(postResponse);
    await expect(UploadPost('12', 'River trout', 'Caught near the bridge.', 20, 10, '11/04/2026'))
      .resolves.toBe(postResponse);
    expect(mockFetch).toHaveBeenLastCalledWith(
      expect.stringMatching(/\/api\/v1\/post$/),
      {
        method: 'POST',
        headers: {
          userId: '12',
          title: 'River trout',
          content: 'Caught near the bridge.',
          latitude: '20',
          longitude: '10',
          date: '11/04/2026',
        },
      },
    );
    expect(log).toHaveBeenCalled();
  });

  test('edits only the supplied user fields', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    mockFetch.mockResolvedValue(new Response());

    await EditUser('12', undefined, undefined, 'Fly fishing', '', 'Trout');
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/v1\/user$/),
      {
        method: 'PATCH',
        headers: {
          userId: '12',
          FavoriteFishingMethod: 'Fly fishing',
          favoriteFishingPlace: '',
          FavoriteFish: 'Trout',
        },
      },
    );
  });

  test('deletes posts and reports failed deletions', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    const response = new Response();
    mockFetch.mockResolvedValueOnce(response);

    await expect(DeletePost('2', '12')).resolves.toBe(response);
    expect(mockFetch).toHaveBeenLastCalledWith(
      expect.stringMatching(/\/api\/v1\/post$/),
      { method: 'DELETE', headers: { postId: '2', userId: '12' } },
    );

    mockFetch.mockResolvedValueOnce(new Response('Not found', { status: 404, statusText: 'Not Found' }));
    await expect(DeletePost('2', '12')).rejects.toThrow('Deletion failed: 404 Not Found. Not found');
    expect(error).toHaveBeenCalled();
  });
});
