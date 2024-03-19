"use client";
import Dropdown from "@/components/shared/Dropdown";
import { UserType } from "@/utils/UserContext";
import { client } from "@/utils/sanityClient";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const options = ["Visa"];

const formatCurrency = (amount = 0, locale = "en-US", currency = "EUR") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const DepositDetails = () => {
  const [selectedCard, setSelectedCard] = useState(options[0]);
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

  const cardDetails = {
    "Card Type": "Visa",
    "Card Holder": `${user.name}`,
    Expires: "01/26",
    "Card Number": "4917 4845 8989 7107",
    "Total Balance": `${formatCurrency(user.total_income)}`,
    "Total Debt": "€ 0",
  };

  return (
    <div className="box col-span-12 md:col-span-5 lg:col-span-4">
      <div className="bb-dashed border-secondary1/30 pb-4 mb-4 lg:mb-6 lg:pb-6 flex justify-between items-center">
        <h4 className="h4">Account Details</h4>
        <Dropdown
          items={options}
          setSelected={setSelectedCard}
          selected={selectedCard}
          btnClass="rounded-[30px]"
          contentClass="w-full min-w-max"
          img={
            <Image
              src="/images/mastercard.png"
              width={20}
              height={20}
              alt="img"
            />
          }
        />
      </div>
      <div className="grid grid-cols-12 xxl:divide-x rtl:divide-x-reverse divide-secondary1/30 divide-dashed items-center gap-y-6">
        <div className="col-span-12 md:col-span-6 xxl:col-span-4 md:ltr:pr-6 xxxl:ltr:pr-10 md:rtl:pl-6 xxxl:rtl:pl-10">
          <div className="bg-secondary1 p-4 lg:px-6 lg:py-5 rounded-xl text-n0 relative overflow-hidden after:absolute after:rounded-full after:w-[300px] after:h-[300px] after:bg-[#FFC861] after:top-[50%] after:ltr:left-[55%] sm:ltr:after:left-[65%] after:rtl:right-[55%] sm:rtl:after:right-[65%]">
            <div className="flex justify-between items-start mb-4 md:mb-8 lg:mb-10 xxxl:mb-14">
              <div>
                <p className="text-xs mb-1">Current Balance</p>
                <h4 className="h4">{formatCurrency(user.total_income)}</h4>
              </div>
              <Image
                src="/images/visa-sm.png"
                width={45}
                height={16}
                alt="visa icon"
              />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <Image
                  width={45}
                  height={45}
                  src="/images/mastercard.png"
                  alt="card icon"
                />
                <p className="mb-1 mt-1 md:mt-3">{user.name}</p>
                <p className="text-xs">4917 4845 8989 7107</p>
              </div>
              <p className="text-n700 relative z-[1]">01/26</p>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 xxl:col-span-4 md:pl-6 xxl:px-6 xxxl:px-10">
          <ul className="flex flex-col gap-4">
            {Object.entries(cardDetails).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span>{key}:</span> <span className="font-medium">{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 md:col-span-6 xxl:col-span-4 xxl:ltr:pl-6 xxxl:ltr:pl-10 xxl:rtl:pr-6 xxxl:rtl:pr-10">
          <p className="text-lg font-medium mb-6">Active card</p>
          <div className="border border-primary border-dashed bg-primary/5 rounded-lg p-3 flex items-center gap-4 mb-6 lg:mb-8">
            {/* <Image
              src="/images/card-sm-1.png"
              width={60}
              height={40}
              alt="card"
            /> */}
            <div>
              <p className="font-medium mb-1">{user.name} - Metal</p>
              <span className="text-xs">**7107 - Exp: 01/26</span>
            </div>
          </div>
          {/* <Link
            href="#"
            className="text-primary font-semibold flex items-center gap-2  mb-6 lg:mb-8 bb-dashed pb-6"
          >
            More Card <i className="las la-arrow-right"></i>
          </Link> */}
          {/* <div className="flex gap-4 lg:gap-6">
            <Link href="#" className="btn flex justify-center w-full lg:py-2.5">
              Pay Debt
            </Link>
            <Link
              href="#"
              className="btn-outline flex justify-center w-full lg:py-2.5"
            >
              Cancel
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DepositDetails;
