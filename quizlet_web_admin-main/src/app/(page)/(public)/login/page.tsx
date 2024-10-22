"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Simple login validation function (no token)
  const login = ({ username, password }) => {
    setLoading(true);

    if (username === "lemanhadmin@gmail.com" && password === "L@123456") {
      toast.success("Đăng nhập thành công!");
      router.replace("/account-management");
    } else {
      setError("username", {
        type: "manual",
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
      setError("password", {
        type: "manual",
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Đăng nhập vào trang quản trị
        </h2>

        <form onSubmit={handleSubmit(login)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tên tài khoản
            </label>
            <input
              {...register("username", {
                required: "Vui lòng nhập tài khoản",
              })}
              type="text"
              id="username"
              placeholder="Nhập tài khoản của bạn"
              className={`w-full px-4 py-2 border rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500 ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mật khẩu
            </label>
            <input
              {...register("password", { required: "Vui lòng nhập mật khẩu" })}
              type="password"
              id="password"
              placeholder="Nhập mật khẩu của bạn"
              className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none text-gray-700 focus:border-blue-500 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4 text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
