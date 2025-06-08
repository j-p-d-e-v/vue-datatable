<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue";
import { Item, Header } from "../interfaces/index";

interface Props {
  columns: Header[],
  rows: Item[],
  column_classes?: string,
  row_classes?: string,
  current_page?: number
  total_pages?: number
}

const emits = defineEmits(["page-selected"])

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  rows: () => [],
  column_classes: () => "pt-2 pr-3 pb-2 pl-3 text-sm font-semibold uppercase bg-gray-50 border-gray-300 border-1",
  row_classes: () => "pt-2 pr-3 pb-2 pl-3 text-sm border-gray-200 border-1",
  current_page: () => 1,
  total_pages: () => 1
});

function pageSelected(e: any) {
  const target: HTMLSelectElement = e.target;
  emits("page-selected", target.value);
}

function getColumnClasses(value?: string) {
  return value ?? props.column_classes;
}

function getRowClasses(value?: string) {
  return value ?? props.row_classes;
}

onMounted(() => {

});

</script>

<template>
  <div class="overflow-auto">
    <table class="w-full text-gray-600 border-collapse table-layout">
      <thead>
        <tr>
          <th :class="getColumnClasses(item.classes)" v-for="(item, key) in props.columns" :key="key">
            {{ item.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rkey) in props.rows" :key="rkey">
          <td :class="getRowClasses(row.classes)" v-for="(column, ckey) in props.columns" :key="ckey">
            {{ row[column.value] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-2">
    <select @change="pageSelected" class="pt-1 pb-1 pl-3 text-sm text-gray-600 border-gray-300 border-1">
      <option v-for="(value, key) in props.total_pages" :key="key"> {{ value }}</option>
    </select>
  </div>
</template>
