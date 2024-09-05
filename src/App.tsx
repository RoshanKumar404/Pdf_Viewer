import React, { useState, useEffect } from 'react';
import { View,TextInput, Button, Dimensions } from 'react-native';
import { selectPdfFile } from './DocumnetPicker';
import PdfViewer from './PdfViewer';

export default function App() {
  const [pdfSource, setPdfSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [orientation, setOrientation] = useState('portrait');
  const [password,setPassword]=useState('')

  // Detect screen orientation
  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    updateOrientation();

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>

      {!pdfSource ? (
        <View>
        <Button title="Select PDF" onPress={() => selectPdfFile(setPdfSource)} />
        <TextInput
            placeholder="Enter PDF Password"
            value={password}
            onChangeText={setPassword}
            style={{ borderWidth: 1, marginTop: 20, padding: 10 }}
            secureTextEntry={true}
          />
       </View>
      ) : (
        <PdfViewer
          pdfSource={pdfSource}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          password={password}
        />
      )}
    </View>
  );
}
