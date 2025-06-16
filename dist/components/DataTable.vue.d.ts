import { Item, Column } from "../interfaces/index";
interface Props {
    columns: Column[];
    rows: Item[];
    column_classes?: string;
    row_classes?: string;
    search_classes?: string;
    current_page?: number;
    total_pages?: number;
    height?: number;
    title?: string;
}
declare const _default: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "page-selected": (...args: any[]) => void;
    search: (...args: any[]) => void;
    "sort-by": (...args: any[]) => void;
    "show-column-filter": (...args: any[]) => void;
    "apply-filter": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    "onPage-selected"?: ((...args: any[]) => any) | undefined;
    onSearch?: ((...args: any[]) => any) | undefined;
    "onSort-by"?: ((...args: any[]) => any) | undefined;
    "onShow-column-filter"?: ((...args: any[]) => any) | undefined;
    "onApply-filter"?: ((...args: any[]) => any) | undefined;
}>, {
    columns: Column[];
    rows: Item[];
    current_page: number;
    total_pages: number;
    height: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
