<script setup lang="ts">
import LayoutHeader from "~/components/common/layout-header.vue";
// import LayoutSideMenu from "~/components/common/layout-sidemenu.vue";

// const isOpenSlideMenu = ref<boolean>(false);
// const openSlideMenu = () => (isOpenSlideMenu.value = !isOpenSlideMenu.value);
// provide("isOpenSlideMenu", isOpenSlideMenu);
// provide("openSlideMenu", openSlideMenu);
</script>

<template>
  <v-app>
    <NuxtRouteAnnouncer />

    <!-- header -->
    <LayoutHeader />

    <!-- main -->
    <v-main class="pt-0">
      <v-container>
        <!-- each page content -->
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

body {
  min-width: 390px;
}
</style>
