import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Tags from '../components/Tags';
import ProductCard from '../components/ProductCard';
import data from '../data/data.json';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {Colors} from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../store/userActions';
// import {fetchProducts} from '../components/slices/productSlice';
import { url } from '../store/api';


const {createAsyncThunk} = require('@reduxjs/toolkit');

const HomeScreen = () => {
//   const {products1} = useSelector((state: RootState) => state.userData);
  const [products, setProducts] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleProductDetails = item => {
    navigation.navigate('PRODUCT_DETAILS', {item});
  };
  const toggleFavorite = item => {
    setProducts(
      products.map(prod => {
        if (prod._id === item._id) {
          console.log('prod: ', item);
          return {
            ...prod,
            isFavorite: !prod.isFavorite,
          };
        }
        return prod;
      }),
    );
  };

  const fetchProducts = createAsyncThunk('fetchProducts', async () => {
    const res = await fetch(`${url}/products`);
    const final = await res.json();
    setProducts(final)
  });


  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // console.log('dat:', JSON.stringify(products));

  return (
    <>
      <View style={styles.header}>
        <Header />
      </View>

      <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
        {/* header */}

        {/*       <Tags /> */}

        <FlatList
          ListHeaderComponent={
            <>
              <View>
                <Text style={styles.headingText}>Match Your Style</Text>
                <View style={styles.searchContainer}>
                  <View style={styles.inputContainer}>
                    <TextInput placeholder="Search" style={styles.textInput} />
                    <Icon name="search" size={30} color="gray" />
                  </View>
                  <TouchableOpacity style={styles.btnFilter}>
                    <Icon name="options-outline" size={30} color="#ffff" />
                  </TouchableOpacity>
                </View>
              </View>

              <Tags />
            </>
          }
          data={products}
          numColumns={2}
          renderItem={({item}) => (
            <ProductCard
              item={item}
              handleProductClick={handleProductDetails}
              toggleFavorite={toggleFavorite}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
        <View>
          {/* <Text>HomeScreen</Text>
          <Text>HomeScreen</Text> */}
        </View>
      </LinearGradient>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
  },

  headingText: {
    fontSize: 28,
    color: '#000000',
    marginVertical: 20,
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  textInput: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 12,
    width: 250,
  },
  header: {
    padding: 5,
  },
  btnFilter: {
    backgroundColor: Colors.primaryColor,
    padding: 5,
    borderRadius: 10,
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
