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
    fontSize: 9,
    color: "#333",
    marginBottom: 1,
  },
  content: {
    fontSize: 10,
    fontWeight: "bold",
  },
  prescriptionSection: {
    marginTop: 10,
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

const SOAPNotes = ({ data }) => {
  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>SOAP NOTES</Text>
        </View>

        {/* Patient Details */}
        <View style={styles.section}>
          <Text style={styles.label}>Date: {data.date}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Name: {data.name.toUpperCase()}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Age: {data.age}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Gender: {data.gender}</Text>
        </View>

        {/* Prescription Details */}
        <View style={styles.prescriptionSection}>
          <Text style={styles.content}>SUBJECTIVE</Text>
          <Text style={styles.label}>Chief Complaint: </Text>
          <Text style={styles.label}>{data.complaint}</Text>
          <Text style={styles.label}>Histpry of Present Illness: </Text>
          <Text style={styles.label}>{data.history}</Text>
        </View>
        <View style={styles.prescriptionSection}>
          <Text style={styles.label}>OBJECTIVE</Text>
          <Text style={styles.label}>Remarks:</Text>
          <Text style={styles.label}>{data.objRemarks}</Text>
        </View>
        <View style={styles.prescriptionSection}>
          <Text style={styles.label}>ASSESSMENT</Text>
          <Text style={styles.label}>Diagnosis:</Text>
          <Text style={styles.label}>{data.diagnosis}</Text>
        </View>
        <View style={styles.prescriptionSection}>
          <Text style={styles.label}>PLAN</Text>
          <Text style={styles.label}>Plan:</Text>
          <Text style={styles.label}>{data.plan}</Text>
        </View>
        <View style={styles.prescriptionSection}>
          <Text style={styles.label}>Follow-up Checkup Date:</Text>
          <Text style={styles.label}>{data.follow_date}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}></View>
        <View style={styles.footer}></View>
      </Page>
    </Document>
  );
};

export default SOAPNotes;
