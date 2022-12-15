import React, {useEffect, useState} from "react";
import axios from "axios";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {DataTable} from 'react-native-paper';

export default function ShowInFlatList() {
    const [dataBackEnd, setDataBackEnd] = useState([]);
    const headers = {"Accept": "application/json, text/plain, /", "Content-Type": "application/json"};
    //const url = "http://127.0.0.1:5000/getAll";
    const url = "http://192.168.43.56:5000/getAll";
    useEffect(() => {
        axios.get(url, {headers}).then(function (response) {
            setDataBackEnd(response.data)
        }).catch(error => console.log(error));
    }, [])
    return (

        <View style={styles.container}>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title><Text style={styles.Header}>Date</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.Header}>Heure</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.Header}>Temperature</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.Header}>Humidity</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.Header}>Moisture</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.Header}>Light</Text></DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                    {dataBackEnd.map((data, index) => (

                        <DataTable.Row key={data._id}>

                            <DataTable.Cell>{(data.sensors.date) != null ? data.sensors.date : "-"} </DataTable.Cell>
                            <DataTable.Cell>{(data.sensors.Heure) != null ? data.sensors.Heure : "-"}</DataTable.Cell>
                            <DataTable.Cell>{(data.sensors.temperature != null ? data.sensors.temperature : "-")}</DataTable.Cell>
                            <DataTable.Cell>{(data.sensors.humidity) != null ? data.sensors.humidity : "-"}</DataTable.Cell>
                            <DataTable.Cell>{(data.sensors.moisture) != null ? data.sensors.moisture : "-"}</DataTable.Cell>
                            <DataTable.Cell>{(data.sensors.light) != null ? data.sensors.light : "-"}</DataTable.Cell>
                        </DataTable.Row>))
                    }
                </ScrollView>
            </DataTable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 30,
    },
    Header: {
        color: "blue",
    },
    Text: {
        color: "blue",
    }
});