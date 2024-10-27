<script setup lang="ts">
import useTranslation from "~/composables/use-translation";

// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const showPassword = ref<boolean>(false);
</script>

<template>
  <form>
    <!-- form field of email -->
    <v-text-field
      :label="t('form.labels.email-address')"
      variant="outlined"
      density="comfortable"
      color="primary"
      prepend-inner-icon="mdi-email-outline"
      class="mb-2"
    />

    <!-- form field of password -->
    <!-- <div class="d-flex align-center justify-end">
      <NuxtLink
        to="/"
        rel="noopener noreferrer"
        target="_blank"
        class="text-caption text-decoration-none text-primary mb-1"
      >
        {{ "Forgot login password?" }}
      </NuxtLink>
    </div> -->
    <v-text-field
      :label="t('form.labels.password')"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showPassword ? 'text' : 'password'"
      variant="outlined"
      density="comfortable"
      color="primary"
      prepend-inner-icon="mdi-lock-outline"
      @click:append-inner="showPassword = !showPassword"
      class="mb-2"
    />
  </form>
</template>
