import React from 'react';
import {
  View, Image, ScrollView, StyleSheet, Dimensions
} from 'react-native';

export default ({ captures = [] }) => (
  <ScrollView horizontal sstyle={[styles.galleryContainer, styles.bottomToolbar]}>
    {captures.map(({ uri }) => (
      <View key={uri} style={styles.galleryImageContainer}>
        <Image source={{ uri }} style={styles.galleryImage} />
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  galleryContainer: {
    bottom: 100
  },
  bottomToolbar: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    height: 100,
    bottom: 0
  },
  galleryImageContainer: {
    width: 75,
    height: 75,
    marginRight: 5
  },
  galleryImage: {
    width: 75,
    height: 75
  }
});
