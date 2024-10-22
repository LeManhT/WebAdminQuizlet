"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { accountService } from "@/app/service/accountService"; // Đảm bảo đường dẫn đúng

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudySetBarChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await accountService.getAccount(0, 100);
        const users = response.data;

        // Chuẩn bị dữ liệu cho biểu đồ
        const studySetCountByUser = users.reduce((acc, user) => {
          const userName =
            user.username || user.loginName.replace(/@gmail\.com$/, "");
          const studySets = user.documents?.studySets || [];
          acc[userName] = (acc[userName] || 0) + studySets.length;
          return acc;
        }, {});

        const labels = Object.keys(studySetCountByUser);
        const data = {
          labels: labels,
          datasets: [
            {
              label: "Số study sets của người dùng",
              data: labels.map((label) => studySetCountByUser[label]),
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê số study sets của tất cả người dùng",
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>; // Hiển thị thông báo tải dữ liệu
  }

  return <Bar data={chartData} options={options} />;
};

export default StudySetBarChart;
