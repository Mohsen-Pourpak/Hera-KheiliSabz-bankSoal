export default {
  tasks: [
    {
      id: 0,
      type: "جلسه",
      title: "جلسه با عرفان جمشیدی",
      time: "9:00"
    },
    {
      id: 1,
      type: "تماس",
      title: "تماس با عماد ترابی",
      time: "12:00"
    },
    {
      id: 2,
      type: "جلسه",
      title: "جلسه با حسین زینلی",
      time: "14:00"
    },
    {
      id: 3,
      type: "مصاحبه",
      title: "مصاحبه با عماد جمشیدی",
      time: "15:00"
    }
  ],
  bigStat: [
    {
      product: "آبی قرمز",
      total: {
        monthly: 4232,
        weekly: 1465,
        daily: 199,
        percent: { value: 3.7, profit: false }
      },
      color: "primary",
      registrations: {
        monthly: { value: 830, profit: false },
        weekly: { value: 215, profit: true },
        daily: { value: 33, profit: true }
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: true },
        daily: { value: 3.25, profit: true }
      }
    },
    {
      product: "اپلیکیشن ساین",
      total: {
        monthly: 754,
        weekly: 180,
        daily: 27,
        percent: { value: 2.5, profit: true }
      },
      color: "warning",
      registrations: {
        monthly: { value: 32, profit: true },
        weekly: { value: 8, profit: true },
        daily: { value: 2, profit: false }
      },
      bounce: {
        monthly: { value: 2.5, profit: true },
        weekly: { value: 4, profit: false },
        daily: { value: 4.5, profit: false }
      }
    },
    {
      product: "RNS",
      total: {
        monthly: 1025,
        weekly: 301,
        daily: 44,
        percent: { value: 3.1, profit: true }
      },
      color: "secondary",
      registrations: {
        monthly: { value: 230, profit: true },
        weekly: { value: 58, profit: false },
        daily: { value: 15, profit: false }
      },
      bounce: {
        monthly: { value: 21.5, profit: false },
        weekly: { value: 19.35, profit: false },
        daily: { value: 10.1, profit: true }
      }
    }
  ],
  notifications: [
    {
      id: 0,
      icon: "thumbs-up",
      color: "primary",
      content:
        'Ken <span className="fw-semi-bold">قبول</span> درخواست'
    },
    {
      id: 1,
      icon: "file",
      color: "success",
      content: "Report from LT Company"
    },
    {
      id: 2,
      icon: "envelope",
      color: "danger",
      content: '4 <span className="fw-semi-bold">مخفی</span> ایمیل'
    },
    {
      id: 3,
      icon: "comment",
      color: "success",
      content: '3 <span className="fw-semi-bold">نظردهی</span> به پست شما'
    },
    {
      id: 4,
      icon: "cog",
      color: "light",
      content: 'New <span className="fw-semi-bold">نسخه</span> اپلیکیشن'
    },
    {
      id: 5,
      icon: "bell",
      color: "info",
      content:
        '15 <span className="fw-semi-bold">پیام ها</span> از شبکه های اجتماعی'
    }
  ],
  table: [
    {
      id: 0,
      name: "محمد مطواعی",
      email: "mohammad.metvayi@gmail.com",
      product: "مجموعه آموزشی ری اکت",
      price: "190 هزار تومان",
      date: "20 اردیبهشت",
      city: "تهران",
      status: "درحال برگزاری"
    },
    {
      id: 1,
      name: "عرفان جمشیدی",
      email: "erfan.jamshidi@gmail.com",
      product: "بررسی کتاب خرده عادت ها",
      price: "100 هزار تومان",
      date: "5 تیر",
      city: "تهران",
      status: "درحال مطالعه"
    },
    {
      id: 2,
      name: "حسین زینلی",
      email: "hossein.zeinali@gmail.com",
      product: "آموزش GTD",
      price: "250 هزار تومان",
      date: "1 خرداد",
      city: "کرج",
      status: "درحال برگزاری"
    },
    {
      id: 3,
      name: "محمد مطواعی",
      email: "mohammad.metvayi@gma",
      product: "ساخت توییتر با ری اکت",
      price: "$5 224.5",
      date: "5 خرداد",
      city: "تهران",
      status: "درحال انتشار"
    },
  ]
};
