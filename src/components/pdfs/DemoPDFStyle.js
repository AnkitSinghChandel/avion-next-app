import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    paddingTop: 60, // space for header
    paddingBottom: 60, // space for footer
    paddingHorizontal: 25, // Left + Right dono side ka space
    // paddingVertical: 40, // Top + Bottom dono side ka space
  },

  ////////////////////// HEADER /////////////////////
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTxt: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#8d7b68",
  },

  // header second row //
  header2: {
    position: "absolute",
    top: 35,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTxt2: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#8d7b68",
  },

  ////////////////////// IMAGE /////////////////////
  image: {
    left: -10,
    width: "10%",
    height: "10%",
  },

  ////////////////////// CONTENT /////////////////////
  content: {
    paddingTop: 0,
  },

  contentTxt1: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E3A8A",
    letterSpacing: 5,
  },

  contentTxt2: {
    paddingTop: 15,
    fontSize: 12,
    color: "#1E3A8A ",
  },

  /////////////////// FLEX CONTENT //////////////////
  flexDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  flexDivTxt1: {
    fontSize: 14,
    fontWeight: 500,
    // color: "green",
  },

  ////////////////////// TABLE /////////////////////
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
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
    backgroundColor: "#217C7C",
    textAlign: "center",
  },

  tableDataCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },

  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },

  tableDataTxt: {
    fontSize: 10,
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
  },

  footerTxt: {
    fontSize: 10,
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

  /////////////////////////////
  greenLine: {
    height: 5,
    borderRadius: 5,
    backgroundColor: "#1E3A8A",
    marginVertical: 20,
    width: "100%",
  },
});
