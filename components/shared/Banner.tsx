"use client";

import cn from "@/utils/cn";
import useDropdown from "@/utils/useDropdown";
import OpenAccountForm from "./OpenAccount";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { UserType } from "@/utils/UserContext";
import { client } from "@/utils/sanityClient";
type BannerProps = { title?: string; className?: string };
const Banner = ({ title = "Dashboard", className }: BannerProps) => {
  const { open, toggleOpen } = useDropdown();
  const cookies = useCookies();
  const [user, setUser] = useState<UserType>(
    JSON.parse(cookies.get("currentUser") as string),
  );

  useEffect(() => {
    const query = '*[_type == "user" && email == $email]';
    const params = { email: user.email };

    const subscription = client.listen(query, params).subscribe((update) => {
      console.log("Update is", update);

      const { status } = update.result as UserType | any;

      const newUser = {
        ...user,
        status,
      };

      setUser(newUser);
    });

    return () => subscription.unsubscribe();
  }, [user]);

  return (
    <>
      <div
        className={cn(
          "flex justify-between flex-wrap items-center gap-4 mb-6 lg:mb-8",
          className,
        )}
      >
        <h2 className="h2">{title}</h2>
        {user?.status === "frozen" && (
          <button className="btn" onClick={toggleOpen}>
            <i className="las la-plus-circle text-base md:text-lg"></i>
            Activate account
          </button>
        )}
      </div>
      <OpenAccountForm open={open} toggleOpen={toggleOpen} />
    </>
  );
};

export default Banner;
