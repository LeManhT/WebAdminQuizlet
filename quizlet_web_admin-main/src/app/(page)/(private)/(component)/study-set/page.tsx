"use client";
import React, { useEffect, useState } from "react";
import {
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { IStudySetModel } from "@/app/interfaces/response";
import FlashCardList from "../(flash-card-list)/page";
import { accountService } from "@/app/service/accountService";
import StudySetForm from "../(study-set-form)/page";
import LoadingComponent from "@/app/common/Loading";
import { studySetService } from "@/app/service/studySetService";

const StudySetList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [studySets, setStudySets] = useState<IStudySetModel[]>([]); // State cho Study Sets
  const [selectedStudySet, setSelectedStudySet] =
    useState<IStudySetModel | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const getAccounts = () => {
    accountService
      .getAccount(0, 10)
      .then((res) => {
        const accounts = res.data;
        if (accounts.length > 0) {
          const filteredStudySets = accounts.flatMap(
            (account) => account.documents.studySets || []
          );
          setStudySets(filteredStudySets);
        }
      })
      .catch(() => {
        showAlert("Lỗi máy chủ", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAccounts();
  }, []);
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

  const deleteStudySet = async (userId: string, setId: string) => {
    try {
      await studySetService.deleteStudySet(userId, setId);
      showAlert("Xóa Study Set thành công", "success");
      getAccounts();
      setOpenDialog(false);
    } catch (error) {
      showAlert("Lỗi khi xóa Study Set", "error");
    } finally {
      setOpenDialog(false);
    }
  };

  const editStudySet = async (
    userId: string,
    setId: string,
    studySet: IStudySetModel
  ) => {
    setSelectedStudySet(studySet);
    console.log(`UserId : ${userId} setID : ${setId}`);
  };

  const closeForm = () => {
    setSelectedStudySet(null);
    getAccounts();
  };

  const openDeleteDialog = (studySet: IStudySetModel) => {
    setSelectedStudySet(studySet);
    setOpenDialog(true);
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <div>
      <Snackbar
        open={snackbar.visible}
        autoHideDuration={6000}
        onClose={hideAlert}
      >
        <Alert onClose={hideAlert} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <h2 className="text-black">Danh sách Study Sets</h2>
      <ul className="text-black">
        {studySets.map((studySet) => (
          <li key={studySet.id} className="p-4">
            <h3>{studySet.name}</h3>
            <p>{studySet.description}</p>
            <FlashCardList cards={studySet.cards} />
            <Button
              onClick={() =>
                editStudySet(studySet.idOwner, studySet.id, studySet)
              }
            >
              Sửa
            </Button>
            <Button
              onClick={() => {
                openDeleteDialog(studySet);
              }}
            >
              Xóa
            </Button>
            {selectedStudySet && selectedStudySet.id === studySet.id && (
              <StudySetForm studySet={selectedStudySet} onClose={closeForm} />
            )}
          </li>
        ))}
      </ul>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Xác nhận xóa tài khoản</DialogTitle>
        <DialogContent>Bạn có chắc chắn muốn xóa tài khoản này?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Hủy
          </Button>
          <Button
            onClick={() => {
              if (selectedStudySet) {
                deleteStudySet(selectedStudySet.idOwner, selectedStudySet.id);
              } else {
                console.log("selectedSet null");
              }
            }}
            color="secondary"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudySetList;
