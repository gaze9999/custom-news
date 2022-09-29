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
  <div>
    <dl class="topic_list">
      <template v-for="(item, i) of topics"
                :key="i">
        <div class="topic_item">
          <dt>
            {{ item.timeStamp }}
            <!-- ({{ item.time }}) -->
          </dt>
          <dd>
            <a :href="item.url"
               target="_blank"
               @mouseover="(e) => onHover(e, i)"
               @mouseleave="onLeave()">{{ item.title }}</a>

            <template v-if="showDetail.show && showDetail.order === i">
              <!-- <template v-if="i === 0"> -->
              <div class="topic_detail"
                   :style="{
                    '--position-x': showDetail.x,
                    '--position-bottom': !showDetail.bottom ? '1.25rem' : 'unset',
                    '--position-top': showDetail.bottom ? '1.25rem' : 'unset'
                   }">
                <!-- <p>debug: <span>{{ showDetail.x }}</span> x <span>{{ showDetail.y }}</span></p> -->
                <img :src="topics[i].image"
                     alt="image">
                {{ topics[i].description }}
                <article>
                </article>
              </div>
            </template>
          </dd>
        </div>
      </template>
    </dl>
  </div>
</template>

<style scoped lang="sass">
  dt
    margin-inline-end: .5rem
  dd, dt
    display: inline

  .topic_item
    position: relative
  .topic_detail
    position: absolute
    padding: 1rem
    background-color: var(--vt-c-black-mute)
    left: 0
    top: var(--position-top)
    bottom: var(--position-bottom)
    z-index: 1
</style>
