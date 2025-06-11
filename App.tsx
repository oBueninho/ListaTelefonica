import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaPrincipal from './screens/TelaPrincipal';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import TelaAdicionar from './screens/TelaAdicionar';
import TelaEditar from './screens/TelaEditar';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // ou um splash screen
  }



  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} options={{ headerShown: false }} />
          <Stack.Screen name="TelaAdicionar" component={TelaAdicionar} options={{ headerShown: false }} />
          <Stack.Screen name="TelaEditar" component={TelaEditar} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
