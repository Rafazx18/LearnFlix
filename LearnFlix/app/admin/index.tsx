import React from 'react';
import { View, Text } from 'react-native';
import LayoutBegin from '../components/layout_begin';


export default function AdminIndex() {
  return (
    <LayoutBegin>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24 }}>👑 Bem-vindo, Administrador!</Text>
      </View>
    </LayoutBegin>
  );
}
