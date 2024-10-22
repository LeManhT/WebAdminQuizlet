"use client";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export const CreateUserDialog = ({ open, onClose, onCreate }) => {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleCreateUser = () => {
    const newUser = {
      loginName,
      loginPassword,
      dateOfBirth,
    };
    onCreate(newUser);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tạo mới người dùng</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Login Name"
          type="text"
          fullWidth
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Login Password"
          type="password"
          fullWidth
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <TextField
          margin="dense"
          label="Date of Birth"
          type="date"
          fullWidth
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={handleCreateUser} color="secondary">
          Tạo
        </Button>
      </DialogActions>
    </Dialog>
  );
};
