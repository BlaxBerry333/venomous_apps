<script setup lang="ts">
const config = useRuntimeConfig();

useHead({
  title: `${config.public.appInfo.name} | Home`,
  meta: [{ name: "description", content: `${config.public.appInfo.name} Home Page` }],
});
</script>

<template>
  <div>Home</div>
</template>
