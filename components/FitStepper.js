import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
// import { white, green, purple } from 'ansi-colors';
import { purple, white, gray } from '../utils/colors';

function FitSlider(props) {
    return (
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
            {Platform.os === 'ios'
                ? <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[styles.iosBtn, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                        onPress={props.onDecrement}>
                        <Entypo name='minus' size={30} color={purple} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.iosBtn, , { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
                        onPress={props.onIncrement}>
                        <Entypo name='plus' size={30} color={purple} />
                    </TouchableOpacity>
                </View>
                : <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[styles.androidBtn, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                        onPress={props.onDecrement}>
                        <FontAwesome name='minus' size={30} color={white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.androidBtn, , { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
                        onPress={props.onIncrement}>
                        <FontAwesome name='plus' size={30} color={white} />
                    </TouchableOpacity>
                  </View>

            }
            <View style={styles.metricCounter}>
                <Text style={{ fontSize: 24, textAlign: 'center' }}>{props.value}</Text>
                <Text style={{ fontSize: 18, color: gray }}>{props.unit}</Text>
            </View>
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
    },
    metricCounter: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center'
    },
    androidBtn: {
        margin: 5,
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2

    }
})

export default FitSlider
