import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImagePickerIOS,
} from "react-native";
import { Camera } from "expo-camera";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.on);
  const [autoFocus, setAutoFocus] = useState(Camera.Constants.AutoFocus.on);

  // this will get permission from user to access camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  //get permission to camera roll
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  //onPress event handler to access the camera roll
  const cameraRollHandler = async () => {
    const hasCamRollPermissions = await verifyPermissions();
    if (!hasCamRollPermissions) {
      return;
    }
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  };



  return (
    <View style={{ flex: 1 }}>
      {/* Camera component type is for selecting the type of camera, front or back, using constants provided by 
      Camera.Constants.Type.back. ref prop is set to a state so that different methods provided to this 
      instance of camera component can be used (e.g. takePictureAsync()) */}
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
        flashMode={flashMode}
        autoFocus={autoFocus}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              paddingTop: 70,
              marginRight: 30,
            }}
            onPress={() => {
              setFlashMode(
                flashMode === Camera.Constants.FlashMode.on
                  ? Camera.Constants.FlashMode.off
                  : Camera.Constants.FlashMode.on
              );
            }}
          >
            <Ionicons
              name={
                flashMode === Camera.Constants.FlashMode.on
                  ? "ios-flash"
                  : "ios-flash-off"
              }
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20,
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
                paddingBottom: 20,
              }}
            >
              <Ionicons
                name="ios-photos"
                style={{ color: "#fff", fontSize: 40 }}
                onPress={cameraRollHandler}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
                paddingBottom: 20,
              }}
            >
              <FontAwesome
                name="camera"
                style={{ color: "#fff", fontSize: 40 }}
                onPress={async () => {
                  if (cameraRef) {
                    let photo = await cameraRef.takePictureAsync();
                    console.log("photo", photo);
                  }
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
                paddingBottom: 20,
              }}
            >
              <MaterialCommunityIcons
                name="camera-switch"
                style={{ color: "#fff", fontSize: 40 }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}
