import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Mangler informasjon', 'Fyll inn e-post og passord.');
      return;
    }

    Alert.alert('Logg inn', `Logger inn som ${email}`);
  };

  return (
    <ThemedView>
      <SafeAreaView>
        <ThemedView>
          <ThemedText type="title" >
            Logg inn
          </ThemedText>

          <ThemedText type="small">
            Velkommen tilbake
          </ThemedText>

          <ThemedView >
            <ThemedText type="small">E-post</ThemedText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="din@epost.no"
              autoCapitalize="none"
              keyboardType="email-address"
              
            />
          </ThemedView>

          <ThemedView >
            <ThemedText type="small">Passord</ThemedText>
            <ThemedView >
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Skriv inn passord"
                secureTextEntry={!showPassword}
                
              />
              <Pressable
                onPress={() => setShowPassword((current) => !current)}
                
              >
                <ThemedText type="small">{showPassword ? 'Skjul' : 'Vis'}</ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>

          <Pressable onPress={handleLogin}>
            <ThemedText type="code">
              Logg inn
            </ThemedText>
          </Pressable>

          <Pressable>
            <ThemedText type="small">Glemt passord?</ThemedText>
          </Pressable>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

