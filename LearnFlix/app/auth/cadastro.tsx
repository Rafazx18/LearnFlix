import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('User'); // valor padrão

  // Função de cadastro
  const fcn_cadastrar = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    console.log('🧠 Enviando dados para o servidor:', {
      nome,
      email,
      senha,
      tipoUsuario,
    });

    try {
      const response = await fetch('http://192.168.15.4:3000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          senha,
          tipoUsuario,
        }),
      });

      const data = await response.json();
      console.log('📦 Resposta do servidor:', data);

      if (data.sucesso) {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        router.push('/auth/login'); // vai pra tela de login
      } else {
        Alert.alert('Erro', data.mensagem || 'Erro ao cadastrar usuário.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Text style={styles.label}>Tipo de Usuário:</Text>
      <Picker
        selectedValue={tipoUsuario}
        onValueChange={(value) => {
          console.log('Selecionado:', value);
          setTipoUsuario(value);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Usuário Padrão" value="User" />
        <Picker.Item label="Administrador" value="Admin" />
      </Picker>

      <Button title="Cadastrar" onPress={fcn_cadastrar} color="#007BFF" />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Já tem conta? Fazer Login"
          onPress={() => router.push('/auth/login')}
          color="#555"
        />
      </View>
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  picker: {
    width: '100%',
    marginVertical: 8,
  },
});
