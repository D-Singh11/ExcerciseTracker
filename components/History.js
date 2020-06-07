import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalenderResults } from '../utils/api';
import UdaciFitnessCalendar from 'udacifitness-calendar';

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


    // function used to render the metrics data for a day if it exists.
    // Otherwise if there is a today property on the object that means there is 
    // no data avilable for a todat.
    // Therefore message stored in side today property is displayed.
    renderItem = ({ today, ...metrics }, formattedDate, key) => {
        return (
            <View>
                {today
                    ? <Text>{JSON.stringify(toady)}</Text>
                    : <Text>{JSON.stringify(metrics)}</Text>
                }
            </View>
        )
    }

    renderEmptyDate = (formattedDate) => {
        return (
            <Text>No data for this day.</Text>
        )
    }

    render() {
        return (
            <View style={{flex:1}}>

                <UdaciFitnessCalendar
                    items={this.props.entries}
                    renderItem={this.renderItem}
                    renderEmptyDate={this.renderEmptyDate}
                />
            </View>
        )
    }
}


function mapStateToProps(entries) {
    return {
        entries
    }
}

export default connect(mapStateToProps)(History);
