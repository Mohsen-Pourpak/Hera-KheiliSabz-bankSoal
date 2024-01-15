import React from "react";
import Box from "@material-ui/core/Box";
import { toast } from "react-toastify";

import { PER_PAGE_QUESTIONS } from "../../utils/Utils";
import { saveQuestion } from "../../api/services/question";

import Pagination from "../../components/Form/Pagination";
import Question from "../../components/Question";

export default function List({
  list,
  state,
  page,
  pageCount,
  onPageChange,
  setQuestionList,
  changeAnswer,
  openSendReport,
  setSelectedList,
  setIsMore,
}: {
  list: any[];
  state: any;
  page: number;
  pageCount: number;
  onPageChange: (page: any) => void;
  setQuestionList: (a: any[]) => void;
  setSelectedList: (a: any[]) => void;
  setIsMore: (a: any) => void;
  changeAnswer: (a: any, b: any) => void;
  openSendReport: (a: any) => void;
}) {
  return (
    <div>
      {list.map((item, idx) => {
        let levelId = item.difficultyId;
        let isOneActive = state.answers[`question__${item.id}`] === 1;
        let isTwoActive = state.answers[`question__${item.id}`] === 2;
        let isThreeActive = state.answers[`question__${item.id}`] === 3;
        let isFourActive = state.answers[`question__${item.id}`] === 4;
        let labelColor =
          levelId === 1 ? "#3EC592" : levelId === 2 ? "#FB963A" : "#C83E43";
        let isMore = state[`isMore__${item.id}`];
        let isEnglish = item.lessonId === 6;
        let isSelected =
          state.selectedList.filter((el: any) => el.id === item.id).length !==
          0;
        return (
          <Question
            key={idx}
            idx={+idx + +PER_PAGE_QUESTIONS * (+page - 1)}
            item={item}
            changeAnswer={changeAnswer}
            handleSaveQuestion={() => {
              let token = localStorage.getItem("userToken");
              saveQuestion(token, item.id).then(res => {
                if (res.isSuccess) {
                  toast.success(res.message);
                }
                setQuestionList(
                  state.questionsList.map((el: any) => ({
                    ...el,
                    saved: el.id === item.id ? !el.saved : el.saved,
                  })),
                );
              });
            }}
            handleSelect={() => {
              let selectedList = state.selectedList;
              if (isSelected) {
                let newList = selectedList.filter(
                  (el: any) => el.id !== item.id,
                );
                setSelectedList(newList);
              } else {
                setSelectedList([
                  ...selectedList,
                  {
                    id: item.id,
                    level: levelId,
                  },
                ]);
              }
            }}
            isEnglish={isEnglish}
            isOneActive={isOneActive}
            isTwoActive={isTwoActive}
            isThreeActive={isThreeActive}
            isFourActive={isFourActive}
            isMore={isMore}
            isSelected={isSelected}
            labelColor={labelColor}
            openSendReport={openSendReport}
            toggleIsMore={() => {
              setIsMore({
                [`isMore__${item.id}`]: !state[`isMore__${item.id}`],
              });
            }}
          />
        );
      })}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Pagination count={pageCount} page={page} onChange={onPageChange} />
      </Box>
    </div>
  );
}
