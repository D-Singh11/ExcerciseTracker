import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
// import { white, green, purple } from 'ansi-colors';
import { purple, white } from '../utils/colors';

function FitSlider(props) {
    return (
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.iosBtn}
                    onPress={props.onDecrement}>
                    <FontAwesome name='minus' size={30} color={purple} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iosBtn}
                    onPress={props.onIncrement}>
                    <FontAwesome name='plus' size={30} color={purple} />
                </TouchableOpacity>
            </View>
            <Text>{props.value}</Text>
            <Text>{props.unit}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iosBtn: {
        backgroundColor: white,
        borderColor: purple,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25
    }
})

export default FitSlider
