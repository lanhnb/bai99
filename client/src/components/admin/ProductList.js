import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImagePreview,
  Image,
  FlatList,
  PermissionsAndroid,
  ScrollView,

} from 'react-native';

import HeaderCart from '../HeaderCart';
import { Colors } from '../../constants/Colors';
import { fonts } from '../../utils/fonts';

import { DataTable } from 'react-native-paper';
import { url } from '../../store/api';
import { productsDelete, updatedProduct } from '../slices/productSlice'
const { createAsyncThunk } = require('@reduxjs/toolkit');




const ProductList = () => {
  const [products, setProducts] = useState();
  const { name, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState('HOME');


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


  return (<>
    <HeaderCart isCart={true} />
    <View style={styles.contentContainer}>
      <Text style={styles.contentText}>
        Get products Infor here
      </Text>


      <DataTable style={{ width: 350 }}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={{ padding: 5 }}>Name</DataTable.Title>
          <DataTable.Title style={{ padding: 5 }}>Catgory</DataTable.Title>
          <DataTable.Title style={{ padding: 5 }}>Price</DataTable.Title>
          <DataTable.Title style={{ padding: 5 }}>Delete</DataTable.Title>
          <DataTable.Title style={{ padding: 5 }}>Edit</DataTable.Title>

        </DataTable.Header>
        {products?.map(item =>
          <DataTable.Row>
            <DataTable.Cell style={{ fontSize: 14, color: 'red' }}>{item.name}</DataTable.Cell>
            <DataTable.Cell style={{ fontSize: 14 }}>{item.category}</DataTable.Cell>
            <DataTable.Cell style={{ fontSize: 14 }}>{item.price}</DataTable.Cell>
            <DataTable.Cell style={{ fontSize: 14, backgroundColor: 'red', padding: 5, alignItems:'center', alignContent:'center', fontWeight:500 }} onPress={() => handleDelete(item._id)}>Delete</DataTable.Cell>
            <DataTable.Cell style={{ fontSize: 14 }} onPress={() => handleUpdate(item._id)}>Edit</DataTable.Cell>

          </DataTable.Row>
        )}


      </DataTable>

    </View>
  </>
  );
};
export default ProductList;

// Creating a stylesheet to style the view
const styles = StyleSheet.create({
  contentContainer:{
justifyContent:'center',
alignItems:'center',
  },
  container1: {
    marginVertical: 10,
  },
  tagText: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#DFDCDC',

  },
  isSelected: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
  },

  container: {
    marginTop: 2,
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
  button2: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,

  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: fonts.regular,
  },
  buttonText2: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: fonts.regular,
    padding: 10,
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
});
