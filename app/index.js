import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Chat from "./screens/Chat";
import firebase from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBVy07RSKbExzNGwEjQ6WTEU6qvzOMVGs0",
  databaseURL: "https://matchapp-c399f.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);

const RouteConfigs = createStackNavigator(
  {
    Login: { screen: Login },
    Home: { screen: Home },
    Chat: { screen: Chat }
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(RouteConfigs);
