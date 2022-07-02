# My Note
## _An android application for taking notes_

## Features

- Simple CRUD operations for note
- Use a sortable list so that users can drag-and-drop to change note order.
- Use a RichTextEditor for note body
- Datetime and label can be assigned to each note

## Installation

Assume that your machine is running Linux OS and you have docker installed.

Clone the repo:

```sh
git clone https://github.com/phandaiduonghcb/NoteApp
cd NoteApp
```

Run docker image (install xauth if necessary):

```sh
XAUTHORITY=$(xauth info | grep "Authority file" | awk '{ print $3 }')
sudo docker run -it -v "$PWD":/NoteApp --name NoteApp --device=/dev/kvm -v $XAUTHORITY:/root/.Xauthority -v /tmp/.X11-unix:/tmp/.X11-unix:ro -e DISPLAY=$DISPLAY --net=host reactnativecommunity/react-native-android:5.4 bash
```
Install an android emulator:
```sh
sdkmanager "system-images;android-23;google_apis;x86"
echo "no" | avdmanager --verbose create avd --force --name my_android_phone --device "26" --package "system-images;android-23;google_apis;x86"
```
Run the emulator:
```sh
emulator @my_android_phone -gpu swiftshader_indirect
```
Open two terminals and use "docker exec":
```sh
sudo docker exec -it NoteApp bash
cd NoteApp
```
Run these commands on one terminal
```sh
npm i
npx react-native start
```
and this command on the other terminal:
```sh
npx react-native run-android
```
> Note: in case you get **npm ERR! cb() never called!** error, please remove "node_modules" folder and "package-lock.json" file and run `npm cache clean --force` then try again. 
