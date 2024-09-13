import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, Image,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../constants/Colors';
import {fonts} from '../../utils/fonts';
// import {CartContext} from '../../context/CartContext';
import HeaderCart from '../HeaderCart';
import {loginUser, registerUser} from '../slices/authSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker, {
  openCamera,
  openPicker,
} from 'react-native-image-crop-picker';

const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = useSelector(state => state.auth);
  const [image, setImage] = useState('https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567612/qichw3wrcioebkvzudib.png')
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    image:image,
  });
  useEffect(() => {
    if (auth._id) {
      navigation.navigate('HOME');
    }
  }, [auth._id, navigation.navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerUser(user));
    navigation.navigate('HOME');
  };

  const PickerImage = () => {
    ImagePicker.openPicker({
      base64: false,
      cropping: false,
    }).then(img => {
      setImage(img.path);
      this.bs.current.snapTo(1);
    });

  };

  

  return (
    <>
      <View style={{backgroundColor: '#FFFFFF', marginTop: 10, marginRight: 5}}>
        <HeaderCart isCart={true} />
      </View>
      <View style={styles.container}>
        <Text style={{marginTop: 5, marginBottom: 5, marginLeft: 5}}>
          Input Your Name and Address
        </Text>
        <TouchableOpacity style={{ alignItems: 'center'}} onPress={PickerImage}>
          <Image style={{height:100, width:100, borderRadius:50 }} source={{uri:image}}/>
        </TouchableOpacity>
        <TextInput
          onChangeText={
            e => {
              // Setting the user's input to the firstName state
              setUser({...user, name: e});
            }
            // Calling the handleChange function
          }
          placeholder="Name"
          style={styles.input}
        />

        <TextInput
          onChangeText={
            e => {
              // Setting the user's input to the firstName state
              setUser({...user, email: e});
            }
            // Calling the handleChange function
          }
          placeholder="Email"
          style={styles.input}
        />

        <TextInput
          onChangeText={e => {
            setUser({...user, password: e});
          }}
          placeholder="Password"
          style={styles.password}
          secureTextEntry={true}
        />

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Register;

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
