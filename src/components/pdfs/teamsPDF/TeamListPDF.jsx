import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { styles } from "./TeamListPDFStyle";
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

// PDF Document Component
const TeamListPDF = ({ teamListPDFData = [] }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* HEADER (Fixed on all pages) */}
        <View style={styles.header} fixed>
          <Text style={styles.headerTxt}>Avion</Text>
          <Text style={styles.headerTxt}>Secure</Text>
          <Text style={styles.headerTxt}>Fast</Text>
          <Text style={styles.headerTxt}>Reliable</Text>
          <Text style={styles.headerTxt}>{moment().format("DD/MM/YYYY")}</Text>
        </View>

        {/* header second row */}
        <View style={styles.header2} fixed>
          <Text style={styles.headerTxt2}>Avion</Text>
          <Text style={styles.headerTxt2}>Secure</Text>
          <Text style={styles.headerTxt2}>Fast</Text>
          <Text style={styles.headerTxt2}>Reliable</Text>
          <Text style={styles.headerTxt2}>{moment().format("DD/MM/YYYY")}</Text>
        </View>

        {/* IMAGE */}
        <View style={styles.image} fixed>
          <Image src="/avion.png" />
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={styles.contentTxt1}>
            Avion - Enterprise Operations Platform
          </Text>

          <Text style={styles.contentTxt2}>
            Avion is a unified enterprise operations platform that automates
            complex workflows and bridges data silos. It delivers real-time
            visibility and enterprise-grade security to drive maximum
            operational efficiency from a single command center.
          </Text>
        </View>

        <View style={styles.greenLine} />

        {/* FLEX CONTENT */}
        <View style={styles.flexDiv}>
          <View>
            <Text style={styles.flexDivTxt1}>Ankit Singh1</Text>
            <Text style={styles.flexDivTxt1}>Ankit Singh2</Text>
            <Text style={styles.flexDivTxt1}>Ankit Singh3</Text>
          </View>

          <View>
            <Text style={styles.flexDivTxt1}>Ankit Singh4</Text>
            <Text style={styles.flexDivTxt1}>Ankit Singh5</Text>
            <Text style={styles.flexDivTxt1}>Ankit Singh6</Text>
          </View>
        </View>

        <Text
          style={{
            // paddingTop: "20px",
            paddingVertical: "20px",
            textAlign: "right",
            fontSize: "12px",
          }}
        >
          Date: 14-5-2025
        </Text>

        {/* STATIC TABLE */}
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

        {/* Top + Bottom dono se margin 👇 */}
        <View style={{ marginVertical: 10 }} />

        {/* DYNAMIC TABLE */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
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
              <Text style={styles.tableHeaderText}>Age</Text>
            </View>
            <View style={styles.tableHeaderCol}>
              <Text style={styles.tableHeaderText}>City</Text>
            </View>
          </View>

          {teamListPDFData.map((item, index) => (
            <View key={item.teamId} style={styles.tableRow}>
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
                <Text style={styles.tableDataTxt}>{item.devsPrice}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* FOOTER */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerTxt}>ASC1</Text>
          <Text style={styles.footerTxt}>ASC2</Text>
          <Text
            style={styles.footerTxt}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>

        {/* footer second row */}
        <View style={styles.footer2} fixed>
          <Text style={styles.footerTxt}>ASC3</Text>
          <Text style={styles.footerTxt}>ASC4</Text>
          <Text
            style={styles.footerTxt}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

export default TeamListPDF;

// PDF Preview
export const TeamListPDFPreview = ({ teamListPDFData = [] }) => {
  return (
    <div className="hidde-n">
      <h5>PDF Preview</h5>
      <PDFViewer style={{ width: "100%", height: "700px" }}>
        <TeamListPDF teamListPDFData={teamListPDFData} />
      </PDFViewer>
    </div>
  );
};

// PDF Download
export const TeamListPDFDownload = ({ teamListPDFData = [] }) => {
  return (
    <>
      {/* <PDFDownloadLink document={<MyDocument />} fileName="demo.pdf">
        {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
      </PDFDownloadLink> */}

      <PDFDownloadLink
        document={<TeamListPDF teamListPDFData={teamListPDFData} />}
        fileName="Avion-TeamList.pdf"
      >
        {({ loading }) =>
          loading ? <LoadingOutlined /> : <img src={Pdficon} alt="" />
        }
      </PDFDownloadLink>
    </>
  );
};
