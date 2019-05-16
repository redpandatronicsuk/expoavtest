import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

import { Audio } from 'expo-av'

const demoAudio = require('./assets/demo.mp3')

export default class App extends Component {

  state = {
    isAudioReady: false,
    isAudioPlaying: false
  }
  soundObj = null

  componentDidMount = async () => {
    await this.setupAudio()
  }

  setupAudio = async () => {
    await Audio.setIsEnabledAsync(true)
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentLockedModeIOS: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true // Ignored on iOS 😭
    })
    this.soundObj = await Audio.Sound.createAsync(
      demoAudio,
      { shouldPlay: false }
    )
    this.setState({ isAudioReady: true })
  }

  togglePlayPause = async () => {
    const { isAudioPlaying } = this.state
    if (isAudioPlaying) {
      await this.soundObj.sound.pauseAsync()
      this.setState({ isAudioPlaying: false })
    } else {
      await this.soundObj.sound.playAsync()
      this.setState({ isAudioPlaying: true })
    }
  }

  render() {
    const { isAudioReady, isAudioPlaying } = this.state
    return (
      <View style={styles.container}>
      {
        isAudioReady ?
        <TouchableOpacity onPress={this.togglePlayPause}>
          <Text>{ isAudioPlaying ? 'PAUSE' : 'PLAY' }</Text>
        </TouchableOpacity>
        :
        <ActivityIndicator />
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
