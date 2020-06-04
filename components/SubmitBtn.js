import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>Submit</Text>
        </TouchableOpacity>
    )
}
