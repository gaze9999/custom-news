<script setup lang="ts">
import { ref } from 'vue';
import { routePages } from './router';
import type { Ref } from 'vue';

let currentLocale: Ref<string> = ref('jp');
let showMenu: Ref<boolean> = ref(false);

const changeLang = (locale: string) => {
  // console.debug('locale:', locale);
  currentLocale.value = locale;
};
</script>

<template>
  <v-app>
    <v-layout ref="app">
      <v-app-bar name="app-bar"
                 color="primary">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="showMenu = !showMenu"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Custom News</v-app-bar-title>

        <template v-slot:append>
          <div class="d-flex ">
            <v-btn flat
                   rounded
                   color="secondary"
                   @click="changeLang('jp')">JP</v-btn>
            <v-btn flat
                   rounded
                   color="secondary"
                   @click="changeLang('na')">EN</v-btn>
          </div>
        </template>
      </v-app-bar>

      <v-navigation-drawer v-model="showMenu"
                           name="drawer"
                           color="grey-darken-2">
        <v-list density="compact"
                nav>
          <v-list-item :title="routePages[0].name"
                       :to="routePages[0].path"></v-list-item>
          <v-list-item :title="routePages[1].name"
                       :to="routePages[1].path"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- <v-navigation-drawer>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/ffxiv">FF XIV</RouterLink>
      </v-navigation-drawer> -->
      <v-main>
        <v-container fluid>
          <router-view :locale="currentLocale" />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped lang="sass">
</style>
