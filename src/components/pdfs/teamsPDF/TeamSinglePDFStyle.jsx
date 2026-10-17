import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    paddingTop: 40, // space for header
    paddingBottom: 60, // space for footer
    paddingHorizontal: 25, // Left + Right dono side ka space
    // paddingVertical: 40, // Top + Bottom dono side ka space

    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1E293B",
  },

  ////////////////////// HEADER /////////////////////
  header: {
    position: "absolute",
    top: 20,
    left: 25,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DCE5F0",
  },

  headerTxt: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#17365D",
  },

  ////////////////////// IMAGE /////////////////////
  image: {
    top: 7,
    left: -10,
    width: "10%",
    height: "10%",
  },

  ////////////////////// CONTENT /////////////////////
  employee: {
    left: -10,
    width: 565,
    backgroundColor: "#17365D",
    padding: 10,
    marginTop: 3,
    marginBottom: 20,
    color: "white",
    borderRadius: 8,
    fontSize: 14,
  },

  subtitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#B8D5F5",
    letterSpacing: 2,
  },

  subtitle2: {
    paddingTop: 5,
    fontSize: 18,
    fontWeight: "semibold",
    letterSpacing: 1,
    color: "#FFFFFF",
  },

  PersonalInformation: {
    paddingTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#17365D",
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#DCE5F0",
  },

  /////////////////// FLEX CONTENT //////////////////
  flexDiv: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    alignItems: "flex-start",
  },

  flexDivTxt1: {
    fontSize: 12,
    fontWeight: 500,
    color: "#64748B",
  },

  flexDivTxt2: {
    paddingTop: 3,
    fontSize: 12,
    fontWeight: "bold",
    color: "#172B4D",
  },

  flexDivTxtEmail: {
    paddingTop: 8,
    fontSize: 12,
    color: "#64748B",
    fontWeight: 500,
  },

  ////////////////////// TABLE /////////////////////
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#DCE5F0",
  },

  tableRow: {
    flexDirection: "row",
  },

  tableHeaderCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    borderColor: "#DCE5F0",
    backgroundColor: "#17365D",
    textAlign: "center",
  },

  tableDataCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    borderColor: "#DCE5F0",
    backgroundColor: "#F5F8FC",
    textAlign: "center",
  },

  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "white",
  },

  tableDataTxt: {
    fontSize: 10,
    fontWeight: "semibold",
    color: "#172B4D",
    textAlign: "center",
  },

  //// TABLE LEFT-RIGHT LABEL-VALUE FORMAT (Key-Value Table) ////
  table_KVT: {
    // display: "table",
    // width: "auto",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderRadius: 12,
    // borderRightWidth: 0,
    // borderBottomWidth: 0,
    // borderColor: "#DCE5F0",

    width: "100%",
    borderWidth: 1,
    borderColor: "#DCE5F0",
    borderRadius: 12,
    overflow: "hidden",
  },

  tableRow_KVT: {
    flexDirection: "row",
  },

  tableHeaderCol_KVT: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "#DCE5F0",
    // backgroundColor: "#17365D",
    textAlign: "center",
  },

  tableDataCol_KVT: {
    width: "70%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "#DCE5F0",
    // backgroundColor: "#F5F8FC",
    textAlign: "center",
  },

  tableHeaderText_KVT: {
    fontWeight: "semibold",
    fontSize: 12,
    color: "#334155",
    textAlign: "left",
    paddingLeft: 12,
  },

  tableDataTxt_KVT: {
    fontSize: 12,
    fontWeight: "semibold",
    color: "#1E3A5F",
    textAlign: "left",
    paddingLeft: 12,
  },

  ////////////////////// FOOTER /////////////////////
  footer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingTop: 9,
    borderTopWidth: 1,
    borderTopColor: "#DCE5F0",
  },

  footer2: {
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerTxt: {
    fontSize: 10,
    color: "#64748B",
  },

  /////////////////////////////
  greenLine: {
    height: 5,
    borderRadius: 5,
    backgroundColor: "#4C78B8",
    marginVertical: 20,
    width: "100%",
  },
});
