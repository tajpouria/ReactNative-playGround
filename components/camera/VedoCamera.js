import React, { Component, Fragment } from 'react';
import {
  View, Text, Dimensions, StyleSheet
} from 'react-native';
import { Camera, Permissions } from 'expo';

import Toolbar from './Toolbar';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const {
  FlashMode: { on, off },
  Type: { back, front }
} = Camera.Constants;

export default class VedoCamera extends Component {
  camera = null;

  constructor(props) {
    super(props);
    this.state = {
      capturing: false,
      hasCameraAndAudioPermission: null,
      captures: [],
      flashMode: on,
      cameraType: back
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

  setFlashMode = (newFlashMode) => {
    const flashMode = newFlashMode === 1 ? on : off;
    this.setState({ flashMode });
  };

  setCameraType = (newCameraType) => {
    const cameraType = newCameraType === 1 ? front : back;
    this.setState({ cameraType });
  };

  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    const { captures } = this.state;
    if (captures) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync();
    this.setState({ capturing: false, captures: [photoData, ...this.state.captures] });
  };

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();
    this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
  };

  render() {
    const {
      hasCameraAndAudioPermission, flashMode, cameraType, capturing
    } = this.state;

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
          <Camera type={cameraType} flashMode={flashMode} style={styles.preview} />
        </View>
        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
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
