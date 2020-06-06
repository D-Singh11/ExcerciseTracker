import React, { Component, Fragment } from 'react';
import { Text, View, Slider, StyleSheet } from 'react-native';
import { gray } from '../utils/colors';

function FitSlider(props) {
    return (
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <Slider
                minimumValue={0}
                maximumValue={props.max}
                step={props.step}
                value={props.value}
                onValueChange={props.onChange}
            />
            <View style={styles.metricCounter}>
                <Text style={{ fontSize: 25, textAlign: "center" }}>{props.value}</Text>
                <Text style={{ fontSize: 18, color: gray }}>{props.unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    metricCounter: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FitSlider
