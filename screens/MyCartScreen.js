import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AntDesign } from '@expo/vector-icons';

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

    const handleSubmit = async () => {
        const existingCart = await AsyncStorage.getItem('cart');
        if (existingCart) {
            await AsyncStorage.setItem('cart', JSON.stringify([]));
            setCartItems([]);
            alert("Thanh toán thành công!");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={styles.titleHeader}>Your Cart</Text>
            </View>

            <View style={styles.body}>
                {cartItems.length > 0 ? (
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <Image source={{ uri: item.image }} style={styles.productImage} />
                                <View style={styles.productDetails}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.price}>Price: ${item.price}</Text>

                                    <View style={styles.actionButtons}>
                                        <View style={styles.action}>
                                            <View style={styles.congtru}>
                                                <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)}>
                                                    <AntDesign name="minus" size={18} color="black" />
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={styles.quantity}>{item.quantity}</Text>
                                            <View style={styles.congtru}>
                                                <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
                                                    <AntDesign name="plus" size={18} color="black" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                                        <Icon name="delete" style={{
                                            fontSize: 20,
                                            marginTop: 10,
                                        }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.emptyCartText}>Your Cart is empty</Text>
                )}
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.totalPrice}>${calculateTotalPrice()}</Text>
                </View>
                <TouchableOpacity style={styles.paymentButton} onPress={() => handleSubmit()}>
                    <Text style={styles.paymentButtonText}>Payment</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    header: {
        paddingVertical: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cartItem: {
        flexDirection: 'row',
        borderColor: 'gray',
        padding: 8,
        marginBottom: 8,
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
    },
    productImage: {
        flex: 1,
        resizeMode: 'contain',
        borderRadius: 10,
        marginRight: 8,
    },
    productDetails: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        color: '#F15B31',
    },
    quantity: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        borderRightWidth: 0.6,
        borderLeftWidth: 0.6,
        borderColor: '#EEEEEE',
        width: 50,
        height: 20,
    },
    congtru: {
        textAlign: 'center',
        padding: 2,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        width: 100,
        height: 25,
    },
    actionButtons: {
        marginTop: 10,
        justifyContent: 'space-around',
        height: 20,
    },
    actionButtonText: {
        color: 'blue',
    },
    body: {
        paddingVertical: 20,
        marginHorizontal: 20,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalPrice: {
        fontSize: 18,
        color: COLORS.main,
        fontWeight: 'bold',
    },
    paymentButton: {
        backgroundColor: COLORS.main,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    paymentButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    emptyCartText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'gray',
    },
});

export default CartScreen;