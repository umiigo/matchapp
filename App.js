import React, { Component } from 'react'
import { View } from 'react-native'
import Card from './Card'

import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBVy07RSKbExzNGwEjQ6WTEU6qvzOMVGs0",
  databaseURL: "https://matchapp-c399f.firebaseio.com"
}

firebase.initializeApp(firebaseConfig)
export default class App extends Component {

  state = {
    profileIndex: 0,
    profiles: []
  }

  componentWillMount() {
    firebase.database().ref().child('users').once('value', (snap) => {
      let profiles = []
      snap.forEach((profile) => {
        const { name, bio, birthday, id } = profile.val()
        profiles.push({ name, bio, birthday, id })
      })
      this.setState({ profiles })
    })
  }
  nextCard = () => {
    this.setState({ profileIndex: this.state.profileIndex + 1 })
  }

  render() {
    const { profileIndex } = this.state
    return (
      <View style={{ flex: 1 }}>
        {this.state.profiles.slice(profileIndex, profileIndex + 3).reverse().map((profile) => {
          return (
            <Card
              key={profile.id}
              profile={profile}
              onSwipeOff={this.nextCard}
            />
          )
        })}
      </View>
    )
  }
}

