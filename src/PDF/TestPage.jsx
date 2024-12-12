import React, { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import { useReactToPrint } from "react-to-print";
import NewPrescription from "./NewPrescription";

const doctorName = "John Doe";
const patientName = "Jane Smith";
const age = 32;
const date = "2024-12-12";
const medications = [
  {
    name: "Paracetamol",
    dosage: "500mg",
    instructions: "Twice a day after meals",
  },
  {
    name: "Ibuprofen",
    dosage: "200mg",
    instructions: "Once a day after dinner",
  },
];

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    padding: 20,
    border: "1px solid #ccc",
  },
});

// App Component
const App = () => {
  const [showViewer, setShowViewer] = useState(false);
  const componentRef = React.createRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleOpenInNewTab = () => {
    const pdfDoc = <NewPrescription />;
    pdf(pdfDoc)
      .toBlob()
      .then((pdfBlob) => {
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, "_blank"); // Opens in a new tab
      })
      .catch((err) => console.error("Error generating PDF:", err));
  };

  return (
    <div>
      <button onClick={() => setShowViewer(!showViewer)}>
        {showViewer ? "Close Viewer" : "View in Browser"}
      </button>
      <button onClick={() => handleOpenInNewTab()}>Open in tab</button>

      {/* Viewer (commented out for now) */}
      {showViewer && (
        <div ref={componentRef} style={styles.container}>
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <NewPrescription />
          </PDFViewer>
          <button onClick={handlePrint}>Print</button>
        </div>
      )}

      {/* Uncomment to enable PDF download */}
      {/* <PDFDownloadLink document={<NewPrescription />} fileName="myDocument.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink> */}
    </div>
  );
};

export default App;
