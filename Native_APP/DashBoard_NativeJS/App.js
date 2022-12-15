import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View} from 'react-native';
import ShowInFlatList from "./components/ShowInFlatList";
import Search from "./components/Search";

const Tab = createBottomTabNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator style={styles.container}>
                <Tab.Screen
                    name="All Data"
                    component={ShowInFlatList}/>

                <Tab.Screen
                    name="Search"
                    component={Search}/>

            </Tab.Navigator>
        </NavigationContainer>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
