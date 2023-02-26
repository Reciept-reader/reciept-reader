import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import EditToDB from "./EditToDB";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import Torch from "react-native-torch";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  // const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.torch)

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // get secure url from our server
    const { url } = await fetch("http://localhost:8080/s3Url").then((res) =>
      res.json()
    );
    const response = await fetch(result.assets[0].uri);
    const blob = await response.blob();
    console.log(url, blob, blob.type);
    // post the image direclty to the s3 bucket
    const response2 = await fetch(url, {
      method: "PUT",
      body: blob,
    });
    console.log(response2);
  };
  if (photo) {
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        navigation.navigate("EditToDB");
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        {hasMediaLibraryPermission ? (
          <Button title="Save/Upload" onPress={savePhoto} />
        ) : undefined}
        <Button title="Re-take" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef} flashMode={flash}>
      <View style={styles.flash}>
        <Icon.Button
          name="flash"
          size={30}
          onPress={() =>
            setFlash(
              flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            )
          }
          color={flash === Camera.Constants.FlashMode.off ? "gray" : "#fff"}
        ></Icon.Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="" onPress={takePic} />
      </View>
      <View style={styles.buttonContainer2}>
        <Button title="Upload pic" onPress={pickImage} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "#fff",
    flex: 1,
    position: "absolute",
    alignSelf: "center",
  },
  buttonContainer2: {
    backgroundColor: "#fff",
    // alignSelf: 'left',
    position: "absolute",
    bottom: 0,
  },
  flash: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  titleText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonStyle: {
    justifyContent: "center",
    marginTop: 15,
    padding: 10,
    backgroundColor: "#8ad24e",
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: "#fff",
    textAlign: "center",
  },
});
