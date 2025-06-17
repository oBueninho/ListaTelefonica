import { useState } from "react";

import { Header } from "../components/Header";

import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

import * as SQLite from 'expo-sqlite';

import { useNavigation } from "@react-navigation/native";


const db = SQLite.openDatabaseSync("to-do.sqlite");


export default function TelaAdicionar() {


    const navigation = useNavigation();


    const [nome, setNome] = useState('');

    const [numero, setNumero] = useState('');


    const adicionar = async() => {

        if(nome === '') {

            Alert.alert("Insira um Nome!");

            return;

        }


        if(numero === '') {

            Alert.alert("Insira um Numero!");

            return;

        }


        await db.runAsync(`INSERT INTO contatos (nome, numero) VALUES (?,?)`, nome, numero);


        navigation.navigate('TelaPrincipal');

    }


    return <>

        <Header />

       

        <View style={{width: '100%', padding: 10, display: 'flex', gap: 10}}>

            <TextInput placeholder="Insira o nome do contato..." value={nome} onChangeText={setNome} style={{width: '100%', padding: 5, borderColor: '#000000', borderWidth: 0.5, fontFamily: 'Poppins-Regular'}}/>

            <TextInput placeholder="Insira o nome do contato..." value={numero} onChangeText={setNumero} style={{width: '100%', padding: 5, borderColor: '#000000', borderWidth: 0.5,fontFamily: 'Poppins-Regular'}}/>

            <TouchableOpacity style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: '#25D366'}} onPress={adicionar}>

                <Text style={{color: '#ffffff', fontFamily: 'Poppins-Regular'}}>Salvar</Text>

            </TouchableOpacity>

        </View>

       

    </>

} 