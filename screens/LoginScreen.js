import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const LoginScreen = ({ navigation }) => {
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
                    backgroundColor: "#fff",
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
                        Login
                    </Text>
                </View>
                <View
                    style={{
                        marginVertical: 10 * 3,
                    }}
                >
                    <TextInput
                        placeholder="Email"
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

                <View>
                    <Text
                        style={{
                            fontSize: 14,
                            color: "#1F41BB",
                            alignSelf: "flex-end",
                        }}
                    >
                        Forgot your password ?
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
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
                        Sign in
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
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
                        Don't have an account?
                        <Text
                            style={{
                                color: "#1F41BB",
                                textAlign: "center",
                                fontSize: 14,
                                fontWeight: "bold",
                            }}
                        >
                            Sign up
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({});