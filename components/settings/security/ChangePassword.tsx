"use client";

import InputPassword from "./InputPassword";
const rules = [
  "At least 8 characters",
  "At least 1 lower letter (a-z)",
  "At least 1 uppercase letter(A-Z)",
  "At least 1 number (0-9)",
  "At least 1 special characters",
];
const ChangePassword = () => {
  return (
    <div className="box xl:p-8 xxl:p-10">
      <h4 className="h4 bb-dashed pb-4 mb-4 md:mb-6 md:pb-6">
        Change Password
      </h4>
      <form className="mt-6 xl:mt-8 grid grid-cols-2 gap-4 xxxl:gap-6">
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="email" className="md:text-lg font-medium block mb-4">
            Old Password
          </label>
          <InputPassword placeholder="Old Password" />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="email" className="md:text-lg font-medium block mb-4">
            New Password
          </label>
          <InputPassword placeholder="New Password" />
        </div>
        <div className="col-span-2">
          <label htmlFor="email" className="md:text-lg font-medium block mb-4">
            Confirm Password
          </label>
          <InputPassword placeholder="Confirm Password" />
        </div>
        <div className="col-span-2">
          <p className="font-medium text-lg mb-4">
            New password must contain :
          </p>
          <ul className="marker:text-primary list-disc flex flex-col gap-3 list-inside">
            {rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 flex gap-4">
          <button className="btn px-5">Save Changes</button>
          <button className="btn-outline px-5">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
