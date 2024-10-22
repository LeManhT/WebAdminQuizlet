"use client";

import { useRouter } from "next/navigation";

function AdminProfile() {
  const user = {
    name: "Le Manh Admin",
    phone: "+0332774093",
    language: "English (United States)",
  };

  const router = useRouter();

  const logout = () => {
    router.replace("/login");
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 mt-6">
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/100"
          alt="Admin Avatar"
          className="h-16 w-16 rounded-full"
        />
        <div className="flex-1">
          <h2 className="text-xl text-black font-semibold">
            Hello, {user.name}
          </h2>
          <p className="text-black">{user.phone}</p>
        </div>
        <button className="p-2 text-blue-500 hover:text-blue-600 focus:outline-none">
          <i className="fa fa-pencil"></i>
        </button>
      </div>

      <div className="mt-6">
        <p className="text-lg text-black font-semibold">Language</p>
        <p className="text-black">{user.language}</p>
      </div>

      <div className="mt-6 space-y-4">
        <a
          href="/privacy-policy"
          className="block text-blue-500 hover:text-blue-600"
        >
          Privacy Policy
        </a>
        <a href="/faqs" className="block text-blue-500 hover:text-blue-600">
          FAQs
        </a>
        <a
          href="/terms-of-service"
          className="block text-blue-500 hover:text-blue-600"
        >
          Terms of Service
        </a>
      </div>

      <button
        className="mt-8 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        onClick={() => {
          logout();
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default AdminProfile;
