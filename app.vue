<script setup lang="ts">
import { Lunar, LunarMonth, SolarMonth } from "lunar-typescript"
const now = new Date(2025, 0, 6)
const year = now.getFullYear()
const month = now.getMonth() + 1
const monthInEnglish = now.toLocaleString('en', { month: 'long' }).toUpperCase()
const monthInChinese = now.toLocaleString('zh', { month: 'long' })
const monthDayCount = SolarMonth.fromDate(now).getDays().length
const monthType = month == 2 ? "平" : (monthDayCount == 31 ? "大" : "小")
const date = now.getDate()
const weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][now.getDay()]
const hours = now.getHours()
const minutes = now.getMinutes().toString().padStart(2, "0")
const greetings = hours < 12 ? "早安" : (hours < 18 ? "午安" : "晚安")
const greetingsColor = hours < 12 ? "text-yellow-300" : (hours < 18 ? "text-orange-200" : "text-blue-300")

const lunarDate = Lunar.fromDate(now)
const lunarYear = lunarDate.getYear()
const lunarYearInChinese = lunarDate.getYearInChinese()
const lunarMonth = lunarDate.getMonth()
const lunarDay = lunarDate.getJieQi() || `${lunarDate.getDayInChinese()}日`
const lunarMonthDayCount = LunarMonth.fromYm(lunarYear, lunarMonth)?.getDayCount()
</script>

<template>
  <main class="grid grid-rows-[auto_auto_1fr] gap-2 py-2 text-2xl text-green-600">
    <div class="relative border-2 border-green-600 text-center grid grid-cols-3 *:leading-tight">
      <div>{{ monthInEnglish }}</div>
      <div></div>
      <div class="font-bold font-sans-serif">{{ monthInChinese }}{{ monthType }}</div>
      <div
        class="absolute border-2 border-green-600 rounded left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white min-w-16 min-h-[36px]">
        <div
          class="absolute inline border-2 border-green-600 rounded h-6 w-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white leading-[0.675] text-[1.725rem] overflow-visible -z-20">
          <div class="absolute bg-white w-[60px] h-[30px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center -z-10"></div>
          <span>{{ year }}</span>
        </div>
      </div>
    </div>
    <div class="border-2 border-green-600 text-text-2xl p-0.5">
      <div class="grid grid-cols-[1fr_auto_1fr] text-5xl *:flex *:items-center *:justify-center">
        <div class="[writing-mode:vertical-lr]">人間忽晚</div>
        <div class="font-bold text-[18rem] leading-none drop-shadow-green">{{ date }}</div>
        <div class="[writing-mode:vertical-lr]">山河以秋</div>
      </div>
      <div class="grid grid-cols-3 *:text-center">
        <div>{{ lunarYearInChinese }}</div>
        <div class="font-bold">{{ lunarDay }}</div>
        <div>{{ lunarMonth }}</div>
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