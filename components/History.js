import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalenderResults } from '../utils/api';
import UdaciFitnessCalendar from 'udacifitness-calendar';
import { white } from '../utils/colors';
import DateHeader from './DateHeader';
import MetricCard from './MetricCard';
import { AppLoading } from 'expo';

class History extends Component {
    state = {
        hideLoading: false
    }
    componentDidMount() {

        fetchCalenderResults().then(entries => {                // get entries from api
            this.props.dispatch(receiveEntries(entries));           // store them in redux store
        }).then(entries => {
            // used to hide <AppLoading> Component by setting the hideLoading property of state to true once all above then() are resolved
            this.setState({
                hideLoading: true
            });

            if (!entries[timeToString()]) {                         // if no entry/data for today then we
                const key = timeToString();                          // create a key with today's date and reminder message as value to store in the entries for today's entry
                this.props.dispatch(addEntry({
                    [key]: getDailyReminderValue()                      // dispatch action to store message in store
                }))
            }
        })
    }


    // function used to render the metrics data for a day if it exists.
    // Otherwise if there is a today property on the object that means there is 
    // no data avilable for a todat.
    // Therefore message stored in side today property is displayed.
    renderItem = ({ today, ...metrics }, formattedDate, key) => {
        return (
            <View style={styles.item}>
                {today
                    ? <View>
                        <DateHeader date={formattedDate} />
                        <Text style={styles.noDataText}>
                            {today}
                        </Text>
                    </View>
                    : <TouchableOpacity onPress={() => console.log('Pressed')}>
                        <MetricCard date={formattedDate} metrics={metrics} />
                    </TouchableOpacity>
                }
            </View>
        )
    }

    // if there is no data for the day(but not today) then show following view
    renderEmptyDate = (formattedDate) => {
        return (
            <View style={styles.item}>
                <Text style={styles.noDataText}>
                    You didn't log any data/add on this day.
                    </Text>
            </View>
        )
    }

    render() {
        // show loading component until loading is not complete
        const { hideLoading } = this.state;
        if (hideLoading === false) {
            return <AppLoading />
        }

        //Otherwise show the normal view
        return (
            <UdaciFitnessCalendar
                items={this.props.entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
            />
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.os === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
})

function mapStateToProps(entries) {
    return {
        entries
    }
}

export default connect(mapStateToProps)(History);