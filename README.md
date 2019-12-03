## About wowvideo

This project was created using React-Native.  
It is a video app where a user gets shown videos. The user can change channels and will get a video that autoplays on that channel. Videos that have not been seen will be shown first. If all the videos in a channel have been watched then the channel resets.

The project makes use of the component react-native-youtube.

## Technologies used

- React-Native

## Installation and Quick Set Up

The instructions below are for Mac users.

Before being able to install the app you need to have react-native, npm, cocoapods and Xcode installed.
npm is the package manager used and the Xcode tool is used to simulate an iPhone to test your app.  Cocoapods is also required to manage dependencies for your Xcode project.

For more information about npm, Xcode and react native click on the relevent link below:
[npm](https://www.npmjs.com/)
[react-native](https://facebook.github.io/react-native/docs/getting-started)
[Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
[Cocoapods](https://guides.cocoapods.org/using/getting-started.html)

On your Mac terminal run the following (excluding the $ sign):

1. $ git clone https://github.com/AllanRaf/wowvideo
2. $ cd wowvideo
3. $ npm install
4. $ react-native link react-native-youtube
   Navigate to the ios folder to ensure that react-native-youtube has been linked to your project
5. $ cd ios
For the following ensure that Cocoapods has been installed (See Cocoapods above)
6. $ pod install
7. $ cd ..
8. $ react-native run-ios

## Changing Channels

Click on the emojis underneath the title 'Channel Selector' to change channels.  You can slide the emojis left or right to view the other channels.

## Known Issues

When the the app is first run the default channel and icon is not be displayed. These become visible when a channel is selected.

react-native-youtube was used to play videos. There seemed to be an issue using videoId when a playlist was supplied to the component. The videoId never changed and defaulted to the first video in the playlist even though a different video was playing on the playlist.  Initially, this would have been useful when implementing the algorithm to calculate whether a video had been seen or not, however, as videoId did not change in line with the playlist this was not used.


## Future Work

- Display number of unseen videos underneath each channel.
- Let the user skip a video by pressing on the same channel again.




