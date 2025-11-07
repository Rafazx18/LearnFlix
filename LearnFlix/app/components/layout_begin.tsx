import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Tipagem explícita do children
interface LayoutBeginProps {
  children?: ReactNode;
}

export default function LayoutBegin({ children }: LayoutBeginProps) {
  return (
    <View style={styles.container}>
      {/* Menu lateral */}
      <View style={styles.menu}>
        <Text style={styles.menuTitle}>📂 Menu</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Projetos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Doações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Configurações</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  menu: {
    width: 120,
    backgroundColor: '#007BFF',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  menuTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 14,
  },
  content: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
});
