import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Episodes = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Episodes Screen</Text>
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

export default Episodes;
