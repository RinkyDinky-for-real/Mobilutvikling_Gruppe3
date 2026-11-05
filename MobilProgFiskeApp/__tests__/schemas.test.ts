import { describe, expect, test } from '@jest/globals';
import { markerSchema } from '../src/utils/markerSchema';
import { postSchema } from '../src/utils/postSchema';
import { registerSchema } from '../src/utils/register-schema';
import { userSchema } from '../src/utils/userSchema';

const user = {
  userId: '12',
  username: 'Angler_1',
  password: 'secret',
  profilePicture: 0,
  backGroundImage: 0,
  Catches: ['3'],
  posts: ['4'],
  favoriteFish: '',
  favoriteSpot: '',
  fishingStyle: '',
};

const post = {
  postid: '2',
  userid: '12',
  title: 'River trout',
  content: 'Caught near the bridge.',
  longitude: 180,
  latitude: -90,
  date: '11/04/2026',
};

describe('data schemas', () => {
  test('accepts a user with valid fields', () => {
    expect(userSchema.safeParse(user).success).toBe(true);
  });

  test('rejects a user with a non-numeric ID', () => {
    expect(userSchema.safeParse({ ...user, userId: 'angler' }).success).toBe(false);
  });

  test('accepts registration credentials that meet the rules', () => {
    expect(registerSchema.safeParse({ username: 'Angler_1', password: 'Abcdef1!' }).success).toBe(true);
  });

  test('rejects a registration password missing required character types', () => {
    expect(registerSchema.safeParse({ username: 'Angler_1', password: 'alllowercase' }).success).toBe(false);
  });

  test('accepts a post at the coordinate boundaries', () => {
    expect(postSchema.safeParse(post).success).toBe(true);
  });

  test('rejects a post outside the coordinate range', () => {
    expect(postSchema.safeParse({ ...post, latitude: 91 }).success).toBe(false);
  });

  test('accepts a marker with a valid route and coordinates', () => {
    expect(markerSchema.safeParse({
      id: '5',
      longlat: [180, -90],
      photolink: 0,
      pointName: 'North shore',
      RedirectLink: '/feed',
    }).success).toBe(true);
  });

  test('rejects a marker with an unsupported route', () => {
    expect(markerSchema.safeParse({
      id: '5',
      longlat: [10, 20],
      photolink: 0,
      pointName: 'North shore',
      RedirectLink: '/unknown',
    }).success).toBe(false);
  });
});
