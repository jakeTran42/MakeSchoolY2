import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';

import data from '../utils/metal.json'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  // convertNumber = (num) => {
  //   const actualFan = num * 1000
  //   return actualFan.toLocaleString(undefined, {maximumFractionDigits:0})
  // }

  render() {
    // console.log(data)
    return (
      <View style={styles.container}>

      {/* Here is my implementation of ScrollView (Working)*/}

        {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {
            data.map((item) => {
              return(
                <View key={item.band_name} style={styles.bandContainer}>
                  <View style={styles.metaDataRight}>
                    <Text style={styles.textStyle}>{item.band_name}</Text>
                    <Text style={styles.textStyle}>{item.formed}</Text>
                  </View>
                  <View style={styles.metaDataLeft}>
                    <Text style={styles.textStyle}>{item.origin}</Text>
                    <Text style={styles.textStyle}>{(item.fans * 1000).toLocaleString(undefined, {maximumFractionDigits:0})}</Text>
                  </View>
                </View>
              )
              // console.log(item)
            })
          }
        </ScrollView> */}

        {/* This is my FlatList */}
        <FlatList
          data={data}
          renderItem={({ item }) => (
              <View key={item.id} style={styles.bandContainer}>
                <View style={styles.metaDataRight}>
                  <Text style={styles.textStyle}>{item.band_name}</Text>
                  <Text style={styles.textStyle}>{item.formed}</Text>
                </View>
                <View style={styles.metaDataLeft}>
                  <Text style={styles.textStyle}>{item.origin}</Text>
                  <Text style={styles.textStyle}>{(item.fans * 1000).toLocaleString(undefined, {maximumFractionDigits:0})}</Text>
                </View>
              </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2a2a',
    color: 'white'
  },

  bandContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    // margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'white'
  },

  metaDataRight: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },

  metaDataLeft: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },

  textStyle: {
    color: '#fff',
    padding: 10,
    fontWeight: 'bold'
  }
});
