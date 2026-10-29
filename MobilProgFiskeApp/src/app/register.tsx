import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { registerSchema } from '@/utils/register-schema';
import type { registeredUser } from '@/utils/register-schema';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof registeredUser, string>>>({});
  const router = useRouter();

  const handleRegister = () => {
    const result = registerSchema.safeParse({ username: username.trim(), password });
    if (!result.success) {
      setErrors({
        username: result.error.issues.find((issue) => issue.path[0] === 'username')?.message,
        password: result.error.issues.find((issue) => issue.path[0] === 'password')?.message,
      });
      return;
    }
    setErrors({});
    router.replace('/');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.card}>
            <ThemedText type="title" style={styles.title}>
              Opprett konto
            </ThemedText>

            <ThemedText type="small" style={styles.subtitle}>
              Bli med i Fiskeappen
            </ThemedText>

            <ThemedView style={styles.inputGroup}>
              <ThemedText type="small" style={styles.inputLabel}>
                Brukernavn
              </ThemedText>
              <TextInput
                value={username}
                onChangeText={(value) => {
                  setUsername(value);
                  setErrors((current) => ({ ...current, username: undefined }));
                }}
                placeholder="Velg et brukernavn"
                placeholderTextColor="#6b7280"
                autoCapitalize="none"
                autoComplete="username"
                textContentType="username"
                style={styles.input}
              />
              {errors.username && (
                <ThemedText type="small" style={styles.errorText}>
                  {errors.username}
                </ThemedText>
              )}
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText type="small" style={styles.inputLabel}>
                Passord
              </ThemedText>
              <ThemedView style={styles.passwordRow}>
                <TextInput
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    setErrors((current) => ({ ...current, password: undefined }));
                  }}
                  placeholder="Minst 8 tegn"
                  placeholderTextColor="#6b7280"
                  autoComplete="new-password"
                  textContentType="newPassword"
                  secureTextEntry={!showPassword}
                  style={[styles.input, styles.passwordInput]}
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? 'Skjul passord' : 'Vis passord'}
                  onPress={() => setShowPassword((current) => !current)}
                  style={styles.toggleButton}
                >
                  <ThemedText type="small" style={styles.inputLabel}>
                    {showPassword ? 'Skjul' : 'Vis'}
                  </ThemedText>
                </Pressable>
              </ThemedView>
              {errors.password && (
                <ThemedText type="small" style={styles.errorText}>
                  {errors.password}
                </ThemedText>
              )}
            </ThemedView>

            <Pressable
              accessibilityRole="button"
              onPress={handleRegister}
              style={styles.primaryButton}
            >
              <ThemedText type="code" style={styles.buttonText}>
                Opprett konto
              </ThemedText>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.replace('/')}
              style={styles.secondaryButton}
            >
              <ThemedText type="small" style={styles.secondaryButtonText}>
                Har du allerede en konto? Logg inn
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf4ff',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    maxWidth: MaxContentWidth,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    paddingVertical: Spacing.two,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
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
  errorText: {
    color: '#b42318',
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
  secondaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});
