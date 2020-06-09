import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

class Live extends Component {
    state = {
        coords: null,                   // store coordinates
        status: null,                   // used to get user permissions
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
                <View>
                    <Text>undetermined</Text>
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

export default Live;
