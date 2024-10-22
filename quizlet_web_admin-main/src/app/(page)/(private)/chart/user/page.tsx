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
import { accountService } from "@/app/service/accountService";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const formatMonthYear = (timestamp) => {
  const date = new Date(timestamp * 1000);
  console.log(date);
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : month}`; // Trả về chuỗi 'YYYY-MM'
};

const UserCreatedBarChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const router = useRouter();

  useEffect(() => {
    accountService.getAccount(0, 100).then((users) => {
      const userCreatedByMonthYear = users.data.reduce((acc, user) => {
        console.log(`EwDATA : ${user.timeCreated}`);
        const monthYear = formatMonthYear(user.timeCreated);
        console.log(`EwDATA2 : ${monthYear}`);
        acc[monthYear] = (acc[monthYear] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(userCreatedByMonthYear).sort();
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Số người dùng được tạo",
            data: labels.map((label) => userCreatedByMonthYear[label] || 0),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      setChartData(data);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê số người dùng được tạo theo tháng",
      },
    },
  };

  return (
    <div>
      <Button
        onClick={() => {
          router.push("/chart/studyset");
        }}
      >
        Xem biểu đò study set
      </Button>
      <Bar data={chartData} options={options} />;
    </div>
  );
};

export default UserCreatedBarChart;
