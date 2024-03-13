"use client";
import OptionsHorizontal from "@/components/shared/OptionsHorizontal";
import ProgressChart from "./ProgressChart";

const statesData = [
  {
    title: "Total Income",
    amount: "$8500 USD",
    percent: 35.7,
    series: 35.5,
  },
  {
    title: "Total Spending",
    amount: "$3500 USD",
    percent: 45.2,
    series: 78.5,
  },
  {
    title: "Spending Goal",
    amount: "$9254 USD",
    percent: 25.7,
    series: 55.5,
  },
  {
    title: "Total Transactions",
    amount: "$17000 USD",
    percent: 50.7,
    series: 83.5,
  },
];
const Statistics = () => {
  return (
    <>
      {statesData.map(({ amount, percent, series, title }) => (
        <div
          key={title}
          className="col-span-12 min-[650px]:col-span-6 xxxl:col-span-3 box bg-n0 dark:bg-bg4"
        >
          <div className="flex justify-between items-center mb-4 lg:mb-6 pb-4 lg:pb-6 bb-dashed">
            <span className="font-medium">{title}</span>
            <OptionsHorizontal />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="h4 mb-4">{amount}</h4>
              <span className="text-primary flex items-center gap-1 whitespace-nowrap">
                <i className="las la-arrow-up text-lg"></i> {percent} AVG
              </span>
            </div>
            <div className="-my-3 shrink-0 ltr:translate-x-3 xl:ltr:translate-x-7 xxxl:ltr:translate-x-2 4xl:ltr:translate-x-9 rtl:-translate-x-3 xl:rtl:-translate-x-7 xxxl:rtl:-translate-x-2 4xl:rtl:-translate-x-9">
              <ProgressChart labels={series + "%"} series={series} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Statistics;
