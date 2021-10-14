import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import debounce from 'lodash/debounce';

import SearchBar from '../components/Search/SearchBar';
import EpCard from '../components/Cards/Episode';

const Episodes = ({ navigation }) => {
  const [data, setData] = React.useState({
    episodes: [],
    currentPage: 0,
    totalPages: 1,
  });

  const searchCharacterHandler = async (text) => {
    if (text) {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/?name=${text}`
        );
        const responseData = await response.json();
        if (responseData.error) {
          setData({
            episodes: [],
            currentPage: 0,
            totalPages: 1,
            error: true,
          });
        } else {
          setData({
            episodes: responseData.results,
            currentPage: 1,
            totalPages: responseData.info.pages,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const searchCharacterDebounced = React.useCallback(
    debounce(searchCharacterHandler, 900),
    []
  );

  const getEpisodes = async (page = 1) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/?page=${page}`
      );
      const responseJson = await response.json();
      setData({
        episodes: data.episodes.concat(responseJson.results),
        totalPages: responseJson?.info?.pages || 0,
        currentPage: page,
      });
    } catch (error) {
      console.log('error', error.message);
    }
  };

  React.useEffect(() => {
    getEpisodes(1);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchBar
          title="characters"
          handleChangeInput={searchCharacterDebounced}
        />
      </View>
      <View style={styles.list}>
        {data?.error ? (
          <View>
            <Text style={styles.text}>There is nothing here</Text>
          </View>
        ) : (
          <FlatList
            data={data.episodes}
            renderItem={({ item }) => <EpCard {...item} router={navigation} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            ListFooterComponent={() => (
              <Text style={styles.text}>End of File</Text>
            )}
            onEndReachedThreshold={30}
            onEndReached={() => {
              data.currentPage < data.totalPages &&
                getEpisodes(data.currentPage + 1);
            }}
          />
        )}
      </View>
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
  searchBar: {
    flex: 1,
  },
  list: {
    flex: 3,
  },
  text: {
    color: 'white',
    fontSize: 30,
    marginBottom: 10,
  },
});

export default Episodes;
