<script setup lang="ts">
import Favicon from "./components/Favicon.vue"

import { Lunar, LunarMonth, Solar, SolarMonth } from "lunar-typescript"
import { tify } from 'chinese-conv'

const color = "#267F00"

const CHINESE_NUMBERS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
const commonYiJisPriorty: Record<string, number> = { "开市": 3, "安门": 1, "修造": 3, "动土": 3, "竖柱": 3, "上梁": 2, "祭祀": 3, "嫁娶": 3, "栽种": 2, "理发": 2, "伐木": 2, "畋猎": 1, "酝酿": 1, "安床": 2, "架马": 1, "祈福": 3, "会友": 2, "入学": 1, "裁衣": 2, "交易": 1, "出行": 3, "破土": 2, "安葬": 2, "沐浴": 2, "扫舍": 1, "捕捉": 1, "诸事不宜": 1, "破屋": 1, "坏垣": 1, "求医": 1, "治病": 2, "求医疗病": 1, "开仓": 2, "探病": 1, "取渔": 1, "作灶": 2, "解除": 2, "成服": 1, "词讼": 1, "移徙": 1, "会亲友": 1, "修饰垣墙": 1, "平治道涂": 1, "无": 1 }
const twoWordYiJiMap: Record<string, string> = {
	"求医疗病": "求医 疗病",
	"会亲友": "会友",
	"修饰垣墙": "修饰 垣墙",
	"平治道涂": "平治 道涂"
}
const SHENG_XIAO_SAN_HE = ["鼠龙猴", "牛蛇鸡", "虎马狗", "兔猪羊"]



const now = new Date(2025, 0, 5)
const year = now.getFullYear()
const month = now.getMonth() + 1
const date = now.getDate()

const numOfDay = Solar.fromDate(now).subtract(Solar.fromYmd(year, 1, 1))
const today = new Date(year, month - 1, date)
const monthInEnglish = today.toLocaleString('en', { month: 'long' }).toUpperCase()
const monthInChinese = today.toLocaleString('zh', { month: 'long' })
const monthDayCount = SolarMonth.fromDate(today).getDays().length
const monthType = month == 2 ? "平" : (monthDayCount == 31 ? "大" : "小")
const weekday = today.toLocaleString('en', { weekday: 'long' })
const weekdayInChinese = today.toLocaleString('zh', { weekday: 'long' })

const lunarDate = Lunar.fromDate(today)
const lunarYear = lunarDate.getYear()
const lunarMonth = lunarDate.getMonth()
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

const shengXiaoAge: Record<string, number> = {}
for (let i of Array(12).keys()) {
	shengXiaoAge[Lunar.fromYmd(lunarYear - 24 - i, 1, 1).getYearShengXiao()] = 24 + i + 1
}


function isCommonYiJi(yiji: string) {
	if (commonYiJisPriorty[yiji])
		return true
}

const lunarYi: Ref<HTMLParagraphElement | undefined> = ref()
const lunarJi: Ref<HTMLParagraphElement | undefined> = ref()

onMounted(() => {
	if (lunarYi.value && lunarJi.value) {
		if (lunarJi.value.innerHTML == tify("诸事不宜")) {
			lunarYi.value.innerHTML = tify("诸事不宜")
		} else if (lunarJi.value.innerHTML == tify("无")) {
			lunarJi.value.innerHTML = tify("诸事可行")
		}
	}
})
</script>

<template>
	<Favicon :date="date" :color="color" />
	<main class="gap-2 py-2 text-2xl text-green" ref="main">
		<div class="relative border-2 text-center grid grid-cols-3 *:leading-tight">
			<div>{{ monthInEnglish }}</div>
			<div></div>
			<div class="font-bold font-sans-serif">{{ monthInChinese }}{{ monthType }}</div>
			<div
				class="absolute border-2 rounded left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white min-w-16 min-h-[36px]">
				<div
					class="absolute inline border-2 rounded h-6 w-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white leading-[0.675] text-[1.725rem] overflow-visible -z-20">
					<div
						class="bg-white absolute w-[60px] h-[30px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center -z-10">
					</div>
					<span>{{ year }}</span>
				</div>
			</div>
		</div>
		<div class="grid grid-cols-3 p-1 *:items-center *:justify-center h-[14.5rem] md:h-[19rem]">
			<div class="[writing-mode:vertical-rl] mr-auto text-sm">
				<ChinesePoetry :day="numOfDay" line="2" />
			</div>
			<div
				class="flex font-bold text-[15rem] md:text-[18rem] h-56 md:h-auto leading-none drop-shadow-green text-center">
				{{ date
				}}</div>
			<div class="[writing-mode:vertical-lr] ml-auto text-sm">
				<ChinesePoetry :day="numOfDay" line="1" />
			</div>
		</div>
		<div class="grid grid-cols-3 *:text-center border-2 rounded-t-3xl mb-1">
			<div class="border-r-2">
				<p class="text-sm h-[20px]">{{ lunarDate.getYearInGanZhi() }}年{{ lunarDate.getMonthInChinese() }}月{{
					lunarMonthType }}
				</p>
				<p class="font-sans-serif font-bold text-3xl pb-1">{{ lunarDay }}</p>
			</div>
			<div class="text-lg">
				<p v-if="lunarShuJiu">
					{{ lunarShuJiu.getName() }}第{{ CHINESE_NUMBERS[lunarShuJiu.getIndex()] }}天
				</p>
				<p>{{ lunarJieQi || lunarNextJieQi.getSolar().getLunar().getDayInChinese() +
					lunarNextJieQi.getName() }}</p>
			</div>
			<div class="border-l-2">
				<p class="text-sm h-[20px]">{{ weekday }}</p>
				<p class="font-sans-serif font-bold text-3xl pb-1">{{ weekdayInChinese }}</p>
			</div>
		</div>

		<div class="flex flex-wrap border-x-2 border-b-2 text-base *:border-x *:border-b">
			<div class="flex flex-auto items-center justify-center min-w-48">
				<span
					class="inline-block bg-green text-white rounded-full h-8 w-8 text-center m-1 text-xl font-sans-serif">宜</span>
				<span ref="lunarYi">{{
					tify(lunarDate.getDayYi()
						.filter(isCommonYiJi)
						.map((yiji) => twoWordYiJiMap[yiji] ? twoWordYiJiMap[yiji] : yiji)
						.sort((a, b) => (commonYiJisPriorty[b] - commonYiJisPriorty[a]))
						.slice(0, 4)
						.join(" ")) }}
				</span>
			</div>
			<div class="flex flex-auto text-center items-center justify-center min-w-80">
				<div
					class="font-bold md:text-lg font-sans-serif border-r border-dashed w-11 leading-[1.1] md:leading-tight inline-block my-1">
					時辰吉凶
				</div>
				<div class="flex">
					<div class="inline ml-0.5" v-for="time in lunarDate.getTimes()">
						<p class="font-bold leading-snug">{{ time.getZhi() }}</p>
						<p class="font-sans-serif text-[0.475rem] md:text-[0.5rem] leading-none">{{ time.getMinHm() }}
						</p>
						<p class="font-bold leading-tight">{{ time.getTianShenLuck() }}</p>
					</div>
				</div>
			</div>
			<div class="flex flex-auto items-center min-w-48 justify-center">
				<span
					class="inline-block bg-green text-white rounded-full h-8 w-8 text-center m-1 text-xl font-sans-serif">忌</span>
				<span ref="lunarJi">{{ tify(lunarDate.getDayJi()
					.filter(isCommonYiJi)
					.map((yiji) => twoWordYiJiMap[yiji] ? twoWordYiJiMap[yiji] : yiji)
					.sort((a, b) => (commonYiJisPriorty[b] - commonYiJisPriorty[a]))
					.slice(0, 4)
					.join(" ")) }}</span>
			</div>
			<div class="min-w-20 flex flex-auto items-center justify-center *:[writing-mode:vertical-rl]">
				<span
					class="bg-green text-white text-sm rounded-xl m-1 py-[.25rem] font-sans-serif min-w-[1.35rem] leading-tight tracking-[.1em]">
					今日胎神
				</span>
				<span v-for="positionTai in lunarPositionTai" class="text-xl tracking-widest w-fit">
					{{ tify(positionTai) }}
				</span>
			</div>
			<div class="flex flex-auto flex-col min-w-14">
				<span class="bg-green text-white text-xs rounded-xl m-1 text-center font-sans-serif tracking-wide">
					是日
				</span>
				<div class="flex justify-center pb-1">
					<span v-for="dayLu in lunarDayLu" class="w-fit text-sm tracking-none [writing-mode:vertical-rl]">
						{{ tify(dayLu) }}
					</span>
				</div>
			</div>
			<div class="flex flex-auto flex-col items-center justify-center text-sm leading-[1.1] w-[4.5rem]">
				<div>
					<span class="underline w-10 inline-block text-center">天干</span>
					<span class="font-bold font-sans-serif ml-1">{{ lunarDate.getDayGan() }}</span>
				</div>
				<div>
					<span class="underline w-10 inline-block text-center">地支</span>
					<span class="font-bold font-sans-serif ml-1">{{ lunarDate.getDayZhi() }}</span>
				</div>
				<div>
					<span class="underline w-10 inline-block text-center">納音</span>
					<span class="font-bold font-sans-serif ml-1">{{ lunarDate.getDayNaYin()[2] }}</span>
				</div>
				<div>
					<span class="underline tracking-[-.15em] w-10 inline-block">廿八宿</span>
					<span class="font-bold font-sans-serif ml-1">{{ lunarDate.getXiu() }}</span>
				</div>
				<div>
					<span class="underline tracking-[-.15em] w-10 inline-block">十二神</span>
					<span class="font-bold font-sans-serif ml-1">{{ lunarDate.getZhiXing() }}</span>
				</div>
			</div>
			<div class="flex flex-auto items-center justify-center min-w-20">
				<span
					class="bg-green text-white text-sm rounded-xl mr-2 py-[.25rem] font-sans-serif w-[1.35rem] leading-tight tracking-[.1em] [writing-mode:vertical-rl]">
					今日八字
				</span>
				<div>
					<p v-for="eightChar in lunarEightChar" class="w-fit flex leading-tight tracking-widest">
						{{ eightChar }}
					</p>
				</div>
			</div>
			<div class="flex flex-auto flex-col min-w-24">
				<span class="bg-green text-white text-xs rounded-xl m-1 text-center font-sans-serif tracking-wide">
					吉神方位
				</span>
				<div class="flex justify-center pb-1">
					<span class="w-fit text-sm tracking-none [writing-mode:vertical-rl]">
						喜神{{ tify(lunarDate.getDayPositionXiDesc()) }}
					</span>
					<span class="w-fit text-sm tracking-none [writing-mode:vertical-rl]">
						貴神{{ tify(lunarDate.getDayPositionYangGuiDesc()) }}
					</span>
					<span class="w-fit text-sm tracking-none [writing-mode:vertical-rl]">
						財神{{ tify(lunarDate.getDayPositionCaiDesc()) }}
					</span>
					<span v-if="lunarDate.getDayNineStar().getBaMenInQiMen()"
						class="w-fit text-sm tracking-none [writing-mode:vertical-rl]">
						{{ tify(lunarDate.getDayNineStar().getBaMenInQiMen()) }}門{{
							tify(lunarDate.getDayNineStar().getPositionDesc()) }}
					</span>
				</div>
			</div>
			<div class="flex flex-auto flex-col items-center justify-center">
				<span class="text-2xl">
					三合{{ tify(SHENG_XIAO_SAN_HE.find((sanhe) =>
						sanhe.includes(lunarDayShengXiao))?.replace(lunarDayShengXiao, "")) }}
				</span>
				<span class="text-sm font-sans-serif">
					{{ lunarDayShengXiao }}日衝{{ lunarDate.getDayChongShengXiao() }}生年{{
						shengXiaoAge[lunarDate.getDayChongShengXiao()] }}歲
				</span>
			</div>
		</div>
	</main>
</template>

<style scoped>
main {
	height: 100vh;
	margin-inline: max(1rem, (100% - 50rem) / 2);
}
</style>