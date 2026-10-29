import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = () => {
    const normalizedUsername = username.trim();

    if (!normalizedUsername || !password) {
      Alert.alert('Mangler informasjon', 'Fyll inn brukernavn og passord.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('For kort passord', 'Passordet må være minst 8 tegn.');
      return;
    }

    Alert.alert(
      'Registreringsskjema klart',
      'Skjemaet er validert, men konto-oppretting er ikke koblet til en tjeneste ennå.',
      [
        { text: 'Gå til innlogging', onPress: () => router.replace('/') },
      ],
    );
  };

  return (
    <ThemedView>
      <SafeAreaView>
        <ScrollView
          
          keyboardShouldPersistTaps="handled"
        >
          <ThemedView >
            <ThemedText type="title" >
              Opprett konto
            </ThemedText>

            <ThemedText type="small" >
              Bli med i Fiskeappen
            </ThemedText>

            <ThemedView >
              <ThemedText type="small" >
                Brukernavn
              </ThemedText>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Velg et brukernavn"
                placeholderTextColor="#6b7280"
                autoCapitalize="none"
                autoComplete="username"
                textContentType="username"
                
              />
            </ThemedView>

            <ThemedView >
              <ThemedText type="small" >
                Passord
              </ThemedText>
              <ThemedView >
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Minst 8 tegn"
                  placeholderTextColor="#6b7280"
                  autoComplete="new-password"
                  textContentType="newPassword"
                  secureTextEntry={!showPassword}
                  
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? 'Skjul passord' : 'Vis passord'}
                  onPress={() => setShowPassword((current) => !current)}
                  
                >
                  <ThemedText type="small" >
                    {showPassword ? 'Skjul' : 'Vis'}
                  </ThemedText>
                </Pressable>
              </ThemedView>
            </ThemedView>

            <Pressable
              accessibilityRole="button"
              onPress={handleRegister}
              
            >
              <ThemedText type="code" >
                Opprett konto
              </ThemedText>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.replace('/')}
              
            >
              <ThemedText type="small">
                Har du allerede en konto? Logg inn
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}


