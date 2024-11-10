import React, { useState, useRef } from 'react';
import { Camera, useCameraPermissions } from 'expo-camera';
import { StyleSheet, Text, TouchableOpacity, View, Button, Pressable } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  if (!permission || !mediaPermission) {
    return <View />; // Waiting for permissions status to load
  }

  if (!permission.granted || !mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permissions to use the camera and save videos</Text>
        <Button onPress={() => { requestPermission(); requestMediaPermission(); }} title="Grant Permissions" />
      </View>
    );
  }

  // Start recording video
  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        const videoRecordPromise = cameraRef.current.recordAsync({ quality: '1080p', mode: 'video' });
        setIsRecording(true);
        const data = await videoRecordPromise;
        console.log("Video recording completed:", data.uri);

        // Save video to media library and AsyncStorage, then navigate
        await MediaLibrary.createAssetAsync(data.uri);
        await AsyncStorage.setItem("recordedVideo", data.uri);
        navigation.navigate("Upload", { videoUri: data.uri });
      } catch (error) {
        console.error("Error recording video:", error);
      } finally {
        setIsRecording(false);
      }
    }
  };

  // Stop recording video
  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={"front"} mode="video">
        <Pressable style={styles.recordButton} onPress={isRecording ? stopRecording : startRecording}>
          <Text style={styles.text}>{isRecording ? 'Stop' : 'Record'}</Text>
        </Pressable>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  message: {
    textAlign: 'center',
    color: '#fff',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  recordButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CameraScreen;

