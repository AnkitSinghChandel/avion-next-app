import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NextImage from "next/image";
import moment from "moment";
import dayjs from "dayjs";
import { styles } from "./TeamSinglePDFStyle";
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
import Pdficon from "@/src/assets/icons/pdf-icon.svg";
import { LoadingOutlined } from "@ant-design/icons";
import { universalFormatCurrency } from "@/src/utils/formatCurrency";

// PDF Document Component
const TeamSinglePDF = ({ teamListPDFData = [] }) => {
  // console.log("asc56", teamListPDFData);
  const [see, setSee] = useState(false);

  const dummyData = Array.from({ length: 30 }, (_, index) => ({
    ...teamListPDFData[0],
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
          <Text style={styles.subtitle}>Employee Name</Text>
          <Text style={styles.subtitle2}>
            {[teamListPDFData[0].firstName, teamListPDFData[0].lastName]
              .filter(Boolean)
              .join(" ") || "Employee Profile"}
          </Text>
          <Text style={styles.subtitle2}>{[teamListPDFData[0].count]}</Text>
        </View>

        <View style={styles.PersonalInformation}>
          <Text style={styles.contentTxt1}>Personal Information</Text>
        </View>

        {/* <View style={styles.greenLine} /> */}

        {/* FLEX CONTENT */}
        <View style={styles.flexDiv}>
          <View>
            <Text style={styles.flexDivTxt1}>Name</Text>
            <Text style={styles.flexDivTxt2}>
              {[teamListPDFData[0].firstName]} {[teamListPDFData[0].lastName]}
            </Text>

            <Text style={styles.flexDivTxtEmail}>Email</Text>
            <Text style={styles.flexDivTxt2}>{[teamListPDFData[0].email]}</Text>
            <Text style={styles.flexDivTxtEmail}>Code</Text>
            <Text style={styles.flexDivTxt2}>{[teamListPDFData[0].count]}</Text>
          </View>

          <View>
            <Text style={styles.flexDivTxt1}>Phone Number</Text>
            <Text style={styles.flexDivTxt2}>
              {[teamListPDFData[0].phoneNumber]}
            </Text>

            <Text style={styles.flexDivTxtEmail}>Technology</Text>
            <Text style={styles.flexDivTxt2}>
              {[teamListPDFData[0].technology]}
            </Text>
            <Text style={styles.flexDivTxtEmail}>Price</Text>
            <Text style={styles.flexDivTxt2}>
              {universalFormatCurrency([teamListPDFData[0].devsPrice])}
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
          User creation date:{" "}
          {dayjs([teamListPDFData[0].creationDate]).format("DD/MM/YYYY")}
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

          {teamListPDFData.map((item, index) => (
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

export default TeamSinglePDF;

// PDF Preview
export const TeamSinglePDFPreview = ({ teamListPDFData = [] }) => {
  return (
    <div className="hidde-n">
      <h5>PDF Preview</h5>
      <PDFViewer style={{ width: "100%", height: "700px" }}>
        <TeamSinglePDF teamListPDFData={teamListPDFData} />
      </PDFViewer>
    </div>
  );
};

// PDF Download
export const TeamSinglePDFDownload2 = ({ teamListPDFData = [] }) => {
  return (
    <PDFDownloadLink
      document={<TeamSinglePDF teamListPDFData={teamListPDFData} />}
      // fileName="Avion-Team.pdf"
      fileName={`Avion-Team-${teamListPDFData[0]?.firstName}.pdf`}
    >
      {({ loading }) =>
        loading ? <LoadingOutlined /> : <NextImage src={Pdficon} alt="" />
      }
    </PDFDownloadLink>
  );
};

export const TeamSinglePDFDownload = ({ teamListPDFData = [] }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();

    if (loading || !teamListPDFData.length) return;

    setLoading(true);

    try {
      const blob = await pdf(
        <TeamSinglePDF teamListPDFData={teamListPDFData} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `Avion-Team-${teamListPDFData[0]?.firstName}.pdf`;

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
      disabled={loading || !teamListPDFData.length}
      title={loading ? "Generating PDF..." : "Download PDF"}
      style={{
        border: "none",
        background: "transparent",
        cursor: loading ? "progress" : "pointer",
      }}
    >
      {loading ? (
        <LoadingOutlined />
      ) : (
        <NextImage src={Pdficon} alt="Download PDF" />
      )}
    </button>
  );
};
