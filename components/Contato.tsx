import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export function Contato() {
    return <>
        <View style={{display: 'flex', flexDirection: 'row', width: '100%', padding: 20, borderWidth: 1, borderColor:'rgb(201, 201, 201)', borderRadius: 10, marginBottom: 10}}>
            <View style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Poppins-Bold'}}>
                    Thomaz Bueno
                </Text>
                <Text style={{fontFamily: 'Poppins-Medium'}}>
                    (14) 99183-3327
                </Text>
                <Text style={{fontFamily: 'Poppins-Regular'}}>
                    thomaz@unesp.br
                </Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '50%', gap: 15}}>
                <TouchableOpacity style={{display: 'flex', flexDirection: 'row', backgroundColor: '#25D366', padding: 5, alignItems: 'center', justifyContent: 'center', gap: 5, borderRadius: 5}}>
                    <FontAwesome name="phone" size={18} color="white" />
                    <Text style={{color: '#ffffff'}}>Ligar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderColor: "#000000", borderWidth: 0.5, padding: 5, borderRadius: 5}}>
                    <FontAwesome name="pencil-square-o" size={18} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{borderColor: "#000000", borderWidth: 0.5, padding: 5, borderRadius: 5}}>
                    <FontAwesome name="trash-o" size={18} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    </>
}