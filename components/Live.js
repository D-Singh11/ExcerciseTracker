import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { white, purple } from '../utils/colors';

class Live extends Component {
    state = {
        coords: null,                   // store coordinates
        status: 'undetermined',                   // used to get user permissions
        direction: ''
    }

    render() {
        if (this.state.status === null) {
            return <ActivityIndicator style={{ marginTop: 30 }} />
        }

        if (this.state.status === 'denied') {
            return (
                <View>
                    <Text>Access Denied</Text>
                </View>
            )
        }

        if (this.state.status === 'undetermined') {
            return (
                <View style={styles.center}>
                    <Foundation name='alert' size={50} />
                    <Text>
                        You need to enable location services to use live feature.
                    </Text>
                    <TouchableOpacity onPress={this.askPermission} style={styles.button} >
                        <Text style={styles.buttonText}>
                            Enable
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View>
                <Text>Access granted</Text>
                <Text>{JSON.stringify(this.state)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    button: {
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText: {
        color: white,
        fontSize: 20,
    }
})

export default Live;
