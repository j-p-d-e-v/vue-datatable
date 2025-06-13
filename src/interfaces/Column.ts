export interface Column {
  label: string;
  value: string;
  width: number;
  classes?: string;
  sortable: boolean,
  sort_order?: "ASC" | "DESC",
  show_menu?: boolean
  style?: string
}
