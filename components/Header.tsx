import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

export function Header() {

    const navigation = useNavigation();

    return <SafeAreaView style={styles.header}>
        <View style={{display:'flex', flexDirection: 'row', gap: 10}}>
            <FontAwesome name="phone" size={34} color="white" />
            <Text style={{color: '#ffffff', fontFamily: 'Poppins-Bold', fontSize: 20}}>Lista Telefônica</Text>
        </View>

        <TouchableOpacity style={{display:'flex', flexDirection:'row', alignItems: 'center', backgroundColor: '#ffffff', gap: 10, padding: 8, borderRadius: 8}} onPress={() => navigation.navigate('TelaAdicionar')}>
            <FontAwesome name="plus" size={20} color="black" />
            <Text style={{fontFamily: 'Poppins-Regular', marginTop: 3}}>Adicionar</Text>
        </TouchableOpacity>
    </SafeAreaView>
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#25D366',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 20
  },
});