import { useContext, useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { login } from '../hooks/useLogin';
import { AuthContext } from '../utils/context';
import { Route } from 'expo-router/build/Route';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!userName || !password) {
      Alert.alert('Mangler informasjon', 'Fyll inn brukernavn og passord.');
      return;
    }

    Alert.alert('Logg inn', `Logger inn som ${userName}`);
    const res: Response = login(userName, password).then
    if (res.status != 200) {
      Alert("Error", "Enten brukernavnet eller passordet er feil")
    }
    const { userId, setUserId } = useContext(AuthContext)
    setUserId(res.text)
    SecureStore.setItem("userId", res.text)
    const router = useRouter()
    router.navigate("/(tabs)/feed")
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
              value={userName}
              onChangeText={setUserName}
              placeholder="brukernavn"
              placeholderTextColor="#6b7280"
              autoCapitalize="none"
              keyboardType="default"
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

          <Pressable onPress={handleLogin} style={styles.primaryButton}>
            <ThemedText type="code" style={styles.buttonText}>
              Logg inn
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
    boxShadow: '0px 8px 14px rgba(0, 0, 0, 0.08)',
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

