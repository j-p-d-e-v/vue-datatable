<script setup lang="ts">
import { ref, onMounted } from "vue";
import { data as test_data } from "./assets/test-data.js";
import DataTable from "./components/DataTable.vue";
import { Item, Header } from "./interfaces/index";
const columns = ref<Header[]>([]);
const rows = ref<Item[]>([]);


interface Response {
  data: any[],
  limit: number,
  page: number,
  total: number
}

async function loadData(page: number, limit: number) {
  const url = `http://192.168.211.128:8000/data?page=${page}&limit=${limit}`;
  const response = await fetch(url);
  const result: Response = await response.json();
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
      } as Header);
    });
  result.data.forEach((item) => {
    let data: Item = {};
    Object.entries(item).forEach((i) => {
      data[i[0]] = i[1]
    });
    rows.value.push(data);
  });
}

onMounted(async () => {
  await loadData(1, 5);

});

function getPageSelected(value: number) {
  console.log("got page selected", value);
  loadData(value, 5)
}
</script>

<template>
  <div class="p-2">
    <DataTable :columns="columns" :rows="rows" :total_pages="4" :current_page="1" @page-selected="getPageSelected" />
  </div>
</template>

<style scoped></style>
