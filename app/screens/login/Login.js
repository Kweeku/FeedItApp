/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {Image, View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, Button, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { color} from "../../theme";
// import Routes from '../../components/routes/routes'
import DrawerNavigation from '../../navigators/drawer-navigation/drawer-navigation-navigator'
import HomeScreen from "../../screens/home/home-screen"
import BottomTabNavigator from '../../navigators/tabnavigator/tabnavigator-navigator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from 'react-native-paper';
import { Component } from 'react';
const axios = require('axios');


const Login = props => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        check: false,
    });

    const { colors } = useTheme();

    const textInputChange = (val) => {
        setData({ ...data, username: val, check_textInputChange: true, isValidUser: true });
    }

    const handlePasswordChange = (val) => {
        setData({ ...data, password: val, isValidPassword: true });
    }

    const updateSecureTextEntry = () => {
        setData({ ...data, secureTextEntry: !data.secureTextEntry });
    }

    // const saveLoginKey = async (isLoggedInValue) => {
    //     try {
    //         await AsyncStorage.setItem('@isLoggedIn', isLoggedInValue);
    //         console.tron.log(isLoggedInValue);
    //     } catch (error) {
    //          console.tron.log("Error saving data" + error);
    //     }
    // }

    const clearLoginKey = async () => {
        try {
            AsyncStorage.clear()
            console.log('Storage successfully cleared!')
        } 
        catch (error) {
            console.log('Failed to clear the async storage.')
        }
    }

    const saveUserName = async (userName) => {
        try {
            await AsyncStorage.setItem('username', userName);
            console.log(userName);
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }

    const loginHandle = (userName, password) => {

        if (data.username.length === 0 || data.password.length === 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
        }

        axios({
            method: 'post',
            url: 'https://api.waziup.io/api/v2/auth/token',
            data: {
                username: userName,
                password: password
            }
        })
            .then(function (response) {
                console.log(response)

                axios.defaults.baseURL = 'https://api.waziup.io/api/v2';
                axios.defaults.headers.common['Authorization'] = 'Bearer' + response.data;
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

                // upon successful fetch of auth token redirect to home screen below
                // saveLoginKey('true');
                // saveUserName(userName);
                setData({ ...data, check: true })
            })
            .catch(function (error) {
                Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                    { text: 'Okay' }
                ]);
                console.log(error);
                clearLoginKey();
            });
    }

    useEffect(() => {
        if (data.check) {
            props.onPressLogin();

        }
        return function cleanup() {
            setData({ ...data, check: false })
        }
    }, [data.check])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome To GreenGrow!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Username is not Valid.</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Wrong Password</Text>
                    </Animatable.View>
                }

                <View style={styles.button}>
                    <Button color='#123d13' title='Sign In' onPress={() => loginHandle(data.username, data.password)} />
                </View>
            </Animatable.View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#009387',
        flex: 1,
    },
    footer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 3,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 50,
        paddingHorizontal: 20,
    },
    action: {
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    text_header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    textInput: {
        color: '#05375a',
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -3,
        paddingLeft: 10,
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 50,
        width: '80%',
    },
});