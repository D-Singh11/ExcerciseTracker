import React, { Component } from 'react';
import { View, Text, Platform, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';

class EntryDetail extends Component {

    setTitleasDate = () => {
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
    render() {
        this.setTitleasDate();
        return (
            <View style={styles.container}>
                <Text> Entry Detail</Text>
                <MetricCard date={this.props.entryId} metrics={this.props.metrics} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:white,
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

export default connect(mapStateToProps)(EntryDetail);
