import { Alert, Text, TouchableOpacity, View, Linking } from "react-native";

import FontAwesome from '@expo/vector-icons/FontAwesome';

import _contato from "../types/contato";

import { SQLiteDatabase } from "expo-sqlite";

import * as SQLite from 'expo-sqlite';

import { useNavigation } from "@react-navigation/native";


type _propsContato = {

    dados: _contato,

    db: SQLiteDatabase,

    recarregar: any

}


const db = SQLite.openDatabaseSync("to-do.sqlite");


export function Contato(props: _propsContato) {


    const navigation = useNavigation();

    const { dados } = props;


    const deletar = async () => {

        Alert.alert(

            "Confirmar exclusão",

            `Deseja realmente excluir o contato "${dados.nome}"?`,

            [

                {

                    text: "Cancelar",

                    style: "cancel"

                },

                {

                    text: "Sim",

                    onPress: async () => {

                        await db.runAsync(`DELETE FROM contatos WHERE id = ?`, dados.id);

                        props.recarregar();

                    }

                }

            ]

        );

    };


    const ligar = () => {

        Linking.openURL(`tel:${dados.numero}`);

    };



    return <>

        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: 20, borderWidth: 1, borderColor: 'rgb(201, 201, 201)', borderRadius: 10, marginBottom: 10 }}>

            <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>

                <Text style={{ fontFamily: 'Poppins-Bold' }}>

                    {dados.nome}

                </Text>

                <Text style={{ fontFamily: 'Poppins-Medium' }}>

                    {dados.numero}

                </Text>

            </View>


            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '50%', gap: 15 }}>

                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#25D366', padding: 5, alignItems: 'center', justifyContent: 'center', gap: 5, borderRadius: 5 }} onPress={ligar}>

                    <FontAwesome name="phone" size={18} color="white" />

                    <Text style={{ color: '#ffffff' }}>Ligar</Text>

                </TouchableOpacity>

                <TouchableOpacity

                    style={{ borderColor: "#000000", borderWidth: 0.5, padding: 5, borderRadius: 5 }}

                    onPress={() => {

                        navigation.navigate('TelaEditar', {

                            db: db,

                            dados: dados,

                            recarregar: props.recarregar

                        });

                    }}

                >

                    <FontAwesome name="pencil-square-o" size={18} color="black" />

                </TouchableOpacity>

                <TouchableOpacity style={{ borderColor: "#000000", borderWidth: 0.5, padding: 5, borderRadius: 5 }} onPress={deletar}>

                    <FontAwesome name="trash-o" size={18} color="black" />

                </TouchableOpacity>

            </View>

        </View>

    </>

} 