import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers';
import FitSlider from './FitSlider';
import FitStepper from './FitStepper';
import DateHeader from './DateHeader';
import SubmitBtn from './SubmitBtn';
import TextButton from './TextButton';
import { Ionicons } from '@expo/vector-icons';
import { submitEntry, removeEntry } from '../utils/api';
import { connect } from 'react-redux';
import { addEntry } from '../actions';

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

        // save to DB/ backend api
        submitEntry({ key, entry });          // passed entry/data and key to storage entry at that key in DB/AsyncStorage

        // clear local notification
    }


    // it is used to reset the data/entries for the selected day
    // it sets the data for that day from entries for all activities as stated in state to a message.
    // that message is reterieved from the helper.js file
    reset = () => {
        const key = timeToString();

        // update redux
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))

        // route to home

        // update 'DB'/ backend api
        removeEntry(key);
    }

    render() {
        const metaInfo = getMetricMetaInfo();
        if (this.props.alreadyLogged) {     // if user has already logged/added data for a day then show view in the if block otherwise show normal view
            return (
                <View>
                    <Ionicons name='md-happy'
                        size={100} />
                    <Text>You  have alreday logged your information for today.</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                        </TextButton>
                </View>
            )
        }
        return (
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()} />
                {Object.keys(metaInfo).map(key => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key}>
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

export default connect()(AddEntry);