"ise client";

import { Button, IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { IUserResponse } from "../interfaces/response";

interface IProps {
  columns: ComponentInterfaces.IColumn[];
  rows: any[];
  page: number; // Nhận trang từ component cha
  pageSize: number; // Nhận số bản ghi mỗi trang từ component cha
  onPageChange: (newPage: number) => void; // Hàm để thay đổi trang
  rowCount: number;
  onPageSizeChange: (newPageSize: number) => void; // Hàm để thay đổi số bản ghi mỗi trang
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedData: Partial<IUserResponse>) => void;
}

function DataTableComponent(props: IProps) {
  const paginationModel = { page: 0, pageSize: 10 };

  const ActionCol = ({
    id,
    rowData,
  }: {
    id: string;
    rowData: IUserResponse;
  }) => {
    const handleEdit = () => {
      props.onEdit(id, rowData);
    };

    return (
      <div className="flex justify-center items-center h-full">
        <IconButton onClick={handleEdit}>
          <EditIcon color="primary" fontSize="small" />
        </IconButton>
        <IconButton onClick={() => props.onDelete(id)}>
          <DeleteIcon color="warning" fontSize="small" />
        </IconButton>
      </div>
    );
  };

  const [selected, setSelected] = useState<any>([]);

  const onDelete = () => {
    props.onDelete(selected);
  };

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <div className="p-2 gap-10">
        {selected.length > 0 && (
          <IconButton onClick={onDelete}>
            <DeleteIcon color="warning" fontSize="small" />
          </IconButton>
        )}
      </div>
      <DataGrid
        rows={props.rows.map((item, index) => ({
          ...item,
          index: index + 1,
        }))}
        columns={[
          ...props.columns,
          {
            field: "actions",
            headerName: "Thao tác",
            filterable: false,
            width: 100,
            renderCell: (params) => (
              <ActionCol id={params.row.id} rowData={params.row} />
            ),
          },
        ]}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 30, 50, 100]}
        pagination
        paginationMode="server" // Sử dụng pagination server-side
        rowCount={props.rowCount} // Tổng số hàng trong bảng (bao gồm tất cả các trang)
        pageSize={props.pageSize} // Số lượng hàng trên mỗi trang
        page={props.page} // Trang hiện tại
        onPageChange={(newPage) => props.onPageChange(newPage)} // Gọi hàm thay đổi trang
        onPageSizeChange={(newPageSize) => props.onPageSizeChange(newPageSize)} // Gọi hàm thay đổi pageSize
        checkboxSelection
        sx={{ border: 0 }}
        disableRowSelectionOnClick
        onRowSelectionModelChange={(rows) => {
          setSelected(rows);
        }}
      />
    </Paper>
  );
}

export default DataTableComponent;
