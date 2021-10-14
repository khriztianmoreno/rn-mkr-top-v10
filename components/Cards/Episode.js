import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const EpCard = (props) => {
  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.name}</Text>
        </View>
        <Text style={styles.text}>{props.episode}</Text>
        <Text style={styles.text}>{props.air_date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 100,
    width: 300,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginRight: 10,
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default EpCard;
