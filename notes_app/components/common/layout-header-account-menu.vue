<script setup lang="ts">
import useRoutes from "~/composables/use-routes";
import useTranslation from "~/composables/use-translation";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const { navigateTo, checkIsCurrentPathname } = useRoutes();

// ------------------------------------------------------------------------------------------

const { handleLogout, account } = useAccount();
</script>

<template>
  <v-menu location="bottom right" transition="slide-y-transition" :width="250">
    <template v-slot:activator="{ props }">
      <!-- account avatar -->
      <div style="height: 32px; width: 32px">
        <v-img
          v-bind="props"
          :width="32"
          :height="32"
          :src="account?.avatar"
          :lazy-src="account?.avatar"
          cover
          class="mr-2 mr-lg-4 cursor-pointer rounded-circle border-thin"
          aspect-ratio="16/9"
          draggable="false"
        />
      </div>
    </template>
    <!-- menu list -->
    <v-list class="py-2 px-2" style="margin-top: 20px">
      <!-- item of account details -->
      <v-list-item
        rounded
        density="comfortable"
        value="account-details"
        @click="navigateTo('/account')"
        :disabled="checkIsCurrentPathname('/account')"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-account" />
        </template>
        <v-list-item-title>{{ account?.displayName }}</v-list-item-title>
        <v-list-item-subtitle>{{ account?.email }}</v-list-item-subtitle>
      </v-list-item>

      <!-- confirm dialog of logout -->
      <v-divider class="my-2" />
      <v-dialog :min-width="300" :max-width="600" scrollable persistent>
        <template v-slot:activator="{ props: activatorProps }">
          <!-- item of logout -->
          <v-btn
            v-bind="activatorProps"
            :text="t('buttons.logout')"
            block
            variant="flat"
            color="error"
          />
        </template>
        <template v-slot:default="{ isActive }">
          <v-card :title="t('messages.confirm-logout')" class="rounded-lg">
            <!-- text -->
            <v-card-text>{{ t("messages.confirm-logout-2") }}</v-card-text>
            <!-- actions -->
            <v-divider class="mt-2" />
            <v-card-actions>
              <v-btn
                :text="t('buttons.cancel')"
                @click="isActive.value = false"
                variant="outlined"
                color="error"
              />
              <v-btn
                :text="t('buttons.logout')"
                @click="handleLogout(() => (isActive.value = false))"
                variant="flat"
                color="error"
              />
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-list>
  </v-menu>
</template>
