import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/components/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="auth/login">
        <Stack.Screen
          name="auth/login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth/cadastro"
          options={{ title: 'Cadastro' }}
        />
        <Stack.Screen
          name="admin/index"
          options={{ title: 'Painel Admin' }}
        />
        <Stack.Screen
          name="user/index"
          options={{ title: 'Área do Usuário' }}
        />
      </Stack>
    </ThemeProvider>
  );
}
