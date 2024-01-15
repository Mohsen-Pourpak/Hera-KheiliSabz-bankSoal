import jMoment from "moment-jalaali";
import hMoment from "moment-hijri";
import { toEn } from './Utils';

const JalaliDaysOff=[{month:1,day:1},{month:1,day:2},{month:1,day:3},{month:1,day:4},{month:1,day:12},{month:1,day:13},{month:3,day:14},{month:3,day:15},{month:11,day:22},{month:12,day:29}];
const HijriDaysOff=[{month:8,day:15},{month:9,day:21},{month:10,day:1},{month:10,day:25},{month:12,day:10},{month:12,day:18},{month:1,day:9},{month:1,day:10},{month:2,day:20},{month:2,day:28},{month:3,day:17},{month:6,day:3},{month:7,day:13},{month:7,day:27},{month:8,day:15}];

function minTD(n) {
  return (n < 10 ? '0' : '') + n;
}

const GetDaysOff = async (year) => {
    let fList = [...JalaliDaysOff]

    let dateFrom = new Date(jMoment(`${year}/01/01`, 'jYYYY/jM/jD'))
    let jToday = jMoment(dateFrom).format('jYYYY/jM/jD')
    let hToday = hMoment(dateFrom).format('iYYYY/iM/iD')
    const [jyear, jmonth, jday] = jToday.split('/')
    const [hyear, hmonth, hday] = hToday.split('/')    
    
    HijriDaysOff.map(el => {
        let dateH = new Date(hMoment(`${toEn(hyear)}/${minTD(el.month)}/${minTD(el.day)}`, 'iYYYY/iM/iD'))
        let datej = jMoment(dateH).format('jYYYY/jM/jD')
        const [jyear_, jmonth_, jday_] = datej.split('/')
        if (parseInt(toEn(jyear_)) === year) {
            console.error({dateH, datej})
            fList.push({
                month: parseInt(toEn(jmonth_)),
                day: parseInt(toEn(jday_)),
            })
        } else {
            let dateH_ = new Date(hMoment(`${parseInt(toEn(hyear))+1}/${minTD(el.month)}/${minTD(el.day)}`, 'iYYYY/iM/iD'))
            let datej_ = jMoment(dateH_).format('jYYYY/jM/jD')
            console.error({dateH_, datej_}, parseInt(toEn(hyear))+1)
            const [jyear_1, jmonth_1, jday_1] = datej_.split('/')
            fList.push({
                month: parseInt(toEn(jmonth_1)),
                day: parseInt(toEn(jday_1)),
            })
        }
    })
    fList = fList.map(e => {
        return {
            ...e,
            year
        }
    })
    return await fList
}

export default GetDaysOff