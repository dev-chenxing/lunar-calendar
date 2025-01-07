<template>
	{{ paragraph }}
</template>
<script setup lang="ts">
import ChinesePoems from "../lib/唐诗三百首.json"
const { day, line } = defineProps<{ day: number, line: string }>()

const poem = ChinesePoems[day].paragraphs

const paragraph = poem[poem.length - 3 + Number(line)]
</script>
