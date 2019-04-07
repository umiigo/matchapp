import firebase from 'firebase'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import FacebookButton from '../components/facebookButton'

export default class Login extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('Home', { uid: user.uid })
            }
        })
    }

    authenticate = (token) => {
        const provider = firebase.auth.FacebookAuthProvider
        const credential = provider.credential(token)
        return firebase.auth().signInAndRetrieveDataWithCredential(credential);
    }

    createUser = (uid, userData) => {
        firebase.database().ref('users').child(uid).update(userData)
    }

    login = async () => {
        const ADD_ID = '302423760451780'
        const options = {
            permissions: ['public_profile', 'user_birthday', 'user_gender', 'email'],
        }
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(ADD_ID, options)
        if (type === 'success') {
            const fields = ['id', 'first_name', 'last_name', 'gender', 'birthday', 'work']
            const response = await fetch(`https://graph.facebook.com/me?fields=${fields.toString()}&access_token=${token}`)
            const userData = await response.json()
            const { user } = await this.authenticate(token)
            this.createUser(user.uid, userData)
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <FacebookButton
                    onPress={this.login}
                />
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