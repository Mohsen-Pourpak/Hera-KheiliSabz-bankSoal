import React from "react";
import { Dialog, Button, Grid } from "@material-ui/core";
import Barcode from "react-barcode";

import MyMath from "../../components/Form/MyMath";
import {
  getDateTime,
  QUESTION_PROBLEM_REPORT_STATUS,
  toFA,
} from "../../utils/Utils";

const style = {
  optionNum: {
    border: "1px solid #FF0000",
    borderRadius: 60,
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flex: "none",
    paddingTop: 3,
    color: "#FF0000",
    position: "relative",
    fontSize: 17,
    marginLeft: 10,
  },
  correctOption: {
    backgroundColor: "#FF0000",
    color: "#fff",
    width: "fit-content",
    height: 30,
    borderRadius: 50,
    padding: "6.25px 10px",
  },
};

const QuestionProblemReportShow = props => {
  return (
    <>
      {props.openDialog && (
        <Dialog
          maxWidth="lg"
          onBackdropClick={props.setOpenDialog}
          onClose={props.setOpenDialog}
          aria-labelledby="simple-dialog-title"
          open={props.openDialog}
        >
          <div
            id="invoice"
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              padding: 30,
              justifyContent: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "100%",
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px dashed #888",
                paddingBottom: 20,
                marginBottom: 30,
              }}
            >
              <div style={{ marginLeft: 200 }}>
                <div style={{ fontSize: 30, fontWeight: "bold" }}>
                  گزارش {props.selectedReport.reportId}
                </div>
                <div style={{ fontSize: 18, marginTop: 10 }}>
                  وضعیت :{" "}
                  <span style={{ color: "#3d82a4" }}>
                    {
                      QUESTION_PROBLEM_REPORT_STATUS.filter(
                        el => el.id === props.selectedReport.status,
                      )[0].title
                    }
                  </span>
                </div>
              </div>
              <div>
                <div>
                  تاریخ ثبت گزارش:{" "}
                  {getDateTime(props.selectedReport.getReportTime)}
                </div>
                <div>
                  تاریخ ثبت نتیجه:{" "}
                  {getDateTime(props.selectedReport.giveResultTime)}
                </div>
              </div>
            </div>

            {[props.selectedReport].map((item, idx) => {
              console.log({ item });
              return (
                <div
                  id={`q_${item.id}`}
                  style={{ position: "relative", flex: "none" }}
                >
                  <Grid
                    item
                    sm={12}
                    direction="column"
                    alignItems="center"
                    style={{
                      padding: 0,
                      alignItems: "center",
                      width: "calc(100% - 10px)",
                      marginTop: 5,
                      borderRadius: 20,
                      marginRight: 5,
                      overflow: "hidden",
                      marginBottom: 20,
                      border: "1px solid #ccc",
                    }}
                  >
                    <Grid
                      item
                      direction="column"
                      sm={12}
                      spacing={1}
                      alignItems="center"
                      style={{
                        padding: "10px 5px",
                        width: "100%",
                        backgroundColor: "#fff",
                        marginBottom: "0px !important",
                        borderRadius: 0,
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      <Grid
                        direction="row"
                        alignItems="flex-start"
                        spacing={3}
                        justify="flex-start"
                        container
                        style={{
                          padding: "20px 30px",
                          margin: 0,
                          letterSpacing: "normal !important",
                        }}
                      >
                        <MyMath
                          value={`<div style="display: flex"><div style="margin-left: 10px">${toFA(
                            idx + 1,
                          )} - </div><div style="flex: 1; letter-spacing: normal !important;">${item.questionFace.replace(
                            /&nbsp;/g,
                            "",
                          )}</div></div>`}
                        />
                      </Grid>
                      <Grid
                        direction="column"
                        alignItems="flex-start"
                        spacing={3}
                        justify="flex-start"
                        container
                        style={{ padding: "0 10px", margin: 0 }}
                      >
                        <Grid
                          direction="row"
                          wrap="wrap"
                          alignItems="flex-start"
                          justify="flex-start"
                          container
                          style={{ padding: "0", margin: 0 }}
                        >
                          <div
                            style={{
                              padding: "15px 20px",
                              display: "flex",
                              margin: 0,
                              width: "50%",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={style.optionNum}
                              onClick={() => this.changeAnswer(item.id, 1)}
                            >
                              ۱
                            </div>
                            <MyMath
                              value={`<div style="letter-spacing: normal !important;">${item.option1.replace(
                                /&nbsp;/g,
                                "",
                              )}</div>`}
                            />
                          </div>
                          <div
                            style={{
                              padding: "15px 20px",
                              display: "flex",
                              margin: 0,
                              width: "50%",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={style.optionNum}
                              onClick={() => this.changeAnswer(item.id, 2)}
                            >
                              ۲
                            </div>
                            <MyMath
                              value={`<div style="letter-spacing: normal !important;">${item.option2.replace(
                                /&nbsp;/g,
                                "",
                              )}</div>`}
                            />
                          </div>
                          <div
                            style={{
                              padding: "15px 20px",
                              display: "flex",
                              margin: 0,
                              width: "50%",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={style.optionNum}
                              onClick={() => this.changeAnswer(item.id, 3)}
                            >
                              ۳
                            </div>
                            <MyMath
                              value={`<div style="letter-spacing: normal !important;">${item.option3.replace(
                                /&nbsp;/g,
                                "",
                              )}</div>`}
                            />
                          </div>
                          <div
                            style={{
                              padding: "15px 20px",
                              display: "flex",
                              margin: 0,
                              width: "50%",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={style.optionNum}
                              onClick={() => this.changeAnswer(item.id, 4)}
                            >
                              ۴
                            </div>

                            <MyMath
                              value={`<div style="letter-spacing: normal !important;">${item.option4.replace(
                                /&nbsp;/g,
                                "",
                              )}</div>`}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    <div
                      style={{
                        padding: "20px 30px",
                        width: "calc(100% - 60px)",
                        backgroundColor: "#fff",
                        position: "relative",
                        right: 5,
                        marginBottom: 20,
                        borderRadius: 0,
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: 1 }}>
                          <div style={style.correctOption}>
                            گزینه {toFA(item.correctOption)}
                          </div>
                        </div>
                      </div>
                      <Grid
                        direction="row"
                        alignItems="flex-start"
                        spacing={3}
                        justify="flex-start"
                        container
                        style={{ padding: "20px 20px 0 20px", margin: 0 }}
                      >
                        <div style={{ overflow: "hidden", maxWidth: "52vw" }}>
                          <MyMath
                            value={`<div style="letter-spacing: normal !important;">${item.answer}</div>`}
                          />
                        </div>
                      </Grid>
                    </div>
                  </Grid>
                </div>
              );
            })}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                marginTop: 20,
              }}
            >
              <div style={{ fontSize: 18 }}>
                <span
                  style={{ fontSize: 20, fontWeight: "bold", color: "#3d82a4" }}
                >
                  متن گزارش :{" "}
                </span>
                {props.selectedReport.message || "-----"}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                marginTop: 20,
              }}
            >
              <div style={{ fontSize: 18 }}>
                <span style={{ fontSize: 20, fontWeight: "bold" }}>
                  نتیجه :{" "}
                </span>
                {props.selectedReport.resultMessage || "-----"}
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                  اطلاعات گزارش
                </div>
                <div style={{ fontSize: 17 }}>
                  جایزه ستاره : {toFA(props.selectedReport.starBonus)}
                </div>
                <div style={{ fontSize: 17 }}>
                  برچسب : {props.selectedReport.reportTag}
                </div>
                <div style={{ fontSize: 17 }}>
                  کدملی کاربر : {toFA(props.selectedReport.userNationalCode)}
                </div>
              </div>
              <Barcode
                value={props.selectedReport.id}
                displayValue={false}
                width={1}
                height={50}
                fontSize={10}
              />
            </div>
          </div>
          <div>
            <Grid
              direction="row"
              justify="center"
              style={{ marginTop: 10, margin: 0, marginBottom: 20 }}
              container
            >
              <Grid item xs={2}>
                <Button
                  onClick={() => {
                    var winPrint = window.open("", "");
                    var element = document.getElementById("invoice").innerHTML;
                    winPrint.document
                      .write(`<html><head><title></title></head><body><style>
                        * {
                            font-family: 'Dana' !important;
                            margin: 0;
                            direction: rtl;
                        }
                        
                        @media print {
                            @page { padding: 2cm; }
                            
                        }
                        </style>${element}</body></html>`);
                    winPrint.document.close();
                    winPrint.focus();
                    winPrint.print();
                    winPrint.close();
                  }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{
                    fontSize: "1rem",
                    textAlign: "center",
                    fontFamily: "Dana",
                  }}
                >
                  پرینت
                </Button>
              </Grid>
            </Grid>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default QuestionProblemReportShow;
