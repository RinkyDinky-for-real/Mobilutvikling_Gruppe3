import { describe, expect, test } from '@jest/globals';
import { markerSchema } from '../src/utils/markerSchema';
import { postSchema } from '../src/utils/postSchema';
import { registerSchema } from '../src/utils/register-schema';
import { userSchema } from '../src/utils/userSchema';

const user = {
  userId: '12',
  username: 'Angler_1',
  password: 'Abcdef1!',
  profilepicture: 0,
  backgroundImage: 0,
  catches: ['3'],
  posts: ['4'],
  favoriteFish: '',
  favoriteSpot: '',
  fishingStyle: '',
};

const post = {
  postId: '2',
  title: 'River trout',
  content: 'Caught near the bridge.',
  longitude: 180,
  latitude: -90,
  date: '11/04/2026',
};

const marker = {
  id: '5',
  longlat: [180, -90] as [number, number],
  photolink: 0,
  pointName: 'North shore',
};

describe('data schemas', () => {
  test('validates users and rejects invalid IDs, images, or passwords', () => {
    expect(userSchema.safeParse(user).success).toBe(true);
    for (const change of [
      { userId: 'angler' },
      { profilepicture: -1 },
      { password: '   ' },
    ]) {
      expect(userSchema.safeParse({ ...user, ...change }).success).toBe(false);
    }
  });

  test('accepts valid registration credentials and rejects invalid ones', () => {
    expect(registerSchema.safeParse({ username: 'Angler_1', password: 'Abcdef1!' }).success).toBe(true);
    expect(registerSchema.safeParse({ username: 'bad-name', password: 'Abcdef1!' }).success).toBe(false);
    expect(registerSchema.safeParse({ username: 'Angler_1', password: 'alllowercase' }).success).toBe(false);
  });

  test('validates post fields and coordinate boundaries', () => {
    expect(postSchema.safeParse(post).success).toBe(true);
    for (const change of [
      { longitude: 181 },
      { latitude: -91 },
      { title: '   ' },
      { content: '   ' },
    ]) {
      expect(postSchema.safeParse({ ...post, ...change }).success).toBe(false);
    }
  });

  test('validates marker IDs, coordinates, image references, and names', () => {
    expect(markerSchema.safeParse(marker).success).toBe(true);
    for (const change of [
      { id: 'spot' },
      { longlat: [10, 91] },
      { photolink: -1 },
      { pointName: ' ' },
    ]) {
      expect(markerSchema.safeParse({ ...marker, ...change }).success).toBe(false);
    }
  });
});
