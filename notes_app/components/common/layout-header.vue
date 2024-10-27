<script setup lang="ts">
import useRoutes from "~/composables/use-routes";
import useTranslation from "~/composables/use-translation";

import LayoutHeaderSearchDialog from "~/components/common/layout-header-search-dialog.vue";
import LayoutHeaderLanguageMenu from "~/components/common/layout-header-language-menu.vue";
import LayoutHeaderAccountMenu from "~/components/common/layout-header-account-menu.vue";
import LayoutHeaderAccountDialog from "~/components/common/layout-header-account-dialog.vue";

// ------------------------------------------------------------------------------------------

const { isDarkModeTheme, toggleTheme } = useThemes();

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const { navigateTo, checkIsCurrentPathname } = useRoutes();

const navigation = computed<Array<{ label: string; value: string }>>(() => [
  { label: t("nav.list"), value: "/list" },
  { label: t("nav.create"), value: "/create" },
]);

// ------------------------------------------------------------------------------------------

const { isAuthenticated } = useAccount();
</script>

<template>
  <v-app-bar
    :elevation="2"
    flat
    class="px-2"
    style="height: 64px; position: sticky; top: 0"
  >
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-row class="d-flex align-center">
        <!-- logo -->
        <v-col cols="2" class="d-flex align-center py-0 px-0">
          <div>
            <v-img
              :width="50"
              :height="50"
              src="~/assets/images/logo.webp"
              lazy-src="~/assets/images/logo.webp"
              @click="navigateTo('/')"
              cover
              aspect-ratio="16/9"
              draggable="false"
              class="cursor-pointer"
            />
          </div>
        </v-col>

        <v-col class="d-flex align-center py-0 px-0">
          <!-- navigation -->
          <nav class="d-flex align-center">
            <v-btn
              v-for="nav in navigation"
              :key="nav.value"
              :aria-label="nav.label"
              :color="checkIsCurrentPathname(nav.value) ? 'primary' : 'default'"
              @click="navigateTo(nav.value)"
              stacked
              variant="text"
              class="d-none d-lg-flex"
            >
              {{ nav.label }}
            </v-btn>
          </nav>

          <v-spacer></v-spacer>

          <!-- actions buttons -->
          <div class="d-flex align-center">
            <!-- search  -->
            <LayoutHeaderSearchDialog />

            <!-- language toggle -->
            <LayoutHeaderLanguageMenu />

            <!-- theme mode toggle -->
            <v-btn
              :icon="isDarkModeTheme ? 'mdi-weather-sunny' : 'mdi-weather-night'"
              @click="toggleTheme"
              aria-label="theme-mode-toggle"
              variant="tonal"
              size="x-small"
              color="primary"
              class="mr-2 mr-lg-4"
            />
          </div>

          <!-- account -->
          <LayoutHeaderAccountMenu v-if="isAuthenticated" />
          <LayoutHeaderAccountDialog v-else />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
