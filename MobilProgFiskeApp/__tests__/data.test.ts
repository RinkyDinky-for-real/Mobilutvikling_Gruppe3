import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { sendRequest } from '../src/databaseAPI';
import { fetchPostsCountFromUser, fetchRandomPosts, fetchSinglePost } from '../src/hooks/use-Fetch-Posts';
import { fetchUser } from '../src/hooks/use-Fetch-User';

const mockFetch = jest.fn<typeof fetch>();

beforeEach(() => {
  mockFetch.mockReset();
  global.fetch = mockFetch;
});

describe('API and data helpers', () => {
  test('sends a request to the API endpoint and returns its response', async () => {
    const response = new Response();
    mockFetch.mockResolvedValue(response);

    await expect(sendRequest('post', 'POST', { title: 'Trout' })).resolves.toBe(response);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/v1\/post$/),
      { method: 'POST', headers: { title: 'Trout' } },
    );
  });

  test('fetches and parses a user by ID', async () => {
    const user = { userId: '12', username: 'Angler_1' };
    mockFetch.mockResolvedValue(new Response(JSON.stringify(user)));

    await expect(fetchUser('12')).resolves.toEqual(user);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/v1\/user$/),
      { method: 'GET', headers: { userId: '12' } },
    );
  });

  test('reports a failed user request', async () => {
    mockFetch.mockResolvedValue(new Response(null, { status: 503 }));

    await expect(fetchUser('12')).rejects.toThrow('Failed to fetch user: 503');
  });

  test('fetches a single post by ID', async () => {
    const post = { postid: '2', title: 'River trout' };
    mockFetch.mockResolvedValue(new Response(JSON.stringify(post)));

    await expect(fetchSinglePost('2')).resolves.toEqual(post);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/v1\/getpost$/),
      { method: 'GET', headers: { postid: '2' } },
    );
  });

  test('fetches random posts with the requested limit', async () => {
    const posts = [{ postid: '2' }];
    mockFetch.mockResolvedValue(new Response(JSON.stringify(posts)));

    await expect(fetchRandomPosts('12', 5)).resolves.toEqual(posts);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/v1\/post\/random$/),
      { method: 'GET', headers: { userId: '12', limit: 5 } },
    );
  });

  test('counts posts returned for a user', async () => {
    mockFetch.mockResolvedValue(new Response(JSON.stringify([{ postid: '1' }, { postid: '2' }])));

    await expect(fetchPostsCountFromUser('12')).resolves.toBe(2);
  });
});
