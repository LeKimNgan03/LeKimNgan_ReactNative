import React, { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
} from 'react-native';
import axios from 'axios';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
const width = Dimensions.get('window').width / 2 - 30;

const HomeScreen = ({ navigation }) => {
    // Call API
    const [products, setProducts] = useState([]);

    useEffect(() => {
        callAPI();
    }, []);

    const callAPI = () => {
        axios
            .get('https://fakestoreapi.com/products')
            .then(function (response) {
                setProducts(response.data);
            })
            .catch(function (error) {
                alert(error.message);
            })
            .finally(function () {
                console.log('Finally called');
            });
    };

    // Set Title
    const truncateTitle = (title) => {
        const maxLines = 2;
        const maxCharsPerLine = 12;
        const lines = title.split('\n');
        if (lines.length > maxLines) {
            return lines.slice(0, maxLines).join('\n') + '...';
        }

        const chars = title.split('');
        let currentLine = 0;
        let currentChars = 0;
        const truncatedChars = chars.reduce((acc, char) => {
            if (char === '\n' || currentChars >= maxCharsPerLine) {
                currentLine += 1;
                currentChars = 0;
            }

            if (currentLine < maxLines) {
                currentChars += 1;
                return acc + char;
            }

            return acc;
        }, '');

        return truncatedChars;
    };

    // Navigate
    const navigateToProductDetail = (item) => {
        navigation.navigate('Details', { item });
    };

    // Card Item
    const Card = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigateToProductDetail(item)}>
            <View style={style.card}>
                <Image
                    source={{ uri: item.image }}
                    style={{
                        flex: 1,
                        resizeMode: 'contain',
                        backgroundColor: '#fff',
                        borderRadius: 10,
                    }} />
                <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
                    {truncateTitle(item.title)}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
                    }}>
                    <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
                        ${item.price}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const keyExtractor = (item, index) => index.toString();

    // Search
    const [input, setInput] = useState("");

    return (
        <SafeAreaView
            style={{
                flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white
            }}>
            <ScrollView>
                <View style={{ marginTop: 30, flexDirection: 'row' }}>
                    <Icon name="arrow-back-ios" size={25} onPress={navigation.goBack} style={style.goBack} />
                    <View style={style.searchContainer}>
                        {/* <Icon name="search" size={25} style={{ marginLeft: 20 }} /> */}
                        <TextInput
                            value={input}
                            onChangeText={(text) => setInput(text)}
                            placeholder="Search"
                            style={style.input} />
                    </View>
                    <View style={style.sortBtn}>
                        <Icon name="search" size={25} color={COLORS.white} />
                    </View>
                </View>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: 10,
                        paddingBottom: 50,
                    }}
                    key={2}
                    data={products}
                    renderItem={Card}
                    keyExtractor={keyExtractor}
                    numColumns={2}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    card: {
        height: 225,
        backgroundColor: COLORS.light,
        width,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
    },
    searchContainer: {
        height: 50,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        color: COLORS.dark,
    },
    sortBtn: {
        marginLeft: 10,
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: COLORS.main,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goBack: {
        marginLeft: 10,
        marginTop: 10,
    },
});

export default HomeScreen;