import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922; // by default
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const Locations = () => {
  const [markers, setMarkers] = React.useState([]);
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setMarkers([
        {
          coordinate: {
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
          },
          color: randomColor(),
          key: Date.now(),
        },
      ]);
    })();
  }, []);

  const onMapPress = (e) => {
    const coordinate = e.nativeEvent?.coordinate;
    setMarkers((markers) => [
      ...markers,
      {
        coordinate,
        color: randomColor(),
        key: Date.now(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          onPress={(e) => onMapPress(e)}
          initialRegion={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {markers.map((marker) => (
            <Marker
              key={`marker-${marker.key}`}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
        </MapView>
      )}
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Locations;
