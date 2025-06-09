<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue";
import { Item, Column } from "../interfaces/index";

interface Props {
  columns: Column[],
  rows: Item[],
  column_classes?: string,
  row_classes?: string,
  search_classes?: string,
  current_page?: number
  total_pages?: number
}

const emits = defineEmits(["page-selected", "search"]);
const default_column_classes = ref<string>("pt-2 pr-3 pb-2 pl-3 text-xs font-semibold uppercase bg-gray-50 border-gray-300 border-1");
const default_row_classes = ref<string>("pt-2 pr-3 pb-2 pl-3 text-xs border-gray-300 border-1");
const default_search_classes = ref<string>("text-sm border-gray-300 border-1 w-70");
const search_value = ref<string>("");
const search_timer = ref(null);
const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  rows: () => [],
  current_page: () => 1,
  total_pages: () => 1
});

function pageSelected(e: any) {
  const target: HTMLSelectElement = e.target;
  emits("page-selected", target.value, search_value.value);
}

function getWidth(value?: number): number {
  return value ?? 0;
}

function getClasses(default_classes: string, value?: string): string {
  return value ?? default_classes;
}

function searchData(e: any) {
  search_timer.value = clearTimeout(search_timer.value);
  search_timer.value = setTimeout(() => {
    const target: HTMLInputElement = e.target;
    emits("search", target.value);
  }, 1000);
}


onMounted(() => {

});

</script>

<template>
  <div id="v-data-table-container">
    <div class="mb-1" align="right">
      <div :class="getClasses(default_search_classes, props.search_classes)">
        <span class="float-left ml-2 mt-[5px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-search-icon lucide-search">
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
        </span>
        <input type="search" v-model="search_value" @keyup="searchData"
          class="float-left p-1 pr-3 pl-3 w-[90%] outline-none" placeholder="Seach here" />
        <div style="clear:both"></div>
      </div>
    </div>
    <div class="overflow-auto">
      <table class="w-full text-gray-600 border-collapse table-layout">
        <thead>
          <tr>
            <th :class="getClasses(default_column_classes, item.classes)" :width="getWidth(item.width)"
              v-for="(item, key) in props.columns" :key="key">
              {{ item.label }}
            </th>
          </tr>
        </thead>
        <tbody class="v-data-table">
          <tr v-for="(row, rkey) in props.rows" :key="rkey">
            <td :class="getClasses(default_row_classes, row.classes)" v-for="(column, ckey) in props.columns"
              :key="ckey">
              {{ row[column.value] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-2 text-sm text-gray-700">
      <select @change="pageSelected"
        class="pt-1 pb-1 pl-3 text-xs font-semibold text-gray-600 border-gray-300 lowecase border-1">
        <option v-for="(value, key) in props.total_pages" :key="key">{{ value }} </option>
      </select>
      / {{ total_pages }}
    </div>
  </div>
</template>

<style>
.v-data-table tr:nth-child(odd) {
  background-color: #f9f9f9;
}
</style>
