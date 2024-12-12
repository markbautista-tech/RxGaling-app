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

const MedicalCertificates = ({ data }) => {
  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>MEDICAL CERTIFICATE</Text>
        </View>

        {/* Prescription Details */}
        <View style={styles.prescriptionSection}>
          <Text style={styles.label}>
            This is to certify that {data?.name.toUpperCase()},{data.age} years
            old, consulted on {data.consulted_on}
            with the following clinical impression{" "}
          </Text>
        </View>
        <View style={styles.prescriptionSection}>
          <Text style={styles.label}>{data.impression}</Text>
        </View>
        <View style={styles.prescriptionSection}>
          <Text style={styles.label}>
            And would need medical attention for {data.days_needed} day(s)
            barring complications.
          </Text>
        </View>
        <View style={styles.prescriptionSection}>
          <Text style={styles.label}>Further Recommendations:</Text>
          <Text style={styles.label}>{data.recommendation}</Text>
        </View>
        <View style={styles.prescriptionSection}>
          <Text style={styles.label}>Disclaimer:</Text>
          <Text style={styles.label}>{data.disclaimer}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}></View>
        <View style={styles.footer}></View>
      </Page>
    </Document>
  );
};

export default MedicalCertificates;
