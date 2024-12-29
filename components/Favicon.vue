<template>
    <canvas ref="favicon" width="32" height="32"></canvas>
</template>
<script setup lang="ts">
import { useFavicon } from '@vueuse/core';

const { date } = defineProps<{ date: number }>()
const faviconSize = 32
const color = "#267F00"

const favicon: Ref<HTMLCanvasElement | undefined> = ref()
const canvasContext: Ref<CanvasRenderingContext2D | undefined> = ref()

onMounted(() => {
    const canvas = favicon.value
    if (canvas) {
        canvas.width = faviconSize
        canvas.height = faviconSize
        canvasContext.value = canvas.getContext('2d') || undefined;
        const ctx = canvasContext.value
        if (ctx) {
            // draw rounded color rect
            ctx.fillStyle = color
            ctx.roundRect(0, 3, faviconSize, 29, [4])
            ctx.roundRect(7, 0, 4, 4, [4])
            ctx.roundRect(21, 0, 4, 4, [4])
            ctx.fill()
            // draw white rect
            ctx.fillStyle = "white"
            ctx.fillRect(3, 9, 26, 20)
            // draw text
            ctx.font = "bold 19px 'Abril Fatface'"
            ctx.fontKerning = "normal"
            ctx.fillStyle = color
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(date.toString(), faviconSize / 2, 20)

            // output
            const favicon = useFavicon()
            favicon.value = canvas.toDataURL("image/png")
        }
    }
});
</script>

<style scoped>
canvas {
    display: none;
    position: absolute;
}
</style>