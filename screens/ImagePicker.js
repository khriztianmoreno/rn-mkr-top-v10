import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App(props) {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    setSelectedImage({ localUri: pickerResult.uri });
  };

  const openShareDialog = async () => {
    await Sharing.shareAsync(selectedImage.localUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Change this image</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          style={styles.image}
          source={{
            uri:
              selectedImage === null
                ? 'https://picsum.photos/200/200'
                : selectedImage.localUri,
          }}
        />
      </TouchableOpacity>
      {selectedImage && (
        <Button title="Share this image" onPress={openShareDialog} />
      )}

      <Button
        title="Go to Details"
        onPress={() =>
          props.navigation.navigate('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    marginBottom: 10,
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
    // borderRadius: 100,
  },
  button: { backgroundColor: '#BB86FC', padding: 7, marginTop: 10 },
  buttonText: { fontSize: 20, color: '#fff' },
  thumbnail: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
