import React, { useState } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export default function App() {
  const [pdfSource, setPdfSource] = useState(null);

  // Function to handle PDF selection from document picker
  const selectPdfFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      if (result) {
        const { uri, name } = result[0];
        const localFilePath = `${RNFS.DocumentDirectoryPath}/${name}`;

        // Copy the file to the app's local directory
        await RNFS.copyFile(uri, localFilePath);

        // Set the PDF source to the local file path
        setPdfSource({ uri: localFilePath });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the document picker');
      } else {
        console.log('Error picking document:', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select PDF" onPress={selectPdfFile} />
      
      {pdfSource && (
        <Pdf
          trustAllCerts={false}
          source={pdfSource}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
