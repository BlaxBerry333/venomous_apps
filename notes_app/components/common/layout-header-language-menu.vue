<script setup lang="ts">
import useTranslation from "~/composables/use-translation";

// ------------------------------------------------------------------------------------------

const { currentLang, selectableLangs, changeLang } = useTranslation();
</script>

<template>
  <v-menu location="bottom left" transition="slide-y-transition" :width="150">
    <template v-slot:activator="{ props }">
      <v-img
        v-bind="props"
        :width="32"
        :height="32"
        :src="`upload/flags/${getCountryFromLangCode(currentLang)}-32*32.svg`"
        :lazy-src="`upload/flags/${getCountryFromLangCode(currentLang)}-32*32.svg`"
        cover
        class="mr-2 mr-lg-4 cursor-pointer rounded-circle border-thin"
        aspect-ratio="16/9"
        draggable="false"
      />
    </template>

    <v-list class="py-2 px-2" style="margin-top: 20px; margin-left: -24px">
      <v-list-item
        v-for="lang in selectableLangs"
        :key="lang.code"
        rounded
        density="comfortable"
        :value="lang.code"
        @click="changeLang(lang.code)"
      >
        <template v-slot:prepend>
          <v-img
            :width="32"
            :height="32"
            :src="`upload/flags/${getCountryFromLangCode(lang.code)}-32*32.svg`"
            :lazy-src="`upload/flags/${getCountryFromLangCode(lang.code)}-32*32.svg`"
            cover
            class="mr-2 mr-lg-4 cursor-pointer rounded-circle border-thin"
            aspect-ratio="16/9"
            draggable="false"
            @click="changeLang(lang.code)"
            size="small"
            variant="flat"
          />
        </template>
        <v-list-item-title>{{ lang.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
