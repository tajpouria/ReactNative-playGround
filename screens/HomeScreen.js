import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ExpoTHREE, { THREE } from 'expo-three';
import ExpoGraphics from 'expo-graphics';

console.disableYellowBox = true;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onContextCreate = async ({
    gl, scale, width, height, arSession
  }) => {
    // Initialize renderer…
    this.renderer = ExpoTHREE.createRenderer({ gl });
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);

    // Initialize scene…
    this.scene = new THREE.Scene();
    this.scene.background = ExpoTHREE.createARBackgroundTexture(arSession, this.renderer);

    // Initialize camera…
    this.camera = ExpoTHREE.createARCamera(arSession, width / scale, height / scale, 0.01, 1000);

    // Initialize lighting…
    const ambientLight = new THREE.AmbientLight(0xaaaaaa);
    this.scene.add(ambientLight);
  };

  onRender = () => this.renderer.render(this.scene, this.camera);

  render() {
    return (
      <ExpoGraphics.View
        style={{ flex: 1 }}
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        arEnabled
      />
    );
  }
}
