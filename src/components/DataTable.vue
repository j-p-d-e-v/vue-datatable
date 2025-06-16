<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { Item, Column, SortBy, ColumnFilter } from "../interfaces/index";

interface Props {
  columns: Column[],
  rows: Item[],
  column_classes?: string,
  row_classes?: string,
  search_classes?: string,
  current_page?: number
  total_pages?: number
  height?: number,
  title?: string
}

const default_column_classes = ref<string>("pt-2 pr-3 pb-2 pl-3 text-xs font-semibold uppercase bg-gray-50 border-gray-300 border-1");
const default_row_classes = ref<string>("pt-2 pr-3 pb-2 pl-3 text-xs border-gray-300 border-1");
const default_search_classes = ref<string>("text-sm border-gray-300 border-1 w-70");
const table_id = ref<string>(`vdtable-${Math.floor((new Date()).getTime() * (Math.random() * 1000))}`)
const search_value = ref<string>("");
const search_timer = ref<ReturnType<typeof setTimeout>| null>(null);
const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  rows: () => [],
  height: () => 200,
  current_page: () => 1,
  total_pages: () => 1
});
const emits = defineEmits(["page-selected", "search","sort-by","show-column-filter","apply-filter"]);

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
  if(search_timer.value !== null) {
    clearTimeout(search_timer.value);
  }
  search_timer.value = setTimeout(() => {
    const target: HTMLInputElement = e.target;
    emits("search", target.value);
  }, 1000);
}

function sortBy(item: Column) {
  let data: SortBy = {
    field: item.value,
    order: item.sort_order
  };
  emits("sort-by",data);
  item.sort_order = (item.sort_order === "ASC") ? "DESC" : "ASC";
}

function showColumnFilter(item: Column) {
  if(item.show_menu){
    item.show_menu = false;
  } else {
    props.columns.forEach((i) => i.show_menu = false);
    const dom_label = document.getElementById(`${item.value}-label`);
    if(dom_label){
      let left_pos = (dom_label.offsetLeft - dom_label.offsetWidth) - 70;
      item.style = `left: ${left_pos > 0 ? left_pos : 0 }px;`;
      item.show_menu = true;
      emits("show-column-filter",item)
    }
  }
}

function applyFilter(item: Column){
  let value: any = item.filter_other ?? item.filter_value;
  let filter: ColumnFilter = {
    field: item.value,
    value: value
  };
  emits("apply-filter",filter);
}

</script>

<template>
  <div id="v-data-table-container">
    <div class="mb-1" align="right">
      <div class="float-left">
        <h3 v-if="props.title" class="font-semibold uppercase text-gray-600 mt-1 text-sm">{{  props.title }}</h3>
      </div>
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
    <div class="relative overflow-auto border-1 border-gray-300" :style="`height:${props.height}px`" :id="table_id">
      <table class="w-full text-gray-600 border-collapse table-layout">
        <thead>
          <tr>
            <th :class="getClasses(default_column_classes, item.classes)" :width="getWidth(item.width)" v-for="(item, key) in props.columns" :key="key" :id="`${item.label}-column`">
              <div class="w-full relative select-none" >
                <span @click="showColumnFilter(item)" :id="`${item.value}-label`" class="cursor-pointer hover:text-cyan-800">{{ item.label }}</span>
                <div :class="`shadow-lg h-auto z-index-9 border-1 border-gray-200 bg-white rounded-md mt-1 w-[300px] absolute`" :style="item.style" :id="`${item.value}-menu`" v-if="item.show_menu">
                  <ul class="w-full">
                    <template v-if="item.sortable">
                      <li class="p-2 border-b-1 border-gray-300 text-xs hover:bg-gray-100 hover:cursor-pointer hover:text-cyan-800" v-if="item.sort_order === 'ASC'"  @click="sortBy(item)">
                        <span class="float-left">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-wide-narrow-icon lucide-arrow-down-wide-narrow"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h10"/><path d="M11 8h7"/><path d="M11 12h4"/></svg>
                        </span>
                        <span class="float-left ml-3">Sort(Ascending)</span>
                        <div style="clear:both"></div>
                      </li>
                      <li class="p-2 border-b-1 border-gray-300 text-xs hover:bg-gray-100 hover:cursor-pointer hover:text-cyan-800" v-if="item.sort_order === 'DESC'"  @click="sortBy(item)">
                        <span class="float-left">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-narrow-wide-icon lucide-arrow-up-narrow-wide"><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h4"/><path d="M11 16h7"/><path d="M11 20h10"/></svg>
                        </span>
                        <span class="float-left ml-3">Sort(Descending)</span>
                        <div style="clear:both"></div>
                      </li>
                    </template>
                    <li class="p-2 border-b-1 border-gray-300 text-xs text-left pb-4">
                      <span class="font-semilight text-[10px]">Filter</span>
                      <div>
                        <select class="w-full font-normal border-1 border-gray-300 p-1 mb-2 mt-1" v-model="item.filter_value">
                          <option v-for="(option,key) in item.filter_options" :key="key" :value="option.value">{{ option.label  }}</option>
                        </select>
                      </div>
                      <div>
                        <span class="font-semilight text-[10px]">Other, please specify:</span>
                        <input v-model="item.filter_other" type="text" class="border-1 text-xs font-normal p-1 border-gray-300 w-full" placeholder="Enter custom value"/>
                      </div>
                      <div align="right" class="mt-3" v-if="item.filter_value ?? item.filter_other ">
                        <button @click="applyFilter(item)" class="p-1 border-1 border-gray-200 pl-3 pr-3 uppercase font-semibold hover:bg-gray-200 hover:cursor-pointer rounded-sm bg-gray-100 text-[10px]">apply</button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
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
      <span class="font-light text-xs"> / {{ total_pages }} pages</span>
    </div>
  </div>
</template>

<style>
.v-data-table tr:nth-child(odd) {
  background-color: #f9f9f9;
}
</style>
