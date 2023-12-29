import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../consts/colors';
import perfumes from '../consts/perfumes';

const CartScreen = ({ navigation }) => {
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

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleDeleteItem = (itemId) => {
        // Xóa sản phẩm khỏi giỏ hàng
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);

        // Lưu giỏ hàng mới vào AsyncStorage
        AsyncStorage.setItem('cart', JSON.stringify(updatedCart))
            .then(() => {
                console.log('Sản phẩm đã được xóa khỏi giỏ hàng');
            })
            .catch((error) => {
                console.error('Lỗi khi lưu giỏ hàng mới:', error);
            });
    };
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
    const handleReduceQuantity = (itemId) => {
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

    const CartCard = ({ perfume }) => {
        return (
            <View style={style.cartCard}>
                <Icon name="delete" size={25} />
                <Image
                    onPress={() => navigation.navigate('Details', perfume)}
                    source={perfume.img}
                    style={{ height: 80, width: 80 }} />
                <View
                    onPress={() => navigation.navigate('Details', perfume)}
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{perfume.name}</Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${perfume.price}</Text>
                </View>
                <View style={{ marginRight: 20, alignItems: 'center' }}>
                    <View style={style.actionBtn}>
                        <Icon name="remove" size={25} color={COLORS.main} />
                        <Text style={{ fontWeight: 'bold', fontSize: 18, paddingLeft: 8, paddingRight: 8 }}>3</Text>
                        <Icon name="add" size={25} color={COLORS.main} />
                    </View>
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cart</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                // data={perfumes}
                data={cartItems}
                renderItem={({ item }) => <CartCard perfume={item} />}
                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                ListFooterComponent={() => (
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: 15,
                            }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                Total Price
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>$50</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

export default CartScreen;