import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

interface Props {
  name: string;
  category: string;
  price: string;
  size: string;
  coverURL: string;
  categoryColor: string;
}

const Product: FC<Props> = ({
  name,
  category,
  price,
  colors,
  size,
  coverURL,
  categoryColor,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.coloredSquare, {backgroundColor: categoryColor}]}>
        <Image style={styles.image} source={{uri: coverURL}} />
      </View>

      <Text>{name}</Text>
      <Text>{category}</Text>
      <Text>{price}$</Text>
      <Text>{size}$</Text>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {alignItems: 'center', marginBottom: 50},
  coloredSquare: {
    borderRadius: 8,
    height: 130,
    width: 130,
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    height: 130,
    width: 80,
    resizeMode: 'stretch',
    marginTop: -20,
    borderRadius: 8,
  },
});
