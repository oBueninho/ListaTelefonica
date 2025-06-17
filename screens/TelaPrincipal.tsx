import { SafeAreaView, ScrollView, TextInput, View} from "react-native";

import { Header } from "../components/Header";

import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Contato } from "../components/Contato";

import { useEffect, useState } from "react";

import _contato from "../types/contato";

import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabaseSync("to-do.sqlite");


export default function TelaPrincipal() {


    const [contatos, setContatos] = useState<_contato[]>([]);

    const [nomeContato, setNomeContato] = useState('');


    useEffect(

        () => {

            db.execSync(`CREATE TABLE IF NOT EXISTS contatos (

                  id INTEGER PRIMARY KEY NOT NULL,

                  nome VARCHAR(100),

                  numero VARCHAR(100)

            )`);

            recarregar();

        }

        , []);


    const recarregar = async () => {

        try {

            const temp: _contato[] = await db.getAllAsync("SELECT * FROM contatos");

            setContatos(temp);

        } catch (error) {

            console.error("Falha ao recarregar contatos:", error);

        }

    }


    const renderLista = () => {

        return contatos.map(c => (

            <Contato

                dados={c}

                db={db}

                recarregar={recarregar}

                key={c.id}

            />

        ));

    }



    return <SafeAreaView>

        <Header />

        <ScrollView style={{ padding: 10 }}>

            {renderLista()}

        </ScrollView>


    </SafeAreaView>

} 