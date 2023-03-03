import { Camera } from "expo-camera";
import { ImageEditor } from "expo-image-editor";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { uploadReceipt } from "../functions/bucketFun";
import { getDataFromOCR } from "../functions/connectToOCRFun";
export default function App({ route, navigation }) {
  const userParams = route.params;

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  //const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  // const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.torch)

  const [image, setImageToBeCroppedUri] = useState(undefined);
  const [editorVisible, setEditorVisible] = useState(false);

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
      quality: 0.35,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.35,
      allowsEditing: false,
    });

    //UPLOADS TO STORAGE **********
    //const storageName= "example12"
    setPhoto(result);
    //************ JACOB WHERE DOES THIS GO?? */

    // if (!result?.canceled) {
    //   launchEditor(result.uri);
    // }
  };

  //function to launch the image editor
  const launchEditor = (imageObject) => {
    // Then set the image uri
    setImageToBeCroppedUri(imageObject);
    // And set the image editor to be visible
    setEditorVisible(true);
  };

  //function to convert image uri to base64
  function imageUriToBase64(uri, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", uri);
    xhr.responseType = "blob";
    xhr.send();
  }

  if (image) {
    return (
      <View>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + image.base64 }}
        />
        <ImageEditor
          visible={editorVisible}
          onCloseEditor={() => {
            setEditorVisible(false);
            setImageToBeCroppedUri(null);
          }}
          imageUri={image.uri}
          fixedCropAspectRatio={9 / 16}
          mode="crop-only"
          lockAspectRatio={false}
          minimumCropDimensions={{
            width: 100,
            height: 100,
          }}
          onEditingComplete={(cropResult) => {
            // When the image is cropped
            // Get the cropped image uri and base64
            imageUriToBase64(cropResult.uri, function (base64String) {
              const updatedCroppedImageUri = {
                ...cropResult,
                base64: base64String.replace("data:image/jpeg;base64,", ""),
              };
              setPhoto(updatedCroppedImageUri);
              setImageToBeCroppedUri(null);
            });
          }}
        />
      </View>
    );
  }

  if (photo) {
    let savePhoto = async () => {
      const url = await uploadReceipt(photo, userParams.userid);
      //pass to the OCR that returns receipt data based off url
      let receiptData = await getDataFromOCR(url);
      // await MediaLibrary.saveToLibraryAsync(photo.uri);
      if (receiptData.items.length > 2 || receiptData.store_name != undefined || receiptData.total != undefined) {
        navigation.replace("EditToDB", {
        userid: userParams.userid,
        receiptData: receiptData,
        url: url,
      });
      } else {
        alert("receipt could not be scanned")
      }
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
        <Button title="Crop" onPress={() => launchEditor(photo)} />
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
      <View
        style={{
          alignSelf: "center",
          flex: 1,
          alignItems: "center",
          bottom: 0,
          position: "absolute",
        }}
      >
        <TouchableOpacity
          onPress={takePic}
          style={{
            width: 70,
            height: 70,
            bottom: 0,
            borderRadius: 50,
            backgroundColor: "#fff",
          }}
        />
      </View>

      <View style={styles.buttonContainer2}>
        <Button title="Upload..." onPress={pickImage} />
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
