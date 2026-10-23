<template>
  <li
    v-if="!props.item.children"
    class="nav-item"
  >
    <router-link
      v-if="item.path"
      :to="item.path"
      class="nav-link px-3"
    >
      {{ t(item.label) }}
    </router-link>
    <a
      v-else
      :href="item.url"
      class="nav-link px-3"
      :tabindex="item.url ? null : '0'"
    >
      {{ t(item.label) }}
    </a>
  </li>
  <li
    v-else
    class="nav-item dropdown dropdown-hover"
    @mouseenter="expanded = true"
    @mouseleave="expanded = false"
    @keydown.esc="expanded = false"
  >
    <router-link
      v-if="item.path && item.path !== route.path"
      :to="item.path"
      class="nav-link dropdown-toggle px-3"
      aria-haspopup="true"
      :aria-expanded="expanded"
      :aria-controls="submenuId"
    >
      {{ t(item.label) }}&nbsp;<fa-icon :icon="['fal', 'chevron-down']" />
    </router-link>
    <a
      v-else-if="item.url"
      :href="item.url"
      class="nav-link dropdown-toggle px-3"
      aria-haspopup="true"
      :aria-expanded="expanded"
      :aria-controls="submenuId"
    >
      {{ t(item.label) }}&nbsp;<fa-icon :icon="['fal', 'chevron-down']" />
    </a>
    <span
      v-else
      class="nav-link dropdown-toggle px-3"
      aria-haspopup="true"
      :aria-expanded="expanded"
      :aria-controls="submenuId"
      tabindex="0"
    >
      {{ t(item.label) }}&nbsp;<fa-icon :icon="['fal', 'chevron-down']" />
    </span>
    <!-- Hur fixa ul med styling? -->
    <ul class="dropdown-menu dropdown-menu-end text-primary">
      <LuDropdownItem
        v-for="subItem in props.item.children"
        :key="subItem.id"
        :item="subItem"
      />
    </ul>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import LuDropdownItem from './LuDropdownItem.vue'

const props = defineProps({
  item: { type: Object, required: true },
})

const { t } = useI18n()
const route = useRoute()

const expanded = ref()

const submenuId = computed(() => `nav-submenu-${props.item.id}`)

</script>

<style scoped>
:deep(.dropdown-item) {
  color: var(--bs-dropdown-link-color) !important;
}
.nav-item:hover {
  color: var(--bs-navbar-hover-color) !important;
  text-decoration: underline;
}
</style>
