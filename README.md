# expoavtest

Demo for issues: https://github.com/expo/expo/issues/4171 and https://github.com/tanguyantoine/react-native-music-control/issues/257

## Notes:
To test the workaround for `expo-av` in file `node_modules/expo-av/ios/EXAV/EXAVPlayerData.m` uncomment line: 364, i.e. have the function `_isPlayerPlaying` always return `true`.

## Updates:
Now added also `react-native-sound` as a working example, to hopefully make it easier to find the bug in `expo-av` or `react-native-music-control`.