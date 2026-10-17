import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { styles } from "./DemoPDFStyle";
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
import ASC22 from "../../assets/images/ASC22.jpg";
import Pdficon from "../../assets/icons/pdf-icon.svg";

const tableData = [
  { Fname: "Ankit", Mname: "Singh", Lname: "Chandel", Age: 26, City: "Delhi" },
  { Fname: "Ravi", Mname: "Kumar", Lname: "Yadav", Age: 28, City: "Mumbai" },
  { Fname: "Neha", Mname: "Raj", Lname: "Sharma", Age: 24, City: "Bangalore" },
  { Fname: "Priya", Mname: "Kumari", Lname: "Verma", Age: 25, City: "Kolkata" },
  { Fname: "Arjun", Mname: "Singh", Lname: "Thakur", Age: 29, City: "Jaipur" },
  { Fname: "Rahul", Mname: "Kumar", Lname: "Mehta", Age: 30, City: "Lucknow" },
  { Fname: "Sanya", Mname: "Rani", Lname: "Patel", Age: 27, City: "Pune" },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
  {
    Fname: "Karan",
    Mname: "Dev",
    Lname: "Malhotra",
    Age: 32,
    City: "Ahmedabad",
  },
];

const tableimgs = [
  {
    link: "https://s3.spire-solutions-1.res.trans-ix.whitesky.cloud/spiresolutions-dev/GoldGymLogo.png",
  },
  {
    link: "https://s3.spire-solutions-1.res.trans-ix.whitesky.cloud/spiresolutions-dev/20181102_223200.jpg",
  },
  {
    link: "https://s3.spire-solutions-1.res.trans-ix.whitesky.cloud/spiresolutions-dev/ASC LOGO.jpeg",
  },
  {
    link: "https://s3.spire-solutions-1.res.trans-ix.whitesky.cloud/spiresolutions-dev/ASC22.jpg",
  },
];

// PDF Document Component
const MyDocument = (props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* HEADER (Fixed on all pages) */}
        <View style={styles.header} fixed>
          <Text style={styles.headerTxt}>Ankit</Text>
          <Text style={styles.headerTxt}>Singh</Text>
          <Text style={styles.headerTxt}>Chandel</Text>
          <Text style={styles.headerTxt}>{moment().format("DD/MM/YYYY")}</Text>
        </View>

        {/* header second row */}
        <View style={styles.header2} fixed>
          <Text style={styles.headerTxt2}>Ankit2</Text>
          <Text style={styles.headerTxt2}>Singh2</Text>
          <Text style={styles.headerTxt2}>Chandel2</Text>
          <Text style={styles.headerTxt2}>{moment().format("DD/MM/YYYY")}</Text>
        </View>

        {/* IMAGE */}
        <View style={styles.image}>
          <Image src={ASC22} />
        </View>

        {/* CONTENT */}
        <View style={styles.contentBox}>
          <Text style={styles.contentTxt1}>
            Ankit Singh Chandel Senior Software Developer
          </Text>

          <Text style={styles.contentTxt2}>
            Ankit Singh Chandel Senior Software Developer Passionate about
            building scalable, user-focused web and mobile applications. Let’s
            connect and collaborate on innovative tech solutions.
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
            textAlign: "right",
            fontSize: "12px",
            paddingRight: "10px",
            paddingBottom: "20px",
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
              <Text style={styles.tableHeaderText}>Middle Name</Text>
            </View>
            <View style={styles.tableHeaderCol}>
              <Text style={styles.tableHeaderText}>Last Name</Text>
            </View>
            <View style={styles.tableHeaderCol}>
              <Text style={styles.tableHeaderText}>Age</Text>
            </View>
            <View style={styles.tableHeaderCol}>
              <Text style={styles.tableHeaderText}>City</Text>
            </View>
          </View>

          {tableData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>{item.Fname}</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>{item.Mname}</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>{item.Lname}</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>{item.Age}</Text>
              </View>
              <View style={styles.tableDataCol}>
                <Text style={styles.tableDataTxt}>{item.City}</Text>
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

const DemoPDF = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { taskId } = useParams();

  console.log("asc certificate props", props);

  // const fetchFormCertificateRes = useSelector(
  //   (state) => state.user.fetchFormCertificateRes
  // );

  const [data, setData] = useState();

  const downloadPDF = async () => {
    try {
      const blob = await pdf(<MyDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "demo1.pdf";
      a.click();

      URL.revokeObjectURL(url);

      const file = new File([blob], "demo2.pdf", {
        type: "application/pdf",
      });
      // dispatch(filesInsertDocToS3([file]));
    } catch (error) {
      console.error("PDF download error:", error);
    }
  };

  useEffect(() => {
    if (props.runFunctionFromParent === true) {
      downloadPDF();
    }
    props.setRunFunctionFromParent(false);
  }, [props.runFunctionFromParent]);

  return (
    <div>
      <div className="d-non-e">
        <h5>PDF Preview</h5>
        <PDFViewer style={{ width: "100%", height: "700px" }}>
          <MyDocument />
        </PDFViewer>
      </div>

      <h5>Download PDF</h5>
      {/* <PDFDownloadLink document={<MyDocument />} fileName="demo.pdf">
        {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
      </PDFDownloadLink> */}

      <PDFDownloadLink document={<MyDocument />} fileName="demo.pdf">
        {({ loading }) =>
          loading ? "Loading document..." : <img src={Pdficon} alt="" />
        }
      </PDFDownloadLink>
    </div>
  );
};

export default DemoPDF;
