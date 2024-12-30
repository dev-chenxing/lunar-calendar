<template>
	{{ poem }}
</template>
<script setup lang="ts">
import ChinesePoems from "./lib/唐诗三百首.json"

const poem = ChinesePoems[0].paragraphs.join("")
</script>
