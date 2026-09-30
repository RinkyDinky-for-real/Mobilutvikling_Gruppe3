import { useState } from 'react';
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';

export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		if (!email.trim() || !password) {
			Alert.alert('Missing information', 'Enter your email and password to continue.');
			return;
		}
		Alert.alert('Welcome back', 'Login is ready to be connected to your authentication service.');
	};

	return (
		<KeyboardAvoidingView
			style={styles.screen}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<View style={styles.content}>
				<View style={styles.brandMark}>
					<Text style={styles.brandIcon}>✦</Text>
				</View>
				<Text style={styles.eyebrow}>MOBILPROG FISKEAPP</Text>
				<Text style={styles.title}>Welcome back</Text>
				<Text style={styles.subtitle}>Sign in to get back to the water.</Text>

				<View style={styles.form}>
					<Text style={styles.label}>Email address</Text>
					<TextInput
						accessibilityLabel="Email address"
						autoCapitalize="none"
						autoComplete="email"
						keyboardType="email-address"
						placeholder="you@example.com"
						placeholderTextColor="#87918C"
						value={email}
						onChangeText={setEmail}
						style={styles.input}
					/>

					<Text style={[styles.label, styles.passwordLabel]}>Password</Text>
					<TextInput
						accessibilityLabel="Password"
						autoCapitalize="none"
						autoComplete="current-password"
						secureTextEntry
						placeholder="Enter your password"
						placeholderTextColor="#87918C"
						value={password}
						onChangeText={setPassword}
						onSubmitEditing={handleLogin}
						style={styles.input}
					/>

					<Pressable
						accessibilityRole="button"
						onPress={() => Alert.alert('Forgot password?', 'Password recovery can be connected here.')}
						style={styles.forgotButton}
					>
						<Text style={styles.forgotText}>Forgot password?</Text>
					</Pressable>

					<Pressable accessibilityRole="button" onPress={handleLogin} style={styles.loginButton}>
						<Text style={styles.loginText}>Sign in</Text>
						<Text style={styles.arrow}>→</Text>
					</Pressable>
				</View>

				<View style={styles.footer}>
					<Text style={styles.footerText}>New to the app? </Text>
					<Pressable
						accessibilityRole="button"
						onPress={() => Alert.alert('Create account', 'Account registration can be connected here.')}
					>
						<Text style={styles.signupText}>Create an account</Text>
					</Pressable>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#F4F7F3',
		paddingHorizontal: 28,
	},
	content: {
		width: '100%',
		maxWidth: 440,
		alignSelf: 'center',
	},
	brandMark: {
		width: 54,
		height: 54,
		borderRadius: 18,
		backgroundColor: '#DCECE3',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 24,
	},
	brandIcon: { color: '#176B50', fontSize: 28 },
	eyebrow: {
		color: '#28765B',
		fontSize: 11,
		fontWeight: '700',
		letterSpacing: 2,
		marginBottom: 10,
	},
	title: { color: '#172B24', fontSize: 34, fontWeight: '700', letterSpacing: -0.8 },
	subtitle: { color: '#68766F', fontSize: 15, marginTop: 8 },
	form: { marginTop: 36 },
	label: { color: '#293B33', fontSize: 13, fontWeight: '600', marginBottom: 9 },
	passwordLabel: { marginTop: 20 },
	input: {
		height: 54,
		borderWidth: 1,
		borderColor: '#DCE4DE',
		borderRadius: 12,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16,
		color: '#172B24',
		fontSize: 15,
	},
	forgotButton: { alignSelf: 'flex-end', paddingVertical: 15 },
	forgotText: { color: '#28765B', fontSize: 13, fontWeight: '600' },
	loginButton: {
		height: 56,
		borderRadius: 13,
		backgroundColor: '#176B50',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	loginText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
	arrow: { color: '#FFFFFF', fontSize: 19, position: 'absolute', right: 20 },
	footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
	footerText: { color: '#68766F', fontSize: 14 },
	signupText: { color: '#176B50', fontSize: 14, fontWeight: '700' },
});
