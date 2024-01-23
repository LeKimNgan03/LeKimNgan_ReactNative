import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
    // Register
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");

    const HandleRegisterCheck = async () => {
        const newUser = {
            email: email,
            password: password,
        };
        const existingAccount = await AsyncStorage.getItem("user");
        if (existingAccount) {
            const parsedAccount = JSON.parse(existingAccount);
            var flag = parsedAccount.find((account) =>
                account.email == email
            );
            if (flag) {
                alert("Tài khoản đã tồn tại");
                return;
            }
            parsedAccount.push(newUser);
            AsyncStorage.setItem("user", JSON.stringify(parsedAccount)).then(() => {
                AsyncStorage.getItem("user").then((res) => {
                    alert("Đăng kí thành công");
                    navigation.navigate("Login");
                });
            });
        } else {
            AsyncStorage.setItem("user", JSON.stringify([newUser])).then(() => {
                AsyncStorage.getItem("user").then((res) => {
                    alert("Đăng kí thành công");
                    navigation.navigate("Login");
                });
            });
        }
    };
    
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#fff",
            }}
        >
            <View
                style={{
                    padding: 10 * 2,
                }}
            >
                <View
                    style={{
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 30,
                            color: "#1F41BB",
                            fontWeight: "bold",
                            marginVertical: 10 * 3,
                            marginTop: 64,
                        }}
                    >
                        Register
                    </Text>
                </View>
                <View
                    style={{
                        marginVertical: 10 * 3,
                    }}
                >
                    <TextInput
                        placeholder="Email"
                        onChangeText={e => setEmail(e)}
                        placeholderTextColor={"#626262"}
                        style={{
                            fontSize: 14,
                            padding: 10 * 2,
                            backgroundColor: "#f1f4ff",
                            borderRadius: 10,
                            marginVertical: 10,
                        }}
                    />
                    <TextInput
                        placeholder="Password"
                        onChangeText={e => setPassword(e)}
                        placeholderTextColor={"#626262"}
                        secureTextEntry
                        style={{
                            fontSize: 14,
                            padding: 10 * 2,
                            backgroundColor: "#f1f4ff",
                            borderRadius: 10,
                            marginVertical: 10,
                        }}
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        onChangeText={(e) => setRePassword(e)}
                        placeholderTextColor={"#626262"}
                        secureTextEntry
                        style={{
                            fontSize: 14,
                            padding: 10 * 2,
                            backgroundColor: "#f1f4ff",
                            borderRadius: 10,
                            marginVertical: 10,
                        }}
                    />
                </View>

                <TouchableOpacity
                    // onPress={() => navigation.navigate('Home')}
                    onPress={() => HandleRegisterCheck()}
                    style={{
                        padding: 10 * 2,
                        backgroundColor: "#1F41BB",
                        marginVertical: 10 * 3,
                        borderRadius: 10,
                        shadowColor: "#1F41BB",
                        shadowOffset: {
                            width: 0,
                            height: 10,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            textAlign: "center",
                            fontSize: 20,
                        }}
                    >
                        Sign up
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={{
                        padding: 10,
                    }}
                >
                    <Text
                        style={{
                            color: "#000",
                            textAlign: "center",
                            fontSize: 14,
                        }}
                    >
                        Already have an account?
                        <Text
                            style={{
                                color: "#1F41BB",
                                textAlign: "center",
                                fontSize: 14,
                                fontWeight: "bold",
                            }}
                        >
                            Sign in
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({});