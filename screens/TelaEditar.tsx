import { useState } from "react";
import { Header } from "../components/Header";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as SQLite from 'expo-sqlite';
import { useNavigation, useRoute } from "@react-navigation/native";
import { SQLiteDatabase } from "expo-sqlite";
import _contato from "../types/contato";

type _propsContato = {
  dados: _contato;
  db: SQLiteDatabase;
  recarregar: () => void;
};

export default function TelaEditar() {
  const navigation = useNavigation();
  const route = useRoute();
  const { dados, db, recarregar } = route.params as _propsContato;

  const [nome, setNome] = useState(dados.nome);
  const [numero, setNumero] = useState(dados.numero);

  const editar = async () => {
    if (nome === '') {
      Alert.alert("Insira um Nome!");
      return;
    }

    if (numero === '') {
      Alert.alert("Insira um Número!");
      return;
    }

    await db.runAsync(`UPDATE contatos SET nome = ?, numero = ? WHERE id = ?`, nome, numero, dados.id);

    recarregar();
    navigation.goBack();
  };

  return (
    <>
      <Header />
      <View style={{ width: '100%', padding: 10, gap: 10 }}>
        <TextInput
          placeholder="Insira o nome do contato..."
          value={nome}
          onChangeText={setNome}
          style={{
            width: '100%',
            padding: 5,
            borderColor: '#000',
            borderWidth: 0.5,
            fontFamily: 'Poppins-Regular'
          }}
        />
        <TextInput
          placeholder="Insira o número do contato..."
          value={numero}
          onChangeText={setNumero}
          style={{
            width: '100%',
            padding: 5,
            borderColor: '#000',
            borderWidth: 0.5,
            fontFamily: 'Poppins-Regular'
          }}
        />
        <TouchableOpacity
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: '#25D366'
          }}
          onPress={editar}
        >
          <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular' }}>Editar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
