import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fonts} from '../utils/fonts';
import {Colors} from '../constants/Colors'
import {CartContext, CartProvider} from './src/context/CartContext';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const ProductCard = ({item, handleProductClick, toggleFavorite}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        handleProductClick(item);
      }}>
      <Image source={{uri:item.image[0].uri}} style={styles.coverImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>

      </View>
      <View style={styles.likeContainer}>
        <TouchableOpacity
          onPress={() => {
            toggleFavorite(item);
          }}>
          {item.isFavorite ? (
            <Icon name="favorite" size={30} color={Colors.primaryColor} />
          ) : (
            <Icon name="favorite-border" size={30} color={Colors.primaryColor} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  coverImage: {
    height: 256,
    width: '100%',
    borderRadius: 20,
    position: 'relative',
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: '700',
    color: '#444444',
  },
  price: {
    fontSize: 18,
    fontFamily: fonts.medium,
  },
  likeContainer: {
    position: 'absolute',
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    right: 10,
    top: 10,
  },
  faviorate: {
    height: 20,
    width: 20,
  },
});
