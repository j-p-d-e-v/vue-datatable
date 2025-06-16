import type { SelectOption } from "./SelectOption";
export interface Column {
  label: string;
  value: string;
  width: number;
  classes?: string;
  sortable: boolean,
  sort_order: "ASC" | "DESC",
  show_menu?: boolean
  style?: string,
  filter_options: SelectOption[],
  filter_value: any,
  filter_other: string
}

export interface ColumnFilter {
  field: string,
  value: any
}