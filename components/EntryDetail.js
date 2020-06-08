import React, { Component } from 'react';
import { View, Text, Platform, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';
import { addEntry } from '../actions';
import { removeEntry } from '../utils/api';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import TextButton from './TextButton';

class EntryDetail extends Component {


    // lifecycle hook used to only update component if metrics are not null and metrics have no 'today' property
    shouldComponentUpdate(nextProps) {
        return nextProps.metrics !== null && !nextProps.metrics.today
    }

    setTitleAsDate = () => {
        const { entryId } = this.props.route.params;               // get entry id from thr route props

        // format date/entryId
        const year = entryId.slice(0, 4);
        const month = entryId.slice(5, 7);
        const day = entryId.slice(8);

        // any property returned in the following overrides the Stack navigations 'options' props property which were passed when stack navigator was declared
        this.props.navigation.setOptions({
            title: `${month}/${day}/${year}`
        });
    }



    // function used to reset the entry for selected day
    reset = () => {
        this.props.remove();            // remove entry from redux store, getting remove from props using mapDispatchToProps function
        this.props.goBack();            // navigate user to the previous screen
        removeEntry(this.props.entryId);        // now remove the entry/data linked to entryId/day from the asyncstorage. like removing from api/backend
    }

    render() {
        this.setTitleAsDate();
        console.log(this.props);
        return (
            <View style={styles.container}>
                <Text> Entry Detail</Text>
                <MetricCard date={this.props.entryId} metrics={this.props.metrics} />
                <TextButton onPress={this.reset} style={{ margin: 20 }}>
                    Reset
                </TextButton>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    }
})

function mapStateToProps(state, props) {
    const entryId = props.route.params.entryId;

    return {
        entryId,
        metrics: state[entryId]
    }
}


// this function is used to perform action in the container component instead of 
// dispatching actions in this component itself (this.props.dispatch). 
// Following function allow us to move the dispatch calls away from UI component and make them
// within the Container/Connected component of connect() functions intternal HOC.
// It returns an object which has two functions remove() which removes the entry from redux store
// goback() which navigate to the previous view of application.
// So instead of having all that logic in the component, we put it in mapDispatchToProps 
// then the UI component can simply call props.remove() or props.goBack
function mapDispatchToProps(dispatch, props) {
    const entryId = props.route.params.entryId;

    return {
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId
                ? getDailyReminderValue()
                : null
        })),

        goBack: () => props.navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
