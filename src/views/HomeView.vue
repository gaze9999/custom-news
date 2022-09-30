<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { MaintenanceCurrentAPI, MaintenanceAPI } from "../api";
import type { MainCurrent, Main } from "@src/types/ffxiv";
import type { Ref } from "vue";

const props = defineProps<{
  locale: string;
}>();

onMounted(() => {
  getMaintenance();
  getMaintenanceCurrent();
});
watch(
  () => props.locale,
  () => {
    getMaintenance();
    getMaintenanceCurrent();
  }
);

let _mains: Ref<Main[]> = ref<Main[]>([]);
let _main: Ref<MainCurrent> = ref<MainCurrent>({
  companion: [],
  game: [],
  lodestone: [],
  mog: [],
  psn: [],
});

const getMaintenance = () =>
  MaintenanceAPI(props.locale).then((res: Main[]) => {
    // console.debug('t', [...res]);
    return (_mains.value = res);
  });

const getMaintenanceCurrent = () =>
  MaintenanceCurrentAPI(props.locale).then((res: MainCurrent) => {
    // console.debug('t', [...res]);
    return (_main.value = res);
  });

const mains = computed<Main[]>(() => _mains.value
  ? _mains.value
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
    .sort((a: Main, b: Main): number => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    })
    .reverse()
  : []
);

const main = computed<MainCurrent>(() => {
  return _main.value ? _main.value : {
    companion: [],
    game: [],
    lodestone: [],
    mog: [],
    psn: [],
  };
});
</script>

<template>
  <v-row>
    <v-col>
      <h2>FF XIV Service Status</h2>
      <dl v-if="mains?.[0]">
        <dt>{{ mains[0].timeStamp }}</dt>
        <dd>
          <a :href="mains[0].url"
             target="_blank"
             class="text-primary">{{ mains[0].title }}</a>
        </dd>
      </dl>

      <br>

      <v-row>
        <v-col>
          <h3>
            Game:
            <span v-if="!main?.game.some(d => d.current)">Online</span>
          </h3>
          <v-list v-if="main?.game.some(d => d.current)"
                  density="compact">
            <v-list-item v-for="(item, i) in main.game"
                         :key="i"
                         :value="item"
                         active-color="primary">
              <template v-slot:prepend>
                <p class="mr-3">{{ item?.timeStamp }}</p>
              </template>

              <v-list-item-title>
                <a :href="item?.url"
                   target="_blank"
                   class="text-primary">{{ item?.title }}</a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col>
          <h3>
            Lodestone:
            <span v-if="!main?.lodestone.some(d => d.current)">Online</span>
          </h3>
          <v-list v-if="main?.lodestone.some(d => d.current)"
                  density="compact">
            <v-list-item v-for="(item, i) in main?.lodestone"
                         :key="i"
                         :value="item"
                         active-color="primary">
              <template v-slot:prepend>
                <p class="mr-3">{{ item?.timeStamp }}</p>
              </template>

              <v-list-item-title>
                <a :href="item?.url"
                   target="_blank"
                   class="text-primary">{{ item?.title }}</a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col>
          <h3>
            Mog Station:
            <span v-if="!main?.mog.some(d => d.current)">Online</span>
          </h3>
          <v-list v-if="main?.mog.some(d => d.current)"
                  density="compact">
            <v-list-item v-for="(item, i) in main?.mog"
                         :key="i"
                         :value="item"
                         active-color="primary">
              <template v-slot:prepend>
                <p class="mr-3">{{ item?.timeStamp }}</p>
              </template>

              <v-list-item-title>
                <a :href="item?.url"
                   target="_blank"
                   class="text-primary">{{ item?.title }}</a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped lang="sass">
h3 > span
  font-weight: 400
</style>
