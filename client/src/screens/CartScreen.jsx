import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import HeaderCart from '../components/HeaderCart';
import CartCard from '../components/CartCard';
import {fonts} from '../utils/fonts';
import {CartContext} from '../context/CartContext';
import {Colors} from '../constants/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CheckOutScreen from '../screens/CheckOutScreen';

const Stack = createNativeStackNavigator();
const CartScreen = () => {
  const {cartItems, deleteCartItem, totalPrice} = useContext(CartContext);
  const navigation = useNavigation();
  const handleDeleteItem = async id => {
    await deleteCartItem(id);
  };

  const handleCheckOut = () => {
    navigation.navigate('CHECKOUT');
  };
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="CHECKOUT" component={CheckOutScreen} />
  </Stack.Navigator>;

  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <View style={styles.header}>
        <HeaderCart isCart={true} />
      </View>
      <FlatList
        data={cartItems}
        renderItem={({item}) => (
          <CartCard item={item} handleDelete={handleDeleteItem} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: 40, paddingBottom: 200}}
        ListFooterComponent={
          <>
            <View style={styles.bottomContentContainer}>
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Total:</Text>
                <Text style={styles.priceText}>${totalPrice}</Text>
              </View>
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Shopping:</Text>
                <Text style={styles.priceText}>$0.0</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Grand Total:</Text>
                <Text style={[styles.priceText, styles.grandPriceText]}>
                  ${totalPrice}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleCheckOut} style={styles.button} disabled={cartItems.length === 0}>
              <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
          </>
        }
      />
    </LinearGradient>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {},
  flexRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  bottomContentContainer: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  titleText: {
    fontSize: 18,
    color: '#757575',
    fontWeight: '500',
  },
  priceText: {
    fontSize: 18,
    color: '#757575',
    fontWeight: '600',
  },
  divider: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    marginTop: 10,
    marginBottom: 5,
  },
  grandPriceText: {
    color: '#3C3C3C',
    fontWeight: '700',
  },
  button: {
    backgroundColor: Colors.primaryColor,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: fonts.regular,
  },
});