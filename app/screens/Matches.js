import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight
} from "react-native";
import firebase from "@firebase/app";
import _ from "lodash";
import CircleImage from "../components/CircleImage";

export default class Matches extends Component {
  state = {
    dataSource: null,
    matches: []
  };

  componentWillMount() {
    this.getMatches(this.props.user.uid);
    console.log(this.state.matches);
  }
  _keyExtractor = (item, index) => item.id;

  getOverlap = (liked, likedBack) => {
    const likedTrue = _.pickBy(liked, value => value);
    const likedBackTrue = _.pickBy(likedBack, value => value);
    return _.intersection(_.keys(likedTrue), _.keys(likedBackTrue));
  };

  getUser = uid => {
    return firebase
      .database()
      .ref("users")
      .child(uid)
      .once("value")
      .then(snap => snap.val());
  };

  getMatches = uid => {
    firebase
      .database()
      .ref("relationships")
      .child(uid)
      .on("value", snap => {
        const relations = snap.val() || [];
        const allMatches = this.getOverlap(
          relations.liked,
          relations.likedBack
        );
        console.log("allMatches", allMatches);
        const promises = allMatches.map(profileUid => {
          const foundProfile = _.find(
            this.state.matches,
            profile => profile.uid === profileUid
          );
          return foundProfile ? foundProfile : this.getUser(profileUid);
        });

        Promise.all(promises).then(data => {
          this.setState({
            matches: data
          }),
            console.log(data);
        });
      });
  };

  renderItem({ item, index }) {
    const { id, first_name, work } = item;
    const bio =
      work && work[0] && work[0].position ? work[0].position.name : null;
    return (
      <TouchableHighlight onPress={() => console.log("pressed")}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10
          }}
        >
          <CircleImage size={80} facebookID={id} />
          <View style={{ justifyContent: "center", marginLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>{first_name}</Text>
            <Text style={{ fontSize: 15, color: "darkgrey" }}>{bio}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  separators(sectionId, rowId) {
    return (
      <View
        key={rowID}
        style={{ height: 1, backgroundColor: "whitesmoke", marginLeft: 100 }}
      />
    );
  }

  render() {
    return (
      <FlatList
        style={{ flex: 1, backgroundColor: "white" }}
        data={this.state.matches}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={this._keyExtractor}
        separators={this.separators}
      />
    );
  }
}
