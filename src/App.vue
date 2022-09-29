<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { RouterLink } from 'vue-router';

let currentLocale: Ref<string> = ref('jp');

const changeLang = (locale: string) => {
  // console.debug('locale:', locale);
  currentLocale.value = locale;
};
</script>

<template>
  <header class="w-100">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/ffxiv">FF XIV</RouterLink>
      <!-- <RouterLink to="/mhr">Monster Hunter Rise</RouterLink> -->
      <!-- <RouterLink to="/splatoon3">Splatoon 3</RouterLink> -->
      <!-- <RouterLink to="/about">About</RouterLink> -->
    </nav>
    <div class="lang_senection">
      <v-btn flat
             color="secondary"
             @click="changeLang('jp')">JP</v-btn>
      <v-btn flat
             color="secondary"
             @click="changeLang('na')">EN</v-btn>
    </div>
  </header>

  <main>
    <RouterView :locale="currentLocale" />
  </main>

  <footer>
    <div></div>
  </footer>
</template>

<style scoped lang="sass">
header
  height: 4rem

nav 
  width: 100%
  font-size: 12px
  text-align: center
  margin-top: 2rem

.lang_senection
  display: flex
  > button:not(:last-of-type)
    margin-inline-end: .5rem

nav a.router-link-exact-active 
  color: var(--color-text)

nav a.router-link-exact-active:hover 
  background-color: transparent

nav a 
  display: inline-block
  padding: 0 1rem
  border-left: 1px solid var(--color-border)

nav a:first-of-type 
  border: 0

@media (min-width: 1024px) 
  header 
    display: flex
    place-items: center
    padding-right: calc(var(--section-gap) / 2)
  
  .logo 
    margin: 0 2rem 0 0

  header .wrapper 
    display: flex
    place-items: flex-start
    flex-wrap: wrap

  nav 
    text-align: left
    margin-left: -1rem
    font-size: 1rem

    padding: 1rem 0
    margin-top: 1rem
</style>
