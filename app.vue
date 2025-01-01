<script setup lang="ts">
import Favicon from "./components/Favicon.vue"

import { Lunar, LunarMonth, SolarMonth } from "lunar-typescript"
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

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1
const date = now.getDate()
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
		<div class="relative border-2 border-green text-center grid grid-cols-3 *:leading-tight">
			<div>{{ monthInEnglish }}</div>
			<div></div>
			<div class="font-bold font-sans-serif">{{ monthInChinese }}{{ monthType }}</div>
			<div
				class="absolute border-2 border-green rounded left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white min-w-16 min-h-[36px]">
				<div
					class="absolute inline border-2 border-green rounded h-6 w-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white leading-[0.675] text-[1.725rem] overflow-visible -z-20">
					<div
						class="bg-white absolute w-[60px] h-[30px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center -z-10">
					</div>
					<span>{{ year }}</span>
				</div>
			</div>
		</div>
		<div class="md:grid grid-cols-3 p-1 *:items-center *:justify-center md:h-[19rem]">
			<div class="[writing-mode:vertical-rl] mr-auto text-sm hidden md:flex">
				<ChinesePoetry />
			</div>
			<div class="flex font-bold text-[16rem] md:text-[18rem] leading-none drop-shadow-green text-center">{{ date
				}}</div>
			<div class="[writing-mode:vertical-lr] ml-auto hidden md:flex"></div>
		</div>
		<div class="grid grid-cols-3 *:text-center">
			<div>
				<p class="text-sm">{{ lunarDate.getYearInGanZhi() }}年{{ lunarDate.getMonthInChinese() }}月{{
					lunarMonthType }}
				</p>
				<p class="font-sans-serif font-bold text-3xl">{{ lunarDay }}</p>
			</div>
			<div class="text-lg">
				<p v-if="lunarShuJiu">
					{{ lunarShuJiu.getName() }}第{{ CHINESE_NUMBERS[lunarShuJiu.getIndex()] }}天
				</p>
				<p>{{ lunarJieQi || lunarNextJieQi.getSolar().getLunar().getDayInChinese() +
					lunarNextJieQi.getName() }}</p>
			</div>
			<div>
				<p class="text-sm">{{ weekday }}</p>
				<p class="font-sans-serif font-bold text-3xl">{{ weekdayInChinese }}</p>
			</div>
		</div>

		<div class="border-x-2 border-b-2 border-green p-1 text-base">
			<div class="flex justify-between">
				<div class="pr-2 border-r border-green flex items-center">
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
				<div class="flex text-center">
					<div
						class="font-bold text-lg font-sans-serif border-r border-green border-dashed w-11 leading-tight inline-block my-auto">
						時辰吉凶
					</div>
					<div class="flex">
						<div class="inline ml-0.5" v-for="time in lunarDate.getTimes()">
							<p class="font-bold leading-snug">{{ time.getZhi() }}</p>
							<p class="font-sans-serif text-[0.5rem] leading-none">{{ time.getMinHm() }}</p>
							<p class="font-bold leading-tight">{{ time.getTianShenLuck() }}</p>
						</div>
					</div>
				</div>
				<div class="px-1 border-l border-green flex items-center">
					<span
						class="inline-block bg-green text-white rounded-full h-8 w-8 text-center m-1 text-xl font-sans-serif">忌</span>
					<span ref="lunarJi">{{ tify(lunarDate.getDayJi()
						.filter(isCommonYiJi)
						.map((yiji) => twoWordYiJiMap[yiji] ? twoWordYiJiMap[yiji] : yiji)
						.sort((a, b) => (commonYiJisPriorty[b] - commonYiJisPriorty[a]))
						.slice(0, 4)
						.join(" ")) }}</span>
				</div>
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