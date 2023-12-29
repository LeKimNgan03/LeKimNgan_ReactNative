import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const RegisterScreen = ({ navigation }) => {
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
                    <TextInput
                        placeholder="Confirm Password"
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