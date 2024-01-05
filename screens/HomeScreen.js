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
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
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

    // Get Category
    const [catergoryIndex, setCategoryIndex] = React.useState(0);

    const categories = ['POPULAR', 'NEW', 'SALE', 'OTHERS'];

    const CategoryList = () => {
        return (
            <View style={style.categoryContainer}>
                {categories.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => setCategoryIndex(index)}>
                        <Text
                            style={[
                                style.categoryText,
                                catergoryIndex === index && style.categoryTextSelected,
                            ]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

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

    const navigateToProductDetail = (item) => {
        navigation.navigate('Details', { item });
    };

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

    return (
        <SafeAreaView
            style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}>
            <View style={style.header}>
                <View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Welcome to</Text>
                    <Text style={{ fontSize: 38, color: COLORS.main, fontWeight: 'bold' }}>
                        Shopping Store
                    </Text>
                </View>
                <Icon name="shopping-cart" size={28} onPress={() => navigation.navigate('MyCart')} />
            </View>
            <View style={{ marginTop: 30, flexDirection: 'row' }}>
                <View style={style.searchContainer}>
                    <Icon name="search" size={25} style={{ marginLeft: 20 }} />
                    <TextInput placeholder="Search" style={style.input} />
                </View>
                <View style={style.sortBtn}>
                    <Icon name="sort" size={30} color={COLORS.white} />
                </View>
            </View>
            <CategoryList />
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
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
    categoryTextSelected: {
        color: COLORS.main,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: COLORS.main,
    },
    card: {
        height: 225,
        backgroundColor: COLORS.light,
        width,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
    },
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
});

export default HomeScreen;