"use client";
import { UserType, useUser } from "@/utils/UserContext";
import cn from "@/utils/cn";
import { client } from "@/utils/sanityClient";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";

const formatCurrency = (amount = 0, locale = 'en-US', currency = 'EUR') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};



const Statistics = async () => {
  const cookies = useCookies()
  const [user, setUser] = useState<UserType>(JSON.parse(cookies.get("currentUser") as string))


  const statesData = [
    {
      title: "Total Income",
      amount: `${formatCurrency(user.total_income)}`,
      percent: 35.7,
      icon: <i className="las text-3xl xl:text-5xl la-chart-bar"></i>,
      color: "text-primary",
    },
    {
      title: "Total Spending",
      amount: `${formatCurrency(user.total_spending)}`,
      percent: 45.2,
      icon: <i className="las text-3xl xl:text-5xl la-coins"></i>,
      color: "text-secondary1",
    },
    {
      title: "Spending Goal",
      amount: `${formatCurrency(user.spending_goal)}`,
      percent: 25.7,
      icon: <i className="las text-3xl xl:text-5xl la-chart-pie"></i>,
      color: "text-secondary2",
    },
    {
      title: "Total Transactions",
      amount: `${formatCurrency(user.total_transactions)}`,
      percent: 50.7,
      icon: <i className="las text-3xl xl:text-5xl la-chart-line"></i>,
      color: "text-secondary3",
    },
  ];

  useEffect(() => {
    const query = '*[_type == "user" && email == $email]'
    const params = {email: user.email}

    const subscription = client.listen(query, params)
    .subscribe((update) => {
      console.log("Update is", update)
  
      const {name, email, total_income, total_transactions, total_spending, spending_goal, password} = update.result as UserType | any

      const newUser = {
        ...user,
        name,
        email,
        total_income,
        total_transactions,
        total_spending,
        spending_goal,
        password
      }

      console.log("New user is", newUser)

      cookies.set("currentUser", JSON.stringify(newUser))
  
      setUser(newUser)
    })

    return () => subscription.unsubscribe()
  }, [])
 

  return (
    <>
      {statesData.map(({ amount, percent, icon, title, color }) => (
        <div
          key={title}
          className="col-span-12 sm:col-span-6 xxxl:col-span-3 box p-4 bg-n0 dark:bg-bg4 4xl:px-8 4xl:py-6">
          <div className="flex justify-between items-center mb-4 lg:mb-6 pb-4 lg:pb-6 bb-dashed">
            <span className="font-medium">{title}</span>
            {/* <OptionsHorizontal /> */}
          </div>
          <div className="flex items-center gap-4 xl:gap-6">
            <div className="w-14 xl:w-[72px] h-14 xl:h-[72px] flex items-center justify-center bg-primary/5 text-primary border border-n30 dark:border-n500 rounded-xl">
              {icon}
            </div>
            <div>
              <h4 className="h4 mb-2 xxl:mb-4">{amount}</h4>
              <span
                className={cn(
                  "flex items-center gap-1 whitespace-nowrap",
                  color
                )}>
                <i className="las la-arrow-up text-lg"></i> {percent}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Statistics;
