import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const CharacterDetail = ({ route }) => {
  const { character } = route?.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.title}>{character.name}</Text>
      <View style={styles.extra}>
        <Text style={styles.text}>{`Gender: ${character.gender}`}</Text>
        <Text style={styles.text}>{`Species: ${character.species}`}</Text>
        <Text
          style={styles.text}
        >{`Location: ${character.location?.name}`}</Text>
        {character.type ? (
          <Text style={styles.text}>{`Type: ${character.type}`}</Text>
        ) : (
          <Text style={styles.text}>Type: No data</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#292929',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: '70%',
    width: '80%',
  },
  title: {
    color: 'white',
    fontSize: 28,
  },
  extra: {
    paddingVertical: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default CharacterDetail;
