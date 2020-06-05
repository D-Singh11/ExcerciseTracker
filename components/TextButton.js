import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default function TextButton({ children, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{children}</Text>
        </TouchableOpacity>
    )
}
