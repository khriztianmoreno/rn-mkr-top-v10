import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const CharCard = (props) => {
  const goToChar = () => {
    const { router, ...character } = props;
    router.navigate('CharDetail', {
      character,
    });
  };

  return (
    <TouchableOpacity style={styles.item} onPress={goToChar}>
      <View style={styles.card}>
        <View style={styles.row}>
          <ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{props.name}</Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 170,
    width: 170,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginRight: 10,
  },
  bgImage: {
    height: 150,
    width: 150,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    height: '100%',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  card: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
});

export default CharCard;
