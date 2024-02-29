import React from "react";
import { Grid, Button, FormControlLabel, Checkbox } from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import Image2 from "../../images/test/paper.jpg";
// import ImageSimple from "../../images/test/Simple WB.jpg";
// import ImageFantasy from "../../images/test/Fantasy WB.jpg";
// import ImageNastaliq from "../../images/test/Nastaliq WB.jpg";
import ImageSimple from "../../images/test/new-test.jpg";
import ImageFantasy from "../../images/test/kheilisabz2-edited.jpg";
import ImageNastaliq from "../../images/test/kheilisabz3-edited.jpg";

// const style = {
//   sortFilter: {
//     backgroundColor: "transparent",
//     border: "1px solid #fe5f55",
//     color: "#fe5f55",
//     width: "fit-content",
//     height: 40,
//     padding: "0 20px",
//     marginLeft: 20,
//     borderRadius: 50,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     cursor: "pointer",
//   },
//   sortFilterActive: {
//     backgroundColor: "#fe5f55",
//     border: "1px solid #fe5f55",
//     color: "#fff",
//     width: "fit-content",
//     padding: "0 20px",
//     marginLeft: 20,
//     height: 40,
//     borderRadius: 50,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     cursor: "pointer",
//   },
// };

const style = {
  printBgImage: {
    padding: 8,
    borderRadius: 16,
    cursor: "pointer",
    transition: "all ease 300ms",
  },
  printBgImageActive: {
    border: "2px solid #fe5f55",
  },
};

class PrintTest extends React.Component {
  constructor() {
    super();
    this.state = {
      teachersList: [],
      grades: [],
      fields: [],
      fieldId: "d",
      gradeId: "d",
      level: "Hard",
      userExams: [],
      selectedList: [],
      type: "q",

      selectedBg: 1,
      withoutLogo: true,
    };
  }
  componentDidMount() {}
  changeType = value => {
    this.setState({
      type: value,
    });
  };

  setSelectedPrintBg(index) {
    this.setState({ selectedBg: index });
  }

  getPrintBgStyle(index) {
    if (index === this.state.selectedBg) {
      return { ...style.printBgImage, ...style.printBgImageActive };
    }
    return { ...style.printBgImage };
  }

  getPrintBgName() {
    const bgNames = ["basic", "simple", "fantasy", "nastaliq"];
    return bgNames[this.state.selectedBg];
  }

  render() {
    const classes = this.props.classes;
    return (
      <>
        <PageTitle title="مدیریت آزمون - چاپ آزمون" />
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid
            direction="column"
            alignItems="flex-start"
            spacing={2}
            justify="flex-start"
            container
            style={{
              padding: 10,
              backgroundColor: "rgb(255 255 255 / 40%)",
              borderRadius: 20,
            }}
          >
            <div style={{ width: "100%", marginBottom: -15 }}>
              <PageTitle title="طرح های پیش فرض" size="h2" color="#000" />
            </div>
            <Grid direction="column" container item xs={12}>
              <Grid
                item
                sm={12}
                spacing={1}
                alignItems="center"
                className="inputContainer"
                style={{ padding: "7.5px", margin: 0, width: "100%" }}
              >
                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      margin: 10,
                      gap: "1em",
                    }}
                  >
                    {/* <img
                      src={Image2}
                      width={150}
                      style={this.getPrintBgStyle(0)}
                      onClick={() => this.setSelectedPrintBg(0)}
                      alt="pdf layout"
                    /> */}
                    <img
                      src={ImageSimple}
                      width={150}
                      style={this.getPrintBgStyle(1)}
                      onClick={() => this.setSelectedPrintBg(1)}
                      alt="pdf layout"
                    />
                    <img
                      src={ImageFantasy}
                      width={150}
                      style={this.getPrintBgStyle(2)}
                      onClick={() => this.setSelectedPrintBg(2)}
                      alt="pdf layout"
                    />
                    <img
                      src={ImageNastaliq}
                      width={150}
                      style={this.getPrintBgStyle(3)}
                      onClick={() => this.setSelectedPrintBg(3)}
                      alt="pdf layout"
                    />
                  </div>
                  {/* <div>
                    <FormControlLabel
                      label="بهمراه لوگو بام تست"
                      control={<Checkbox />}
                      value={this.state.withoutLogo}
                      onChange={e =>
                        this.setState({ withoutLogo: e.target.checked })
                      }
                    />
                  </div> */}
                </div>
              </Grid>
            </Grid>
            <Grid
              direction="row"
              justify="center"
              style={{ marginBottom: 10 }}
              container
              spacing={2}
            >
              <Grid item xs={2}>
                <Button
                  onClick={() => {
                    let examId = parseInt(this.props.match.params.id);
                    localStorage.setItem("printType", this.state.type);
                    localStorage.setItem(
                      "printBackground",
                      this.getPrintBgName(),
                    );
                    localStorage.setItem(
                      "printWithoutLogo",
                      Boolean(this.state.withoutLogo),
                    );
                    this.props.history.push({
                      pathname: `/dashboard/test/print-create-pdf/${examId}`,
                    });
                  }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.createAccountButton}
                  style={{
                    fontSize: "1rem",
                    textAlign: "center",
                    fontFamily: "Dana",
                  }}
                >
                  نمایش
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default PrintTest;
