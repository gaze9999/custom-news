<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { TopicAPI, MaintenanceAPI } from "../api";
import type { Main, Topic } from "@src/types/ffxiv";
import type { Ref } from "vue";

const props = defineProps<{
  locale: string;
}>();

onMounted(() => {
  getTopic();
  getMaintenance();
});
watch(
  () => props.locale,
  () => {
    getTopic();
    getMaintenance();
  }
);

let _topics: Ref<Topic[]> = ref<Topic[]>([]);
let _mains: Ref<Main[]> = ref<Main[]>([]);

const getMaintenance = () =>
  MaintenanceAPI(props.locale).then((res: Main[]) => {
    // console.debug('t', [...res]);
    return (_mains.value = res);
  });

const getTopic = () =>
  TopicAPI(props.locale).then((res: Topic[]) => {
    // console.debug('t', [...res]);
    return (_topics.value = res);
  });

const topics = computed<Topic[]>((): Topic[] => _topics.value
  ? _topics.value
    .map((d) => {
      const date = new Date(new Date(d.time).getTime() - 3.6e6);
      return {
        ...d,
        timeStamp:
          `${date.getFullYear()}-` +
          `${date.getMonth() + 1}-` +
          `${date.getDate().toString().length === 1
            ? "0" + date.getDate()
            : date.getDate()
          }`,
        // `${date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours()}`,
      };
    })
    .sort((a: Topic, b: Topic): number => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    })
    .reverse()
  : [{
    description: "none",
    id: "none",
    image: "none",
    time: "none",
    title: "none",
    url: "none",
  }]
);

const mains = computed<Main[]>((): Main[] => {
  return _mains.value;
});
</script>

<template>
  <!-- <p>{{ locale }}</p> -->
  <div class="d-flex">
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
                     :alt="topics[i].id" />
                {{ topics[i].description }}
                <!-- </v-card> -->
              </div>
            </v-tooltip>
          </v-hover>
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <v-list density="compact">
      <v-list-item v-for="(item, i) in mains"
                   :key="i"
                   :value="item"
                   active-color="primary">
        <template v-slot:prepend>
          <p class="mr-3">{{ item.time }}</p>
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
                {{ mains[i].title }}
              </div>
            </v-tooltip>
          </v-hover>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped lang="sass">
.topic_detail
  max-width: 762px
  object-fit: contain
  img
    width: 100%
</style>
