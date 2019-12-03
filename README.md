## About wowvideo

This project was created using React-Native.  It has been designed for the iOS platform and will work with Xcode to simulate an iPhone.

wowvideo is a video app where a user gets shown hand picked videos. The user can change channels and will get a video that autoplays on that channel. Videos that have not been seen will be shown first and if a user has seen all the videos in the channel the channel will be reset so that the videos are replayed and you are not left with an empty channel.

The project makes use of the component react-native-youtube to play videos.

## Technologies used

- React-Native
- react-native-youtube

## Installation and Quick Set Up

The instructions below are for Mac users.

Before being able to install the app and make it run you need to have react-native, npm, cocoapods and Xcode installed.

npm is the package manager used and the Xcode tool is used to simulate an iPhone to test your app. Cocoapods is also required to manage dependencies for your Xcode project.

For more information about npm, Xcode, react-native and cocoapods and how to install them click on the relevent link below:

[npm](https://www.npmjs.com/)
[react-native](https://facebook.github.io/react-native/docs/getting-started)
[Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
[Cocoapods](https://guides.cocoapods.org/using/getting-started.html)

On your Mac terminal carry out the following and execute the commands where proceeding the $ sign:

1. Clone the respository
- $ git clone https://github.com/AllanRaf/wowvideo
2. Navigate to the project folder
$ cd wowvideo
3. Install the required dependencies
$ npm install
4. Link the relevant dependencies to your Xcode project
- $ react-native link react-native-youtube
5. Navigate to the ios folder to ensure that react-native-youtube has been linked to your project
- $ cd ios
6.  For the following ensure that Cocoapods has been installed (See Cocoapods above)
- $ pod install
7. Navigate to the root directory of the project
- $ cd ..
8. Run the video app on the simulator
- $ react-native run-ios

After executing the above steps you should have the app running in the simulator:

![wowvideo](https://github.com/AllanRaf/wowvideo/blob/master/gifs/wowvideo1.gif)

## Changing Channels

Click on the emojis underneath the title 'Channel Selector' to change channels.  You can slide the emojis left or right to view the other channels.

You can also modify the [mychannels.js](https://github.com/AllanRaf/wowvideo/blob/master/channels/mychannels.js) file.  You can add an extra video to a playlist in a channel by adding a video Id to the array or even remove videos you do not like.

The videos supplied are random and may bear no relation to their channel titles.

## Known Issues

1. When the the app is first run the default channel and icon is not be displayed. These become visible when a channel is selected.

2. react-native-youtube was used to play videos. There seemed to be an issue using videoId when a playlist was supplied to the component. The videoId never changed and defaulted to the first video in the playlist even though a different video was playing on the playlist.  Initially, this would have been useful when implementing the algorithm to calculate whether a video had been seen or not, however, as videoId did not change in line with the playlist this was not used.

3. When a video has been seen it may momentarily play before moving on to next unseen video.


## Future Work

### Features to add
- Let the user skip a video by pressing on the same channel again.
- Update number of unseen videos underneath a channel

### Use Redux Middleware
- It would be useful to use Redux Middlware to handle an increased number of dispatches when the app becomes more complex.  At its current state this was not deemed necessary.






