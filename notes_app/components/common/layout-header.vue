<script setup lang="ts">
import LayoutHeaderSearch from "~/components/common/layout-header-search.vue";

// ------------------------------------------------------------------------------------------

const { isDarkModeTheme, toggleTheme } = useThemes();

// ------------------------------------------------------------------------------------------

const { t, currentLang, selectableLangs, changeLang } = useTranslation();

// ------------------------------------------------------------------------------------------

const { path } = useRoute();

const { push } = useRouter();

const pathname = ref<string>(path);

const navigation = computed<Array<{ label: string; value: string }>>(() => [
  { label: t("nav.list"), value: "/list" },
  { label: t("nav.create"), value: "/create" },
]);

function navigateTo(path: string) {
  if (pathname.value !== path) {
    push(path);
    pathname.value = path;
  }
}
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
              :color="pathname === nav.value ? 'primary' : 'default'"
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
            <LayoutHeaderSearch />
            <!-- language toggle -->
            <v-speed-dial location="bottom center" transition="fade-transition">
              <template v-slot:activator="{ props: activatorProps }">
                <v-img
                  v-bind="activatorProps"
                  :width="32"
                  :height="32"
                  :src="`upload/flags/${getCountryFromLangCode(currentLang)}-32*32.svg`"
                  :lazy-src="`upload/flags/${getCountryFromLangCode(currentLang)}-32*32.svg`"
                  cover
                  class="mr-2 mr-lg-4 rounded-xl cursor-pointer"
                  aspect-ratio="16/9"
                  draggable="false"
                />
              </template>
              <v-avatar
                v-for="lang in selectableLangs"
                :key="lang.code"
                :image="`upload/flags/${getCountryFromLangCode(lang.code)}-32*32.svg`"
                @click="changeLang(lang.code)"
                size="small"
                variant="flat"
                class="cursor-pointer"
                hidden
              />
            </v-speed-dial>
          </div>
          <!-- theme mode toggle -->
          <v-btn
            :icon="isDarkModeTheme ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            @click="toggleTheme"
            aria-label="theme-mode-toggle"
            variant="tonal"
            size="x-small"
            class="mr-2 mr-lg-4"
          />

          <!-- account avatar -->
          <v-avatar color="grey-darken-1" size="32"></v-avatar>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
