<script setup lang="ts">
import Favicon from "./components/Favicon.vue"

import { Lunar, LunarMonth, SolarMonth } from "lunar-typescript"

const CHINESE_NUMBERS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
const color = "#267F00"

const now = new Date(2025, 0, 6)
const year = now.getFullYear()
const month = now.getMonth() + 1
const monthInEnglish = now.toLocaleString('en', { month: 'long' }).toUpperCase()
const monthInChinese = now.toLocaleString('zh', { month: 'long' })
const monthDayCount = SolarMonth.fromDate(now).getDays().length
const monthType = month == 2 ? "平" : (monthDayCount == 31 ? "大" : "小")
const date = now.getDate()
const weekday = now.toLocaleString('en', { weekday: 'long' })
const weekdayInChinese = now.toLocaleString('zh', { weekday: 'long' })

const lunarDate = Lunar.fromDate(now)
const lunarYear = lunarDate.getYear()
const lunarYearInChinese = lunarDate.getYearInChinese()
const lunarMonth = lunarDate.getMonth()
const lunarDay = `${lunarDate.getDayInChinese()}日`
const lunarJieQi = lunarDate.getJieQi()
const lunarNextJieQi = lunarDate.getNextJieQi()
const lunarMonthDayCount = LunarMonth.fromYm(lunarYear, lunarMonth)?.getDayCount()
const lunarMonthType = lunarMonthDayCount == 30 ? "大" : "小"
const lunarShuJiu = lunarDate.getShuJiu()
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
    <div class="flex justify-between p-1 *:flex *:items-center *:justify-center">
      <div class="[writing-mode:vertical-lr]">人間忽晚</div>
      <div class="font-bold text-[18rem] leading-none drop-shadow-green">{{ date }}</div>
      <div class="[writing-mode:vertical-lr]">山河以秋</div>
    </div>
    <div class="grid grid-cols-3 *:text-center">
      <div>
        <p class="text-sm">{{ lunarDate.getYearInGanZhi() }}年{{ lunarDate.getMonthInChinese() }}月{{ lunarMonthType }}
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
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  margin-inline: max(1rem, (100% - 50rem) / 2);
}
</style>