import {
    View,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Modal,
    Text,
    Animated,
    Easing,
    BackHandler,
    Alert,
  } from 'react-native';
  import React from 'react';
  import {Colors} from '../constants/Colors';
  import { useDispatch, useSelector } from 'react-redux';
  import {Button, Menu, Divider, PaperProvider} from 'react-native-paper';
  import Icon from 'react-native-vector-icons/dist/MaterialIcons';
  import Icon2 from 'react-native-vector-icons/dist/Ionicons';
  import { useNavigation, useRoute } from '@react-navigation/native';
  import { logoutUser } from './slices/authSlice';
  
  const PopupMenu1 = () => {
    const {loginStatus} = useSelector((state) => state.auth);
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);
    const scale = React.useRef(new Animated.Value(0)).current;
  
    const dispatch = useDispatch();
    const backPressed = () => {
      Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
      );
      return true;
    };
    function resizeBox(to) {
      to === 1 && setVisible(true);
      Animated.timing(scale, {
        toValue: to,
        useNativeDriver: true,
        duration: 700,
        easing: Easing.linear,
      }).start(() => to === 0 && setVisible(false));
    }
  
    return (
      <>
        <TouchableOpacity onPress={() => resizeBox(1)}>
          <Icon2 name="apps-sharp" size={26} color={Colors.primaryColor} />
        </TouchableOpacity>
        <Modal transparent visible={visible}>
          <SafeAreaView style={{flex: 1}} onTouchStart={() => resizeBox(0)}>
            <Animated.View
              style={[
                styles.popup,
                {
                  opacity: scale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
                {transform: [{scale}]},
              ]}>
  
              {loginStatus==='success' ? (
              
                <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={()=>dispatch(logoutUser(null))}
                >
                <Text>LogOut</Text>
                <Text style={{marginLeft: 10, padding: 10}}>
                  <Icon name="123" size={26} color={Colors.black} />
                </Text>
              </TouchableOpacity>
              ):(
                <>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={()=>navigation.navigate('REGISTER')}
                >
                <Text>SignUp</Text>
                <Text style={{marginLeft: 10, padding: 10}}>
                  <Icon name="grid-on" size={26} color={Colors.black} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={()=>navigation.navigate('LOGIN')}
                >
                <Text>SignIn</Text>
                <Text style={{marginLeft: 10, padding: 10}}>
                  <Icon name="123" size={26} color={Colors.black} />
                </Text>
              </TouchableOpacity>
              </>
              )
              }
              
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text>Profile</Text>
                <Text style={{marginLeft: 10, padding: 10}}>
                  <Icon name="360" size={26} color={Colors.black} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text>Transmissao ao vivo</Text>
                <Text style={{marginLeft: 10, padding: 10}}>
                  <Icon name="16mp" size={26} color={Colors.black} />
                </Text>
              </TouchableOpacity>
              <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
  
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={backPressed}>
                <Text>Exit</Text>
                <Text style={{marginLeft: 10, padding: 10}}>
                  <Icon name="exit-to-app" size={26} color={Colors.black} />
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </SafeAreaView>
        </Modal>
      </>
    );
  };
  const styles = StyleSheet.create({
    popup: {
      borderRadius: 8,
      borderColor: Colors.primaryColor,
      borderWidth: 1,
      backgroundColor: Colors.white,
      paddingHorizontal: 10,
      position: 'absolute',
      top: 60,
      left: 20,
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 7,
      borderBottomColor: '#ccc',
    },
  });
  export default PopupMenu1;
  