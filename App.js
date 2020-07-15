import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

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

  return (
    <View style={{ flex: 1 }}>
      {/* Camera component type is for selecting the type of camera, front or back, using constants provided by 
      Camera.Constants.Type.back. ref prop is set to a state so that different methods can provided by this 
      instance of camera component can be used (e.g. cameraRef.takePictureAsunc()) */}
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
              alignSelf: "center",
            }}
            onPress={() => {
              setFlashMode(
                type === Camera.Constants.FlashMode.on
                  ? Camera.Constants.FlashMode.off
                  : Camera.Constants.FlashMode.on
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flash{" "}
            </Text>
          </TouchableOpacity>

          {/* alternate code for flipping the camera front to back */}
          {/* <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity> */}

          {/* touchable button for taking photo */}
          {/* <TouchableOpacity
            style={{ alignSelf: "center", marginBottom: 50 }}
            onPress={async () => {
              if (cameraRef) {
                let photo = await cameraRef.takePictureAsync();
                console.log("photo", photo);
              }
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderRadius: "50%",
                borderColor: "white",
                height: 50,
                width: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: "50%",
                  borderColor: "white",
                  height: 40,
                  width: 40,
                  backgroundColor: "white",
                }}
              ></View>
            </View>
          </TouchableOpacity> */}
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
              }}
            >
              <Ionicons
                name="ios-photos"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
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
