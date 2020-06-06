import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalenderResults } from '../utils/api';

class History extends Component {
    componentDidMount() {

        fetchCalenderResults().then(entries => {                // get entries from api
            this.props.dispatch(receiveEntries(entries));           // store them in redux store
        }).then(entries => {
            if (!entries[timeToString()]) {                         // if no entry/data for today then we
                const key = timeToString();                          // create a key with today's date and reminder message as value to store in the entries for today's entry
                this.props.dispatch(addEntry({
                    [key]: getDailyReminderValue()                      // dispatch action to store message in store
                }))
            }
        })

        console.log(this.props);
    }

    render() {
        return (
            <View>
                <Text>
                    History
                </Text>
                <Text>{JSON.stringify(this.props)}</Text>
            </View>
        )
    }
}


function mapStateToProps(entries){
    return {
        entries
    }
}

export default connect(mapStateToProps)(History);
