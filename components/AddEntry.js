import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';

export default class AddEntry extends Component {
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
    

    render() {
        return (
            <View>
                {getMetricMetaInfo('bike').getIcon()}
            </View>
        )
    }
}