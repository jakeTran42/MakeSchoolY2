import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import data from '../utils/metal.json'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Stats For Bands',
  };

  render() {

    // Map,Filter,Reduce methods to get Stats
  
    let fanCount = 0
    const totalBand = data.reduce((cum, num) => {
      return cum + 1
    }, 0)

    const totalFans = data.map((band) => {
      let totalFan = band.fans * 1000
      fanCount = fanCount + totalFan
    }, 0)

    const totalCountries = data.reduce((obj, band) => {
      if(band.origin in obj) {
        obj[band.origin]++
        return obj
      } else {
        obj[band.origin] = 1
        return obj
      }
    }, {})

    const activeBands = data.filter((band) => {
      return band.split === '-'
    })

    const splitBands = data.filter((band) => {
      return band.split !== '-'
    })

    // Views Stats
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Total Bands - {totalBand}</Text>
        <Text style={styles.textStyle}>Total Fans - {fanCount.toString()}</Text>
        <Text style={styles.textStyle}>Total Country - {Object.keys(totalCountries).length}</Text>
        <Text style={styles.textStyle}>Active - {Object.keys(activeBands).length}</Text>
        <Text style={styles.textStyle}>Split - {Object.keys(splitBands).length}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#2b2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    color: '#fff',
    fontSize: 20
  }
});
