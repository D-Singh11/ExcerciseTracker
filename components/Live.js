import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { white, purple } from '../utils/colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { calculateDirection } from '../utils/helpers';

class Live extends Component {
    state = {
        coords: null,                   // store coordinates
        status: null,                   // used to get user permissions
        direction: ''
    }


    // Added componentDidMount() lifecycle hook which is used to ask location permissions.
    // If permissions granted then set them in local state as granted and call the setLocation() to
    // start watching user's location. Otherwise set it to whatever the permission status is.

    // If an error occurs during geeting the permission then display error and set the status of l
    // ocation services permission to 'undetermined'"
    componentDidMount() {
        Permissions.getAsync(Permissions.LOCATION)              // getAsync only gets the permissions response from user, it will only get them if we ask for permissions which is done using 'askAsync' see askPermisions()
            .then(status => {
                if (status === 'granted') {
                    return this.setLocation();
                }
                this.setState({
                    status
                });
            })
            .catch(error => {
                console.warn('Error getting location permisiions', error);
                this.setState({
                    status: 'undetermined'
                });
            })
    }


    askPermission = () => {
        Permissions.askAsync(Permissions.LOCATION)                      // asks user to provide permissions to acces their location
            .then(status => {
                if (status === 'granted') {
                    return this.setLocation();
                }

                this.setState({ status });
            })
            .catch(error => {
                console.warn('Error asking location permisiions', error);
            })
    }

    // function which is used to set the watch the user location
    // It also sets/updates the local state with provided  response from Location API.
    setLocation = () => {
        Location.watchHeadingAsync({
            enableHighAccuracy: true,
            timeInterval: 1,
            distanceInterval: 1
        }, ({ coords }) => {
            const newDirection = calculateDirection(coords.heading);            // calculates the direction using function

            this.setState({
                coords,
                status: 'granted',
                direction: newDirection
            })
        })
    }

    render() {
        if (this.state.status === null) {
            return <ActivityIndicator style={{ marginTop: 30 }} />
        }

        if (this.state.status === 'denied') {
            return (
                <View style={styles.center}>
                    <Foundation name='alert' size={50} />
                    <Text>
                        You denied access to your location. You can enable it by visiting
                        your settings and enabling the location services for this app.
                    </Text>
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
            <View style={styles.container}>
                <View style={styles.directionContainer}>
                    <Text style={styles.header}>You are heading</Text>
                    <Text style={styles.direction}>North</Text>
                </View>

                <View style={styles.metricContainer}>
                    <View style={styles.metric}>
                        <Text style={[styles.header, { color: white }]}>Altitude</Text>
                        <Text style={[styles.subHeader, { color: white }]}>200 feet</Text>
                    </View>

                    <View style={styles.metric}>
                        <Text style={[styles.header, { color: white }]}>Speed</Text>
                        <Text style={[styles.subHeader, { color: white }]}>200 mph</Text>
                    </View>
                </View>
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
    },
    directionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 35,
        textAlign: 'center',
    },
    direction: {
        color: purple,
        fontSize: 120,
        textAlign: 'center',
    },
    metricContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: purple,
    },
    metric: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    subHeader: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 5,
    }
})

export default Live;
