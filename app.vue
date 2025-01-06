<script setup lang="ts">
import Favicon from "./components/Favicon.vue"
import ChinesePoetry from "./components/ChinesePoetry.vue"

import { tify } from 'chinese-conv'
import LunarDate from "./components/LunarDate"

const red = "#C42D15"
const green = "#267F00"
const color = LunarDate.isWeekend ? red : green
</script>

<template>
	<Favicon :date="LunarDate.date" :color="color" />
	<main class="gap-2 py-2 text-2xl" ref="main" :style="{ color: color }">
		<div class="relative border-2 text-center grid grid-cols-3 *:leading-tight">
			<div>{{ LunarDate.monthInEnglish }}</div>
			<div></div>
			<div class="font-bold font-sans-serif">{{ LunarDate.monthInChinese }}{{ LunarDate.monthType }}</div>
			<div
				class="absolute border-2 rounded left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white min-w-16 min-h-[36px]">
				<div
					class="absolute inline border-2 rounded h-6 w-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white leading-[0.675] text-[1.725rem] overflow-visible -z-20">
					<div
						class="bg-white absolute w-[60px] h-[30px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center -z-10">
					</div>
					<span>{{ LunarDate.year }}</span>
				</div>
			</div>
		</div>
		<div class="grid grid-cols-3 p-1 *:items-center *:justify-center h-[14.5rem] md:h-[19rem]">
			<div class="[writing-mode:vertical-rl] mr-auto text-sm text-center">
				<ChinesePoetry :day="LunarDate.dayOfYear" line="2" />
			</div>
			<div class="flex font-bold text-[15rem] md:text-[18rem] h-56 md:h-auto leading-none text-center"
				:style="{ textShadow: `3px 2px 0 white, 6px 4px 0 ${color}` }">
				{{ LunarDate.date }}
			</div>
			<div class="[writing-mode:vertical-lr] ml-auto text-sm text-center">
				<ChinesePoetry :day="LunarDate.dayOfYear" line="1" />
			</div>
		</div>
		<div class="grid grid-cols-3 *:text-center border-2 rounded-t-3xl mb-1">
			<div class="border-r-2">
				<p class="text-sm h-[20px]">{{ LunarDate.lunarYearInGanZhi }}年{{ LunarDate.lunarMonthInChinese }}月{{
					LunarDate.lunarMonthType }}
				</p>
				<p class="font-sans-serif font-bold text-3xl pb-1">{{ LunarDate.lunarDay }}</p>
			</div>
			<div class="text-lg">
				<p v-if="LunarDate.lunarShuJiu">
					{{ LunarDate.lunarShuJiu.name }}第{{ LunarDate.lunarShuJiu.index }}天
				</p>
				<p>
					{{ LunarDate.lunarJieQi || (LunarDate.lunarNextJieQi.day +
						LunarDate.lunarNextJieQi.name)
					}}
				</p>
			</div>
			<div class="border-l-2">
				<p class="text-sm h-[20px]">{{ LunarDate.weekdayInEnglish }}</p>
				<p class="font-sans-serif font-bold text-3xl pb-1">{{ LunarDate.weekdayInChinese }}</p>
			</div>
		</div>

		<div class="flex flex-wrap border-x-2 border-b-2 text-base *:border-x *:border-b">
			<div class="flex flex-auto items-center justify-center min-w-48">
				<span class="inline-block text-white rounded-full h-8 w-8 text-center m-1 text-xl font-sans-serif"
					:style="{ backgroundColor: color }">宜</span>
				<span ref="lunarYi">{{
					tify(LunarDate.yi) }}
				</span>
			</div>
			<div class="flex flex-auto text-center items-center justify-center min-w-80">
				<div
					class="font-bold md:text-lg font-sans-serif border-r border-dashed w-11 leading-[1.1] md:leading-tight inline-block my-1">
					時辰吉凶
				</div>
				<div class="flex">
					<div class="inline ml-0.5" v-for="time in LunarDate.hours">
						<p class="font-bold leading-snug">{{ time.getZhi() }}</p>
						<p class="font-sans-serif text-[0.475rem] md:text-[0.5rem] leading-none">{{ time.getMinHm() }}
						</p>
						<p class="font-bold leading-tight">{{ time.getTianShenLuck() }}</p>
					</div>
				</div>
			</div>
			<div class="flex flex-auto items-center min-w-48 justify-center">
				<span class="inline-block text-white rounded-full h-8 w-8 text-center m-1 text-xl font-sans-serif"
					:style="{ backgroundColor: color }">忌</span>
				<span ref="lunarJi">{{ tify(LunarDate.ji) }}</span>
			</div>
			<div class="min-w-24 flex flex-auto items-center justify-center *:[writing-mode:vertical-rl]">
				<span
					class="text-white text-sm rounded-xl m-1 py-[.25rem] font-sans-serif min-w-[1.35rem] leading-tight tracking-[.1em]"
					:style="{ backgroundColor: color }">
					今日胎神
				</span>
				<span v-for="positionTai in LunarDate.lunarPositionTai" class="text-xl tracking-widest w-fit">
					{{ tify(positionTai) }}
				</span>
			</div>
			<div class="flex flex-auto flex-col min-w-14">
				<span class="text-white text-xs rounded-xl m-1 text-center font-sans-serif tracking-wide"
					:style="{ backgroundColor: color }">
					日祿
				</span>
				<div class="flex justify-center pb-1">
					<span v-for="dayLu in LunarDate.lunarDayLu"
						class="w-fit text-sm tracking-none [writing-mode:vertical-rl]">
						{{ tify(dayLu) }}
					</span>
				</div>
			</div>
			<div class="flex flex-auto flex-col items-center justify-center text-sm leading-[1.1] w-[4.5rem]">
				<div>
					<span class="underline w-10 inline-block text-center">天干</span>
					<span class="font-bold font-sans-serif ml-1">{{ LunarDate.lunarDayGan }}</span>
				</div>
				<div>
					<span class="underline w-10 inline-block text-center">地支</span>
					<span class="font-bold font-sans-serif ml-1">{{ LunarDate.lunarDayZhi }}</span>
				</div>
				<div>
					<span class="underline w-10 inline-block text-center">納音</span>
					<span class="font-bold font-sans-serif ml-1">{{ LunarDate.lunarNaYin }}</span>
				</div>
				<div>
					<span class="underline tracking-[-.15em] w-10 inline-block">廿八宿</span>
					<span class="font-bold font-sans-serif ml-1">{{ LunarDate.lunarXiu }}</span>
				</div>
				<div>
					<span class="underline tracking-[-.15em] w-10 inline-block">十二神</span>
					<span class="font-bold font-sans-serif ml-1">{{ LunarDate.lunarZhiXing }}</span>
				</div>
			</div>
			<div class="flex flex-auto items-center justify-center min-w-20">
				<span
					class="text-white text-sm rounded-xl mr-2 py-[.25rem] font-sans-serif w-[1.35rem] leading-tight tracking-[.1em] [writing-mode:vertical-rl]"
					:style="{ backgroundColor: color }">
					今日八字
				</span>
				<div>
					<p v-for="eightChar in LunarDate.lunarEightChar" class="w-fit flex leading-tight tracking-widest">
						{{ eightChar }}
					</p>
				</div>
			</div>
			<div class="flex flex-auto flex-col min-w-24">
				<span class="text-white text-xs rounded-xl m-1 text-center font-sans-serif tracking-wide"
					:style="{ backgroundColor: color }">
					吉神方位
				</span>
				<div class="flex justify-center pb-1">
					<span class="w-fit text-sm tracking-none [writing-mode:vertical-rl]">
						喜神{{ tify(LunarDate.lunarDayXiPosition) }}
					</span>
					<span class="w-fit text-sm tracking-none [writing-mode:vertical-rl]">
						貴神{{ tify(LunarDate.lunarDayGuiPosition) }}
					</span>
					<span class="w-fit text-sm tracking-none [writing-mode:vertical-rl]">
						財神{{ tify(LunarDate.lunarDayCaiPosition) }}
					</span>
					<span v-if="LunarDate.lunarNineStar.baMen"
						class="w-fit text-sm tracking-none [writing-mode:vertical-rl]">
						{{ tify(LunarDate.lunarNineStar.baMen) }}門{{
							tify(LunarDate.lunarNineStar.position) }}
					</span>
				</div>
			</div>
			<div class="flex flex-auto flex-col items-center justify-center">
				<span class="text-2xl">
					三合{{ tify(LunarDate.lunarShengXiao.sanHe) }}
				</span>
				<span class="text-sm font-sans-serif">
					{{ tify(LunarDate.lunarShengXiao.name) }}日衝{{ tify(LunarDate.lunarDayChongShengXiao) }}生年{{
						LunarDate.getAgeFromShengXiao(LunarDate.lunarDayChongShengXiao) }}歲
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