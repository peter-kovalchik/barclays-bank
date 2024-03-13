"use client";
import CheckboxCustom from "@/components/shared/Checkbox";
import Dropdown from "@/components/shared/Dropdown";
import Image from "next/image";
import { useState } from "react";
import QuillEditor from "./QuillEditor";
const contries = ["Select Country", "USA", "UK", "SA"];
const privacylist = ["Anyone", "Friends", "Friends of friends"];

const Profile = () => {
  const [selected, setSelected] = useState(contries[0]);
  const [privacy, setPrivacy] = useState(privacylist[0]);

  return (
    <div className="grid grid-cols-12 gap-4 xxxxxl:gap-6">
      <div className="col-span-12 lg:col-span-6">
        <div className="box xxl:p-8 xxxl:p-10">
          <h4 className="h4 bb-dashed mb-4 pb-4 md:mb-6 md:pb-6">
            Account Settings
          </h4>
          <p className="text-lg font-medium mb-4">Profile Photo</p>
          <div className="flex flex-wrap gap-6 xxl:gap-10 items-center bb-dashed mb-6 pb-6">
            <Image
              src="/images/placeholder.png"
              width={120}
              height={120}
              className="rounded-xl"
              alt="img"
            />
            <div className="flex gap-4">
              <label htmlFor="photo-upload" className="btn">
                Upload Photo
              </label>
              <input type="file" id="photo-upload" className="hidden" />
              <button className="btn-outline">Cancel</button>
            </div>
          </div>
          <form className="mt-6 xl:mt-8 grid grid-cols-2 gap-4 xxxxxl:gap-6">
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="fname"
                className="md:text-lg font-medium block mb-4"
              >
                First Name
              </label>
              <input
                type="text"
                className="w-full text-sm bg-primary/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-3xl px-3 md:px-6 py-2 md:py-3"
                id="fname"
                placeholder="First Name"
                defaultValue="Darrel"
                required
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="lname"
                className="md:text-lg font-medium block mb-4"
              >
                Last Name
              </label>
              <input
                type="text"
                className="w-full text-sm bg-primary/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-3xl px-3 md:px-6 py-2 md:py-3"
                placeholder="Enter Last Name"
                defaultValue="Steward"
                id="lname"
                required
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="email"
                className="md:text-lg font-medium block mb-4"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full text-sm bg-primary/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-3xl px-3 md:px-6 py-2 md:py-3"
                placeholder="Enter Email"
                defaultValue="example@mail.com"
                id="email"
                required
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="phone"
                className="md:text-lg font-medium block mb-4"
              >
                Phone (Optional)
              </label>
              <input
                type="text"
                className="w-full text-sm bg-primary/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-3xl px-3 md:px-6 py-2 md:py-3"
                placeholder="Enter Phone"
                defaultValue="91021421144"
                id="phone"
                required
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="phone"
                className="md:text-lg font-medium block mb-4"
              >
                Gender :
              </label>
              <div className="flex gap-5">
                <label
                  htmlFor="male"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    defaultChecked
                    className="accent-secondary1 scale-125"
                  />{" "}
                  Male
                </label>
                <label
                  htmlFor="female"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    className="accent-secondary1 scale-125"
                  />{" "}
                  Female
                </label>
                <label
                  htmlFor="other"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    className="accent-secondary1 scale-125"
                  />{" "}
                  Other
                </label>
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="tagline"
                className="md:text-lg font-medium block mb-4"
              >
                Tagline :
              </label>
              <QuillEditor />
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-4">
                <CheckboxCustom label="I agree to the privacy & policy" />
                <CheckboxCustom label="I agree with all terms & conditions" />
              </div>
              <div className="flex mt-6 xxl:mt-10 gap-4">
                <button className="btn px-5">Save Changes</button>
                <button className="btn-outline px-5">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6">
        {/* Address */}
        <div className="box xxl:p-8 xxxl:p-10 mb-6">
          <h4 className="h4 bb-dashed mb-4 pb-4 md:mb-6 md:pb-6">Address</h4>
          <form className="mt-6 xl:mt-8 grid grid-cols-2 gap-4 xxxl:gap-6">
            <div className="col-span-2">
              <label
                htmlFor="location"
                className="md:text-lg font-medium block mb-4"
              >
                Location
              </label>
              <Dropdown
                items={contries}
                setSelected={setSelected}
                selected={selected}
                btnClass="md:py-3 w-full py-2.5 rounded-[32px] md:px-5"
                contentClass="w-full"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="address1"
                className="md:text-lg font-medium block mb-4"
              >
                Address 1
              </label>
              <input
                type="text"
                className="w-full text-sm bg-primary/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-3xl px-3 md:px-6 py-2 md:py-3"
                placeholder="Enter Address 1"
                defaultValue="Road 12, House 3, New York"
                id="address1"
                required
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="address2"
                className="md:text-lg font-medium block mb-4"
              >
                Address 2 (Optional)
              </label>
              <input
                type="text"
                className="w-full text-sm bg-primary/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-3xl px-3 md:px-6 py-2 md:py-3"
                placeholder="Enter Address 2"
                defaultValue="Road 12, House 3, Los angelos"
                id="address2"
                required
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="zip"
                className="md:text-lg font-medium block mb-4"
              >
                Zip Code
              </label>
              <input
                type="text"
                className="w-full text-sm bg-primary/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-3xl px-3 md:px-6 py-2 md:py-3"
                placeholder="Enter Zip Code"
                defaultValue="2250"
                id="zip"
                required
              />
            </div>
            <div className="col-span-2 flex pt-4 gap-4">
              <button className="btn px-5">Save Changes</button>
              <button className="btn-outline px-5">Cancel</button>
            </div>
          </form>
        </div>
        {/* Privacy */}
        <div className="box xxl:p-8 xxxl:p-10 mb-6">
          <h4 className="h4 bb-dashed mb-4 pb-4 md:mb-6 md:pb-6">Privacy</h4>
          <form className="mt-6 xl:mt-8 grid grid-cols-2 gap-4 xxxl:gap-6">
            <div className="col-span-2">
              <label
                htmlFor="privacy"
                className="md:text-lg font-medium block mb-4"
              >
                Who can see your profile photo?
              </label>
              <Dropdown
                items={privacylist}
                setSelected={setPrivacy}
                selected={privacy}
                btnClass="md:py-3 py-2.5 w-full rounded-[32px] md:px-5"
                contentClass="w-full"
              />
            </div>
            <div className="col-span-2 flex pt-4 gap-4">
              <button className="btn px-5">Save Changes</button>
              <button className="btn-outline px-5">Cancel</button>
            </div>
          </form>
        </div>
        {/* Delete Your Account */}
        <div className="box xxl:p-8 xxxl:p-10 mb-6">
          <h4 className="h4 bb-dashed mb-4 pb-4 md:mb-6 md:pb-6">
            Delete Your Account
          </h4>
          <form className="mt-6 xl:mt-8 gap-4 xxxl:gap-6">
            <p className="mb-4">
              When you delete your account, you lose access to Front account
              services, and we permanently delete your personal data. You can
              cancel the deletion for 14 days.
            </p>
            <CheckboxCustom label="Confirm that I want to delete my account." />
            <div className="col-span-2 flex mt-6 xxl:mt-10 gap-4">
              <button className="btn-outline px-5">Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
