import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getMetricMetaInfo } from '../utils/helpers';
import { gray } from '../utils/colors';
import DateHeader from './DateHeader';

function MetricCard({ date, metrics }) {
    return (
        <View>
            {date && <DateHeader date={date} />}
            {Object.keys(metrics).map(metricKey => {
                const { getIcon, displayName, unit } = getMetricMetaInfo(metricKey);

                return (
                    <View style={styles.metric} key={metricKey}>
                        {getIcon()}
                        <View>
                            <Text style={{ fontSize: 20 }}>
                                {displayName}
                            </Text>
                            <Text style={{ fontSize: 16, color: gray }}>
                                {metrics[metricKey]} {unit}
                            </Text>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    metric: {
        flexDirection: 'row',
        marginTop: 20
    }
})

export default MetricCard;
