"use client";
import Dropdown from "@/components/shared/Dropdown";
import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
const options = ["Last Weeks", "Last Month", "Last Year"];
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const series = [
  {
    name: "This Years",
    data: [0, 100, 30, 165, 85, 205, 105, 245, 75, 225, 150, 230],
  },
  {
    name: "Last Years",
    data: [0, 60, 24, 88, 50, 112, 57, 130, 36, 108, 70, 120],
  },
];

const seriesMonth = [
  {
    name: "This Month",
    data: [0, 80, 34, 65, 74, 112, 25, 180, 45, 138, 150, 53, 34, 65, 74, 112],
  },
  {
    name: "Last Months",
    data: [
      0, 80, 65, 28, 185, 205, 105, 145, 175, 125, 180, 130, 65, 28, 185, 74,
    ],
  },
];

const seriesWeek = [
  {
    name: "This Week",
    data: [0, 80, 34, 65, 74, 112, 25],
  },
  {
    name: "Last Week",
    data: [0, 80, 65, 28, 185, 205, 105],
  },
];

const selectedValue = {
  year: "Last Year",
  month: "Last Month",
  week: "Last Weeks",
};

const yearCategoreis = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthCategories = [
  "1",
  "2",
  "4",
  "6",
  "8",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "22",
  "24",
  "26",
  "28",
  "30",
];

const weekCategories = [
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PaymentOverviewChart = () => {
  const [selected, setSelected] = useState(options[0]);
  const { theme } = useTheme();

  const chartCategories = useMemo(() => {
    if (selected === selectedValue.year) return yearCategoreis;
    if (selected === selectedValue.month) return monthCategories;
    if (selected === selectedValue.week) return weekCategories;
  }, [selected]);

  const chartData: ApexOptions = {
    chart: {
      height: 289,
      type: "area",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      lineCap: "round",
      width: 2,
      dashArray: [5, 0],
      colors: ["#FFC861", "#00aeef"],
    },
    xaxis: {
      categories: chartCategories,
      labels: {
        style: {
          colors: theme == "light" ? "#404A60" : "#EBECEF",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        color: theme == "dark" ? "#404A60" : "#EBECEF",
      },
    },
    yaxis: {
      min: 0,
      max: 300,
      tickAmount: 5,
      labels: {
        formatter: function (v) {
          return v + "";
        },
        style: {
          colors: theme == "light" ? "#404A60" : "#EBECEF",
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ["#FFC861", "#00aeef"],
    fill: {
      type: "gradient",
      colors: ["rgba(255, 200, 97, 0.21)", "rgba(32, 183, 87, 0.21)"],
      gradient: {
        shadeIntensity: 1,
        shade: theme == "dark" ? "dark" : "light",
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    responsive: [
      {
        breakpoint: 1820,
        options: {
          chart: {
            height: 340,
          },
        },
      },
      {
        breakpoint: 1600,
        options: {
          chart: {
            height: 308,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 350,
          },
        },
      },
      {
        breakpoint: 570,
        options: {
          chart: {
            height: 250,
          },
        },
      },
      {
        breakpoint: 400,
        options: {
          chart: {
            height: 200,
          },
        },
      },
    ],
    grid: {
      borderColor: theme == "dark" ? "#404A60" : "#EBECEF",
    },
  };

  const memoedSeries = useMemo(() => {
    if (selected === selectedValue.year) return series;
    if (selected === selectedValue.month) return seriesMonth;
    if (selected === selectedValue.week) return seriesWeek;
    return series;
  }, [selected]);

  return (
    <div className="col-span-12 md:col-span-7 xxl:col-span-8 box overflow-x-hidden">
      <div className="flex flex-wrap justify-between items-center gap-3 pb-4 lg:pb-6 mb-4 lg:mb-6 bb-dashed">
        <h4 className="h4">Payment Overview</h4>
        <div className="flex items-center gap-2">
          <p className="text-xs sm:text-sm md:text-base">Sort By : </p>
          <Dropdown
            selected={selected}
            setSelected={setSelected}
            items={options}
            contentClass="w-full"
          />
        </div>
      </div>
      <ReactApexChart
        height={330}
        width={"100%"}
        series={memoedSeries}
        options={chartData}
        type="area"
      />
    </div>
  );
};

export default PaymentOverviewChart;
