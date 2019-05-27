import React from 'react';
import {
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import { Camera } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';

const { width: winWidth } = Dimensions.get('window');

function renderCapturingButton(recording, capturing) {
  console.log(recording);
  if (recording) return styles.captureBtnInternal;
  return capturing ? [styles.captureBtn, styles.captureBtnActive] : styles.captureBtn;
}

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;
export default ({
  capturing = false,
  recording = false,
  cameraType = CameraTypes.back,
  flashMode = CameraFlashModes.off,
  setFlashMode,
  setCameraType,
  onCaptureIn,
  onCaptureOut,
  onLongCapture,
  onShortCapture
}) => (
  <Grid style={styles.bottomToolbar}>
    <Row>
      <Col style={styles.alignCenter}>
        <TouchableOpacity
          onPress={() => setFlashMode(
            flashMode === CameraFlashModes.on ? CameraFlashModes.off : CameraFlashModes.on
          )
          }
        >
          <Ionicons
            name={flashMode === CameraFlashModes.on ? 'md-flash' : 'md-flash-off'}
            color="white"
            size={30}
          />
        </TouchableOpacity>
      </Col>
      <Col style={styles.alignCenter} size={2}>
        <TouchableWithoutFeedback
          onPressIn={onCaptureIn}
          onPressOut={onCaptureOut}
          onLongPress={onLongCapture}
          onPress={onShortCapture}
        >
          <View style={renderCapturingButton(recording, capturing)} />
        </TouchableWithoutFeedback>
      </Col>
      <Col style={styles.alignCenter}>
        <TouchableOpacity
          onPress={() => setCameraType(cameraType === CameraTypes.back ? CameraTypes.front : CameraTypes.back)
          }
        >
          <Ionicons name="md-reverse-camera" color="white" size={30} />
        </TouchableOpacity>
      </Col>
    </Row>
  </Grid>
);

const styles = StyleSheet.create({
  alignCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 0
  },
  captureBtn: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: '#FFFFFF'
  },
  captureBtnActive: {
    width: 75,
    height: 75,
    backgroundColor: '#FFFFFF'
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 3,
    borderRadius: 76,
    backgroundColor: 'red',
    borderColor: 'transparent'
  }
});
