import { SafeAreaView, ScrollView, TextInput, View } from "react-native";
import { Header } from "../components/Header";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Contato } from "../components/Contato";

export default function TelaPrincipal() {
    return <SafeAreaView>
        <Header />

        <View style={{width: '100%', padding: 10, borderBottomColor: 'rgb(201, 201, 201)', borderBottomWidth: 0.9}}>
            <View style={{width: '100%', display: 'flex', flexDirection: 'row', borderWidth: 1, borderColor: 'rgb(201, 201, 201)', alignItems: 'center', paddingHorizontal: 10, gap: 10}}>
                <FontAwesome name="search" size={24} color='rgb(201, 201, 201)'/>
                <TextInput placeholder="Buscar contatos..."/>
            </View>
        </View>
        
        <ScrollView style={{padding: 10}}>
            {
                [1, 2, 3, 4].map(contato => {
                    return <Contato />
                })
            }
            <Contato />
        </ScrollView>
        
    </SafeAreaView>
}