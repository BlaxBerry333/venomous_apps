<script setup lang="ts">
import useTranslation from "~/composables/use-translation";

import LayoutHeaderAccountDialogForm from "./layout-header-account-dialog-form.vue";

// ------------------------------------------------------------------------------------------

const account = useAccount();

async function handleLogoIn(callback: () => void) {
  await account.handleLogoIn({ email: "xxx" });
  callback();
}

async function handleSignup(callback: () => void) {
  callback();
}

// ------------------------------------------------------------------------------------------

enum SelectableTab {
  login = "login",
  signup = "signup",
}

const selectedTab = ref<SelectableTab>(SelectableTab.login);

const isLoginTabPanel = computed<boolean>(
  () => selectedTab.value === SelectableTab.login,
);

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const isSubmitting = ref<boolean>(false);

async function handleSubmit(closeDialog: () => void): Promise<void> {
  isSubmitting.value = true;

  function callback() {
    isSubmitting.value = false;
    closeDialog();
  }

  if (isLoginTabPanel.value) {
    await handleLogoIn(callback);
    return;
  }
  await handleSignup(callback);
}
</script>

<template>
  <v-dialog :min-width="300" :max-width="600" scrollable persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <v-avatar
        v-bind="activatorProps"
        color="grey-darken-1"
        :size="32"
        icon="mdi-account"
        class="cursor-pointer"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        :loading="isSubmitting"
        elevation="4"
        class="py-10 px-6 px-lg-10 rounded-lg"
      >
        <template v-slot:loader="{ isActive }">
          <v-progress-linear :active="isActive" indeterminate color="primary" />
        </template>

        <!-- tabs of login/signup -->
        <v-tabs v-model="selectedTab" color="primary" slider-color="primary">
          <v-tab :value="SelectableTab.login">{{ t("buttons.login") }}</v-tab>
          <v-tab :value="SelectableTab.signup">{{ t("buttons.signup") }}</v-tab>
        </v-tabs>
        <v-divider />
        <v-tabs-window v-model="selectedTab" style="height: 200px">
          <!-- tab panel of login -->
          <v-tabs-window-item :value="SelectableTab.login" class="pt-10 pb-0">
            <LayoutHeaderAccountDialogForm v-show="isLoginTabPanel" />
          </v-tabs-window-item>
          <!-- tab panel of signup -->
          <v-tabs-window-item :value="SelectableTab.signup" class="pt-10 pb-0">
            <LayoutHeaderAccountDialogForm v-show="!isLoginTabPanel" />
          </v-tabs-window-item>
        </v-tabs-window>

        <!-- actions -->
        <v-divider class="my-2" />
        <v-card-actions class="d-flex flex-column">
          <v-btn
            :text="t('buttons.cancel')"
            @click="isActive.value = false"
            variant="outlined"
            color="primary"
            size="large"
            block
          />
          <v-spacer></v-spacer>
          <v-btn
            :text="isLoginTabPanel ? t('buttons.login') : t('buttons.signup')"
            @click="handleSubmit(() => (isActive.value = false))"
            variant="flat"
            color="primary"
            size="large"
            block
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
