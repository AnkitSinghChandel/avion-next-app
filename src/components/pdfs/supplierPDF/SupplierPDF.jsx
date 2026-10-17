import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import dayjs from "dayjs";
import { styles } from "../teamsPDF/TeamSinglePDFStyle";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  Image,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Pdficon from "../../../assets/icons/pdf-icon.svg";
import { LoadingOutlined } from "@ant-design/icons";
import { universalFormatCurrency } from "../../../utils/formatCurrency";

// PDF Document Component
const SupplierPDF = ({ supplierPDFData = [] }) => {
  // console.log("asc56", supplierPDFData);
  const [see, setSee] = useState(false);

  const dummyData = Array.from({ length: 30 }, (_, index) => ({
    ...supplierPDFData[0],
    teamId: `dummy-${index}`,
  }));

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* HEADER (Fixed on all pages) */}
        <View style={styles.header} fixed>
          <Text style={styles.headerTxt}>Avion</Text>
          <Text style={styles.headerTxt}>{moment().format("DD/MM/YYYY")}</Text>
        </View>

        {/* IMAGE */}
        <View style={styles.image} fixed>
          <Image src="/avion.png" />
        </View>

        {/* CONTENT */}
        <View style={styles.employee}>
          <Text style={styles.subtitle}>Supplier Name</Text>
          <Text style={styles.subtitle2}>
            {[supplierPDFData[0].name].filter(Boolean).join(" ") ||
              "Supplier Profile"}
          </Text>
          <Text style={styles.subtitle2}>
            {[supplierPDFData[0].country]} - {[supplierPDFData[0].postalCode]}
          </Text>
        </View>

        <View style={styles.PersonalInformation}>
          <Text style={styles.contentTxt1}>Personal Information</Text>
        </View>

        {/* <View style={styles.greenLine} /> */}

        {/* FLEX CONTENT */}
        <View style={styles.flexDiv}>
          <View>
            <Text style={styles.flexDivTxt1}>Name</Text>
            <Text style={styles.flexDivTxt2}>{[supplierPDFData[0].name]}</Text>

            <Text style={styles.flexDivTxtEmail}>Email</Text>
            <Text style={styles.flexDivTxt2}>{[supplierPDFData[0].email]}</Text>
            <Text style={styles.flexDivTxtEmail}>Country</Text>
            <Text style={styles.flexDivTxt2}>
              {[supplierPDFData[0].country]}
            </Text>
          </View>

          <View>
            <Text style={styles.flexDivTxt1}>Phone Number</Text>
            <Text style={styles.flexDivTxt2}>{[supplierPDFData[0].phone]}</Text>

            <Text style={styles.flexDivTxtEmail}>Status</Text>
            <Text style={styles.flexDivTxt2}>
              {[supplierPDFData[0].status]}
            </Text>
            <Text style={styles.flexDivTxtEmail}>Postal Code</Text>
            <Text style={styles.flexDivTxt2}>
              {[supplierPDFData[0].postalCode]}
            </Text>
          </View>
        </View>

        <Text
          style={{
            // paddingTop: "20px",
            paddingVertical: "20px",
            textAlign: "right",
            fontSize: "12px",
            color: "#64748B",
          }}
        >
          Supplier creation date:{" "}
          {dayjs([supplierPDFData[0].createdAt]).format("DD/MM/YYYY")}
        </Text>

        {/* STATIC TABLE */}
        {see && (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableHeaderCol}>
                <Text style={styles.tableHeaderText}>Header1</Text>
              </View>
              <View style={styles.tableHeaderCol}>
                <Text style={styles.tableHeaderText}>Header2</Text>
              </View>
              <View style={styles.tableHeaderCol}>
                <Text style={styles.tableHeaderText}>Header3</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>Row1 Data1</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>Row1 Data2</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>Row1 Data3</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>Row2 Data1</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>Row2 Data2</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>Row2 Data3</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>Row3 Data1</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>Row3 Data2</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>Row3 Data3</Text>
              </View>
            </View>
          </View>
        )}

        {/* Left label Right value format Table (Key-Value Table) */}
        <View style={styles.table_KVT}>
          <View style={styles.tableRow_KVT}>
            <View style={styles.tableHeaderCol_KVT}>
              <Text style={styles.tableHeaderText_KVT}>Name</Text>
            </View>

            <View style={styles.tableDataCol_KVT}>
              <Text style={styles.tableDataTxt_KVT}>
                {[supplierPDFData[0].name]}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow_KVT}>
            <View style={styles.tableHeaderCol_KVT}>
              <Text style={styles.tableHeaderText_KVT}>Company Name</Text>
            </View>

            <View style={styles.tableDataCol_KVT}>
              <Text style={styles.tableDataTxt_KVT}>
                {[supplierPDFData[0].companyName]}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow_KVT}>
            <View style={styles.tableHeaderCol_KVT}>
              <Text style={styles.tableHeaderText_KVT}>Country</Text>
            </View>

            <View style={styles.tableDataCol_KVT}>
              <Text style={styles.tableDataTxt_KVT}>
                {[supplierPDFData[0].country]}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow_KVT}>
            <View style={styles.tableHeaderCol_KVT}>
              <Text style={styles.tableHeaderText_KVT}>State</Text>
            </View>

            <View style={styles.tableDataCol_KVT}>
              <Text style={styles.tableDataTxt_KVT}>
                {[supplierPDFData[0].state]}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow_KVT}>
            <View style={styles.tableHeaderCol_KVT}>
              <Text style={styles.tableHeaderText_KVT}>City</Text>
            </View>

            <View style={styles.tableDataCol_KVT}>
              <Text style={styles.tableDataTxt_KVT}>
                {[supplierPDFData[0].city]}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow_KVT}>
            <View style={styles.tableHeaderCol_KVT}>
              <Text style={styles.tableHeaderText_KVT}>Postal Code</Text>
            </View>

            <View style={styles.tableDataCol_KVT}>
              <Text style={styles.tableDataTxt_KVT}>
                {[supplierPDFData[0].postalCode]}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow_KVT}>
            <View style={styles.tableHeaderCol_KVT}>
              <Text style={styles.tableHeaderText_KVT}>GST Number</Text>
            </View>

            <View style={styles.tableDataCol_KVT}>
              <Text style={styles.tableDataTxt_KVT}>
                {[supplierPDFData[0].gstNumber]}
              </Text>
            </View>
          </View>
        </View>

        {/* Top + Bottom dono se margin 👇 */}
        <View style={{ marginVertical: 10 }} />

        {/* DYNAMIC TABLE */}
        <View
          // style={styles.table}
          style={{ ...styles.table, opacity: 0 }}
        >
          <View style={styles.tableRow} fixed>
            <View
              // style={styles.tableHeaderCol}
              style={{ ...styles.tableHeaderCol, width: "12%" }}
            >
              <Text style={styles.tableHeaderText}>Sr.</Text>
            </View>
            <View style={styles.tableHeaderCol}>
              <Text style={styles.tableHeaderText}>First Name</Text>
            </View>
            <View style={styles.tableHeaderCol}>
              <Text style={styles.tableHeaderText}>Last Name</Text>
            </View>
            <View style={styles.tableHeaderCol}>
              <Text style={styles.tableHeaderText}>Tech</Text>
            </View>
            <View style={styles.tableHeaderCol}>
              <Text style={styles.tableHeaderText}>Phone</Text>
            </View>
            <View style={styles.tableHeaderCol}>
              <Text style={styles.tableHeaderText}>Devs Price</Text>
            </View>
          </View>

          {supplierPDFData.map((item, index) => (
            <View key={item.teamId} style={styles.tableRow} wrap={false}>
              <View
                // style={styles.tableDataCol}
                style={{ ...styles.tableDataCol, width: "12%" }}
              >
                <Text style={styles.tableDataTxt}>{index + 1}</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>{item.firstName}</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>{item.lastName}</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>
                  {item.technology || "-"}
                </Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>{item.phoneNumber}</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>
                  {universalFormatCurrency(item.devsPrice)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* FOOTER */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerTxt}>
            © {moment().format("YYYY")} Avion. All rights reserved.
          </Text>
          <Text style={styles.footerTxt}>
            {/* Confidential — For authorized use only. */}
          </Text>
          <Text
            style={styles.footerTxt}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>

        {/* footer second row */}
        <View style={styles.footer2} fixed>
          <Text style={styles.footerTxt}>
            Confidential — For authorized use only.
          </Text>
          <Text style={styles.footerTxt}>
            {/* Confidential — For authorized use only. */}
          </Text>
          {/* <Text
            style={styles.footerTxt}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          /> */}
        </View>
      </Page>
    </Document>
  );
};

export default SupplierPDF;

// PDF Preview
export const SupplierPDFPreview = ({ supplierPDFData = [] }) => {
  return (
    <div className="hidde-n">
      <h5>PDF Preview</h5>
      <PDFViewer style={{ width: "100%", height: "700px" }}>
        <SupplierPDF supplierPDFData={supplierPDFData} />
      </PDFViewer>
    </div>
  );
};

// PDF Download
export const SupplierPDFDownload2 = ({ supplierPDFData = [] }) => {
  return (
    <PDFDownloadLink
      document={<SupplierPDF supplierPDFData={supplierPDFData} />}
      // fileName="Avion-Team.pdf"
      fileName={`Avion-Supplier-${supplierPDFData[0]?.name}.pdf`}
    >
      {({ loading }) =>
        loading ? <LoadingOutlined /> : <img src={Pdficon} alt="" />
      }
    </PDFDownloadLink>
  );
};

export const SupplierPDFDownload = ({ supplierPDFData = [] }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();

    if (loading || !supplierPDFData.length) return;

    setLoading(true);

    try {
      const blob = await pdf(
        <SupplierPDF supplierPDFData={supplierPDFData} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `Avion-Supplier-${supplierPDFData[0]?.name}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading || !supplierPDFData.length}
      title={loading ? "Generating PDF..." : "Download PDF"}
      style={{
        border: "none",
        background: "transparent",
        cursor: loading ? "progress" : "pointer",
      }}
    >
      {loading ? <LoadingOutlined /> : <img src={Pdficon} alt="Download PDF" />}
    </button>
  );
};
