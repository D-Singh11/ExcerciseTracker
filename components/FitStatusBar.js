import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import Constants from 'expo-constants';         // is used to automatically apply height for both ios and android

function FitStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent
                backgroundColor={backgroundColor}
                {...props}
            />
        </View>
    )
}

export default FitStatusBar;
