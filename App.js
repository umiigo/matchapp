import React,  {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button}>
          <Text>Match App Here</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'midnightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 8,
    backgroundColor: 'deepskyblue',
    width: 150,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
