import { Lunar, LunarMonth, Solar, SolarMonth } from "lunar-typescript"

const CHINESE_NUMBERS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
const commonYiJisPriorty: Record<string, number> = { "开市": 3, "安门": 1, "修造": 3, "动土": 3, "竖柱": 3, "上梁": 2, "祭祀": 3, "嫁娶": 3, "栽种": 2, "理发": 2, "伐木": 2, "畋猎": 1, "酝酿": 1, "安床": 2, "架马": 1, "祈福": 3, "会友": 2, "入学": 1, "裁衣": 2, "交易": 1, "出行": 3, "破土": 2, "安葬": 2, "沐浴": 2, "扫舍": 1, "捕捉": 1, "诸事不宜": 1, "破屋": 1, "坏垣": 1, "求医": 1, "治病": 2, "求医疗病": 1, "开仓": 2, "探病": 1, "取渔": 1, "作灶": 2, "解除": 2, "成服": 1, "词讼": 1, "移徙": 1, "会亲友": 1, "修饰垣墙": 1, "平治道涂": 1, "无": 1 }
const twoWordYiJiMap: Record<string, string> = {
    "求医疗病": "求医 疗病",
    "会亲友": "会友",
    "修饰垣墙": "修饰 垣墙",
    "平治道涂": "平治 道涂"
}
const SHENG_XIAO_SAN_HE = ["鼠龙猴", "牛蛇鸡", "虎马狗", "兔猪羊"]

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1
const date = now.getDate()
const dayOfYear = Solar.fromDate(now).subtract(Solar.fromYmd(year, 1, 1))
const today = new Date(year, month - 1, date)
const monthInEnglish = today.toLocaleString('en', { month: 'long' }).toUpperCase()
const monthInChinese = today.toLocaleString('zh', { month: 'long' })
const monthDayCount = SolarMonth.fromDate(today).getDays().length
const monthType = month == 2 ? "平" : (monthDayCount == 31 ? "大" : "小")
const weekday = today.getDay()
const weekdayInEnglish = today.toLocaleString('en', { weekday: 'long' })
const weekdayInChinese = today.toLocaleString('zh', { weekday: 'long' })
const isWeekend = weekday % 6 == 0

const lunarDate = Lunar.fromDate(today)
const lunarYear = lunarDate.getYear()
const lunarYearInGanZhi = lunarDate.getYearInGanZhi()
const lunarMonth = lunarDate.getMonth()
const lunarMonthInChinese = lunarDate.getMonthInChinese()
const lunarDay = `${lunarDate.getDayInChinese()}日`
const lunarJieQi = lunarDate.getJieQi()
const lunarNextJieQi = lunarDate.getNextJieQi()
const lunarMonthDayCount = LunarMonth.fromYm(lunarYear, lunarMonth)?.getDayCount()
const lunarMonthType = lunarMonthDayCount == 30 ? "大" : "小"
const lunarShuJiu = lunarDate.getShuJiu()
const lunarPositionTai = lunarDate.getDayPositionTai().split(" ")
const lunarDayLu = lunarDate.getDayLu().split(" ")
const lunarEightChar = lunarDate.getEightChar().toString().split(" ")
const lunarDayShengXiao = lunarDate.getDayShengXiao()
const lunarNineStar = lunarDate.getDayNineStar()

function isCommonYiJi(yiji: string) {
    if (commonYiJisPriorty[yiji])
        return true
}
function parseYiJi(yiji: string[]) {
    return yiji
        .filter(isCommonYiJi)
        .map((yiji) => twoWordYiJiMap[yiji] ? twoWordYiJiMap[yiji] : yiji)
        .sort((a, b) => (commonYiJisPriorty[b] - commonYiJisPriorty[a]))
        .slice(0, 4)
        .join(" ")
}
let yi = parseYiJi(lunarDate.getDayYi())
let ji = parseYiJi(lunarDate.getDayJi())
if (ji === "诸事不宜") yi = "诸事不宜"
else if (ji === "无") ji = "诸事可行"

// const shengXiaoAge: Record<string, number> = {}
// for (let i of Array(12).keys()) {
//     shengXiaoAge[Lunar.fromYmd(lunarYear - 24 - i, 1, 1).getYearShengXiao()] = 24 + i + 1
// }

function getAgeFromShengXiao(shengXiao: string) { return 36 }

const LunarDate = {
    year,
    monthInChinese,
    monthInEnglish,
    monthType,
    weekdayInChinese,
    weekdayInEnglish,
    isWeekend,
    date,
    dayOfYear,
    hours: lunarDate.getTimes(),
    lunarYearInGanZhi,
    lunarMonthInChinese,
    lunarMonthType,
    lunarDay,
    lunarDayGan: lunarDate.getDayGan(),
    lunarDayZhi: lunarDate.getDayZhi(),
    lunarJieQi,
    lunarNextJieQi: {
        day: lunarNextJieQi.getSolar().getLunar().getDayInChinese(),
        name: lunarNextJieQi.getName()
    },
    lunarShuJiu: lunarShuJiu ? {
        name: lunarShuJiu.getName(),
        index: CHINESE_NUMBERS[lunarShuJiu.getIndex()]
    } : null,
    yi: yi,
    ji: ji,
    lunarPositionTai,
    lunarDayLu,
    lunarNaYin: lunarDate.getDayNaYin()[2],
    lunarXiu: lunarDate.getXiu(),
    lunarZhiXing: lunarDate.getZhiXing(),
    lunarEightChar,
    lunarDayXiPosition: lunarDate.getDayPositionXiDesc(),
    lunarDayGuiPosition: lunarDate.getDayPositionYangGuiDesc(),
    lunarDayCaiPosition: lunarDate.getDayPositionCaiDesc(),
    lunarNineStar: {
        baMen: lunarNineStar.getBaMenInQiMen(),
        position: lunarNineStar.getPositionDesc()
    },
    lunarShengXiao: {
        name: lunarDayShengXiao,
        sanHe: SHENG_XIAO_SAN_HE.find((sanhe) =>
            sanhe.includes(lunarDayShengXiao))?.replace(lunarDayShengXiao, "")
    },
    lunarDayChongShengXiao: lunarDate.getDayChongShengXiao(),
    getAgeFromShengXiao
}

export default LunarDate;