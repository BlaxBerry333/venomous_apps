<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

// ------------------------------------------------------------------------------------------

const links = ["list", "create"];
</script>

<template>
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-row class="d-flex align-center">
        <!-- logo -->
        <v-col cols="2" class="d-flex align-center">
          <div>
            <v-img
              :width="50"
              :height="50"
              cover
              aspect-ratio="16/9"
              src="~/assets/images/logo.webp"
            ></v-img>
          </div>
        </v-col>

        <v-col class="d-flex align-center">
          <!-- actions -->
          <NuxtLink v-for="link in links" :key="link" :to="`/${link}`">
            <v-btn :text="link" variant="text" class="d-none d-lg-flex">
              {{ link }}
            </v-btn>
          </NuxtLink>

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
            ></v-text-field>
          </v-responsive>

          <!-- theme mode -->
          <v-btn
            :icon="
              theme.global.current.value.dark
                ? 'mdi-weather-sunny'
                : 'mdi-weather-night'
            "
            @click="toggleTheme"
            class="mx-4"
          >
          </v-btn>

          <!-- account avatar -->
          <v-avatar color="grey-darken-1" size="32"></v-avatar>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
