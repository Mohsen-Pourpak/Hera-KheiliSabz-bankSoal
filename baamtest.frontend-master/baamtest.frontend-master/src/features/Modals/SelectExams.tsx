import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  FormControlLabel,
  Input,
  MenuItem,
  Select,
} from "@material-ui/core";

import { getAll, mergeExams } from "../../api/services/exam";
import { getHeads } from "../../api/services/user";
import PageTitle from "../../components/PageTitle/PageTitle";
import { toast } from "react-toastify";
import Pagination from "../../components/Form/Pagination";

export default function SelectExams({
  onClose,
  open,
  // onAdd,
  onDone,
  examId,
  userExams,
}: {
  open: boolean;
  onClose: () => void;
  // onAdd: (examIds: number[]) => void;
  onDone: () => void;
  examId: number;
  userExams: number[];
}) {
  const [selectedHead, setSelectedHead] = useState<any>("none");
  const [heads, setHeads] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [exams, setExams] = useState([]);
  const [removeDuplicate, setRemoveDuplicate] = useState(true);
  const [selectedExams, setSelectedExams] = useState<number[]>(userExams);
  const [loading, setLoading] = useState(false);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      const res = await getAll(selectedHead, token, page);
      setTotalPage(JSON.parse(res.headers.pagination).totalPages);
      setExams(res.data.data.filter((exam: any) => exam.id !== examId));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHeads = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await getHeads(token);
      setHeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchHeads();
    }
  }, [open]);

  useEffect(() => {
    fetchExams();
  }, [page]);

  useEffect(() => {
    setSelectedExams(userExams);
  }, [userExams]);

  const handleSelect = (id: any) => {
    setSelectedExams(prev => {
      const isSelected = prev.findIndex(examId => examId === id) !== -1;
      if (isSelected) {
        return prev.filter(examId => examId !== id);
      }
      return prev.concat(id);
    });
  };

  const handleMerge = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await mergeExams({
        mainExamId: examId,
        removeDuplicate,
        examIds: selectedExams,
        token,
      });
      toast.success("آزمون ها با موفقیت افزوده شدند");
      setSelectedExams([]);
      onDone();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <Box width={700} p={2} bgcolor="#CBF2CF">
        <PageTitle style={{ width: "fit-content" }} title="انتخاب آزمون" />
        <Box display="flex" alignItems="center" m={1}>
          <Select
            value={selectedHead}
            style={{
              width: 200,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 5,
            }}
            input={<Input disableUnderline />}
            onChange={e => setSelectedHead(e.target.value)}
          >
            <MenuItem value="none">ازمون های من</MenuItem>
            {heads &&
              heads.map((head: any) => (
                <MenuItem key={head.id} value={head.fullName}>
                  {head.fullName}
                </MenuItem>
              ))}
          </Select>
          <FormControlLabel
            style={{ margin: "0 1em" }}
            control={<Checkbox />}
            label="حذف سوالات تکراری"
            checked={removeDuplicate}
            onChange={(e, c) => setRemoveDuplicate(c)}
          />
          <div style={{ flexGrow: 1 }} />
          <Button
            disabled={selectedExams.length < 1}
            onClick={handleMerge}
            variant="contained"
            color="secondary"
          >
            افزودن
          </Button>
        </Box>
        <Box bgcolor="white" borderRadius={10} p={1} m={1}>
          <Box
            style={{
              height: 400,
              overflowY: "auto",
              scrollbarWidth: "thin",
            }}
          >
            {loading && (
              <CircularProgress style={{ color: "red !important" }} />
            )}
            {!loading &&
              exams.map((exam: any) => (
                <Box
                  display="grid"
                  gridTemplateColumns="1fr 1fr 3fr 2fr 2fr 2fr"
                  gridGap={5}
                  my="4px"
                >
                  <Checkbox
                    checked={selectedExams && selectedExams.includes(exam.id)}
                    onChange={() => handleSelect(exam.id)}
                  />
                  <p
                    style={{
                      backgroundColor: "#f4faff",
                      justifyContent: "center",
                      color: "#3f83a5",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {exam.id}
                  </p>
                  <p
                    style={{
                      backgroundColor: "#f4faff",
                      justifyContent: "center",
                      color: "#3f83a5",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {exam.title}
                  </p>
                  <p
                    style={{
                      backgroundColor: "#f4faff",
                      justifyContent: "center",
                      color: "#3f83a5",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {exam.creationTime}
                  </p>
                  <p
                    style={{
                      backgroundColor: "#f4faff",
                      justifyContent: "center",
                      color: "#3f83a5",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {exam.ownerName}
                  </p>
                  <p
                    style={{
                      backgroundColor: "#f4faff",
                      justifyContent: "center",
                      color: "#3f83a5",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {exam.startTime}
                  </p>
                </Box>
              ))}
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            {/* <Button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              صفحه قبل
            </Button>
            <div style={{ flexGrow: 1 }} />
            <p>صفحه {page}</p>
            <div style={{ flexGrow: 1 }} />
            <Button
              disabled={page === totalPage}
              onClick={() => setPage(prev => prev + 1)}
            >
              صفحه بعد
            </Button> */}
            <Pagination
              count={totalPage}
              page={page}
              onChange={(e, p) => setPage(p)}
            />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
