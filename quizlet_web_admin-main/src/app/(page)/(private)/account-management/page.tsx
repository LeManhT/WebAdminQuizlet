"use client";

import DataTableComponent from "@/app/common/DataTable";
import LoadingComponent from "@/app/common/Loading";
import { accountService } from "@/app/service/accountService";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { accountManagementCols } from "../constant";
import { IUpdateUserResponse, IUserResponse } from "@/app/interfaces/response";
import { CreateUserDialog } from "../(component)/(user-create)/page";

function AccountManagement() {
  const [loading, setLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<IUserResponse[]>([]);

  const [page, setPage] = useState(0); // Trang hiện tại
  const [pageSize, setPageSize] = useState(10); // Số lượng tài khoản mỗi trang
  const [rowCount, setRowCount] = useState(100);

  const [openDialog, setOpenDialog] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const getAccounts = (page: number, pageSize: number) => {
    setLoading(true);
    accountService
      .getAccount(page, pageSize) // Thêm page và pageSize vào API call
      .then((res) => {
        const accounts = res.data;
        if (accounts.length > 0) setAccounts(accounts);
      })
      .catch(() => {
        showAlert("Lỗi máy chủ", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(`Vao page : ${page}`);
    getAccounts(page, pageSize);
  }, [page, pageSize]);

  const [snackbar, setSnackbar] = useState<ComponentInterfaces.ISnackbar>({
    visible: false,
    serverity: "info",
    message: "",
  });

  const showAlert = (
    message: string,
    serverity: "info" | "success" | "error" = "info"
  ) => {
    setSnackbar({
      visible: true,
      serverity: serverity,
      message: message,
    });
  };

  const hideAlert = () => {
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  // Xóa tài khoản
  const deleteAccounts = (id: string) => {
    accountService
      .deleteAccount(id)
      .then(() => {
        showAlert("Xóa tài khoản thành công", "success");
        getAccounts(page, pageSize); // Tải lại danh sách tài khoản sau khi xóa
      })
      .catch(() => {
        showAlert("Lỗi khi xóa tài khoản", "error");
      });
  };

  // Mở dialog xác nhận xóa tài khoản
  const openDeleteDialog = (id: string) => {
    setAccountToDelete(id);
    setOpenDialog(true);
  };

  // Xóa tài khoản
  const confirmDeleteAccount = () => {
    if (accountToDelete) {
      accountService
        .deleteAccount(accountToDelete)
        .then(() => {
          showAlert("Xóa tài khoản thành công", "success");
          getAccounts(page, pageSize);
        })
        .catch(() => {
          showAlert("Lỗi khi xóa tài khoản", "error");
        })
        .finally(() => {
          setOpenDialog(false);
          setAccountToDelete(null);
        });
    }
  };

  const editAccount = (
    id: string,
    updatedData: Partial<IUpdateUserResponse>
  ) => {
    accountService
      .editAccount(id, updatedData)
      .then(() => {
        showAlert("Cập nhật tài khoản thành công", "success");
        getAccounts(page, pageSize);
      })
      .catch(() => {
        showAlert("Lỗi khi cập nhật tài khoản", "error");
      });
  };

  const handlePageChange = (newPage) => {
    console.log(`Changing to page: ${newPage}`);
    setPage(newPage);
  };

  const handleCreateUser = (userData) => {
    console.log("User data received:", userData);
    accountService
      .createAccount(
        userData.loginName,
        userData.loginPassword,
        userData.dateOfBirth
      )
      .then(() => {
        showAlert("Tạo người dùng thành công", "success");
        getAccounts(page, pageSize);
      })
      .catch(() => {
        showAlert("Lỗi khi tạo người dùng", "error");
      });
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <div className="w-full h-full">
      <Snackbar
        open={snackbar.visible}
        autoHideDuration={6000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={hideAlert}
          severity={snackbar.serverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Dialog xác nhận xóa tài khoản */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Xác nhận xóa tài khoản</DialogTitle>
        <DialogContent>Bạn có chắc chắn muốn xóa tài khoản này?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={confirmDeleteAccount} color="secondary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Button onClick={() => setOpenCreateDialog(true)} color="primary">
        Tạo mới người dùng
      </Button>

      <CreateUserDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onCreate={handleCreateUser}
      />

      <div className="p-3 md:p-10">
        <DataTableComponent
          rows={accounts}
          rowCount={rowCount} // Tổng số lượng hàng
          columns={accountManagementCols}
          page={page}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} // Thay đổi pageSize
          onDelete={openDeleteDialog}
          onEdit={editAccount}
        />
      </div>
    </div>
  );
}

export default AccountManagement;
