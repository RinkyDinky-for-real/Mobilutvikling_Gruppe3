import React, { useContext } from 'react';
import { Alert, Pressable, Text } from 'react-native';
import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, within } from '@testing-library/react-native';
import Button from '../src/components/Button';
import PostCard from '../src/components/postComponents/PostCard';
import RegisterScreen from '../src/app/register';
import AuthContextProvider, { AuthContext } from '../src/utils/context';

const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

afterEach(() => {
  jest.restoreAllMocks();
  mockReplace.mockClear();
});

describe('UI and app flows', () => {
  test('Button displays its label and invokes its callback', async () => {
    const onPress = jest.fn();
    const { getByRole } = await render(<Button text="Save" onPress={onPress} />);

    const button = getByRole('button');
    expect(within(button).getByText('Save')).toBeTruthy();
    await fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('PostCard displays post details and opens when pressed', async () => {
    const onOpen = jest.fn();
    const { getByText } = await render(
      <PostCard
        post={{
          postid: '2',
          userid: '12',
          title: 'River trout',
          content: 'Caught near the bridge.',
          longitude: 10,
          latitude: 20,
          date: '11/04/2026',
        }}
        onOpen={onOpen}
      />,
    );

    expect(getByText('Caught near the bridge.')).toBeTruthy();
    await fireEvent.press(getByText('River trout'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test('registration shows validation errors for invalid credentials', async () => {
    const { getByPlaceholderText, getByRole, getByText } = await render(<RegisterScreen />);

    await fireEvent.changeText(getByPlaceholderText('Velg et brukernavn'), 'bad name');
    await fireEvent.changeText(getByPlaceholderText('Minst 8 tegn'), 'weak');
    await fireEvent.press(getByRole('button', { name: 'Opprett konto' }));

    expect(getByText(/Brukernavn kan kun inneholde/)).toBeTruthy();
    expect(getByText(/Passord må inneholde/)).toBeTruthy();
  });

  test('registration offers login after valid credentials', async () => {
    const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { getByPlaceholderText, getByRole } = await render(<RegisterScreen />);

    await fireEvent.changeText(getByPlaceholderText('Velg et brukernavn'), 'Angler_1');
    await fireEvent.changeText(getByPlaceholderText('Minst 8 tegn'), 'Abcdef1!');
    await fireEvent.press(getByRole('button', { name: 'Opprett konto' }));

    expect(alert).toHaveBeenCalledWith(
      'Registreringsskjema klart',
      expect.any(String),
      expect.arrayContaining([expect.objectContaining({ text: 'Gå til innlogging' })]),
    );
    alert.mock.calls[0][2]?.[0]?.onPress?.();
    expect(mockReplace).toHaveBeenCalledWith('/');
  });

  test('registration password visibility can be toggled', async () => {
    const { getByLabelText, getByPlaceholderText } = await render(<RegisterScreen />);
    const passwordInput = getByPlaceholderText('Minst 8 tegn');

    expect(passwordInput.props.secureTextEntry).toBe(true);
    await fireEvent.press(getByLabelText('Vis passord'));
    expect(passwordInput.props.secureTextEntry).toBe(false);
  });

  test('auth context starts signed out and updates its user ID', async () => {
    function Consumer() {
      const auth = useContext(AuthContext);
      return (
        <Pressable onPress={() => auth?.setUserId('12')}>
          <Text>{auth?.userId || 'signed out'}</Text>
        </Pressable>
      );
    }

    const { getByText } = await render(
      <AuthContextProvider>
        <Consumer />
      </AuthContextProvider>,
    );

    await fireEvent.press(getByText('signed out'));
    expect(getByText('12')).toBeTruthy();
  });
});
