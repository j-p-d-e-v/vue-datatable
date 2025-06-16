# Vue Data Table

A simple, lightweight, and customizable Vue data table component featuring sorting, filtering, pagination, and event-based communication.

---

## 📦 Dependencies

Install Vue TypeScript support:

```bash
npm install -D vue-tsc
```

---

## 🚀 Development

Start the development server:

```bash
yarn dev
```

---

## 🏗️ Build

Create a production build:

```bash
yarn build
```

---

## 📡 Component Events

The component emits several events to interact with the parent component:

### `@page-selected`

Triggered when a new page is selected.

- `value`: `number` – The selected page number.
- `search`: `string` – The current search query.

---

### `@search`

Triggered when the search input is updated.

- `value`: `string` – The current search query.

---

### `@sort-by`

Triggered when a column is sorted.

- `data`: `SortBy` – Sorting configuration (interface or object).

---

### `@show-column-filter`

Triggered when a column’s filter UI is opened.

- `item`: `Column` – The column object. You can populate `filter_options` dynamically here.

#### Example:

```ts
function loadColumnFilterValues(item: Column) {
  item.filter_options = [
    { label: "Test 1", value: "test-1" },
    { label: "Test 2", value: "test-2" },
    { label: "Test 3", value: "test-3" }
  ];
}
```

---

### `@apply-filter`

Triggered when a filter is applied to a column.

- `data`: `ColumnFilter` – The selected filter object.

---

## 📘 Usage

### In `main.js`:

```js
import './assets/main.css'
import VDataTablePlugin from 'vue-data-table'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(VDataTablePlugin).mount('#app')
```

---

### In `MyVueComponent.vue`:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTable from './components/DataTable.vue'
import { Item, Column, ColumnFilter } from './interfaces/index'
import Test from './test/Test.vue'

const columns = ref<Column[]>([])
const rows = ref<Item[]>([])
const total_pages = ref<number>(0)
const limit = ref<number>(10)

interface Response {
  data: any[]
  limit: number
  page: number
  total: number
}

async function loadData(page: number, search_value?: string) {
  const search = search_value ?? ''
  const url = `http://localhost:8000/data?page=${page}&limit=${limit.value}&search=${search}`
  const response = await fetch(url)
  const result: Response = await response.json()
  limit.value = result.limit
  total_pages.value = Math.ceil(result.total / limit.value)
  
  columns.value = [
    { label: 'Id', value: 'id', sortable: true, sort_order: 'ASC' },
    { label: 'Name', value: 'name', sortable: true, sort_order: 'ASC' },
    { label: 'Email', value: 'email', sortable: true, sort_order: 'ASC' },
    { label: 'Role', value: 'role', sortable: true, sort_order: 'ASC' },
    { label: 'Status', value: 'status', sortable: true, sort_order: 'ASC' },
    { label: 'Created At', value: 'created_at', sortable: true, sort_order: 'ASC' }
  ]
  
  rows.value = result.data.map(item => {
    const row: Item = {}
    Object.entries(item).forEach(([key, val]) => {
      row[key] = val
    })
    return row
  })
}

function loadColumnFilterValues(item: Column) {
  item.filter_options = [
    { label: 'Test 1', value: 'test-1' },
    { label: 'Test 2', value: 'test-2' },
    { label: 'Test 3', value: 'test-3' }
  ]
}

function searchData(value: string) {
  loadData(1, value)
}

function applyFilter(item: ColumnFilter) {
  console.log(item)
}

function getPageSelected(value: number, search: string) {
  loadData(value, search)
}

onMounted(() => {
  loadData(1)
})
</script>

<template>
  <div class="p-2">
    <DataTable
      title="My Data"
      :columns="columns"
      :rows="rows"
      :total_pages="total_pages"
      :current_page="1"
      :height="300"
      @show-column-filter="loadColumnFilterValues"
      @apply-filter="applyFilter"
      @page-selected="getPageSelected"
      @search="searchData"
    />
    <Test />
  </div>
</template>

<style scoped></style>
```

---

## 📝 Notes

- Be sure to define and import the appropriate `Column`, `SortBy`, `ColumnFilter`, and `Item` interfaces or types in your project.
- This component is best suited for small to medium-sized datasets.
- For large datasets, server-side pagination, sorting, and filtering are recommended.
