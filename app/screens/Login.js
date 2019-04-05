import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import FacebookButton from '../components/FacebookButton';

export default class extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FacebookButton
                    onPress={() => console.log('facebook button')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})