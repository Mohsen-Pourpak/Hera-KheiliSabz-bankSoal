import moment from "moment-jalaali";

export function dateTimeToJalali(dateTime) {
  let enDate = secToDateTimeStr(new Date(dateTime));
  console.error(secToDateTimeStr(new Date(dateTime)));

  return moment(enDate, "D/M/YYYY HH:mm").format("jYYYY/jMM/jDD");
}

export function dateTimeToJalaliWithTime(dateTime) {
  let enDate = secToDateTimeStr(new Date(dateTime));
  console.error(secToDateTimeStr(new Date(dateTime)));

  return moment(enDate, "D/M/YYYY HH:mm").format("HH:mm - jYYYY/jMM/jDD");
}

export function jalaliToDateObj(jalaliDateTime) {
  let date = moment(jalaliDateTime, "jYYYY/jMM/jDD HH:mm");
  return date._d;
}

export function jalaliToISO(jalaliDateTime) {
  let date = moment(jalaliDateTime, "jYYYY/jMM/jDD HH:mm");
  console.error({ date });

  return date._d.toISOString();
}

const addZeroBefore = n => {
  return (n < 10 ? "0" : "") + n;
};

export const secToDateTimeStr = dateStr => {
  let dateObj = dateStr;
  let date =
    dateObj.getDate() +
    "/" +
    parseInt(dateObj.getMonth() + 1) +
    "/" +
    dateObj.getFullYear();
  let time =
    addZeroBefore(dateObj.getHours()) +
    ":" +
    addZeroBefore(dateObj.getMinutes());

  return date + " " + time;
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeKeys(obj) {
  let newObj = {};
  Object.keys(obj).forEach(key => {
    let newPair = { [capitalizeFirstLetter(key)]: obj[key] };
    newObj = { ...newObj, ...newPair };
  });
  return newObj;
}

export function ListToObject(list) {
  let newObj = {};
  list.map(item => {
    let newPair = { [item.id]: item.value };
    newObj = { ...newObj, ...newPair };
  });
  return newObj;
}

export function ObjectToList(obj) {
  let newList = [];
  Object.keys(obj).forEach(key => {
    let newPair = { id: key, value: obj[key] };
    newList.push(newPair);
  });
  return newList;
}

export function filterObject(obj, source) {
  let newObj = {};
  Object.keys(source).forEach(key => {
    let newPair = { [key]: obj[key] };
    newObj = { ...newObj, ...newPair };
  });
  return newObj;
}

export function returnNotNull(obj) {
  let newObj = {};
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    if (value && value !== "" && value.length !== 0) {
      let newPair = { [key]: obj[key] };
      newObj = { ...newObj, ...newPair };
    }
  });
  return newObj;
}

export function txtToPrice(text) {
  return text.toLocaleString();
}

export function removeKeys(obj, ignoredKeys) {
  let newObj = obj;
  ignoredKeys.map(key => {
    delete newObj[key];
  });
  return newObj;
}

export const getDateTime = str => {
  if (!str) {
    return "---";
  }
  const [date, time] = str.split(" ");
  let dateTime = `${time} - ${date}`;
  return toFA(dateTime);
};

export function getUserTypeStr(userType) {
  let userTypeStr;
  if (userType === "School") {
    userTypeStr = "مدرسه";
  }
  if (userType === "Advisor") {
    userTypeStr = "مشاور";
  }
  if (userType === "Teacher") {
    userTypeStr = "دبیر";
  }
  if (userType === "Student") {
    userTypeStr = "دانش آموز";
  }
  return userTypeStr;
}

export function getSchoolTypeDisplay(type) {
  let schoolType;
  if (type === "Boyish") {
    schoolType = "پسرانه";
  }
  if (type === "Girly") {
    schoolType = "دخترانه";
  }
  return schoolType;
}

export function getLevelDisplay(level) {
  let levelDisplay;
  if (level === "Normal") {
    levelDisplay = "متوسط";
  }
  if (level === "Easy") {
    levelDisplay = "آسان";
  }
  if (level === "Hard") {
    levelDisplay = "سخت";
  }
  return levelDisplay;
}

// export const PER_PAGE_QUESTIONS = 15;
export const PER_PAGE_QUESTIONS = 5;

export const PER_PAGE_TABLES = 10;

export const QUESTION_PRICE = 53;

export const EXAM_TYPES = [
  {
    value: "Normal",
    title: "عادی",
  },
  {
    value: "Takii",
    title: "نمایش تکی سوالات",
  },
  {
    value: "BargashtNadarad",
    title: "امکان برگشت ندارد",
  },
  {
    value: "TafkikDars",
    title: "تفکیک به ازای هر درس",
  },
];

export const HOME_PARAMETERS = [
  {
    id: "_homePageSliderCount",
    title: "تعداد اسلایدرهای صفحه اصلی",
  },
  {
    id: "_homePageTeacherShowCount",
    title: "تعداد دبیران قابل نمایش در صفحه اصلی",
  },
  {
    id: "_homePageColleagueCount",
    title: "تعداد همکاران صفحه اصلی",
  },
  {
    id: "_studentsRegistered",
    title: "تعداد دانش آموزان",
  },
  {
    id: "_teachersRegistered",
    title: "تعداد دبیران",
  },
  {
    id: "_advisorsRegistered",
    title: "تعداد مشاوران",
  },
  {
    id: "_schoolsRegistered",
    title: "تعداد مدارس",
  },
  {
    id: "_questionCount",
    title: "تعداد سوالات",
  },
  {
    id: "_examCount",
    title: "تعداد آزمون ها",
  },
  {
    id: "_handoutCount",
    title: "تعداد جزوات",
  },
];

export const QUESTION_PROBLEM_REPORT_STATUS = [
  {
    id: "Send",
    title: "ارسال شده",
  },
  {
    id: "UnderInvestigation",
    title: "در دست بررسی",
  },
  {
    id: "RejectAndKeepQuestion",
    title: "رد گزارش و حفظ سوال",
  },
  {
    id: "AcceptAndKeepQuestion",
    title: "قبول گزارش و حفظ سوال",
  },
  {
    id: "AcceptAndRemoveQuestion",
    title: "قبول گزارش و حذف سوال",
  },
  {
    id: "RejectAndRemoveQuestion",
    title: "رد گزارش و حذف سوال",
  },
];

export const BAAMTEACHERS_TYPES = [
  {
    id: "TeamLeader",
    title: "سرگروه",
  },
  {
    id: "Supervisor",
    title: "سرپرست",
  },
  {
    id: "Author",
    title: "مولف",
  },
];

export const EXAM_TARGETS = [
  {
    value: "Normal",
    title: "عادی",
  },
  {
    value: "Konkour",
    title: "کنکور",
  },
  {
    value: "JamBandi",
    title: "جمع بندی",
  },
  {
    value: "TainSath",
    title: "تعیین سطح",
  },
];

export const SUBGROUPS_TYPE = [
  // {
  //   value: 'sub_1',
  //   title: 'زیرگروه ۱'
  // },
  // {
  //   value: 'sub_2',
  //   title: 'زیرگروه ۲'
  // },
  // {
  //   value: 'sub_3',
  //   title: 'زیرگروه ۳'
  // },
  // {
  //   value: 'sub_4',
  //   title: 'زیرگروه ۴'
  // },
  // {
  //   value: 'sub_5',
  //   title: 'زیرگروه ۵'
  // },
  {
    value: "sub_0",
    title: "انتخاب دستی",
  },
];

export const EXAM_ANSWER_SHEETS = [
  {
    value: "a4",
    title: "سایز A4 - (۳۵۰ تایی)",
  },
  {
    value: "a5",
    title: "سایز A5 - (۱۵۰ تایی)",
  },
  {
    value: "a6",
    title: "سایز A6 - (۶۰ تایی)",
  },
];

export const PACKAGE_QUESTIONS_COUNT = [
  {
    value: "FiveHundred",
    title: "۵۰۰ سوال",
  },
  {
    value: "Thousand",
    title: "۱۰۰۰ سوال",
  },
  {
    value: "TwoThousand",
    title: "۲۰۰۰ سوال",
  },
  {
    value: "FiveThousand",
    title: "۵۰۰۰ سوال",
  },
];

export const DISCOUNT_TYPES = [
  {
    id: "IsForFirstTimeOnly",
    title: "برای استفاده بار اول",
  },
];

export const USER_GENDERS = [
  {
    id: "Male",
    title: "آقا",
  },
  {
    id: "Female",
    title: "خانم",
  },
];

export const SCHOOL_TYPES = [
  {
    id: "Boyish",
    title: "پسرانه",
  },
  {
    id: "Girly",
    title: "دخترانه",
  },
];

export const USER_TYPES = [
  {
    id: "School",
    title: "مدرسه",
  },
  {
    id: "Advisor",
    title: "مشاور",
  },
  {
    id: "Teacher",
    title: "دبیر",
  },
  {
    id: "Student",
    title: "دانش آموز",
  },
];

export const INTRODUCTION_METHODS = [
  {
    id: "Google",
    title: "گوگل",
  },
  {
    id: "SocialNetwork",
    title: "شبکه‌های اجتماعی",
  },
  {
    id: "Friends",
    title: "دوستان و آشنایان",
  },
  {
    id: "Other",
    title: "سایر موارد",
  },
];

export const PACKAGE_CREDIT_PERIOD = [
  {
    value: "Monthly",
    title: "ماهانه",
  },
  {
    value: "Seasonal",
    title: "فصلی",
  },
  {
    value: "SemiAnnual",
    title: "نیم ساله",
  },
  {
    value: "Yearly",
    title: "سالانه",
  },
];

export const WALLET_TYPES = [
  {
    value: "Decrease",
    title: "کاهش",
  },
  {
    value: "Increase",
    title: "افزایش",
  },
];

export const SIZE_FONTS = [
  {
    value: "10pt",
    title: "۱۰",
  },
  {
    value: "11pt",
    title: "۱۱",
  },
  {
    value: "12pt",
    title: "۱۲",
  },
  {
    value: "13pt",
    title: "۱۳",
  },
  {
    value: "14pt",
    title: "۱۴",
  },
  {
    value: "15pt",
    title: "۱۵",
  },
  {
    value: "16pt",
    title: "۱۶",
  },
  {
    value: "17pt",
    title: "۱۷",
  },
  {
    value: "18pt",
    title: "۱۸",
  },
  {
    value: "19pt",
    title: "۱۹",
  },
  {
    value: "20pt",
    title: "۲۰",
  },
  {
    value: "21pt",
    title: "۲۱",
  },
  {
    value: "22pt",
    title: "۲۲",
  },
  {
    value: "23pt",
    title: "۲۳",
  },
  {
    value: "24pt",
    title: "۲۴",
  },
  {
    value: "25pt",
    title: "۲۵",
  },
  {
    value: "26pt",
    title: "۲۶",
  },
  {
    value: "28pt",
    title: "۲۸",
  },
  {
    value: "30pt",
    title: "۳۰",
  },
  {
    value: "32pt",
    title: "۳۲",
  },
  {
    value: "34pt",
    title: "۳۴",
  },
  {
    value: "36pt",
    title: "۳۶",
  },
  {
    value: "38pt",
    title: "۳۸",
  },
  {
    value: "40pt",
    title: "۴۰",
  },
  {
    value: "42pt",
    title: "۴۲",
  },
  {
    value: "44pt",
    title: "۴۴",
  },
];

export const PRINT_FONTS = [
  {
    value: "Dana",
    title: "دانا",
  },
  {
    value: "B-Nazanin",
    title: "نازنین",
  },
  {
    value: "Lotus",
    title: "لوتوس",
  },
  {
    value: "B-Zar",
    title: "زر",
  },
  {
    value: "Yagut",
    title: "یاقوت",
  },
  {
    value: "B-Yekan",
    title: "یکان",
  },
  {
    value: "Traffic",
    title: "ترافیک",
  },
  {
    value: "bkoodak",
    title: "کودک",
  },
];

export const PRODUCT_TYPES = [
  {
    value: "ChargeStudentAccount",
    title: "شارژ اکانت دانش آموز",
  },
  {
    value: "QuestionForStudent",
    title: "سوال برای دانش آموز",
  },
  {
    value: "School",
    title: "مدرسه",
  },
  {
    value: "Register",
    title: "ثبت نام",
  },
  {
    value: "CreateExam",
    title: "ساخت آزمون",
  },
  {
    value: "EditExam",
    title: "ویرایش آزمون",
  },
  {
    value: "AddEmptyStudent",
    title: "افزودن دانش آموز خالی",
  },
  {
    value: "BuySharedExam",
    title: "خرید آزمون اشتراکی",
  },
  {
    value: "BuyAdvisor",
    title: "خرید مشاور",
  },
  {
    value: "BuyTeacher",
    title: "خرید دبیر",
  },
  {
    value: "AcceptExam",
    title: "پذیرش آزمون",
  },
];

export const TABLE_STYLE = {
  overrides: {
    MUIDataTable: {
      root: {
        backgroundColor: "#FF000",
      },
      paper: {
        boxShadow: "none",
        border: "1px solid #ddd",
        width: "100%",
      },
    },
    MUIDataTableBodyCell: {
      root: {
        backgroundColor: "#fff",
        textAlign: "right",
      },
      pagination: {
        backgroundColor: "#432",
      },
    },
  },
};

export const TABLE_OPTIONS = {
  filterType: "checkbox",
  responsive: "standard",
  selectableRows: "none",
  textLabels: {
    body: {
      noMatch: "اطلاعاتی موجود نمی باشد",
      toolTip: "مرتب سازی",
      columnHeaderTooltip: column => `مرتب سازی بر اساس ${column.label}`,
    },
    pagination: {
      next: "صفحه بعد",
      previous: "صفحه قبل",
      rowsPerPage: "تعداد سطر در هر صفحه:",
      displayRows: "از",
    },
    toolbar: {
      search: "جستجو",
      downloadCsv: "دانلود CSV",
      print: "چاپ",
      viewColumns: "مشاهده ستون ها",
      filterTable: "Filter Table",
    },
    filter: {
      all: "همه",
      title: "فیلترها",
      reset: "بازنشانی",
    },
    viewColumns: {
      title: "نمایش ستون ها",
      titleAria: "نمایش/عدم نمایش ستون های جدول",
    },
    selectedRows: {
      text: "مورد انتخاب شده",
      delete: "پاک کردن",
      deleteAria: "پاک کردن موارد انتخاب شده",
    },
  },
};

export function toEn(num) {
  if (num === undefined) return "";
  if (num === null) return "";
  var str = num.toString();
  if (str === "") return "";
  str = str.replace(/۰/g, "0");
  str = str.replace(/۱/g, "1");
  str = str.replace(/۲/g, "2");
  str = str.replace(/۳/g, "3");
  str = str.replace(/۴/g, "4");
  str = str.replace(/۵/g, "5");
  str = str.replace(/۶/g, "6");
  str = str.replace(/۷/g, "7");
  str = str.replace(/۸/g, "8");
  str = str.replace(/۹/g, "9");
  return str;
}

export function toFA(num) {
  if (num === undefined) return "";
  if (num === null) return "";
  var str = num.toString();
  if (str === "") return "";
  str = str.replace(/0/g, "۰");
  str = str.replace(/1/g, "۱");
  str = str.replace(/2/g, "۲");
  str = str.replace(/3/g, "۳");
  str = str.replace(/4/g, "۴");
  str = str.replace(/5/g, "۵");
  str = str.replace(/6/g, "۶");
  str = str.replace(/7/g, "۷");
  str = str.replace(/8/g, "۸");
  str = str.replace(/9/g, "۹");
  return str;
}
