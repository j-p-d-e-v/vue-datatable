# Vue Data Table

A simple, lightweight, and customizable Vue data table component with sorting, filtering, pagination, and event-based extensibility.

---

## 📦 Dependencies

Install TypeScript support for Vue:

```
npm install -D vue-tsc
```

---

## 🚀 Development

To start the development server:

```
yarn dev
```

---

## 📦 Build

To create a production build:

```
yarn build
```

---

## 📡 Component Events

The component emits several events to enable interaction with parent components.

### `@page-selected`

Emitted when a new page is selected.

- `value`: `number` – The selected page number.
- `search`: `string` – The current search query.

---

### `@search`

Emitted when the search input changes.

- `value`: `string` – The updated search query.

---

### `@sort-by`

Emitted when a column is sorted.

- `data`: `SortBy` – The sorting configuration (interface or object expected).

---

### `@show-column-filter`

Emitted when a column's filter menu is opened.

- `item`: `Column` – The column object. Use this to provide filter options dynamically.

#### Example

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

Emitted when a column filter is applied.

- `data`: `ColumnFilter` – The selected filter item.

---

## 📝 Notes

- Make sure to define and import the appropriate `Column`, `SortBy`, and `ColumnFilter` interfaces or types in your project.
- This component is ideal for small to medium-sized datasets. For large datasets, consider server-side pagination and filtering.
