import { useState } from "react";
import { Header } from "../components/Header";
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";
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

    // Estados para os campos do formulário
    const [nome, setNome] = useState(dados.nome);
    const [numero, setNumero] = useState(dados.numero);
    // 1. LÓGICA DE ESTADO DE CARREGAMENTO (LOADING)
    const [isLoading, setIsLoading] = useState(false);

    // 2. LÓGICA DE VERIFICAÇÃO DE MUDANÇAS
    // Compara os dados atuais com os originais. O botão será desabilitado se forem iguais.
    const hasChanges = nome.trim() !== dados.nome || numero.trim() !== dados.numero;
    
    const validarCampos = () => {
        // .trim() remove espaços em branco no início e fim
        if (nome.trim() === '') {
            Alert.alert("Erro de Validação", "O campo 'Nome' não pode estar vazio.");
            return false;
        }
        if (numero.trim() === '') {
            Alert.alert("Erro de Validação", "O campo 'Número' não pode estar vazio.");
            return false;
        }
        return true;
    };

    const editar = async () => {
        // Valida antes de prosseguir
        if (!validarCampos()) {
            return;
        }

        setIsLoading(true); // Inicia o feedback de carregamento

        // 3. LÓGICA DE TRATAMENTO DE ERROS (TRY/CATCH)
        // Protege o app contra falhas na comunicação com o banco de dados.
        try {
            await db.runAsync(
                `UPDATE contatos SET nome = ?, numero = ? WHERE id = ?`, 
                nome.trim(), 
                numero.trim(), 
                dados.id
            );

            // Ações de sucesso
            await recarregar(); // Espera o recarregamento concluir
            navigation.goBack();

        } catch (error) {
            console.error("Falha ao editar contato:", error);
            Alert.alert("Erro", "Não foi possível salvar as alterações. Tente novamente.");
        } finally {
            setIsLoading(false); // Garante que o loading sempre termine
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
                <TextInput
                    placeholder="Número do contato"
                    value={numero}
                    onChangeText={setNumero}
                    keyboardType="phone-pad" // Melhora a UX para inserir números
                    style={styles.input}
                />
                
                {/* 4. LÓGICA CONDICIONAL NO BOTÃO */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        // Se não houver mudanças ou estiver carregando, aplica o estilo de desabilitado
                        (!hasChanges || isLoading) && styles.buttonDisabled 
                    ]}
                    onPress={editar}
                    // Desabilita a interação se não houver mudanças ou se estiver carregando
                    disabled={!hasChanges || isLoading}
                >
                    {isLoading 
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.buttonText}>Salvar Alterações</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
}

// 5. LÓGICA DE ESTILIZAÇÃO CENTRALIZADA (StyleSheet)
// Melhora a organização, performance e facilita a reutilização de estilos.
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
        backgroundColor: '#25D366', // Verde
    },
    buttonDisabled: {
        backgroundColor: '#a3a3a3', // Cinza
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        fontWeight: 'bold',
    },
});