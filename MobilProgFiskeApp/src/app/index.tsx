import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { fetchUser } from '@/hooks/use-Fetch-User';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    router.navigate('/(tabs)/profile');
    const accountId = username.trim();
    if (!accountId || !password) {
      Alert.alert('Mangler informasjon', 'Fyll inn brukernavn og passord.');
      return;
    }
    setIsLoggingIn(true);
    try {
      const response = await fetchUser(accountId);
      if (!response) {
        throw new Error('Kunne ikke kontakte databasen.');
      }
      if (response.status === 404) {
        Alert.alert('Kontoen finnes ikke', 'brukernavnet er ikke i databasen');
        return;
      }
      if (!response.ok) {
        throw new Error(`Databasefeil: ${response.status} ${response.statusText}`);
      }

      router.navigate('/(tabs)/profile');
    } catch (error) {
      Alert.alert(
        'Innlogging mislyktes',
        error instanceof Error ? error.message : 'En uventet feil oppstod.',
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.card}>
          <ThemedText type="title" style={styles.title}>
            Logg inn
          </ThemedText>

          <ThemedText type="small" style={styles.subtitle}>
            Velkommen tilbake
          </ThemedText>

          <ThemedView style={styles.inputGroup}>
            <ThemedText type="small" style={styles.inputLabel}>
              Brukernavn
            </ThemedText>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Ditt brukernavn"
              placeholderTextColor="#6b7280"
              autoCapitalize="none"
              autoComplete="username"
              textContentType="username"
              style={styles.input}
            />
          </ThemedView>

          <ThemedView style={styles.inputGroup}>
            <ThemedText type="small" style={styles.inputLabel}>
              Passord
            </ThemedText>
            <ThemedView style={styles.passwordRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Skriv inn passord"
                placeholderTextColor="#6b7280"
                secureTextEntry={!showPassword}
                style={[styles.input, styles.passwordInput]}
              />
              <Pressable
                onPress={() => setShowPassword((current) => !current)}
                style={styles.toggleButton}
              >
                <ThemedText type="small" style={styles.inputLabel}>
                  {showPassword ? 'Skjul' : 'Vis'}
                </ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>

          <Pressable
            onPress={handleLogin}
            disabled={isLoggingIn}
            style={[styles.primaryButton, isLoggingIn && styles.disabledButton]}
          >
            <ThemedText type="code" style={styles.buttonText}>
              {isLoggingIn ? 'Logger inn...' : 'Logg inn'}
            </ThemedText>
          </Pressable>

          <Pressable style={styles.secondaryButton}>
            <ThemedText type="small">Glemt passord?</ThemedText>
          </Pressable>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
  },
  title: {
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
  disabledButton: {
    opacity: 0.6,
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
