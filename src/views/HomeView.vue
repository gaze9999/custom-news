<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { TopicAPI } from '../api/topic';
import type { Topic } from 'env';
import type { Ref } from 'vue';

const props = defineProps<{
  locale: string;
}>();

let _topics: Ref<Topic[]> = ref<Topic[]>([]);

const getTopic = () =>
  TopicAPI(props.locale).then(res => { console.debug('t', [...res]); _topics.value = res; });

onMounted(() => getTopic());
watch(() => props.locale, () => {
  getTopic();
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
  <div>
    <dl>
      <template v-for="(item, i) of topics"
                :key="i">
        <div>
          <dt>
            {{ item.timeStamp }}
            <!-- ({{ item.time }}) -->
          </dt>
          <dd>
            <a :href="item.url"
               target="_blank">{{ item.title }}</a>
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
</style>
