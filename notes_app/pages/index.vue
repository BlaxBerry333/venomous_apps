<script setup lang="ts">
import useTranslation from "~/composables/use-translation";

// ------------------------------------------------------------------------------------------

const config = useRuntimeConfig();

useHead({
  title: `${config.public.appInfo.name} | Home`,
  meta: [{ name: "description", content: `${config.public.appInfo.name} Home Page` }],
});

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();
</script>

<template>
  <div>{{ t("nav.home") }}</div>
</template>
