import { Alert, Text, TouchableOpacity, View, Linking, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import _contato from "../types/contato";
import { SQLiteDatabase } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import React from "react"; 

type PropsContato = {
    dados: _contato;
    db: SQLiteDatabase;
    recarregar: () => Promise<void> | void; 
};

function Contato({ dados, db, recarregar }: PropsContato) {

    const navigation = useNavigation();
     

    const deletar = () => {
        Alert.alert(
            "Confirmar exclusão",
            `Deseja realmente excluir o contato "${dados.nome}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sim, excluir",
                    style: "destructive",
                    onPress: async () => {
                        // 3. LÓGICA DE TRATAMENTO DE ERROS NA EXCLUSÃO
                        try {
                            await db.runAsync(`DELETE FROM contatos WHERE id = ?`, dados.id);
                            await recarregar(); // Recarrega a lista na tela principal
                        } catch (error) {
                            console.error("Falha ao deletar o contato:", error);
                            Alert.alert("Erro", "Não foi possível excluir o contato.");
                        }
                    }
                }
            ]
        );
    };

    const ligar = () => {
        const url = `tel:${dados.numero}`;
        Linking.canOpenURL(url)
            .then(supported => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    Alert.alert("Aviso", "Não é possível realizar chamadas a partir deste dispositivo.");
                }
            })
            .catch(err => {
                console.error('Ocorreu um erro ao tentar ligar:', err);
                Alert.alert("Erro", "Não foi possível iniciar a chamada.");
            });
    };

    const editar = () => {
        navigation.navigate('TelaEditar', {
            dados: dados,
            db: db,
            recarregar: recarregar
        });
    };

    return (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <Text style={styles.nome}>{dados.nome}</Text>
                <Text style={styles.numero}>{dados.numero}</Text>
            </View>

            <View style={styles.actionsContainer}>
                {/* Botão de Ligar */}
                <TouchableOpacity style={[styles.button, styles.ligarButton]} onPress={ligar}>
                    <FontAwesome name="phone" size={20} color="white" />
                </TouchableOpacity>
                {/* Botão de Editar */}
                <TouchableOpacity style={[styles.button, styles.iconButton]} onPress={editar}>
                    <FontAwesome name="pencil" size={20} color="#333" />
                </TouchableOpacity>
                {/* Botão de Deletar */}
                <TouchableOpacity style={[styles.button, styles.iconButton]} onPress={deletar}>
                    <FontAwesome name="trash" size={20} color="#E53935" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default React.memo(Contato);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        marginBottom: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    nome: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#333',
    },
    numero: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#666',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 12,
    },
    button: {
        padding: 8,
        borderRadius: 20, // Círculo
        alignItems: 'center',
        justifyContent: 'center',
    },
    ligarButton: {
        backgroundColor: '#25D366',
    },
    iconButton: {
        backgroundColor: 'transparent',
    },
});