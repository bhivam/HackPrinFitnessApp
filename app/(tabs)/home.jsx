import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Spline Scene</Text>
      <View style={styles.webviewContainer}>
        <WebView 
          source={{ uri: 'https://prod.spline.design/G8QAMi4SlaROOVDN/scene.splinecode' }} 
          style={styles.webview}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontFamily: 'System', 
    textAlign: 'center',
    fontSize: 24, 
    marginVertical: 20,
  },
  webviewContainer: {
    flex: 1,
    marginHorizontal: 10, 
  },
  webview: {
    flex: 1,
  },
});

export default Home;
