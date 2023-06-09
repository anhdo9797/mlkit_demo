import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PhotoEditor from '@baronha/react-native-photo-editor';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition, { TextRecognitionResult } from '@react-native-ml-kit/text-recognition';

type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const [result, setResult] = React.useState<TextRecognitionResult>();
  const onPress = async () => {
    console.log('------------------------------------');
    const images = await launchCamera({ mediaType: 'photo', maxWidth: 1000, maxHeight: 1000 });
    console.log('Image picker: ', images.assets![0].uri);

    const _result = await TextRecognition.recognize(images.assets![0].uri ?? '');
    setResult(_result);

    console.log('TextRecognition: ', _result);
  };

  const onEditPhoto = async () => {
    // console.log('onPress: ');
    const images = await launchImageLibrary({ mediaType: 'photo', maxWidth: 1000, maxHeight: 1000 });
    console.log('Image picker: ', images.assets![0].uri);
    const path = images.assets![0].uri ?? '';

    const options = {
      path: path,
      stickers: [],
    };
    const _result = await PhotoEditor.open(options);

    console.log('TextRecognition: ', _result);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!!result &&
        result.blocks.map((block, index) => (
          <Text key={Math.random()} style={{ color: 'red' }}>
            {block.text}
          </Text>
        ))}

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Picker image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onEditPhoto}>
        <Text style={styles.text}>Edit photo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginVertical: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
