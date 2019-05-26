import React, { Component, Fragment } from 'react';
import {
  View, Text, Dimensions, StyleSheet
} from 'react-native';
import { Camera, Permissions } from 'expo';

import Toolbar from './Toolbar';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default class VedoCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraAndAudioPermission: null
    };
  }

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraAndAudioPermission = camera.status === 'granted' && audio.status === 'granted';

    this.setState({
      hasCameraAndAudioPermission
    });
  }

  render() {
    const { hasCameraAndAudioPermission } = this.state;

    if (hasCameraAndAudioPermission === null) return <View />;
    if (hasCameraAndAudioPermission === false) {
      return (
        <View>
          <Text>Access to camera has been denied.</Text>
        </View>
      );
    }
    return (
      <Fragment>
        <View>
          <Camera style={styles.preview} />
        </View>

        <Toolbar />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});
