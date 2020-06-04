import React, { Component } from 'react';
import { Text, View, Slider } from 'react-native';

function FitSlider(props) {
    return (
        <View>
            <Text> Fit slider</Text>
            <Slider 
            minimumValue={0}
            maximumValue={props.max}
            step={props.step}
            value={props.value}
            onValueChange={props.onChange}
            />
            <Text>{props.value}</Text>
            <Text>{props.unit}</Text>
        </View>
    )
}

export default FitSlider
