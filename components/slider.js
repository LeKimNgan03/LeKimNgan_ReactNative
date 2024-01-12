import React from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Slider = () => {
    const slides = [
        {
            id: 1,
            image: require('../assets/blog-1.png'),
        },
        {
            id: 2,
            image: require('../assets/blog-2.png'),
        },
        {
            id: 3,
            image: require('../assets/blog-8.png'),
        },
        {
            id: 4,
            image: require('../assets/blog-9.png'),
        },
    ];

    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Image source={item.image} style={styles.slideImage} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Carousel
                data={slides}
                renderItem={renderItem}
                sliderWidth={400}
                itemWidth={400}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 12,
        alignItems: 'center',
    },
    slide: {
        width: 400,
        height: 200,
        borderRadius: 40,
        overflow: 'hidden',
    },
    slideImage: {
        width: '100%',
        height: '100%',
    },
});

export default Slider;