import React from "react";
import { StyleSheet, View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import Colors from "../constants/colors";
import DefaultText from "../components/DefaultText";
import RedBorder from "../components/RedBorder";
import BoldText from "../components/BoldText";
import colors from "../constants/colors";

const HistoryList = (props) => {
  return (
    <View style={{...styles.list, ...props.style}}>
      <Grid>
        <Col size={2} >
          <DefaultText style={styles.text}>{props.rollPool}</DefaultText>
        </Col>
        <Col size={1}>
          <RedBorder style={styles.redBorder}>
            <BoldText style={styles.redText}>{props.rollSum}</BoldText>
          </RedBorder>
        </Col>
        <Col size={2}>
          <DefaultText style={styles.resultText}>{props.rollResults}</DefaultText>
        </Col>
      </Grid>
    </View>
  );
};

export default HistoryList;

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderTopColor: Colors.borderColor,
    borderBottomColor: Colors.borderColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 5,
  },
  text: {
    textAlign: 'left',
    fontSize: 16,
  },
  redBorder: {
    width: 50,
    alignItems: "center",
    borderRadius: 5,
  },
  redText: {
    color: colors.primary,
  },
  resultText: {
    textAlign: 'right',
    fontSize: 16,
  },
});
