<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, lang } = useData()

const highlights = computed(() => {
  const features = frontmatter.value.features
  return Array.isArray(features) ? features.slice(0, 4) : []
})

const trustLabels = computed(() => {
  if (lang.value.startsWith('en')) return ['Cute by design', 'Private by default', 'Clean & calm']
  if (lang.value.startsWith('ja')) return ['かわいく保存', '端末内で安心', 'すっきり簡単']
  if (lang.value.startsWith('ko')) return ['귀엽게 모으기', '기기 안에서 안전하게', '깔끔하고 단순하게']
  if (lang.value.startsWith('fr')) return ['Adorable par design', 'Prive par defaut', 'Simple et calme']
  if (lang.value.startsWith('de')) return ['Liebevoll gestaltet', 'Privat von Anfang an', 'Klar und ruhig']
  if (lang.value.startsWith('zh-Hant') || lang.value.startsWith('zh-TW') || lang.value.startsWith('zh-HK')) {
    return ['可愛收藏', '本機處理更安心', '簡潔純粹']
  }
  return ['可爱收藏', '本地处理更安心', '简洁纯粹']
})
</script>

<template>
  <div class="home-proof">
    <ul v-if="highlights.length" class="home-highlights" aria-label="ButtSnap highlights">
      <li v-for="item in highlights" :key="item.title">
        <span class="home-highlight-icon" aria-hidden="true">{{ item.icon }}</span>
        <span>{{ item.title }}</span>
      </li>
    </ul>
    <div class="home-trust-line" aria-label="ButtSnap qualities">
      <span v-for="label in trustLabels" :key="label">{{ label }}</span>
    </div>
  </div>
</template>
