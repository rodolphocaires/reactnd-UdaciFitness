import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import UdaciStepper from './UdaciStepper';
import UdaciSlider from './UdaciSlider';
import DateHeader from './DateHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import TextButton from './TextButton';

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>SUBMIT</Text>
        </TouchableOpacity>
    )
}

export default class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    };

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric);

        this.setState((state) => {
            const count = state[metric] + step;

            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        const { step } = getMetricMetaInfo(metric);

        this.setState((state) => {
            const count = state[metric] - step;

            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }

    submit = () => {
        const key = timeToString();
        const entry = this.state;

        // Update Redux

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        }));

        // Navigate to Home

        // Save to 'DB'

        // Clear local notification
    }

    reset = () => {
        const key = timeToString();

        // Update Redux

        // Navigate to Home

        // Update 'DB'
    }

    render() {
        const metaInfo = getMetricMetaInfo()

        if (this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons name="ios-happy" size={100} />
                    <Text>You already logged your information for today</Text>
                    {/* Reset */}
                    <TextButton onPress={this.reset}>Reset</TextButton>
                </View>
            )
        }

        return (
            <View>
                <DateHeader
                    date={new Date().toLocaleDateString()}
                />
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                                ? <UdaciSlider
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                />
                                :
                                <UdaciStepper
                                    value={value}
                                    onIncrement={(value) => this.increment(key)}
                                    onDecrement={(value) => this.decrement(key)}
                                />
                            }
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit}></SubmitBtn>
            </View>
        )
    }
}