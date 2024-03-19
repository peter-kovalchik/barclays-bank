"use client";
import { UserType } from "@/utils/UserContext";
import { client } from "@/utils/sanityClient";
import { ApexOptions } from "apexcharts";
import { useCookies } from "next-client-cookies";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const formatCurrency = (amount = 0, locale = "en-US", currency = "EUR") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const Statistics = () => {
  const cookies = useCookies();
  const [user, setUser] = useState<UserType>(
    JSON.parse(cookies.get("currentUser") as string),
  );

  useEffect(() => {
    const query = '*[_type == "user" && email == $email]';
    const params = { email: user.email };

    const subscription = client.listen(query, params).subscribe((update) => {
      console.log("Update is", update);

      const {
        name,
        email,
        total_income,
        total_transactions,
        total_spending,
        spending_goal,
        password,
        bank_account,
        expiry_date,
        status,
      } = update.result as UserType | any;

      const newUser = {
        ...user,
        name,
        email,
        total_income,
        total_transactions,
        total_spending,
        spending_goal,
        password,
        bank_account,
        expiry_date,
        status,
      };

      console.log("New user is", newUser);

      cookies.set("currentUser", JSON.stringify(newUser));

      setUser(newUser);
    });

    return () => subscription.unsubscribe();
  }, [user, cookies]);

  const statisticsData = [
    {
      title: "Total Balance",
      amount: `${formatCurrency(user.total_income)}`,
      growth: "50.8%",
    },
    {
      title: "Total Deposits",
      amount: `${formatCurrency(user.total_transactions)}`,
      growth: "50.8%",
    },
    {
      title: "Yearly In",
      amount: `${formatCurrency(5223)}`,
      growth: "50.8%",
    },
    {
      title: "Yearly Out",
      amount: `${formatCurrency(6420)}`,
      growth: "50.8%",
    },
  ];

  const chartData: ApexOptions = {
    chart: {
      height: "100%",
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      lineCap: "round",
      curve: "smooth",
    },
    series: [
      {
        name: "Series 1",
        data: [26, 36, 50, 28, 32, 23, 34],
      },
    ],
    tooltip: {
      enabled: false,
    },
    colors: ["#00aeef"],
    fill: {
      colors: ["#00aeef"],
      opacity: 1,
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.3,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
        colorStops: [],
      },
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: 50,
      tooltip: {
        enabled: false,
        // followCursor: true
      },
      labels: {
        show: false,
      },
    },
  };

  return (
    <div className="box xxxl:p-8 grid grid-cols-12 xxl:divide-x-2 xxl:rtl:divide-x-reverse bg-primary/5 dark:bg-bg3 rounded-xl border border-n30 dark:border-n500 divide-n30 dark:divide-n500 divide-dashed max-xxl:gap-5 mb-4 xxxl:mb-6">
      {statisticsData.map(({ title, amount, growth }) => (
        <div
          key={title}
          className="col-span-12 sm:col-span-6 xxl:col-span-3 flex items-center justify-between overflow-x-hidden xxl:px-6 first:ltr:pl-0 first:rtl:pr-0 last:ltr:pr-0 last:rtl:pl-0 gap-3"
        >
          <div>
            <p className="font-medium mb-4">{title}</p>
            <div className="flex gap-2 items-center">
              <h4 className="h4">{amount}</h4>
              <span className="text-primary text-sm flex items-center gap-1">
                <i className="las la-arrow-up text-base"></i> {growth}
              </span>
            </div>
          </div>
          <ReactApexChart
            options={chartData}
            series={chartData.series}
            type="area"
            height={60}
            width={"100%"}
          />
        </div>
      ))}
    </div>
  );
};

export default Statistics;
