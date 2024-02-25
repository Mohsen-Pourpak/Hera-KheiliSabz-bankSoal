import React, { useState, useEffect } from "react";
import { Select, MenuItem, Button, InputLabel, Grid } from "@material-ui/core";
import { NormalInput } from "../../components/Form/TextField";
import { toast } from "react-toastify";
import CheckRadioIcon from "../../images/icons/check-radio-icon.svg";
import UncheckRadioIcon from "../../images/icons/uncheck-radio-icon.svg";
import CloseIcon from "@material-ui/icons/Close";
// import {
//   ClearRounded,
//   SearchRounded,
// } from "@material-ui/icons";

export function ExamFieldsRadio({
  changeInput,
  fieldId,
  gradeId,
  title,
  fields,
  grades,
  setSelectedGrades,
  setSelectedFields,
  setSearchTitle,
}) {
  const [gradesLabel, setGradesLabel] = useState([]);
  const [fieldsLabel, setFieldsLabel] = useState([]);
  const [examTitle, setExamTitle] = useState("");
  const [gradeFilter, setGradeFilter] = useState(false);
  const [fieldFilter, setFieldFilter] = useState(false);

  useEffect(() => {
    // console.log(grades)
  });

  const submitChanges = event => {
    const filtered_grades = gradesLabel.filter(item => {
      return item !== undefined;
    });
    const filtered_fields = fieldsLabel.filter(item => {
      return item !== undefined;
    });

    setSelectedGrades(filtered_grades);
    setSelectedFields(filtered_fields);

    if (filtered_grades.length === 0 || filtered_fields.length === 0) {
      toast.error(".لطفا همه موارد را پر کنید");
    } else {
      changeInput(filtered_grades, filtered_fields, examTitle);
    }
  };

  const valueChange = (field, event) => {
    const {
      target: { value },
    } = event;

    if (field === "gradeId") {
      setGradesLabel(typeof value === "string" ? value.split(",") : value);
    } else if (field === "fieldId") {
      setFieldsLabel(typeof value === "string" ? value.split(",") : value);
    } else if (field === "title") {
      setSearchTitle(value);
      setExamTitle(value);
    }
  };

  const renderMenuItem = (items, check) => {
    return (
      items &&
      items.map(item => {
        return (
          <MenuItem value={item.id}>
            <img
              src={check.includes(item.id) ? CheckRadioIcon : UncheckRadioIcon}
              style={{ height: 20, margin: "5px 10px" }}
            />
            {item.title}
          </MenuItem>
        );
      })
    );
  };

  const handleGrades = selected => {
    let str = [];
    if (selected.length === 0) {
      return "پایه";
    } else {
      selected.map(item => {
        if (!item) {
          return;
        }
        str.push(grades[item - 1].title);
      });
    }
    if (str[0] === undefined) {
      return "پایه";
    }
    return str.join(" - ");
  };

  const handleFields = selected => {
    let str = [];
    if (selected.length === 0) {
      return "رشته";
    } else {
      selected.map(item => {
        if (!item) {
          return;
        }
        str.push(fields[item - 1].title);
      });
    }
    if (str[0] === undefined) {
      return "رشته";
    }
    return str.join(" - ");
  };

  return (
    <>
      <div
        style={{
          width: "250px",
          height: "250px",
          boxShadow: " 1px 2px 10px",
          marginRight: "200px",
          backgroundColor: "#F1ECCF",
          padding: "10px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          rowGap: "5px",
          borderRadius: "0.6rem",
        }}
      >
        <NormalInput
          style={{
            padding: "10px",
            width: "200px",
            borderRadius: "0.5rem",
            height: "50px",
          }}
          placeholder="نام آزمون"
          value={title}
          onChange={e => valueChange("title", e)}
        ></NormalInput>
        <Select
          id="gradeSelect"
          open={gradeFilter}
          onOpen={() => {
            setGradeFilter(true);
          }}
          onClose={() => {
            setGradeFilter(false);
          }}
          value={gradesLabel}
          style={{
            width: "200px",
            padding: "10px",
            borderRadius: "0.5rem",
            height: "50px",
          }}
          input={
            <NormalInput style={{ padding: "0.5em" }} placeholder="پایه" />
          }
          onChange={e => valueChange("gradeId", e)}
          renderValue={selected => {
            return (
              <p
                style={{
                  color: "#a6a6a6",
                  fontSize: "0.9rem",
                  fontFamily: "Dana",
                }}
              >
                {handleGrades(selected)}
              </p>
            );
          }}
          displayEmpty
          multiple
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "left",
              horizontal: "right",
            },
            getContentAnchorEl: null,
          }}
        >
          <MenuItem alignItems="center">
            پایه
            <CloseIcon
              style={{ color: "red", marginRight: "90px" }}
              onClick={() => {
                setGradeFilter(false);
              }}
            />
          </MenuItem>

          {renderMenuItem(grades, gradesLabel)}
        </Select>
        <Select
          id="filedSelect"
          value={fieldsLabel}
          style={{
            width: "200px",
            height: "50px",
            padding: "10px",
            borderRadius: "0.5rem",
          }}
          open={fieldFilter}
          onOpen={() => {
            setFieldFilter(true);
          }}
          onClose={() => {
            setFieldFilter(false);
          }}
          input={<NormalInput style={{ padding: "0.5em" }} />}
          onChange={e => valueChange("fieldId", e)}
          renderValue={selected => {
            return (
              <p
                style={{
                  color: "#a6a6a6",
                  fontSize: "0.9rem",
                  fontFamily: "Dana",
                }}
              >
                {handleFields(selected)}
              </p>
            );
          }}
          displayEmpty
          multiple
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "left",
              horizontal: "right",
            },
            getContentAnchorEl: null,
          }}
        >
          <MenuItem>
            رشته
            <CloseIcon
              style={{ color: "red", marginRight: "90px" }}
              onClick={() => {
                setFieldFilter(false);
              }}
            />
          </MenuItem>

          {renderMenuItem(fields, fieldsLabel)}
        </Select>
        <Button
          onClick={submitChanges}
          variant="contained"
          color="primary"
          size="small"
          style={{
            display: "flex",
            width: "150px",
            fontSize: "0.9rem",
            textAlign: "center",
            fontFamily: "Dana",
            height: 45,
            borderRadius: "0.8rem",
            backgroundColor: "#84DFAA",
            color: "black",
            marginTop:"10px"
          }}
        >
          اعمال
        </Button>
      </div>
    </>
  );
}
