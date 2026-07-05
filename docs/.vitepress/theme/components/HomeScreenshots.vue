<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const PRELOAD_STACK_COUNT = 4
const activeIndex = ref(0)
const loadedScreenshots = ref(new Set<string>())
let rotationTimer: ReturnType<typeof setInterval> | undefined
let preloadRun = 0
let reduceMotion = false
let hasMounted = false

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

const initialStackScreenshots = computed(() => screenshots.value.slice(0, PRELOAD_STACK_COUNT))

const isInitialStackReady = computed(() =>
  initialStackScreenshots.value.every((src) => loadedScreenshots.value.has(src)),
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

const markScreenshotReady = (src: string) => {
  if (loadedScreenshots.value.has(src)) return

  const nextLoadedScreenshots = new Set(loadedScreenshots.value)
  nextLoadedScreenshots.add(src)
  loadedScreenshots.value = nextLoadedScreenshots
}

const isScreenshotReady = (src: string) => loadedScreenshots.value.has(src)

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    if (loadedScreenshots.value.has(src)) {
      resolve()
      return
    }

    const image = new Image()
    image.decoding = 'async'
    image.onload = () => {
      markScreenshotReady(src)
      resolve()
    }
    image.onerror = () => resolve()
    image.src = src
  })

const stopRotation = () => {
  if (!rotationTimer) return
  clearInterval(rotationTimer)
  rotationTimer = undefined
}

const startRotation = () => {
  if (reduceMotion || rotationTimer) return
  rotationTimer = setInterval(advance, 3200)
}

const preloadScreenshots = async (sources: string[]) => {
  const run = ++preloadRun
  stopRotation()

  await Promise.all(sources.slice(0, PRELOAD_STACK_COUNT).map(preloadImage))
  if (run !== preloadRun) return

  startRotation()
  sources.slice(PRELOAD_STACK_COUNT).forEach((src) => {
    void preloadImage(src)
  })
}

onMounted(() => {
  hasMounted = true
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  void preloadScreenshots(screenshots.value)
})

watch(screenshots, (nextScreenshots) => {
  if (!hasMounted) return
  activeIndex.value = 0
  void preloadScreenshots(nextScreenshots)
})

onBeforeUnmount(() => {
  stopRotation()
})
</script>

<template>
  <div
    class="home-screenshots"
    :class="{ 'is-loading': !isInitialStackReady }"
    aria-label="ButtSnap App Store screenshot carousel"
    :aria-busy="!isInitialStackReady"
  >
    <div class="home-screenshot-stage">
      <figure
        v-for="item in stackItems"
        :key="item.src"
        class="home-screenshot-card"
        :class="{ 'is-active': item.offset === 0, 'is-loaded': isScreenshotReady(item.src) }"
        :style="stackStyle(item.offset)"
      >
        <div class="home-screenshot-skeleton" aria-hidden="true"></div>
        <img
          :src="item.src"
          :alt="item.offset === 0 ? `ButtSnap App Store screenshot ${item.index + 1}` : ''"
          width="430"
          height="931"
          decoding="async"
          :loading="item.offset === 0 ? 'eager' : 'lazy'"
          @load="markScreenshotReady(item.src)"
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
        :disabled="!isInitialStackReady"
        @click="selectScreenshot(index)"
      ></button>
    </div>
  </div>
</template>
