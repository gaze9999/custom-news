<script setup lang="ts">
import type { Topic } from 'env';
import { computed, onMounted, ref } from 'vue';
import { TopicAPI } from '../api/topic';

let topics = ref<Topic[]>([]);

onMounted(async () => {
  TopicAPI().then(res => { console.debug('t', [...res]); topics.value = res; });
});

const result = computed<Topic[]>(() =>
  topics.value ? topics.value
    .map(d => {
      const date = new Date(new Date(d.time).getTime() - 3.6e+6);
      return {
        ...d,
        timeStamp:
          `${date.getFullYear()}-` +
          `${date.getMonth() + 1}-` +
          `${date.getDate()}`,
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
    }])

</script>

<template>
  <div>
    <dl>
      <template v-for="(item, i) of result"
                :key="i">
        <div>
          <dt>
            {{ item.timeStamp }}
            <!-- ({{ item.time }}) -->
          </dt>
          <dd>
            {{ item.title }}
          </dd>
        </div>
      </template>
    </dl>
  </div>
</template>

<style scoped lang="sass">
  dl
    margin-left: 2rem
  dt
    width: 7rem
  dt, dd
    display: inline-flex
</style>
