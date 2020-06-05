import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

function FitSlider(props) {
    return (
        <View>
            <View>
                <TouchableOpacity onPress={props.onDecrement}>
                    <FontAwesome name='minus' size={30} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onIncrement}>
                    <FontAwesome name='plus' size={30} color={'black'} />
                </TouchableOpacity>
            </View>
            <Text>{props.value}</Text>
            <Text>{props.unit}</Text>
        </View>
    )
}

export default FitSlider
