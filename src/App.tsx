import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Dimensions, Pressable, Alert, Linking, Share } from 'react-native';
import Pdf from 'react-native-pdf';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { Header } from 'react-native/Libraries/NewAppScreen';


export default function App() {
  const [pdfSource, setPdfSource] = useState(null);
  const[buttonon,setbuttonon]=useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [orientation, setOrientation] = useState('portrait');

  // Detect screen orientation
  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    const subscription=Dimensions.addEventListener('change', updateOrientation);
    updateOrientation(); // Set the initial orientation

    return () => {
      subscription.remove()
    };
  }, []);
  const selectPdfFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
  
      if (result) {
        const { uri, name } = result[0];
        const localFilePath = `${RNFS.DocumentDirectoryPath}/${name}`;
        await RNFS.copyFile(uri, localFilePath);
        setPdfSource({ uri: localFilePath, name });
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log("User canceled the document picking");
      } else {
        console.log("Error picking the document", error);
      }
    }
  };
  
  


  const styles = orientation === 'portrait' ? portraitStyles : landscapeStyles;

//   const ThreeDotButton=()=>{
// Alert.alert('button pressed')
//   }
const openInAnotherApp = async () => {
  try {
    await Share.share({
      url: pdfSource.uri, // Use the URI of the PDF
      title: 'Open PDF',
      message: 'Check out this PDF file.', // Optional: You can include a message
    });
  } catch (error) {
    console.log('Error sharing PDF:', error);
  }
};

  return (
    <View style={styles.container}>
     
  

      {!pdfSource? (
         <Button title="Select PDF" onPress={selectPdfFile} />
        ) : (

        <View style={styles.pdfContainer}>
          <View style={styles.NameContainer}>
          <Text style={styles.fileName}>{pdfSource.name}</Text>
           <Pressable 
           onPress={openInAnotherApp}
           >
            <Text style={styles.threedot}>⋮</Text>  
           </Pressable>
           
          </View>
          <Pdf
            trustAllCerts={false}
            fitWidth={true}
            source={pdfSource}
            onLoadProgress={(percent) => {
              console.log(`Loading progress: ${percent}%`);
          }}
          
            onLoadComplete={(numberOfPages, width, height) => {
              setTotalPages(numberOfPages);
              setCurrentPage(1);
              console.log(`PDF loaded with ${numberOfPages} pages. Page size: ${width}x${height}`);
          }}
         
          
            onPageChanged={(page) => {
              setCurrentPage(page);
        
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
              Linking.openURL(uri)
              
            }}
            style={styles.pdf}
          />
          <View style={styles.pageCounter}>
            <Text style={styles.pageCounterText}>
              Page {currentPage} / {totalPages}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const portraitStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  NameContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'100%',
    paddingHorizontal:10,
    marginBottom:10,
  },
  fileName: {
    flex: 4, 
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden', 
  },
  dotContainer: {
    flex: 1, 
    alignItems: 'flex-end', 
  },
  threedot:{
fontSize:30
  },
  pdfContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pdf: {
    flex: 1,
  },
  pageCounter: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  }, 
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  pageCounterText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

const landscapeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  pdfContainer: {
    flex: 1,
    width: Dimensions.get('window').height,
    height: Dimensions.get('window').width,
  },
  pdf: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  pageCounter: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 4,
  },
  pageCounterText: {
    color: '#ffffff',
    fontSize: 14,
  },
  NameContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'100%',
    paddingHorizontal:10,
    marginBottom:10,
  },
  fileName: {
    flex: 4, 
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden', 
  },
  dotContainer: {
    flex: 1, 
    alignItems: 'flex-end', 
  },
  threedot:{
fontSize:24
  },
});
