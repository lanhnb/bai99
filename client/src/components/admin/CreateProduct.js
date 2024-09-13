import { useState } from 'react';
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
import { productsCreate } from '../slices/productSlice';
import HeaderCart from '../HeaderCart';
import { Colors } from '../../constants/Colors';
import { fonts } from '../../utils/fonts';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker, {
  openCamera,
  openPicker,
} from 'react-native-image-crop-picker';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { createStatus } = useSelector(state => state.productData);
  const [image, setImage] = useState([]);

  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  // const [colors, setColors] = useState([]);
  const [price, setPrice] = useState();
  const [size, setSize] = useState();
  const [links, setLink] = useState();
  const [info, setInfo] = useState();
  const [selected, setSelected] = useState();


  const uploadCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'lanhreact1');
    const api = `https://api.cloudinary.com/v1_1/dxnhv54sl/image/upload`;
    const { data } = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log('data', data);
    return { public_id: data?.public_id, url: data?.secure_url };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let arr = [];
    try {
      for (let i = 0; i < image.length; i++) {
        //        const data = await uploadCloudinary(image[i]);
        arr.push(image[i]);
      }
      //      setLink(arr);

    } catch (error) {
      console.log("loi roi:", error);
    }

    dispatch(
      productsCreate({
        name,
        category,
        size,
        price,
        info,
        image: arr,
      }),
    );

  };

  const openImageLibrary = () => {
    const ImageList = [];
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      mediaType: 'photo',
      maxFiles: 4,
      mediaType: 'any',
      base64: false,
      includeExif: true,
      saveToPhotos: true,
    })
      .then(imgs => {
        imgs.map(item => {
          ImageList.push({
            uri: item.path,
          });
        });
        setImage(ImageList);
        setLink(ImageList);


      })
      .catch(e => console.log('Error:', e.message));
  };

  const options = {
    saveToPhotos: true,
    mediaType: 'photo',
    multiple: true,
    base64: false,

  };
  const openCamera1 = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setImage1(result.assets[0].uri);
    }
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      base64: false,
      cropping: false,
    }).then(image => {
      setImage(image.path);
      this.bs.current.snapTo(1);
    });


  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      multiple: true,
      base64: false,
      cropping: false,
    }).then(image => {
      setImage(image.path);
      this.bs.current.snapTo(1);
    });

  };



  const pickImage = async () => {
    const result = await launchImageLibrary(options);
    console.log('Picker:', result);

    setImage(result);
    // const fileName = result.uri.split('/').pop();
    // const fileType = fileName.split('.').pop();

  };
  console.log("setLinh:", links)
  return (
    <>
      <View style={{ backgroundColor: '#FFFFFF', marginTop: 10, marginRight: 5 }}>
        <HeaderCart isCart={true} />
      </View>
      <View style={styles.container}>
        <Text style={{ marginTop: 5, marginBottom: 5, marginLeft: 5 }}>
          Input Products detail
        </Text>





        <TextInput
          type="text"
          placeholder="Name"
          onChangeText={e => {
            setName(e);
          }}
          required
          style={styles.input}
        />

        <TextInput
          type="text"
          placeholder="Category"
          onChangeText={e => {
            setCategory(e);
          }}
          required
          style={styles.input}
        />

        <TextInput
          type="number"
          placeholder="Price"
          onChangeText={e => {
            setPrice(e);
          }}
          required
          style={styles.input}
        />

        <TextInput
          type="text"
          placeholder="Info"
          onChangeText={e => {
            setInfo(e);
          }}
          required
          style={styles.input}
        />

        {/* <Editor

          textareaName="content"
          initialValue="Info"
          onEditorChange={(newText) => { setInfo(newText) }}
          apiKey='hti6y0ibvyw520x5nrvffuhqg0nfvahvnqq5snn6pz8dna1z'
          init={{
            plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'info',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          }}

        /> */}

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity onPress={openImageLibrary} style={styles.button2}>
          <Text style={styles.buttonText2}>Upload Image</Text>
        </TouchableOpacity>
          
        </View>

        {links ?
          (
          <View style={styles.container1}>
          <FlatList
            horizontal
            data={links}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => setSelected(item)}>
                  <View
                    style={[
                      styles.tagText,
                      item == selected ? styles.isSelected : null,
                    ]}>
                    <Image style={{ width: 150, height: 150, borderRadius:10 }} source={{ uri: item.uri }} />

                  </View>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={styles.container1}
          />
        </View>
        ) : (
          <View>
            <Text> Product image upload preview will appear here!</Text>
          </View>
        )}

      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>


    </>
  );
};

export default CreateProduct;

// Creating a stylesheet to style the view
const styles = StyleSheet.create({
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
    padding:10,
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
