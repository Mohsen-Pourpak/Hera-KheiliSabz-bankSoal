import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import { NormalInput } from "../../components/Form/TextField";

export default function ExamFields({
  changeInput,
  fieldId,
  gradeId,
  title,
  fields,
  grades,
}: {
  title: string;
  gradeId: string;
  fieldId: string;
  grades: any[];
  fields: any[];
  changeInput: (field: string, e: any) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3fr 2fr 1fr",
        flex: 1,
        gap: 10,
        marginTop: 10,
        marginBottom: 20,
      }}
    >
      <NormalInput
        style={{ padding: "0.5em" }}
        placeholder="نام آزمون را وارد کنید"
        value={title}
        onChange={e => changeInput("title", e)}
      />

      <Select
        id="demo-simple-select"
        value={gradeId}
        style={{ width: "100%", color: "green"}}
        input={<NormalInput style={{ padding: "0.5em" }} />}
        onChange={e => changeInput("gradeId", e)}
      >
        <MenuItem value="d" disabled>
          پایه
        </MenuItem>
        {renderMenuItem(grades)}
      </Select>

      <Select
        id="demo-simple-select"
        value={fieldId}
        style={{ width: "100%" }}
        input={<NormalInput style={{ padding: "0.5em" }} />}
        onChange={e => changeInput("fieldId", e)}
      >
        <MenuItem value="d" disabled>
          رشته
        </MenuItem>
        {renderMenuItem(fields)}
      </Select>
    </div>
  );
}

const renderMenuItem = (items: any[]) => {
  return (
    items &&
    items.map(item => {
      return <MenuItem value={item.id}>{item.title}</MenuItem>;
    })
  );
};
/*

  <Grid item md={5} xs={12}>
                  <Grid
                    item
                    sm={12}
                    spacing={1}
                    alignItems="center"
                    className="inputContainer"
                    style={{
                      padding: 0,
                      paddingRight: 10,
                      marginRight: 10,
                      top: -8.5,
                      position: "relative",
                      marginTop: 15,
                      height: 40,
                    }}
                  >
                    <TextField
                      placeholder="نام آزمون را وارد کنید"
                      value={this.state.title}
                      style={{ height: 40, background: "transparent" }}
                      onChange={e => this.changeInput("title", e)}
                    />
                  </Grid>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Grid
                    item
                    spacing={1}
                    alignItems="center"
                    className="inputContainer"
                    style={{
                      padding: 0,
                      paddingRight: 10,
                      marginLeft: 2.5,
                      marginRight: 10,
                      marginBottom: 10,
                      width: "100%",
                    }}
                  >
                    <Grid
                      item
                      style={{
                        paddingTop: 5,
                        paddingBottom: 5,
                        width: "82.5%",
                        marginRight: 10,
                      }}
                    >
                      <Select
                        id="demo-simple-select"
                        value={this.state.gradeId}
                        style={{ width: "100%" }}
                        input={<Input disableUnderline />}
                        onChange={e => this.changeInput("gradeId", e)}
                      >
                        <MenuItem value="d" disabled>
                          پایه
                        </MenuItem>
                        {this.renderMenuItem(this.state.grades)}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Grid
                    item
                    spacing={1}
                    alignItems="center"
                    className="inputContainer"
                    style={{
                      padding: 0,
                      paddingRight: 10,
                      marginLeft: 2.5,
                      marginRight: 10,
                      marginBottom: 10,
                      width: "100%",
                    }}
                  >
                    <Grid
                      item
                      style={{
                        paddingTop: 5,
                        paddingBottom: 5,
                        width: "82.5%",
                        marginRight: 10,
                      }}
                    >
                      <Select
                        id="demo-simple-select"
                        value={this.state.fieldId}
                        style={{ width: "100%" }}
                        input={<Input disableUnderline />}
                        onChange={e => this.changeInput("fieldId", e)}
                      >
                        <MenuItem value="d" disabled>
                          رشته
                        </MenuItem>
                        {this.renderMenuItem(this.state.fields)}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              

*/
