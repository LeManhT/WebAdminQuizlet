namespace ComponentInterfaces {
  export interface ISnackbar {
    visible: boolean;
    serverity?: "info" | "success" | "error";
    message: string;
  }

  export interface IColumn {
    field: string;
    headerName: string;
    width?: number;
    sortable?: boolean;
    editable?: true;
  }
}
