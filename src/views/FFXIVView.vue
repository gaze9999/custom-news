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
let showDetail = ref({
  order: 0,
  show: false,
  bottom: true,
  x: 0,
  y: 0,
});

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

const onHover = (event: MouseEvent, order: number) => {
  showDetail.value = {
    order: order,
    show: true,
    x: event.x,
    y: event.y,
    bottom: event.y <= document.body.clientHeight / 2,
  };
  // console.debug(`hover(${order}):`, [event, showDetail, document.body, topics.value[order]]);
};

const onLeave = () => showDetail.value.show = false;
</script>

<template>
  <!-- <p>{{ locale }}</p> -->
  <v-list density="compact">
    <v-list-item v-for="(item, i) in topics"
                 :key="i"
                 :value="item"
                 active-color="primary"
                 @mouseenter="(e: MouseEvent) => onHover(e, i)"
                 @mouseleave="onLeave()">
      <template v-slot:prepend>
        <p class="mr-3">{{ item.timeStamp }}</p>
      </template>

      <v-list-item-title v-bind="props">
        <v-hover v-slot="{ isHovering, props }">
          <a :href="item.url"
             target="_blank"
             v-bind="props"
             class="text-primary">{{ item.title }}</a>


          <v-tooltip :model-value="isHovering && showDetail.order === i"
                     activator="parent"
                     location-strategy="connected"
                     location="bottom">
            <!-- <v-card class="topic_detail"> -->
            <div class="topic_detail">
              <img :src="topics[i].image"
                   alt="image">
              <article>
                {{ topics[i].description }}
              </article>
            </div>
            <!-- </v-card> -->
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
