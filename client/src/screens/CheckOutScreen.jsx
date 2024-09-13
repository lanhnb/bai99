import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {Colors} from '../constants/Colors';
import {fonts} from '../utils/fonts';
import {CartContext} from '../context/CartContext';
import HeaderCart from '../components/HeaderCart';

const CheckOutScreen = () => {
  // Importing a few package and components

  // Declaring a few states to store the user's input
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const {cartItems, clearCart, deleteCartItem, totalPrice} =
    useContext(CartContext);
  // Function to handle the user's input

  const order = () => {
    alert('Ban da nhap');
    console.log('Ban da nhap:', name, address, phone);
    clearCart();
    setName('');
    setAddress('');
    setPhone('');
  };

  return (
    <>
      <View style={{backgroundColor: '#FFFFFF', marginTop: 10, marginRight: 5}}>
        <HeaderCart isCart={true} />
      </View>
      <View style={styles.container}>
        {/* Creating a text input for the user's first name */}
        <Text style={{marginTop: 5, marginBottom: 5, marginLeft: 5}}>
          Input Your Name and Address
        </Text>
        <TextInput
          onChangeText={e => {
            // Setting the user's input to the firstName state
            setName(e);
            // Calling the handleChange function
          }}
          placeholder="Your Name"
          style={styles.input}
          value={name}
        />

        <TextInput
          onChangeText={e => {
            setAddress(e);
          }}
          placeholder="Address"
          style={styles.input}
          value={address}
        />

        <TextInput
          onChangeText={e => {
            setPhone(e);
          }}
          placeholder="Phone"
          style={styles.input}
          value={phone}
        />

        <View style={styles.flexRowContainer}>
          <Text style={styles.titleText}>Grand Total:</Text>
          <Text style={[styles.priceText, styles.grandPriceText]}>
            ${totalPrice}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={order} style={styles.button} disabled={cartItems.length === 0}>
            <Text style={styles.buttonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CheckOutScreen;

// Creating a stylesheet to style the view
const styles = StyleSheet.create({
  container: {
    marginTop: 2,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    marginTop: 10.2,
  },
  button: {
    backgroundColor: Colors.primaryColor,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 30,
    width: '80%',
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: fonts.regular,
  },
  flexRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 20,
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
  grandPriceText: {
    color: '#3C3C3C',
    fontWeight: '700',
  },
});
