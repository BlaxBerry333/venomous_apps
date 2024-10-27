<script setup lang="ts">
import useTranslation from "~/composables/use-translation";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();
</script>

<template>
  <v-sheet id="pages-account-details">
    <section class="d-flex align-center justify-space-between">
      <!-- page title -->
      <h3 class="text-h5 font-weight-bold">
        {{ t("nav.account-details") }}
      </h3>
      <!-- placeholder -->
    </section>
  </v-sheet>
</template>
