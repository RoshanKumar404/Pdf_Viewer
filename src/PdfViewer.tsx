import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import { Share } from 'react-native';
const PdfViewer = ({ pdfSource,password, currentPage, setCurrentPage, totalPages, setTotalPages }) => {
  const openInAnotherApp = async () => {
    try {
      await Share.share({
        url: pdfSource.uri,
        title: 'Open PDF',
        message: 'Check out this PDF file.',
      });
    } catch (error) {
      console.log('Error sharing PDF:', error);
    }
  };

  const styles = createStyles(Dimensions.get('window'));

  return (
    <View style={styles.pdfContainer}>
      <View style={styles.NameContainer}>
        <Text style={styles.fileName}>{pdfSource.name}</Text>
        <Pressable onPress={openInAnotherApp}>
          <Text style={styles.threedot}>⋮</Text>
        </Pressable>
      </View>
      <Pdf
        source={pdfSource}
        onPageChanged={(page) => setCurrentPage(page)}
        onLoadComplete={(numberOfPages) => setTotalPages(numberOfPages)}
        style={styles.pdf}
      />
      <View style={styles.pageCounter}>
        <Text style={styles.pageCounterText}>
          Page {currentPage} / {totalPages}
        </Text>
      </View>
    </View>
  );
};

const createStyles = (window) => StyleSheet.create({
  pdfContainer: {
    flex: 1,
    width: window.width,
    height: window.height,
  },
  NameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  fileName: {
    flex: 4,
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  threedot: {
    fontSize: 30,
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
  pageCounterText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default PdfViewer;
