import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import { useState } from 'react';

const selectPdfFile=async (setPdfSource)=>{
  try {
    const result = await DocumentPicker.pick({
      type:[DocumentPicker.types.pdf]
    })

    if(result){
      const {uri,name}= result[0]
      const localFilePath=`${RNFS.DocumentDirectoryPath}/${name}`;
      await RNFS.copyFile(uri,localFilePath);
      setPdfSource({uri:localFilePath,name});
    }
  } catch (error) {
    if(DocumentPicker.isCancel(error)){
      console.log("user dont want you to read the pdf");
      
    }else{
      console.log("mila hi nahi pdf ", error);
      
    }
    
  }

}

export {selectPdfFile};