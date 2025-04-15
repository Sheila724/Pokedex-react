import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./pages/main";
import Login from "./pages/login";
import RegisterSucess from "./pages/registerSucess";
import RegisterUser from "./pages/register";
import Search from "./pages/search";
import MyList from "./pages/myList";
import Details from "./pages/Details";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="RegisterUser"
        component={RegisterUser}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="RegisterSucess"
        component={RegisterSucess}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="MyList"
        component={MyList}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerShown: false
        }}
      />

    </Stack.Navigator>
  );
}
