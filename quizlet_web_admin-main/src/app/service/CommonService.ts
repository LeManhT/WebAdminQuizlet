import { Bounce } from "react-toastify";

const CommonService = {
  toast(type: "info" | "success" | "error", content: string, toast: any) {
    toast?.(content, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  },
};

export default CommonService;
