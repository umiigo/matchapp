import React, { Component } from 'react'
import * as firebase from 'firebase'
import Home from './screens/Home'
import Login from './screens/Login'


const firebaseConfig = {
    apiKey: "AIzaSyBVy07RSKbExzNGwEjQ6WTEU6qvzOMVGs0",
    databaseURL: "https://matchapp-c399f.firebaseio.com"
}

firebase.initializeApp(firebaseConfig)

export default class App extends Component {
    render() {
        return (
            <Login />
        )
    }
}

