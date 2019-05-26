import React from 'react';
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Camera } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';

const { width: winWidth } = Dimensions.get('window');

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;
export default ({
  capturing = false,
  cameraType = CameraTypes.back,
  FlashMode = CameraFlashModes.off,
  setFlashMode,
  setCameraType,
  onCaptureIn,
  onCaptureOut,
  onLongCapture,
  onShortCapture
}) => {
  <Grid style={styles.bottomToolbar}>
    <Row>
      <Col style={styles.alignCenter}>
        <TouchableOpacity
          onPress={() => setFlashMode(
            flashMode === CameraFlashModes.on ? CameraFlashModes.off : CameraFlashModes.on
          )
          }
        />
      </Col>
    </Row>
  </Grid>;
};

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
  }
});
