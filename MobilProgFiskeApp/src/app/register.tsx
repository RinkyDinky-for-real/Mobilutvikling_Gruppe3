import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput, View, Text, } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { registerSchema } from '@/utils/register-schema';
import type { registeredUser } from '@/utils/register-schema';
import { UploadUser } from '@/hooks/use-Upload-User';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof registeredUser, string>>>({});
  const router = useRouter();

  const handleRegister = async () => {
    const result = registerSchema.safeParse({ username: username.trim(), password });
    if (!result.success) {
      setErrors({
        username: result.error.issues.find((issue) => issue.path[0] === 'username')?.message,
        password: result.error.issues.find((issue) => issue.path[0] === 'password')?.message,
      });
      return;
    }

    
    setErrors({});
    try {
      await UploadUser(result.data.username, result.data.password);
      Alert.alert("Account created", "You can now log in.", [
        { text: "Go to login", onPress: () => router.replace("/") },
      ]);
    } catch (error) {
      Alert.alert(
        "Registration failed",
        error instanceof Error ? error.message : "Please try again."
      );
    } 
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.title}>
              Create Account
            </Text>

            <Text style={styles.subtitle}>
              Join the Fishing App
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Enter Username
              </Text>
              <TextInput
                value={username}
                onChangeText={(value) => {
                  setUsername(value);
                  setErrors((current) => ({ ...current, username: undefined }));
                }}
                placeholder="Choose a username"
                placeholderTextColor="#6b7280"
                autoCapitalize="none"
                autoComplete="username"
                textContentType="username"
                style={styles.input}
              />
              {errors.username && (
                <Text style={styles.errorText}>
                  {errors.username}
                </Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Password
              </Text>
              <View style={styles.passwordRow}>
                <TextInput
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    setErrors((current) => ({ ...current, password: undefined }));
                  }}
                  placeholder="At least 6 characters."
                  placeholderTextColor="#6b7280"
                  autoComplete="new-password"
                  textContentType="newPassword"
                  secureTextEntry={!showPassword}
                  style={[styles.input, styles.passwordInput]}
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                  onPress={() => setShowPassword((current) => !current)}
                  style={styles.toggleButton}
                >
                  <Text style={styles.inputLabel}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </Pressable>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>
                  {errors.password}
                </Text>
              )}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={handleRegister}
              style={styles.primaryButton}
            >
              <Text style={styles.buttonText}>
                Opprett konto
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.replace('/')}
              style={styles.secondaryButton}
            >
              <Text style={styles.buttonText}>
                Already have an account? Log in
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
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
});
