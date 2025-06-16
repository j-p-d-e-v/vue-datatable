import { App } from "vue";
import DataTable from "./components/DataTable.vue";

export default { 
    install(app: App) {
        app.component("DataTable",DataTable);
    }
}

export { DataTable };
export * from "./interfaces";