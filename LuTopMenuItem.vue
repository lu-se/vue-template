<template>
  <li
    v-if="item.children"
    class="nav-item dropdown dropdown-hover"
    :class="{ active }"
    @mouseenter="expanded = true"
    @mouseleave="expanded = false"
    @keydown.esc="expanded = false"
  >
    <router-link
      v-if="item.path && item.path !== route.path"
      :to="item.path"
      class="nav-link text-nowrap dropdown-toggle"
      aria-haspopup="true"
      :aria-expanded="expanded"
      :aria-controls="submenuId"
    >
      {{ t(item.label) }}
    </router-link>
    <a
      v-else-if="item.url"
      :href="item.url"
      class="nav-link text-nowrap dropdown-toggle"
      aria-haspopup="true"
      :aria-expanded="expanded"
      :aria-controls="submenuId"
      :tabindex="item.url ? null : 0"
    >
      {{ t(item.label) }}
    </a>
    <span
      v-else
      class="nav-link text-nowrap dropdown-toggle"
      aria-haspopup="true"
      :aria-expanded="expanded"
      :aria-controls="submenuId"
      tabindex="0"
    >
      {{ t(item.label) }}
    </span>
    <ul
      class="dropdown-menu font-size-base"
      :class="[lastItem ? 'dropdown-menu-end' : '']"
    >
      <LuDropdownItem
        v-for="subMenuItem in item.children"
        :key="subMenuItem.id"
        :item="subMenuItem"
      />
    </ul>
  </li>
  <li
    v-else
    class="nav-item"
    :class="{ active }"
  >
    <router-link
      v-if="item.path"
      :to="item.path"
      class="nav-link text-nowrap"
    >
      {{ t(item.label) }}
    </router-link>
    <!-- tabindex onödigt. blir alltid null -->
    <a
      v-else
      :href="item.url"
      class="nav-link text-nowrap"
      :tabindex="item.url ? null : '0'"
    >
      {{ t(item.label) }}
    </a>
  </li>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import LuDropdownItem from './LuDropdownItem.vue'

const props = defineProps({
  item: { type: Object, required: true },
  lastItem: Boolean,
})

const route = useRoute()
const { t } = useI18n()

const active = computed(() => {
  const targetPath = props.item?.path
  return targetPath ? route.path === targetPath : false
})

const expanded = ref()

const submenuId = computed(() => `nav-submenu-${props.item.id}`)

</script>

<style scoped>
:deep(.dropdown-item) {
  font-size: 1.05rem !important;
}
</style>
