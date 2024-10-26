<script setup lang="ts">
// ------------------------------------------------------------------------------------------

const { isDarkModeTheme, toggleTheme } = useThemes();

// ------------------------------------------------------------------------------------------

const { t, currentLang, selectableLangs, changeLang } = useTranslation();

const navigation = computed<Array<{ label: string; value: string }>>(() => [
  { label: t("nav.home"), value: "/" },
  { label: t("nav.list"), value: "/list" },
]);
</script>

<template>
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-row class="d-flex align-center">
        <!-- logo -->
        <v-col cols="2" class="d-flex align-center py-0 px-2">
          <div>
            <v-img
              :width="50"
              :height="50"
              cover
              aspect-ratio="16/9"
              src="~/assets/images/logo.webp"
            />
          </div>
        </v-col>

        <v-col class="d-flex align-center py-0 px-0">
          <!-- actions -->
          <nav class="d-flex align-center">
            <NuxtLink v-for="nav in navigation" :key="nav.value" :to="nav.value">
              <v-btn
                stacked
                :text="nav.label"
                :aria-label="nav.label"
                variant="text"
                class="d-none d-lg-flex"
              >
                {{ nav.label }}
              </v-btn>
            </NuxtLink>
          </nav>

          <v-spacer></v-spacer>

          <!-- search -->
          <v-responsive max-width="160" class="d-none d-lg-flex">
            <v-text-field
              density="compact"
              label="Search"
              rounded="lg"
              variant="solo-filled"
              flat
              hide-details
              single-line
              class="mr-4"
            />
          </v-responsive>

          <div>
            <!-- theme mode toggle -->
            <v-btn
              :icon="isDarkModeTheme ? 'mdi-weather-sunny' : 'mdi-weather-night'"
              @click="toggleTheme"
              aria-label="theme-mode-toggle"
              variant="tonal"
              size="x-small"
              class="mr-4"
            />

            <!-- language toggle -->
            <v-speed-dial location="bottom center" transition="fade-transition">
              <template v-slot:activator="{ props: activatorProps }">
                <v-avatar
                  v-bind="activatorProps"
                  :image="`upload/flags/${getCountryFromLangCode(currentLang)}-32*32.svg`"
                  size="small"
                  variant="flat"
                  class="mr-4"
                  style="cursor: pointer"
                />
              </template>
              <v-avatar
                v-for="lang in selectableLangs"
                :key="lang.code"
                :image="`upload/flags/${getCountryFromLangCode(lang.code)}-32*32.svg`"
                @click="changeLang(lang.code)"
                size="small"
                variant="flat"
                style="cursor: pointer"
              />
            </v-speed-dial>
          </div>

          <!-- account avatar -->
          <v-avatar color="grey-darken-1" size="32"></v-avatar>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
