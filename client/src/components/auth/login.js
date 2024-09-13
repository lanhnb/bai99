import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../constants/Colors';
import { fonts } from '../../utils/fonts';
// import {CartContext} from '../../context/CartContext';
import HeaderCart from '../HeaderCart';
import { loginUser } from '../slices/authSlice';
import { loginAction } from '../../store/userActions';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = useSelector(state => state.auth);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    if (auth._id) {
      navigation.navigate("ACCOUNT")
    }
  }, [auth._id, navigation.navigate]);
  console.log("author:", auth)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
    // dispatch(loginAction());

    
  };


  return (
    <>
      <View style={{ backgroundColor: '#FFFFFF', marginTop: 10, marginRight: 5 }}>
        <HeaderCart isCart={true} />
      </View>
      <View style={styles.container}>
        <Text style={{ marginTop: 5, marginBottom: 5, marginLeft: 5 }}>
          Input Your Name and Address
        </Text>
        <TextInput
          onChangeText={
            e => {
              // Setting the user's input to the firstName state
              setUser({ ...user, email: e });
            }
            // Calling the handleChange function
          }
          placeholder="Email"
          style={styles.input}
        />

        <TextInput
          onChangeText={e => {
            setUser({ ...user, password: e });
          }}
          placeholder="Password"
          style={styles.password}
          secureTextEntry={true}
        />

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Login;

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
});
