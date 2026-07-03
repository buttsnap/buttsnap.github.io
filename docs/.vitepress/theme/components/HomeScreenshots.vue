<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const activeIndex = ref(0)
let rotationTimer: ReturnType<typeof setInterval> | undefined

const screenshotLocale = computed(() => {
  if (lang.value.startsWith('en')) return 'en'
  if (lang.value.startsWith('ja')) return 'ja'
  if (lang.value.startsWith('ko')) return 'ko'
  if (lang.value.startsWith('fr')) return 'fr'
  if (lang.value.startsWith('de')) return 'de'
  if (lang.value.startsWith('zh-Hant') || lang.value.startsWith('zh-TW') || lang.value.startsWith('zh-HK')) {
    return 'zh-hant'
  }
  return 'zh'
})

const screenshots = computed(() =>
  Array.from({ length: 8 }, (_, index) => {
    const id = String(index + 1).padStart(2, '0')
    return `/screenshots/home/${screenshotLocale.value}/shot-${id}.webp`
  }),
)

const stackItems = computed(() =>
  Array.from({ length: 4 }, (_, offset) => {
    const index = (activeIndex.value + offset) % screenshots.value.length
    return {
      index,
      offset,
      src: screenshots.value[index],
    }
  }),
)

const advance = () => {
  activeIndex.value = (activeIndex.value + 1) % screenshots.value.length
}

const selectScreenshot = (index: number) => {
  activeIndex.value = index
}

const stackStyle = (offset: number) => {
  const x = [0, 24, 44, 60][offset]
  const y = [0, -10, 10, -18][offset]
  const rotate = [0, 3.5, -4.5, 5][offset]
  const scale = [1, 0.94, 0.88, 0.82][offset]
  return {
    '--stack-x': `${x}px`,
    '--stack-y': `${y}px`,
    '--stack-rotate': `${rotate}deg`,
    '--stack-scale': String(scale),
    '--stack-z': String(20 - offset),
  }
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion) {
    rotationTimer = setInterval(advance, 3200)
  }
})

onBeforeUnmount(() => {
  if (rotationTimer) clearInterval(rotationTimer)
})
</script>

<template>
  <div class="home-screenshots" aria-label="ButtSnap App Store screenshot carousel">
    <div class="home-screenshot-stage">
      <figure
        v-for="item in stackItems"
        :key="item.src"
        class="home-screenshot-card"
        :class="{ 'is-active': item.offset === 0 }"
        :style="stackStyle(item.offset)"
      >
        <img
          :src="item.src"
          :alt="item.offset === 0 ? `ButtSnap App Store screenshot ${item.index + 1}` : ''"
          width="430"
          height="931"
          decoding="async"
          :loading="item.offset === 0 ? 'eager' : 'lazy'"
        />
      </figure>
    </div>
    <div class="home-screenshot-dots" aria-label="Screenshot carousel pages">
      <button
        v-for="(_, index) in screenshots"
        :key="index"
        type="button"
        :class="{ active: index === activeIndex }"
        :aria-label="`Show screenshot ${index + 1}`"
        :aria-current="index === activeIndex ? 'true' : undefined"
        @click="selectScreenshot(index)"
      ></button>
    </div>
  </div>
</template>
