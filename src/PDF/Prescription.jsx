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
    marginBottom: 5,
  },
  content: {
    fontSize: 12,
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

// Create Document Component
const Prescription = ({ doctorName, patientName, age, date, medications }) => (
  <Document>
    <Page size="A5" style={styles.page}>
      {/* Patient Details */}
      <View style={styles.section}>
        <Text style={styles.label}>Patient Name:</Text>
        <Text style={styles.content}>{patientName}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.content}>{age}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.content}>{date}</Text>
      </View>

      {/* Prescription Details */}
      <View style={styles.prescriptionSection}>
        <Text style={styles.label}>Prescription:</Text>
        {medications.map((med, index) => (
          <Text key={index} style={styles.prescriptionItem}>
            {index + 1}. {med.name} - {med.dosage} ({med.instructions})
          </Text>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Prescribed by: Dr. {doctorName}</Text>
        <Text>Thank you for visiting our clinic.</Text>
      </View>
    </Page>
  </Document>
);

export default Prescription;

export const NewPrescription = ({ data }) => {
  <Document>
    <Page size="A5" style={styles.page}>
      <View style={styles.header}></View>
      {/* Patient Details */}
      <View style={styles.section}>
        <Text style={styles.content}>Date: </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Name:</Text>
        {/* <Text style={styles.content}>{patientName}</Text> */}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Age:</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Date:</Text>
      </View>

      {/* Prescription Details */}
      <View style={styles.prescriptionSection}>
        <Text style={styles.label}>Prescription:</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}></View>
    </Page>
  </Document>;
};
