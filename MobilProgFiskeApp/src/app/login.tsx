import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, Text, View } from 'react-native';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { login } from '../hooks/useLogin';
import { useAuth } from '@/utils/context';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useAuth();
  const [busy, setBusy] = useState(false);


  
  const handleLogin = async () => {
    if (busy) return;

    if (!userName.trim() || !password) {
      Alert.alert(
        'Mangler informasjon',
        'Fyll inn brukernavn og passord.'
      );
      return;
    }

    setBusy(true);

    try {
      // Verify credentials using the backend
      const accountId = await login(userName.trim(), password);

      // Create and save the local session
      await signIn(accountId);

      // Expo Router will automatically update the navigation

    } catch (error) {
      Alert.alert(
        'Unable to log in:',
        error instanceof Error ? error.message : 'Unknown error.'
      );
    } finally {
      setBusy(false);
    }
  };


  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Log in
          </Text>

          <Text style={styles.subtitle}>
            Welcome Back
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Username
            </Text>
            <TextInput
              value={userName}
              onChangeText={setUserName}
              placeholder="Enter your username"
              placeholderTextColor="#6b7280"
              autoCapitalize="none"
              keyboardType="default"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Password
            </Text>
            <View style={styles.passwordRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your passord"
                placeholderTextColor="#6b7280"
                secureTextEntry={!showPassword}
                style={[styles.input, styles.passwordInput]}
              />
              <Pressable
                onPress={() => setShowPassword((current) => !current)}
                style={styles.toggleButton}
              >
                <Text style={styles.inputLabel}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={handleLogin}
            disabled={busy}
            style={styles.primaryButton}
          >
            <Text style={styles.buttonText}>
              {busy ? 'Logging in...' : 'Log in'}
            </Text>
          </Pressable>

          <Pressable onPress={()=> router.push('/register')}style={styles.secondaryButton}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaf4ff',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    padding: Spacing.four,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    boxShadow: '0px 8px 14px rgba(0, 0, 0, 0.08)',
    elevation: 5,
  },
  title: {
    fontSize: 48,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: Spacing.one,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: Spacing.three,
    opacity: 0.7,
  },
  inputGroup: {
    gap: Spacing.one,
    marginBottom: Spacing.three,
    backgroundColor: '#ffffff',
  },
  inputLabel: {
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b8c7dc',
    borderRadius: 12,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    backgroundColor: '#ffffff',
    color: '#111827',
    fontSize: 16,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    backgroundColor: '#ffffff',
  },
  passwordInput: {
    flex: 1,
  },
  toggleButton: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  primaryButton: {
    backgroundColor: '#1f6feb',
    borderRadius: 12,
    paddingVertical: Spacing.two,
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  secondaryButton: {
    backgroundColor: '#2e1ec0',
    borderRadius: 12,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    paddingVertical: Spacing.two,
    marginTop: Spacing.one,
  },
});