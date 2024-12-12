import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    borderBottom: "1px solid #000",
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 12,
    color: "#666",
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 10,
    color: "#333",
    marginBottom: 2,
  },
  content: {
    fontSize: 11,
    fontWeight: "bold",
  },
  prescriptionSection: {
    marginTop: 20,
  },
  prescriptionItem: {
    fontSize: 12,
    marginBottom: 5,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    borderTop: "1px solid #000",
    paddingTop: 10,
  },
});

const NewPrescription = ({ data }) => {
  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Prescription</Text>
        </View>

        {/* Patient Details */}
        <View style={styles.section}>
          <Text style={styles.content}>Prescription ID: {data.code}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Date: {data.date}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Name: {data.name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Age: {data.age}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Gender: {data.gender}</Text>
        </View>

        {/* Prescription Details */}
        <View style={styles.prescriptionSection}>
          <Text style={styles.label}>Prescription:</Text>
          <Text style={styles.content}>
            {data.generic}
            {` (${data.brand})`}
            {` ${data.dosage}/${data.form}`}
          </Text>
        </View>
        <View style={styles.prescriptionSection}>
          <Text style={styles.label}>SIG: </Text>
          <Text style={styles.label}>{data.sig} </Text>
        </View>
        <View style={styles.prescriptionSection}>
          <Text style={styles.label}>REMARKS: </Text>
          <Text style={styles.label}>{data.rem}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}></View>
        <View style={styles.footer}></View>
      </Page>
    </Document>
  );
};

export default NewPrescription;
