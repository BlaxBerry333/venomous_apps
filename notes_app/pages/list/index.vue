<script setup lang="ts">
import { SelectableNoteType, type NoteDataType } from "~/utils/types";
import type { ReturnType } from "~/server/api/notes/list.get";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const selectedNoteType = ref<SelectableNoteType>(SelectableNoteType.raft);

// ------------------------------------------------------------------------------------------

const { data, status, refresh } = useAsyncData<ReturnType>(
  `${selectedNoteType.value}`,
  () => $fetch(`/api/notes/list?type=${selectedNoteType.value}`),
);

const noteList = computed<Array<NoteDataType>>(() => data.value?.data?.notes || []);

const errorMessage = computed<ReturnType["error"]>(() => data.value?.error || null);

const isError = computed<boolean>(() => data.value?.error !== null);

const isLoading = computed<boolean>(
  () => status.value !== "success" && status.value !== "error",
);

const isEmptyData = computed<boolean>(() => !noteList.value.length);
</script>

<template>
  <v-sheet id="pages-list" style="background-color: transparent">
    <section class="d-flex align-center justify-space-between">
      <!-- page title -->
      <h3 class="text-h5 font-weight-bold">
        {{ t("nav.list") }}
      </h3>
      <!-- data refresh button -->
      <v-btn
        :text="t('buttons.refresh')"
        @click="refresh"
        color="primary"
        class="text-none text-subtitle-1"
        aria-label="refresh"
        style="width: 100px"
      />
    </section>

    <!-- when is response error -->
    <section v-if="isError" class="py-10">
      <v-alert
        v-if="errorMessage"
        type="error"
        title="Something Wrong"
        :text="errorMessage"
      />
    </section>

    <!-- when is empty note list -->
    <section v-if="isEmptyData" class="py-10">
      <v-img
        :width="300"
        cover
        aspect-ratio="16/9"
        src="~/assets/images/status-404.webp"
        lazy-src="~/assets/images/status-404.webp"
        class="mx-auto"
        draggable="false"
      />
    </section>

    <!-- note list -->
    <v-row>
      <v-col v-for="note in noteList" :key="note._id" cols="12" sm="6" lg="4">
        <v-skeleton-loader :loading="isLoading" type="image, list-item-two-line">
          <v-card
            :subtitle="note.updated_at.toString()"
            :text="'...'"
            width="100%"
            class="py-4"
            color="cyan-lighten-4"
            hover
          />
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-sheet>
</template>
