import { useContext, useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { login } from '../hooks/useLogin';
import { AuthContext } from '../utils/context';
import { Route } from 'expo-router/build/Route';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const auth = useContext(AuthContext);
  const router = useRouter()

  if (auth === null) {
    throw new Error("av en eller annen grunn så må erroren være der");
  }

  const { setUserId } = auth;


  const handleLogin = async () => {
    
    if (!userName || !password) {
      Alert.alert('Missing Information', 'Enter your username and password');
      return;
    }

    Alert.alert('Log in', `Logging in as: ${userName}`);
    const res = await login(userName, password);
    console.log(res);
    if (res.status != 200) {
      Alert.alert("Error", "Invalid username or password");
      return;
    }
    const id = await res.text();
    setUserId(id);
    SecureStore.setItem("userId", id)
    router.navigate("/(tabs)/feed")
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

          <Pressable onPress={handleLogin} style={styles.primaryButton}>
            <Text style={styles.buttonText}>
              Log in
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