
import { useState } from 'react';

const [pdfSource,setpdfsource]=useState(null)
const selectPdfFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      if (result) {
        const { uri, name } = result[0];
        const localFilePath = `${RNFS.DocumentDirectoryPath}/${name}`;
        await RNFS.copyFile(uri, localFilePath);
        setpdfsource({ uri: localFilePath });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the document picker');
      } else {
        console.log('Error picking document:', err);
      }
    }
  };

  export {selectPdfFile};