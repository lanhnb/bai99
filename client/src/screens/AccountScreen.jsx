import { Button, StyleSheet, Text, View, SafeAreaView, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeNameAction } from '../store/userActions';
import { loginAction } from '../store/userActions';
import { RootState } from '../store/store';
import { logoutAction } from '../store/userActions';
import { logoutUser } from '../components/slices/authSlice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import Header1 from '../components/Header1';
import Dashboard from '../components/admin/DashBoard.js';
import DashboardAmin from '../components/admin/DashBoardAdmin.js';

const Stack = createNativeStackNavigator();


const AccountScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.light,
  };
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('LOGIN');

  };

  const handleRegister = () => {
    navigation.navigate('REGISTER');
  };

  const handleCreate = () => {
    navigation.navigate('CREATE_PRODUCT');
  };


  // const isSignedIn = useSelector(state => state.products.isSignedIn)
  // const userName = useSelector(state => state.products.name)
  const { isSignedIn, userName } = useSelector(
    (state: RootState) => state.userData,
  );
  const { name } = useSelector((state: RootState) => state.auth);
  const { loginStatus, isAdmin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // const [isSignedIn, setIsSignedIn]= useState(false)
  
  return (<>
   
    <View style={{ padding: 5 }}>
      <Header1 />
    </View>

    <View style={styles.cont}>
      <Text style={{ color: 'red' }}>
        Signed in status: {loginStatus ? 'success' : 'rejected'}
      </Text>
      <Text style={styles.text}>Well come to {name}</Text>
      {loginStatus === 'success' ? (
        <>
          {isAdmin? (<View>
            <DashboardAmin />
          </View>) : (<View>
            <Dashboard />
          </View>)}
        </>

      ) : (
        <View>
          <Text style={styles.text}>Please Login</Text>
          <Button title="Register" onPress={handleRegister}></Button>
          <Text style={styles.text}>Or Register if you no account</Text>
          <Button title="logIn" style={{ margin: 10 }} onPress={handleLogin}></Button>
        </View>
      )}
    </View>
  </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  cont: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
});
