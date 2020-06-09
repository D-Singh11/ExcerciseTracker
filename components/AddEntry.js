import React, { Component } from 'react';
import {
    Text, View,
    Platform,
    StyleSheet
} from 'react-native';
import {
    getMetricMetaInfo,
    timeToString,
    getDailyReminderValue
} from '../utils/helpers';
import FitSlider from './FitSlider';
import FitStepper from './FitStepper';
import DateHeader from './DateHeader';
import SubmitBtn from './SubmitBtn';
import TextButton from './TextButton';
import { Ionicons } from '@expo/vector-icons';
import { submitEntry, removeEntry } from '../utils/api';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { white, purple } from '../utils/colors';
import { CommonActions } from '@react-navigation/native';

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric);                  // get the meta infor for metric and dstructure

        this.setState((state) => {
            const count = state[metric] + step;

            return {
                ...state,
                [metric]: count > max ? max : count
            }

        })

    }

    decrement = (metric) => {
        const { step } = getMetricMetaInfo(metric);                  // get the meta infor for metric and dstructure

        this.setState((state) => {
            const count = state[metric] - step;

            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }

        })
    }


    slider = (metric, value) => {
        this.setState({
            [metric]: value,
        })
    }

    submit = () => {
        const key = timeToString();
        const entry = this.state;


        // update redux by saving new entry to the redux store using dispatch() of redux store and addEntry() action creator
        this.props.dispatch(addEntry({
            [key]: entry
        }));

        // clear the local state so that new entry can be added next time. its like clearing the input of a form for next input
        this.setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        })

        // navigate to home
        this.redirectToHome();
        // save to DB/ backend api
        submitEntry({ key, entry });          // passed entry/data and key to storage entry at that key in DB/AsyncStorage

        // clear local notification
    }


    // it is used to reset the data/entries for the selected day
    // it sets the data for that day from entries for all activities as stated in state to a message.
    // that message is reterieved from the helper.js file
    reset = () => {
        const key = timeToString();

        // update redux by resetting the data/entry for the day but set the data to a message
        // getDailyReminderValue() return a object with todat property which stores a message
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))

        // route to home / previous screen
        this.redirectToHome();

        // update 'DB'/ backend api
        removeEntry(key);
    }


    // Function used to redirect user to home screen from once new entry is added using Add Entry form
    redirectToHome = () => {
        // one way to send user to home/previous screen
        // this.props.navigation.goBack();

        // Other way to send user to home/previous screen using CommonActions
        // it also uses goBack(), takes key value as the route/screen of current route/screen(from where you want to move away)
        this.props.navigation.dispatch(CommonActions.goBack({
            key: 'AddEntry'
        }));
    }

    render() {
        const metaInfo = getMetricMetaInfo();
        if (this.props.alreadyLogged) {     // if user has already logged/added data for a day then show view in the if block otherwise show normal view
            return (
                <View style={styles.center}>
                    <Ionicons name={Platform.os === 'ios' ? 'ios-happy-outline' : 'md-happy'}
                        size={100} />
                    <Text>You  have alreday logged your information for today.</Text>
                    <TextButton onPress={this.reset} style={{ margin: 10 }}>
                        Reset
                    </TextButton>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()} />
                {Object.keys(metaInfo).map(key => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            {type === 'slider'
                                ? <FitSlider value={value}
                                    onChange={(value) => this.slider(key, value)}
                                    {...rest}
                                />
                                : <FitStepper value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />}
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    }
})



function matStateToProps(state) {
    const key = timeToString();                 // gets the current day's date in s string format.

    return {
        // typeof state[key].today === 'undefined' is used because state will only have today property if there is no data added/logged for the day.
        // because today property is used to store a message which tells user to add data/emtry for the day.
        // If the value for 'key'/specific day has no today property then that means data for that day has aleardy been logged/added for that day.
        // if data already added then there will be no 'today property in the state for that dey(key) and it will be undefined.
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(matStateToProps)(AddEntry);