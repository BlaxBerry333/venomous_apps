<script setup lang="ts"></script>

<template>
  <v-list rounded="lg" class="py-0 px-0">
    <v-sheet class="px-2">
      <v-list-item color="grey-lighten-4" :title="'xxx'" class="py-2 px-2" />
    </v-sheet>

    <v-divider class="my-1" />

    <v-sheet class="px-2">
      <v-list-item
        v-for="n in 5"
        :key="n"
        :title="`List Item ${n}`"
        link
        class="py-2 px-2 my-2"
        rounded="lg"
      />
    </v-sheet>
  </v-list>
</template>
