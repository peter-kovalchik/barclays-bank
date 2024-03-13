"use client";
import Dropdown from "@/components/shared/Dropdown";
import { useLayout } from "@/utils/LayoutContext";
import useWindowSize from "@/utils/useWindowSize";
import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
const options = ["Last Weeks", "Last Month", "Last Year"];
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const selectedValues = {
  year: "Last Year", 
  month: "Last Month", 
  week: "Last Week"
}

const yearSeries =  [
  {
    data: [
      {
        x: "Savings Deposit",
        y: [2800, 4500],
      },
      {
        x: "Checking Deposit",
        y: [3200, 4100],
      },
      {
        x: "Fixed Deposit",
        y: [2950, 7800],
      },
      {
        x: "Joint Deposit",
        y: [3000, 4600],
      },
      {
        x: "Corporate Deposit",
        y: [3500, 4100],
      },
      {
        x: "Foreign Deposit",
        y: [4500, 6500],
      },
      {
        x: "No Interest",
        y: [4100, 5600],
      },
    ],
  },
]

const monthSeries =  [
  {
    data: [
      {
        x: "Savings Deposit",
        y: [1800, 2500],
      },
      {
        x: "Checking Deposit",
        y: [4200, 6100],
      },
      {
        x: "Fixed Deposit",
        y: [1950, 4800],
      },
      {
        x: "Joint Deposit",
        y: [6000, 8600],
      },
      {
        x: "Corporate Deposit",
        y: [1500, 3100],
      },
      {
        x: "Foreign Deposit",
        y: [6500, 7500],
      },
      {
        x: "No Interest",
        y: [1100, 4600],
      },
    ],
  },
]

const weekSeries =  [
  {
    data: [
      {
        x: "Savings Deposit",
        y: [3200, 5500],
      },
      {
        x: "Checking Deposit",
        y: [1100, 4800],
      },
      {
        x: "Fixed Deposit",
        y: [4950, 7800],
      },
      {
        x: "Joint Deposit",
        y: [3000, 7600],
      },
      {
        x: "Corporate Deposit",
        y: [3500, 4100],
      },
      {
        x: "Foreign Deposit",
        y: [2500, 5500],
      },
      {
        x: "No Interest",
        y: [6100, 8600],
      },
    ],
  },
]

const DeopositsAccountChart = () => {
  const [selected, setSelected] = useState(options[0]);
  const { theme } = useTheme();
  const { windowSize } = useWindowSize();
  const { dir } = useLayout();

  const memoedSeries = useMemo(() => {
    if(selected === selectedValues.year) return yearSeries
    if(selected === selectedValues.month) return monthSeries
    if(selected === selectedValues.week) return weekSeries

    return yearSeries
  }, [selected])

  const chartData: ApexOptions = {
    series: memoedSeries,
    chart: {
      height: 390,
      type: "rangeBar",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#00aeef", "#FFC861"],
    plotOptions: {
      bar: {
        horizontal: true,
        isDumbbell: true,
        dumbbellColors: [["#00aeef", "#FFC861"]],
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        gradientToColors: ["#FFC861"],
        inverseColors: false,
        stops: [0, 100],
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      borderColor: theme == "dark" ? "#404A60" : "#EBECEF",
    },
    xaxis: {
      labels: {
        style: {
          colors: theme == "light" ? "#404A60" : "#EBECEF",
        },
      },
      axisBorder: {
        color: theme == "dark" ? "#404A60" : "#EBECEF",
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: windowSize! > 500 ? true : false,
        style: {
          colors: theme == "light" ? "#404A60" : "#EBECEF",
        },
        offsetX: dir == "rtl" ? -100 : 0,
      },
    },
  };
  return (
    <div className="col-span-12 md:col-span-7 xxl:col-span-8 box overflow-x-hidden ">
      <div className="flex flex-wrap justify-between items-center gap-3 pb-4 lg:pb-6 mb-4 lg:mb-6 bb-dashed">
        <h4 className="h4">Deposits Account</h4>
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
        series={chartData.series}
        options={chartData}
        type="rangeBar"
      />
    </div>
  );
};

export default DeopositsAccountChart;
