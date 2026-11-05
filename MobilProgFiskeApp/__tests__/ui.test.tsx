import React from 'react';
import { Alert, Pressable, Text } from 'react-native';
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';
import PostCard from '../src/components/postComponents/PostCard';
import RegisterScreen from '../src/app/register';
import AuthContextProvider, { useAuth } from '../src/utils/context';
import { UploadUser } from '../src/hooks/use-Upload-User';

const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

jest.mock('../src/hooks/use-Upload-User', () => ({
  UploadUser: jest.fn(),
}));

jest.mock('../src/components/mapComponents/small-map-card', () => ({
  SmallMapCard: () => null,
}));

jest.mock('expo-crypto', () => ({
  randomUUID: () => 'session-token',
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

const mockUploadUser = jest.mocked(UploadUser);
const mockGetItem = jest.mocked(SecureStore.getItemAsync);
const mockSetItem = jest.mocked(SecureStore.setItemAsync);
const mockDeleteItem = jest.mocked(SecureStore.deleteItemAsync);

beforeEach(() => {
  mockUploadUser.mockReset();
  mockGetItem.mockReset().mockResolvedValue(null);
  mockSetItem.mockReset().mockResolvedValue(undefined);
  mockDeleteItem.mockReset().mockResolvedValue(undefined);
});

afterEach(() => {
  jest.restoreAllMocks();
  mockReplace.mockClear();
});

describe('UI and app flows', () => {
  test('PostCard displays its current post details and opens when pressed', async () => {
    const onOpen = jest.fn();
    const { getByText } = await render(
      <PostCard
        post={{
          postId: '2',
          title: 'River trout',
          content: 'Caught near the bridge.',
          longitude: 10,
          latitude: 20,
          date: '11/04/2026',
        }}
        onOpen={onOpen}
      />,
    );

    expect(getByText('River trout')).toBeTruthy();
    expect(getByText(' Uploaded: 11/04/2026')).toBeTruthy();
    await fireEvent.press(getByText('River trout'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test('registration shows validation errors for invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = await render(<RegisterScreen />);

    await fireEvent.changeText(getByPlaceholderText('Choose a username'), 'bad name');
    await fireEvent.changeText(getByPlaceholderText('At least 6 characters.'), 'weak');
    await fireEvent.press(getByText('Opprett konto'));

    expect(getByText(/Username can only contain/)).toBeTruthy();
    expect(getByText(/Passord må inneholde/)).toBeTruthy();
    expect(mockUploadUser).not.toHaveBeenCalled();
  });

  test('registration uploads valid credentials and offers login', async () => {
    const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    mockUploadUser.mockResolvedValue(new Response());
    const { getByPlaceholderText, getByText } = await render(<RegisterScreen />);

    await fireEvent.changeText(getByPlaceholderText('Choose a username'), 'Angler_1');
    await fireEvent.changeText(getByPlaceholderText('At least 6 characters.'), 'Abcdef1!');
    await fireEvent.press(getByText('Opprett konto'));

    await waitFor(() => {
      expect(mockUploadUser).toHaveBeenCalledWith('Angler_1', 'Abcdef1!');
    });
    expect(alert).toHaveBeenCalledWith(
      'Account created',
      'You can now log in.',
      expect.arrayContaining([expect.objectContaining({ text: 'Go to login' })]),
    );
    alert.mock.calls[0][2]?.[0]?.onPress?.();
    expect(mockReplace).toHaveBeenCalledWith('/');
  });

  test('registration reports upload errors', async () => {
    const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    mockUploadUser.mockRejectedValue(new Error('Service unavailable'));
    const { getByPlaceholderText, getByText } = await render(<RegisterScreen />);

    await fireEvent.changeText(getByPlaceholderText('Choose a username'), 'Angler_1');
    await fireEvent.changeText(getByPlaceholderText('At least 6 characters.'), 'Abcdef1!');
    await fireEvent.press(getByText('Opprett konto'));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Registration failed', 'Service unavailable');
    });
  });

  test('registration password visibility can be toggled', async () => {
    const { getByLabelText, getByPlaceholderText } = await render(<RegisterScreen />);
    const passwordInput = getByPlaceholderText('At least 6 characters.');

    expect(passwordInput.props.secureTextEntry).toBe(true);
    await fireEvent.press(getByLabelText('Show password'));
    expect(passwordInput.props.secureTextEntry).toBe(false);
    await fireEvent.press(getByLabelText('Hide password'));
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  test('auth context persists a signed-in session and clears it on sign-out', async () => {
    function Consumer() {
      const auth = useAuth();
      return (
        <>
          <Text>{auth.isLoading ? 'loading' : auth.userId ?? 'signed out'}</Text>
          <Text>{auth.token ?? 'no token'}</Text>
          <Pressable onPress={() => void auth.signIn('12')}>
            <Text>sign in</Text>
          </Pressable>
          <Pressable onPress={() => void auth.signOut()}>
            <Text>sign out</Text>
          </Pressable>
        </>
      );
    }

    const { getByText } = await render(
      <AuthContextProvider>
        <Consumer />
      </AuthContextProvider>,
    );

    await waitFor(() => expect(getByText('signed out')).toBeTruthy());
    await fireEvent.press(getByText('sign in'));
    await waitFor(() => {
      expect(getByText('12')).toBeTruthy();
      expect(getByText('session-token')).toBeTruthy();
    });
    expect(mockSetItem).toHaveBeenCalledWith(
      'fishing_local_session',
      JSON.stringify({ userId: '12', token: 'session-token' }),
    );

    await fireEvent.press(getByText('sign out'));
    await waitFor(() => expect(getByText('signed out')).toBeTruthy());
    expect(mockDeleteItem).toHaveBeenCalledWith('fishing_local_session');
  });

  test('auth context restores a valid saved session', async () => {
    mockGetItem.mockResolvedValue(JSON.stringify({ userId: '12', token: 'saved-token' }));

    function Consumer() {
      const auth = useAuth();
      return <Text>{auth.isLoading ? 'loading' : `${auth.userId}:${auth.token}`}</Text>;
    }

    const { getByText } = await render(
      <AuthContextProvider>
        <Consumer />
      </AuthContextProvider>,
    );

    await waitFor(() => expect(getByText('12:saved-token')).toBeTruthy());
  });
});
