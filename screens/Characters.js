import React from 'react';
import { Text, View, StyleSheet, FlatList, Platform } from 'react-native';

import CharCard from '../components/Cards/Character';

const Characters = () => {
  const [data, setData] = React.useState({
    characters: [],
    currentPage: 1,
    totalPages: 1,
  });

  const getCharacters = async (page = 1) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      const responseJson = await response.json();

      setData({
        characters: data.characters.concat(responseJson.results),
        totalPages: responseJson?.info?.pages || 0,
        currentPage: page,
      });
    } catch (error) {
      console.log('error', error.message);
    }
  };

  React.useEffect(() => {
    getCharacters(1);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Characters Screen</Text>
      <FlatList
        data={data.characters}
        renderItem={({ item }) => <CharCard {...item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListFooterComponent={() => <Text style={styles.text}>End of File</Text>}
        onEndReachedThreshold={1}
        onEndReached={() => getCharacters(data.currentPage + 1)}
      />
    </View>
  );
};

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
});

export default Characters;
