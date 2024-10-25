<script setup lang="ts">
import LayoutHeader from "~/components/common/layout-header.vue";
import LayoutSideMenu from "~/components/common/layout-sidemenu.vue";

// const isOpenSlideMenu = ref<boolean>(false);
// const openSlideMenu = () => (isOpenSlideMenu.value = !isOpenSlideMenu.value);
// provide("isOpenSlideMenu", isOpenSlideMenu);
// provide("openSlideMenu", openSlideMenu);
</script>

<template>
  <v-app>
    <!-- header -->
    <LayoutHeader />

    <v-main>
      <v-container>
        <v-row>
          <!-- side menu -->
          <v-col cols="2" class="d-none d-lg-block">
            <v-sheet rounded="lg">
              <LayoutSideMenu />
            </v-sheet>
          </v-col>

          <!-- main content -->
          <v-col>
            <v-sheet rounded="lg" class="pt-2 px-4" min-height="80vh">
              <slot />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
/* body {
  min-width: 390px;
} */
</style>
