import {View, Text, Image} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';

import Entypo from 'react-native-vector-icons/dist/Entypo';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CartScreen from './src/screens/CartScreen';
import ReorderScreen from './src/screens/ReorderScreen';
import CheckOutScreen from './src/screens/CheckOutScreen';

import AccountScreen from './src/screens/AccountScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CartContext, CartProvider} from './src/context/CartContext';
import {Colors} from './src/constants/Colors';
// import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon1 from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import {store} from './src/store/store';
import {Provider} from 'react-redux';
import Login from './src/components/auth/login';
import Register from './src/components/auth/register';
import CreateProduct from './src/components/admin/CreateProduct';
import ProductList from './src/components/admin/ProductList';
import Dashboard from './src/components/admin/DashBoard';
import DashboardAmin from './src/components/admin/DashBoardAdmin';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyHomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HOME" component={HomeScreen} />
      <Stack.Screen name="CHECKOUT" component={CheckOutScreen} />
      <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} />
      <Stack.Screen name="LOGIN" component={Login} />
      <Stack.Screen name="REGISTER" component={Register} />
      <Stack.Screen name="CREATE_PRODUCT" component={CreateProduct} />
      <Stack.Screen name="ACCOUNT" component={AccountScreen} />
      <Stack.Screen name="PRODUCT_LIST" component={ProductList} />
      <Stack.Screen name="DASHBOARD" component={Dashboard} />
      <Stack.Screen name="DASHBOARD_ADMIN" component={DashboardAmin} />
    </Stack.Navigator>
  );
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <CartProvider>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
            }}>
            <Tab.Screen
              name="HOME_STACK"
              component={MyHomeStack}
              options={{
                tabBarIcon: ({focused, size}) => {
                  if (focused) {
                    return (
                      <Icon name="home" size={30} color={Colors.primaryColor} />
                    );
                  } else {
                    return <Icon name="home" size={30} color="gray" />;
                  }
                },
              }}
            />
            <Tab.Screen
              name="REORDER"
              component={ReorderScreen}
              options={{
                tabBarIcon: ({focused, size}) => {
                  if (focused) {
                    return (
                      <Image
                        source={require('./src/assets/focused/reorder.png')}
                        style={{
                          height: size,
                          width: size,
                          resizeMode: 'center',
                        }}
                      />
                    );
                  } else {
                    return (
                      <Image
                        source={require('./src/assets/normal/reorder.png')}
                        style={{
                          height: size,
                          width: size,
                          resizeMode: 'center',
                        }}
                      />
                    );
                  }
                },
              }}
            />
            <Tab.Screen
              name="CART"
              component={CartScreen}
              options={{
                tabBarIcon: ({focused, size}) => {
                  const {cartItems} = useContext(CartContext);
                  if (focused) {
                    return (
                      <View style={{position: 'relative'}}>
                        <Image
                          source={require('./src/assets/focused/shopping_cart.png')}
                          style={{
                            height: size,
                            width: size,
                            resizeMode: 'center',
                          }}
                        />
                        <View
                          style={{
                            position: 'absolute',
                            right: -3,
                            bottom: 22,
                            height: 14,
                            width: 14,
                            backgroundColor: '#E96E6E',
                            borderRadius: 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{color: 'white', fontSize: 10}}>
                            {cartItems.length}
                          </Text>
                        </View>
                      </View>
                    );
                  } else {
                    return (
                      <View style={{position: 'relative'}}>
                        <Image
                          source={require('./src/assets/normal/shopping_cart.png')}
                          style={{
                            height: size,
                            width: size,
                            resizeMode: 'center',
                          }}
                        />
                        <View
                          style={{
                            position: 'absolute',
                            right: -3,
                            bottom: 22,
                            height: 14,
                            width: 14,
                            backgroundColor: '#C0C0C0',
                            borderRadius: 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{color: 'white', fontSize: 10}}>
                            {cartItems.length}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                },
              }}
            />
            <Tab.Screen
              name="ACCOUNT"
              component={AccountScreen}
              options={{
                tabBarIcon: ({focused, size}) => {
                  if (focused) {
                    return (
                      <Icon1
                        name="account"
                        size={30}
                        color={Colors.primaryColor}
                      />
                    );
                  } else {
                    return <Icon1 name="account" size={30} color="gray" />;
                  }
                },
              }}
            />
          </Tab.Navigator>
        </CartProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
