<script setup lang="ts">
import useTranslation from "~/composables/use-translation";

// ------------------------------------------------------------------------------------------

const { t } = useTranslation();

// ------------------------------------------------------------------------------------------

const MOCK_SEARCH_RESULT = [
  { id: 1, text: "Real-Time1" },
  { id: 2, text: "Audience1" },
  { id: 3, text: "Conversions1" },
  { id: 4, text: "Real-Time2" },
  { id: 5, text: "Audience2" },
  { id: 6, text: "Conversions2" },
  { id: 7, text: "Real-Time3" },
  { id: 8, text: "Audience3" },
  { id: 9, text: "Conversions3" },
];

// ------------------------------------------------------------------------------------------

const isSearching = ref<boolean>(false);

const searchResult = ref<Array<(typeof MOCK_SEARCH_RESULT)[number]>>([]);

async function handleSearch(value: string) {
  console.log(value);

  isSearching.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  searchResult.value = MOCK_SEARCH_RESULT;
  isSearching.value = false;
}

async function handleClickSpecificResult(id: string | number) {
  console.log("click" + id);
}

async function handleDeleteSpecificResult(id: string | number) {
  console.log(id);
  searchResult.value = searchResult.value.filter((item) => item.id !== id);
}
</script>

<template>
  <v-dialog :min-width="300" :max-width="600" scrollable>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        variant="tonal"
        prepend-icon="mdi-magnify"
        class="d-flex justify-start mr-2 mr-lg-4"
        style="width: 130px"
        :text="t('buttons.search')"
      />
    </template>

    <template v-slot:default>
      <v-card class="rounded-lg">
        <!-- search field -->
        <v-text-field
          clearable
          :placeholder="`${t('buttons.search')}...`"
          prepend-inner-icon="mdi-magnify"
          color="primary"
          @keyup.enter="handleSearch($event.target.value)"
        >
          <template v-slot:loader>
            <v-progress-linear :active="isSearching" indeterminate color="primary" />
          </template>
        </v-text-field>

        <!-- result list -->
        <v-virtual-scroll :height="400" :items="searchResult">
          <template v-slot:default="{ item }">
            <v-list-item
              :key="item.id"
              :title="`Item-${item.text}`"
              class="py-2 mb-2 mx-2 rounded-lg cursor-pointer"
              @click.stop="handleClickSpecificResult(item.id)"
            >
              <template v-slot:append>
                <v-btn
                  icon="mdi-delete"
                  size="x-small"
                  variant="tonal"
                  @click.stop="handleDeleteSpecificResult(item.id)"
                />
              </template>
            </v-list-item>
          </template>
        </v-virtual-scroll>

        <v-divider class="mt-2" />
      </v-card>
    </template>
  </v-dialog>
</template>
