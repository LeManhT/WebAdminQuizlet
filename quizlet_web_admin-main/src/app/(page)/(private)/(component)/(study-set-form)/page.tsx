import React, { useEffect, useState } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import { IFlashCardModel, IStudySetModel } from "@/app/interfaces/response";
import { studySetService } from "@/app/service/studySetService";

interface StudySetFormProps {
  studySet?: IStudySetModel | null;
  onClose: () => void;
}

const StudySetForm: React.FC<StudySetFormProps> = ({ studySet, onClose }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    severity: "info",
  });
  const [flashcards, setFlashcards] = useState<IFlashCardModel[]>([]);

  useEffect(() => {
    if (studySet) {
      setName(studySet.name);
      setDescription(studySet.description);
      setFlashcards(studySet.cards || []); // Assuming studySet has a flashcards property
    }
  }, [studySet]);

  const handleFlashcardChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedFlashcards = flashcards.map((flashcard, i) => {
      if (i === index) {
        return { ...flashcard, [field]: value };
      }
      return flashcard;
    });
    setFlashcards(updatedFlashcards);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (studySet) {
        await studySetService.editStudySet(studySet.idOwner, studySet.id, {
          name,
          description,
          allNewCards: flashcards,
        });
        showAlert("Cập nhật Study Set thành công", "success");
      } else {
        // await studySetService.createStudySet({ name, description });
        showAlert("Tạo Study Set thành công", "success");
      }
      onClose(); // Đóng form sau khi hoàn tất
    } catch (error) {
      showAlert("Lỗi khi lưu Study Set", "error");
    }
  };

  const showAlert = (
    message: string,
    severity: "info" | "success" | "error"
  ) => {
    setSnackbar({ visible: true, message, severity });
  };

  const hideAlert = () => {
    setSnackbar({ ...snackbar, visible: false });
  };

  const handleAddFlashcard = () => {
    setFlashcards([...flashcards, { term: "", definition: "" }]);
  };

  return (
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
      <h2>{studySet ? "Chỉnh sửa Study Set" : "Thêm Study Set"}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tên Study Set"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />

        <h3>Flashcards</h3>

        {flashcards.length === 0 ? (
          <Button
            variant="contained"
            color="primary"
            className="mr-3"
            onClick={handleAddFlashcard}
          >
            Thêm Flashcard mới
          </Button>
        ) : (
          flashcards.map((flashcard, index) => (
            <div key={index}>
              <TextField
                label={`Term`}
                value={flashcard.term}
                onChange={(e) =>
                  handleFlashcardChange(index, "term", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label={`Definition`}
                value={flashcard.definition}
                onChange={(e) =>
                  handleFlashcardChange(index, "definition", e.target.value)
                }
                multiline
                rows={2}
                fullWidth
                margin="normal"
              />
            </div>
          ))
        )}

        {flashcards.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            className="mr-3"
            onClick={handleAddFlashcard}
          >
            Thêm Flashcard mới
          </Button>
        )}

        <Button type="submit" variant="contained" color="primary">
          {studySet ? "Cập nhật" : "Thêm"}
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          style={{ marginLeft: "10px" }}
        >
          Hủy
        </Button>
      </form>
    </div>
  );
};

export default StudySetForm;
