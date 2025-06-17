import { SafeAreaView, View, TextInput, FlatList, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { Contato } from "../components/Contato";
import { useEffect, useState, useMemo } from "react";
import _contato from "../types/contato";
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabaseSync("to-do.sqlite");

export default function TelaPrincipal() {
    const [busca, setBusca] = useState('');
    const [contatos, setContatos] = useState<_contato[]>([]);

    useEffect(() => {
        db.execSync(`CREATE TABLE IF NOT EXISTS contatos (
            id INTEGER PRIMARY KEY NOT NULL,
            nome VARCHAR(100),
            numero VARCHAR(100)
        )`);
        recarregar();
    }, []);

    const recarregar = async () => {
        try {
            const todosOsContatos: _contato[] = await db.getAllAsync("SELECT * FROM contatos ORDER BY nome");
            setContatos(todosOsContatos);
        } catch (error) {
            console.error("Falha ao recarregar contatos:", error);
        }
    };
    
    const contatosFiltrados = useMemo(() => {
        if (!busca) {
            return contatos; 
        }
        return contatos.filter(contato =>
            contato.nome.toLowerCase().includes(busca.toLowerCase())
        );
    }, [busca, contatos]);


    return (
        <SafeAreaView style={styles.container}>
            <Header />
            
            {/* Campo de busca que atualiza o estado 'busca' */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar contato..."
                    value={busca}
                    onChangeText={setBusca} 
                />
            </View>

            {

            }
            <FlatList
                data={contatosFiltrados}
                contentContainerStyle={{ padding: 10 }}
                renderItem={({ item }) => (
                    <Contato
                        dados={item}
                        db={db}
                        recarregar={recarregar}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    input: {
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
    },
});