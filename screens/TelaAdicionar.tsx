import { useState } from "react";
import { Header } from "../components/Header";
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";
import * as SQLite from 'expo-sqlite';
import { useNavigation } from "@react-navigation/native";

const db = SQLite.openDatabaseSync("to-do.sqlite");

export default function TelaAdicionar() {
    const navigation = useNavigation();

    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isFormValid = nome.trim() !== '' && numero.trim() !== '';

    const adicionar = async () => {
    
        if (!isFormValid) {
            Alert.alert("Campos Inválidos", "Por favor, preencha o nome e o número do contato.");
            return;
        }

        setIsLoading(true);

        try {
            await db.runAsync(
                `INSERT INTO contatos (nome, numero) VALUES (?,?)`, 
                nome.trim(), 
                numero.trim()
            );

            navigation.goBack();

        } catch (error) {
            console.error("Falha ao adicionar contato:", error);
            Alert.alert("Erro no Banco de Dados", "Não foi possível salvar o novo contato. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.formContainer}>
                <TextInput
                    placeholder="Nome do contato"
                    value={nome}
                    onChangeText={setNome}
                    style={styles.input}
                />
                {}
                <TextInput
                    placeholder="Número do contato"
                    value={numero}
                    onChangeText={setNumero}
                    style={styles.input}
                    keyboardType="phone-pad"
                />
                <TouchableOpacity
                    style={[styles.button, !isFormValid && styles.buttonDisabled]}
                    onPress={adicionar}
                    disabled={!isFormValid || isLoading}
                >
                    {isLoading
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.buttonText}>Salvar Contato</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formContainer: {
        flex: 1,
        padding: 15,
        gap: 15,
    },
    input: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#007BFF', 
    },
    buttonDisabled: {
        backgroundColor: '#a3a3a3',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        fontWeight: 'bold',
    },
});