import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';

const ProfileScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={styles.titleHeader}>Your Profile</Text>
            </View>
            <View style={styles.body}>
                <Image source={require('../assets/user-3.jpg')} style={styles.img} />
                <View style={styles.editProfile}>
                    <Text style={styles.name}>John Doe</Text>
                    <Icon name="edit" size={22} style={{ paddingLeft: 6 }} />
                </View>
                <Text style={styles.bio}>Software Developer</Text>
                <Text style={styles.info}>Age: 30</Text>
                <Text style={styles.info}>Location: New York</Text>
                <Text style={styles.info}>Phone: 1-570-236-7033</Text>
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
    body: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    editProfile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: '100%',
        margin: 8,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bio: {
        fontSize: 18,
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default ProfileScreen;