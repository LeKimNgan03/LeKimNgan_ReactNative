import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Image,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import { AntDesign } from '@expo/vector-icons';

const DetailsScreen = ({ route, navigation }) => {
    // Create an Increment and Decrement Button
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const cartData = await AsyncStorage.getItem('cart');
                if (cartData) {
                    const parsedCart = JSON.parse(cartData);

                    // Kiểm tra và đặt số lượng thành 1 nếu nó là 0 hoặc không tồn tại
                    const updatedCart = parsedCart.map(item => ({
                        ...item,
                        quantity: item.quantity || 1,
                    }));

                    setCartItems(updatedCart);
                }
            } catch (error) {
                console.error('Lỗi khi đọc dữ liệu giỏ hàng:', error);
            }
        };

        loadCartItems();
    }, []);

    const handleDecreaseQuantity = (itemId) => {
        // Giảm số lượng của sản phẩm trong giỏ hàng
        const updatedCart = cartItems.map(item => {
            if (item.id === itemId) {
                // Đảm bảo số lượng không nhỏ hơn 1
                const newQuantity = Math.max(1, item.quantity - 1);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        setCartItems(updatedCart);

        // Lưu giỏ hàng mới vào AsyncStorage
        AsyncStorage.setItem('cart', JSON.stringify(updatedCart))
            .then(() => {
                console.log('Số lượng sản phẩm đã được giảm');
            })
            .catch((error) => {
                console.error('Lỗi khi lưu giỏ hàng mới:', error);
            });
    };

    const handleIncreaseQuantity = (itemId) => {
        // Tăng số lượng của sản phẩm trong giỏ hàng
        const updatedCart = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCart);

        // Lưu giỏ hàng mới vào AsyncStorage
        AsyncStorage.setItem('cart', JSON.stringify(updatedCart))
            .then(() => {
                console.log('Số lượng sản phẩm đã được tăng');
            })
            .catch((error) => {
                console.error('Lỗi khi lưu giỏ hàng mới:', error);
            });
    };

    // Add To Cart
    const { item } = route.params;
    const addToCart = async (product) => {
        try {
            // Đọc giỏ hàng hiện tại từ AsyncStorage
            const existingCart = await AsyncStorage.getItem('cart');
            const cart = existingCart ? JSON.parse(existingCart) : [];

            // Thêm sản phẩm vào giỏ hàng
            const existingProductIndex = cart.findIndex(
                (item) => item.id === product.id
            );

            if (existingProductIndex >= 0) {
                cart[existingProductIndex].quantity += 1;
            } else {
                product.quantity = 1;
                cart.push(product);
            }

            // Lưu giỏ hàng mới vào AsyncStorage
            await AsyncStorage.setItem("cart", JSON.stringify(cart));
            console.log("Thành công", "Thêm vào giỏ hàng thành công!");
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={style.header}>
                <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
                <Icon name="shopping-cart" size={28} onPress={() => navigation.navigate('MyCart')} />
            </View>

            <View style={style.imageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={{ resizeMode: 'contain', flex: 1 }}
                />
            </View>
            <View style={style.detailsContainer}>
                <View
                    style={{
                        marginLeft: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        width: 250
                    }}>
                        {item.title}
                    </Text>
                    <View style={style.priceTag}>
                        <Text
                            style={{
                                marginLeft: 15,
                                color: COLORS.white,
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}>
                            ${item.price}
                        </Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>About</Text>
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 16,
                            lineHeight: 22,
                            marginTop: 10,
                        }}>
                        {item.description}
                    </Text>
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <View style={style.borderBtn} onPress={() => handleDecreaseQuantity(item.id)}>
                                <AntDesign name="minus" size={18} color="black" />
                            </View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    marginHorizontal: 10,
                                    fontWeight: 'bold',
                                }}>
                                1
                            </Text>
                            <View style={style.borderBtn} onPress={() => handleIncreaseQuantity(item.id)}>
                                <AntDesign name="plus" size={18} color="black" />
                            </View>
                        </View>

                        <View style={style.buyBtn}>
                            <Text
                                onPress={() => addToCart(item)}
                                style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
                                Add To Cart
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 0.55,
        marginTop: 20,
        justifyContent: 'center',
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: COLORS.light,
        marginHorizontal: 7,
        marginBottom: 7,
        borderRadius: 20,
        marginTop: 30,
        paddingTop: 30,
    },
    line: {
        width: 25,
        height: 2,
        backgroundColor: COLORS.dark,
        marginBottom: 5,
        marginRight: 3,
    },
    borderBtn: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 40,
    },
    borderBtnText: {
        fontWeight: 'bold',
        fontSize: 28
    },
    buyBtn: {
        width: 130,
        height: 50,
        backgroundColor: COLORS.main,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    priceTag: {
        backgroundColor: COLORS.main,
        width: 80,
        height: 40,
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
});

export default DetailsScreen;