<script setup lang="ts">
import useTranslation from "~/composables/use-translation";

// ------------------------------------------------------------------------------------------

type Props = {
  isRefreshLoading: boolean;
  onRefresh: () => Promise<void>;
  defaultButtonText?: string;
  defaultLoadingText?: string;
};

const {
  isRefreshLoading = false,
  onRefresh,
  defaultButtonText,
  defaultLoadingText,
} = defineProps<Props>();

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

const buttonText = computed(() => defaultButtonText || t("buttons.refresh"));
const loadingText = computed(() => defaultLoadingText || t("messages.status-loading"));

// ------------------------------------------------------------------------------------------

const isLoading = ref(isRefreshLoading);

const handleRefresh = async () => {
  isLoading.value = true;
  await onRefresh();
  isLoading.value = false;
};
</script>

<template>
  <v-tooltip location="start" :text="buttonText">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-refresh"
        :disabled="isLoading"
        @click="handleRefresh"
        color="primary"
        size="small"
        aria-label="refresh"
        class="text-none text-subtitle-1"
      />
      <v-dialog v-model="isLoading" :min-width="300" :max-width="600" persistent>
        <section class="d-flex align-center justify-center">
          <v-progress-circular color="primary" indeterminate="disable-shrink" />
          <p class="text-h6 font-weight-bold ml-4">
            {{ loadingText }}
          </p>
        </section>
      </v-dialog>
    </template>
  </v-tooltip>
</template>
