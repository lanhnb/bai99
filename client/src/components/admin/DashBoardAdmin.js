import React, { useEffect, useState } from 'react';
import {
    View, Text,
    StyleSheet, TouchableOpacity, FlatList, Alert, Switch,
    } from 'react-native';

import { useColorScheme } from "nativewind";
import Icon
    from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'react-native-paper';
import { url } from '../../store/api';
import { productsDelete, updatedProduct } from '../slices/productSlice'

import { useNavigation, useRoute } from '@react-navigation/native';

const { createAsyncThunk } = require('@reduxjs/toolkit');

const DashboardAmin = () => {
    const [products, setProducts] = useState();
    const { name, email, image } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {colorScheme, toggleColorScheme}= useColorScheme();
    const [activeSection, setActiveSection] = useState('HOME');
    const navigation = useNavigation();

    const fetchProducts = createAsyncThunk('fetchProducts', async () => {
        const res = await fetch(`${url}/products`);
        const final = await res.json();
        setProducts(final)
    });


    useEffect(() => {
        dispatch(fetchProducts());
    }, []);


    const handleDelete = (_id) => {

        Alert.alert(
            '',
            'Are you sure you want to delete?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => dispatch(productsDelete(_id)) },
            ],
            { cancelable: false }
        )

    };
    const handleUpdate = (_id) => {

        dispatch(updatedProduct(_id));
    };

    console.log("ToggleColor:", colorScheme);

    const renderSection = () => {
        switch (activeSection) {
            case 'Profile':
                return <ProfileSection />;
            case 'Settings':
                return <SettingsSection />;
            case 'Analytics':
                return <AnalyticsSection />;
            case 'Products':
                return <ProductsSection />;
            case 'Orders':
                return <OrdersSection />;
            case 'Calendar':
                return <CalendarSection />;
            default:
                return <HomeSection />;
        }
    };

    const renderBackButton = () => (
        <TouchableOpacity
            onPress={
                () =>
                    setActiveSection('HOME')
            } style={styles.backButton}>
            <Icon name="arrow-back"
                size={30} color="#000000" />
            <Text style={styles.backButtonText}>
                Back to Home
            </Text>
        </TouchableOpacity>
    );

    const HomeSection = () => (
        <View style={styles.container}>


            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>
                    Welcome to the Dashboard Amin!
                </Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress=
                        {
                            () =>
                                setActiveSection('Profile')
                        } style={styles.button}>
                        <Icon name="person"
                            size={30} color="white" />
                        <Text style={styles.buttonText}>
                            Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={
                            () =>
                                setActiveSection('Settings')
                        } style={styles.button}>
                        <Icon name="settings"
                            size={30} color="white" />
                        <Text style={styles.buttonText}>
                            Settings
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.featuresContainer}>
                <PressableFeatureBox name="Analytics"
                    icon="stats-chart" onPress=
                    {
                        () => setActiveSection('Analytics')
                    } />
                <PressableFeatureBox name="Products"
                    icon="chatbox" onPress=
                    {
                        () => setActiveSection('Products')
                    } />
                <PressableFeatureBox name="Orders"
                    icon="checkbox-outline" onPress=
                    {
                        () => setActiveSection('Orders')
                    } />
                <PressableFeatureBox name="Calendar"
                    icon="calendar" onPress=
                    {
                        () => setActiveSection('Calendar')
                    } />
            </View>
        </View>
    );
    const ProfileSection = () => (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {renderBackButton()}
                <Text style={styles.headerTitle}>
                    Profile Section
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <Icon name="person" size={80}
                
                    color="#3498db" />
                <Text style={styles.contentText}>
                    Username: {name}
                </Text>
                <Text style={styles.contentText}>
                    Email: {email}
                </Text>

            </View>
        </View>
    );

    const SettingsSection = () => (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {renderBackButton()}
                <Text style={styles.headerTitle}>
                    Settings Section
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <Icon name="settings" size={80}
                    color="#3498db" />
                <Text style={styles.contentText}>
                    Notifications: On
                </Text>
                <Text style={styles.contentText}>
                    Theme: {colorScheme}
                </Text>
                <Switch value={colorScheme=='dark'} onChange={toggleColorScheme}/>

            </View>
        </View>
    );

    const PressableFeatureBox = (
        { name, icon,
            onPress
        }
    ) => (
        <TouchableOpacity onPress={onPress}
            style={styles.featureBox}>
            <Icon name={icon} size={50}
                color="#3498db" />
            <Text style={styles.featureName}>
                {name}
            </Text>
        </TouchableOpacity>
    );

    const AnalyticsSection = () => (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {renderBackButton()}
                <Text style={styles.headerTitle}>
                    Analytics Section
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.contentText}>
                    Analytics Content Goes Here
                </Text>
            </View>
        </View>
    );

    const ProductsSection = () => (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {renderBackButton()}
                <Text style={styles.headerTitle}>
                    Products Section
                </Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={()=>navigation.navigate('CREATE_PRODUCT')} style={styles.button}>
                    <Text style={styles.buttonText}>Create Products</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('PRODUCT_LIST')} style={styles.button}>
                    <Text style={styles.buttonText}>Products Detail</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <ProductList/> */}
        </View>
    );

    const OrdersSection = () => (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {renderBackButton()}
                <Text style={styles.headerTitle}>
                    Orders Section
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.contentTitle}>
                    Render Orders here
                </Text>
                <TaskItem title="Task 1"
                    description="Geekforgeeks contest." />
                <TaskItem title="Task 2"
                    description="mock interview" />
                <TaskItem title="Task 3"
                    description="Sample paper solution ." />
            </View>
        </View>
    );
    const CalendarSection = () => (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {renderBackButton()}
                <Text style={styles.headerTitle}>
                    Calendar Section
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.contentTitle}>
                    Events This Week
                </Text>
                <EventItem
                    date="Mon, Jan 10"
                    time="3:00 PM - 5:00 PM"
                    title="Meeting with Team"
                    location="Office Conference Room"
                />
                <EventItem
                    date="Thu, Jan 13"
                    time="10:00 AM - 12:00 PM"
                    title="Client Presentation"
                    location="Online"
                />
                <EventItem
                    date="Sat, Jan 15"
                    time="6:00 PM - 8:00 PM"
                    title="Dinner with Friends"
                    location="Local Restaurant"
                />
            </View>
        </View>
    );

    const TaskItem = (
        {
            title,
            description
        }) => (
        <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>
                {title}
            </Text>
            <Text style={styles.taskDescription}>
                {description}
            </Text>
        </View>
    );

    const EventItem = (
        { date, time,
            title, location
        }) => (
        <View style={styles.eventItem}>
            <View style={styles.eventDateTime}>
                <Text style={styles.eventDate}>
                    {date}
                </Text>
                <Text style={styles.eventTime}>
                    {time}
                </Text>
            </View>
            <Text style={styles.eventTitle}>
                {title}
            </Text>
            <Text style={styles.eventLocation}>
                {location}
            </Text>
        </View>
    );
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        headerContainer: {
            backgroundColor: '#3498db',
            padding: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            elevation: 5,
        },
        headerTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#2ecc71',
            padding: 10,
            borderRadius: 5,
            marginLeft:5,
        },
        buttonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 10,
        },
        featuresContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            marginTop: 20,
        },
        featureBox: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '45%',
            aspectRatio: 1,
            backgroundColor: 'white',
            borderRadius: 10,
            marginVertical: 10,
            elevation: 5,
        },
        featureName: {
            marginTop: 10,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#555',
        },
        backButton: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        backButtonText: {
            color: '#3498db',
            fontSize: 16,
            marginLeft: 10,
        },
        contentContainer: {
            flex: 1,
            padding: 20,
        },
        contentText: {
            fontSize: 16,
            marginBottom: 10,
            color: '#555',
        },
        contentTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 10,
        },
        taskItem: {
            backgroundColor: '#3498db',
            borderRadius: 10,
            padding: 15,
            marginVertical: 10,
        },
        taskTitle: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
        },
        taskDescription: {
            color: 'white',
            fontSize: 14,
            marginTop: 5,
        },
        eventItem: {
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 15,
            marginVertical: 10,
            elevation: 5,
        },
        eventDateTime: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        eventDate: {
            color: '#3498db',
            fontSize: 16,
            fontWeight: 'bold',
        },
        eventTime: {
            color: '#555',
            fontSize: 16,
        },
        eventTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
        },
        eventLocation: {
            fontSize: 14,
            color: '#777',
        },
        container1: {
            padding: 5,
        },
        tableHeader: {
            backgroundColor: '#DCDCDC',
        },
    });

    return <View style={styles.container}>
        {renderSection()}
    </View>;
};

export default DashboardAmin;
