import {
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../store/userActions';
import {RootState} from '../store/store';
import Product from '../components/Product';
import LinearGradient from 'react-native-linear-gradient';
import { fetchProducts } from '../components/slices/productSlice';

const ReorderScreen = () => {

  const {isSignedIn, userName, products} = useSelector((state: RootState) => state.userData)
  const dispatch = useDispatch();



  type ProductItem = {
    name_of_book:string,
    author:string,
    cover: string,
    price: string
  };

  const renderItem: ListRenderItem<ProductItem> = ({item}) => (
    <Product
       author={item.author}
    coverURL={item.cover}
    nameOfBook={item.name_of_book}
    price={item.price}
    categoryColor='#764abc'
    />
  );
 useEffect(() => {
    dispatch(fetchProducts())
  },[]);



  return (<>
      <View><Text>khong cos gi</Text></View>
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.cont}>
      <FlatList
        numColumns={2}
        data={products}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </LinearGradient>
    </>
  );
};

export default ReorderScreen;

const styles = StyleSheet.create({
  cont: {
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    marginTop:50
    
  },
  text: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
});
