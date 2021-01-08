import React from "react";
import { AsyncStorage, Alert } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import {
    Login,
    Home,
    Register,
    AuthLoading,
    FormPost,
    UpdateFormPost,
} from "./container";
import { Link } from "./components";

const onBoardingNavigator = createSwitchNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: () => ({
                title: "Login",
            }),
        },
        Register: {
            screen: Register,
            navigationOptions: () => ({
                title: "Register",
            }),
        },
    },
    {
        initialRouteName: "Login",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#6c63ff",
            },
            headerTintColor: "white",
            headerLeft: null,
        },
        headerLayoutPreset: "center",
    }
);

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
                title: "INICIO",
                headerRight: (
                    <Link
                        onPress={async () => {
                            try {
                                await AsyncStorage.removeItem("token");
                                navigation.navigate("AuthLoading");
                            } catch (e) {
                                Alert.alert("Que raro esto no debería pasar");
                            }
                        }}
                        label="cerrar sesion"
                        colorFont="#fff"
                    />
                ),
            }),
        },
        UpdateScreen: {
            screen: UpdateFormPost,
            navigationOptions: ({ navigation }) => ({
                title: "ACTUALIZAR",
                headerLeft: (
                    <Link
                        onPress={() => {
                            navigation.navigate("AuthLoading");
                        }}
                        label="volver"
                        colorFont="#fff"
                    />
                ),
            }),
        },
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#6c63ff",
            },
            headerTintColor: "white",
            headerLeft: null,
        },
        headerLayoutPreset: "center",
    }
);

const RootStack = createSwitchNavigator(
    {
        Main: AppNavigator,
        FormPost,
    },
    {
        mode: "modal",
        headerMode: "none",
    }
);

const BaseStack = createSwitchNavigator(
    {
        AuthLoading,
        OnBoarding: onBoardingNavigator,
        RootStack,
    },
    {
        initialRouteName: "AuthLoading",
    }
);

export default createAppContainer(BaseStack);
