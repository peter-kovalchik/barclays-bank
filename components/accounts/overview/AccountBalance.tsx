"use client";
// import OptionsHorizontal from "@/components/shared/OptionsHorizontal";
import { useLayout } from "@/utils/LayoutContext";
import { UserType } from "@/utils/UserContext";
import { client } from "@/utils/sanityClient";
import { ApexOptions } from "apexcharts";
import { useCookies } from "next-client-cookies";
import { useTheme } from "next-themes";
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

const AccountBalance = () => {
  const { theme } = useTheme();
  const { dir } = useLayout();
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

  console.log("User from account balance", user);

  const chartData: ApexOptions = {
    series: [23232.52],
    chart: {
      type: "donut",
    },
    fill: {
      colors: ["#4371E9", "#FFC861", "#00aeef", "#FF6161"],
    },
    stroke: {
      lineCap: "round",
      colors: theme == "dark" ? ["#404A60"] : ["#EBECEF"],
    },
    plotOptions: {
      pie: {
        donut: {
          size: "85px",
          labels: {
            show: true,
            value: {
              color: theme == "light" ? "#404A60" : "#EBECEF",
              fontSize: "16px",
              offsetY: 2,
            },
            total: {
              show: true,
              label: `${formatCurrency(user.total_income)}`,
              fontWeight: 600,
              fontSize: "26px",
              color: theme == "light" ? "#404A60" : "#EBECEF",
              formatter: () => "Total Balance",
            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
      itemMargin: {
        vertical: 8,
        horizontal: 5,
      },
      horizontalAlign: "center",
      labels: {
        colors: theme == "light" ? "#404A60" : "#EBECEF",
      },
      markers: {
        width: 4,
        height: 4,
        offsetX: dir == "rtl" ? 3 : -3,
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: [`${formatCurrency(user.total_income)}`],
  };
  return (
    <div className="box col-span-12 md:col-span-5 xxl:col-span-4">
      <div className="flex flex-wrap justify-between items-center gap-3 pb-4 lg:pb-6 mb-4 lg:mb-6 bb-dashed">
        <h4 className="h4">Account Balance</h4>
        {/* <OptionsHorizontal /> */}
      </div>
      <ReactApexChart
        height={330}
        width={"100%"}
        series={chartData.series}
        options={chartData}
        type="donut"
      />
    </div>
  );
};

export default AccountBalance;
