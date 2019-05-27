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

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;
export default ({
  capturing = false,
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
          <View style={[styles.captureBtnInternal, capturing && styles.captureBtnActive]}>
            {capturing && <View style={styles.captureBtnInternal} />}
          </View>
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
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: '#FFFFFF'
  },
  captureBtnActive: {
    width: 80,
    height: 80
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
