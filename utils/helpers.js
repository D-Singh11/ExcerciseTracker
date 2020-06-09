import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { white, red, orange, blue, lightPurp, pink, purple } from './colors';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { totalmem } from 'os';


const NOTIFICATION_KEY = 'fitTract:notification';

export function isBetween(num, x, y) {
    if (num >= x && num <= y) {
        return true
    }

    return false
}

export function calculateDirection(heading) {
    let direction = ''

    if (isBetween(heading, 0, 22.5)) {
        direction = 'North'
    } else if (isBetween(heading, 22.5, 67.5)) {
        direction = 'North East'
    } else if (isBetween(heading, 67.5, 112.5)) {
        direction = 'East'
    } else if (isBetween(heading, 112.5, 157.5)) {
        direction = 'South East'
    } else if (isBetween(heading, 157.5, 202.5)) {
        direction = 'South'
    } else if (isBetween(heading, 202.5, 247.5)) {
        direction = 'South West'
    } else if (isBetween(heading, 247.5, 292.5)) {
        direction = 'West'
    } else if (isBetween(heading, 292.5, 337.5)) {
        direction = 'North West'
    } else if (isBetween(heading, 337.5, 360)) {
        direction = 'North'
    } else {
        direction = 'Calculating'
    }

    return direction
}

export function timeToString(time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
}


const styles = StyleSheet.create({
    iconContainer: {
        padding: 5,
        borderRadius: 8,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    }
})

export function getMetricMetaInfo(metric) {

    const info = {
        run: {
            displayName: 'Run',
            max: 50,
            unit: 'miles',
            step: 1,
            type: 'steppers',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, { backgroundColor: red }]}>
                        <MaterialIcons name='directions-run'
                            color={white}
                            size={35}
                        />
                    </View>
                )
            }
        },
        bike: {
            displayName: 'Bike',
            max: 100,
            unit: 'miles',
            step: 1,
            type: 'steppers',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, { backgroundColor: orange }]}>
                        <MaterialCommunityIcons name='bike'
                            color={white}
                            size={35}
                        />
                    </View>
                )
            }
        },
        swim: {
            displayName: 'Swim',
            max: 9900,
            unit: 'meters',
            step: 1,
            type: 'steppers',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, { backgroundColor: blue }]}>
                        <MaterialCommunityIcons name='swim'
                            color={white}
                            size={35}
                        />
                    </View>
                )
            }
        },
        sleep: {
            displayName: 'Sleep',
            max: 24,
            unit: 'hours',
            step: 1,
            type: 'slider',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, { backgroundColor: lightPurp }]}>
                        <FontAwesome name='bed'
                            color={white}
                            size={35}
                        />
                    </View>
                )
            }
        },
        eat: {
            displayName: 'Eat',
            max: 10,
            unit: 'rating',
            step: 1,
            type: 'slider',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, { backgroundColor: pink }]}>
                        <MaterialCommunityIcons name='food'
                            color={white}
                            size={35}
                        />
                    </View>
                )
            }
        }
    };

    return typeof metric === 'undefined' ? info : info[metric];
}

export function getDailyReminderValue() {
    return {
        today: '👋 Dont forget to add your data for today.'
    }
}


// Notifications Logic for - Local notifications



// function used to clear Local notifications
export function clearLocalNotification() {
    AsyncStorage.removeItem(NOTIFICATION_KEY)                       // remove the data linked to Nnotification key from the device's local/async storage
    .then(response => {                                             // once that is done then
        Notifications.cancelAllScheduledNotificationsAsync();       // cancel all the notifications from the application
    })
}


// function used to create new notification
// @returns : object
export function createLocalNotification() {
    return {
        title: 'Log your stats',
        body: '👋 dont forget to add your stats/entry for today',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}


// function used to set local notification
export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)              // get data linked to notification key from the asyncStorage
        .then(JSON.parse)                               // parse that data and pass it to next then()
        .then(({ data }) => {                           // {data} is used to get the data property from the response of previous then - destructuring
            if (data === null) {                            // if data was null then 
                Permissions.askAsync(Permissions.NOTIFICATIONS)                 // ask for permissions to det notifications on user's device
                    .then(({ status }) => {                                     // detructure the status property of permisiions
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();                       // cancel all the previously scheduled notifications- just to ensure we dont set same notification twice

                            let tomorrow = new Date();                              // new date variable used to define when should new notification appear on user's device
                            tomorrow.setDate(tomorrow.getDate() + 1);               // set the date for notification to show on device
                            tomorrow.setHours(20);                                  // set the hour for notification to show on device
                            tomorrow.setMinutes(0);                                 // set the minute for notification to show on device

                            Notifications.scheduleLocalNotificationAsync(           // expo's Notification package used to scedule new notofication take2 arguments 1. actual notification (object) 2. when to show the (object)
                                createLocalNotofication(),                          // local function which return a notification object
                                {
                                    time: tomorrow,                                 // specify the time of notification to show on device
                                    repeat: 'day'                                   // set the repeat of notification to 'day' means this notification should repeat everyday at same time
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));               // store the true 'property' in local/asyncStorage of device
                        }
                    })
            }
        })
}