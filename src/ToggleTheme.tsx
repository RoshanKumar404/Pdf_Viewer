import { Dimensions, StyleSheet } from "react-native";

const lightTheme = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
      backgroundColor: '#ffffff', // Light background
    },
    pdf: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    pdfContainer: {
        flex: 1,
        backgroundColor: '#ffffff', // Light background for PDF
      },
    button: {
      marginBottom: 20,
      backgroundColor: '#000000', // Dark button for contrast
    },
    buttonText: {
      color: '#ffffff', // White text
    },
  });
  
  const darkTheme = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
      backgroundColor: '#000000', // Dark background
    },
    pdf: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    pdfContainer: {
        flex: 1,
        backgroundColor: '#000000', // Dark background for PDF
      },
    button: {
      marginBottom: 20,
      backgroundColor: '#ffffff', // Light button for contrast
    },
    buttonText: {
      color: '#000000', // Black text
    },
  });
  export {darkTheme,lightTheme}