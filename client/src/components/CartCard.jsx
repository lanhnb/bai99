import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {fonts} from '../utils/fonts';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import {Colors} from '../constants/Colors';

const CartCard = ({item, handleDelete}) => {
 


  return (
    <View style={styles.card}>
      <Image source={{uri: item.image[0].uri}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.textCircleContainer}>
          <View
            style={[
              styles.circle,
              {backgroundColor: item?.color || 'red'},
            ]}></View>
          <View style={styles.sizeContainer}>
            <Text style={styles.sizeText}>{item.size}</Text>
          </View>
        </View>
        <View>
          <Text>quantity: {item.quantity}</Text>
        </View>
      </View>
     

      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Icon name="trash-bin-outline" size={30} color={Colors.primaryColor} />
      </TouchableOpacity>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  image: {
    height: 125,
    width: '30%',
    resizeMode: 'contain',
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: fonts.medium,
    color: '#444444',
  },
  price: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: '#797979',
    marginVertical: 7,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: 5,
  },
  circle: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  sizeContainer: {
    backgroundColor: '#FFFFFF',
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  sizeText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: fonts.medium,
  },
  textCircleContainer: {
    flexDirection: 'row',
  },
  deleteIcon: {
    height: 30,
    width: 30,
    marginTop: 10,
  },
});
