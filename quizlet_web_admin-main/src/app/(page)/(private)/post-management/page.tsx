"use client";

import DataTableComponent from "@/app/common/DataTable";
import LoadingComponent from "@/app/common/Loading";
import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { postManagementCols } from "../constant";
import { postService } from "@/app/service/postService";

function PostManagement() {
  const [loading, setLoading] = useState<boolean>(true);

  const [request, setRequest] =
    useState<RequestInterfaces.ICommonSearchRequest>({
      page: 0,
      pageSize: 50,
      keyword: "",
      sortBy: "created_at",
      sortDir: "DESC",
    });

  const getPosts = () => {
    postService
      .search(request)
      .then((res) => {
        const posts = res.data?.data?.list;
        if (posts && posts.length > 0)
          setPosts(
            posts.map((post: ResponseInterfaces.IPostResponse) => ({
              ...post,
              createdBy: post.createdBy?.displayName,
            }))
          );
      })
      .catch(() => {
        showAlert("Lỗi máy chủ", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deletePosts = (ids: string[]) => {};

  const [posts, setPosts] = useState<ResponseInterfaces.IPostResponse[]>([]);

  useEffect(() => {
    getPosts();

    return () => {};
  }, [request]);

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
      <div className="p-3 md:p-10">
        <DataTableComponent
          rows={posts}
          columns={postManagementCols}
          onDelete={deletePosts}
        />
      </div>
    </div>
  );
}

export default PostManagement;
