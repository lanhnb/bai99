import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {Colors} from '../constants/Colors';
import PopupMenu from './PopupMenu';

const Header = ({isCart}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('HOME');
  };
 
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.appDrawerContainer}>
        <View>
          <PopupMenu />
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          source={require('../assets/lanhnb.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  appDrawerContainer: {
    backgroundColor: 'white',
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appDrawerIcon: {
    height: 30,
    width: 30,
  },
  appBackIcon: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  profileImage: {
    height: 28,
    width: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 28,
    fontFamily: fonts.regular,
    color: '#000000',
  },
});
