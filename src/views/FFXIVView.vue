<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { FFXIVTopicAPI } from '../api/ffxivtopic';
import type { Topic } from 'env';
import type { Ref } from 'vue';

const props = defineProps<{
  locale: string;
}>();

onMounted(() => getTopic());
watch(() => props.locale, () => getTopic());

let _topics: Ref<Topic[]> = ref<Topic[]>([]);

const getTopic = () =>
  FFXIVTopicAPI(props.locale).then(res => {
    // console.debug('t', [...res]);
    _topics.value = res;
  });

const topics = computed<Topic[]>(() =>
  _topics.value ? _topics.value
    .map(d => {
      const date = new Date(new Date(d.time).getTime() - 3.6e+6);
      return {
        ...d,
        timeStamp:
          `${date.getFullYear()}-` +
          `${date.getMonth() + 1}-` +
          `${date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate()}`,
        // `${date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours()}`,
      };
    })
    .sort((a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    })
    .reverse()
    : [{
      description: 'none',
      id: 'none',
      image: 'none',
      time: 'none',
      title: 'none',
      url: 'none',
    }]);
</script>

<template>
  <!-- <p>{{ locale }}</p> -->
  <v-list density="compact">
    <v-list-item v-for="(item, i) in topics"
                 :key="i"
                 :value="item"
                 active-color="primary">
      <template v-slot:prepend>
        <p class="mr-3">{{ item.timeStamp }}</p>
      </template>

      <v-list-item-title>
        <v-hover v-slot="{ isHovering }">
          <a :href="item.url"
             target="_blank"
             class="text-primary">{{ item.title }}</a>

          <v-tooltip :model-value="isHovering"
                     activator="parent"
                     location-strategy="connected"
                     location="bottom start">
            <div class="topic_detail">
              <!-- <v-card> -->
              <img :src="topics[i].image"
                   :alt="topics[i].id">
              {{ topics[i].description }}
              <!-- </v-card> -->
            </div>
          </v-tooltip>
        </v-hover>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="sass">
  .topic_detail
    max-width: 762px
    object-fit: contain
    img
      width: 100%
</style>
