<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable from "./components/DataTable.vue";
import { Item, Column } from "./interfaces/index";
const columns = ref<Header[]>([]);
const rows = ref<Item[]>([]);
const total_pages = ref<number>(0);
const limit = ref<number>(10);

interface Response {
  data: any[],
  limit: number,
  page: number,
  total: number
}

async function loadData(page: number, search_value: string) {
  let search = search_value ?? "";
  const url = `http://localhost:8000/data?page=${page}&limit=${limit.value}&search=${search}`;
  const response = await fetch(url);
  const result: Response = await response.json();
  limit.value = result.limit;
  total_pages.value = Math.floor(result.total / limit.value);
  columns.value = [];
  rows.value = [];
  [
    ["id", "Id"],
    ["name", "Name"],
    ["email", "Email"],
    ["role", "Role"],
    ["status", "Status"],
    ["created_at", "Created At"]].forEach((item) => {
      columns.value.push({
        label: item[1],
        value: item[0],
        sortable: true,
        sort_order: "ASC"
      } as Column);
    });
  result.data.forEach((item) => {
    let data: Item = {};
    Object.entries(item).forEach((i) => {
      data[i[0]] = i[1]
    });
    rows.value.push(data);
  });
}

function searchData(value: string) {
  loadData(1, value);
}

onMounted(async () => {
  await loadData(1);

});

function getPageSelected(value: number, search: string) {
  loadData(value, search)
}
</script>

<template>
  <div class="p-2">
    <DataTable :columns="columns" :rows="rows" :total_pages="total_pages" :current_page="1" :height="300"
      @page-selected="getPageSelected" @search="searchData" />
  </div>
</template>

<style scoped></style>
