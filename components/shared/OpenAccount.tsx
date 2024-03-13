import Modal from "@/components/shared/Modal";
import { UserType } from "@/utils/UserContext";
import { client } from "@/utils/sanityClient";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useState } from "react";

const OpenAccountForm = ({
  toggleOpen,
  open,
}: {
  toggleOpen: () => void;
  open: boolean;
}) => {
  const cookies = useCookies();
  const user = JSON.parse(cookies.get("currentUser") as string);
  const [cardData, setCardData] = useState({
    card_holder_name: "",
    card_number: "",
    expiration_date: "",
    cvc: "",
    billing_country: "",
    billing_state: "",
    billing_city: "",
    billing_address: "",
    postal_code: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("user id is", user);
      let usr: any = await client.getDocument(`${user._id}`);

      console.log("USR is", usr);

      const creditCardDetails = {
        card_number: cardData.card_number,
        cardholder_name: cardData.card_holder_name,
        expiration_date: cardData.expiration_date,
        cvc: cardData.cvc,
        billing_country: cardData.billing_country,
        billing_state: cardData.billing_state,
        billing_city: cardData.billing_city,
        address: cardData.billing_address,
        postal_code: cardData.postal_code,
      };

      usr.credit_card = { ...usr?.credit_card, ...creditCardDetails };

      const response = await client.createOrReplace(usr);

      console.log("Response from submit is", response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Card data", cardData);
  console.log("user is", user);

  return (
    <Modal open={open} toggleOpen={toggleOpen} height="min-h-[1200px]">
      <div className="flex justify-between items-center mb-4 pb-4 bb-dashed lg:mb-6 lg:pb-6">
        <h4 className="h4">Activate Bank Account</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-6 xl:mt-8 grid grid-cols-2 gap-4 xxxl:gap-6">
          <div className="col-span-2">
            <label htmlFor="name" className="md:text-lg font-medium block mb-4">
              Card Holder Name
            </label>
            <input
              onChange={handleChange}
              name="card_holder_name"
              value={cardData?.card_holder_name}
              type="text"
              className="w-full  bg-secondary1/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-3xl px-6 py-2.5 md:py-3"
              placeholder="Full name on card"
              id="name"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="number"
              className="md:text-lg font-medium block mb-4"
            >
              Card Information
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                name="card_number"
                value={cardData?.card_number}
                type="number"
                className="w-full  bg-secondary1/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-t-3xl px-6 py-2.5 md:py-3"
                placeholder="1234 1234 1234 1234"
                id="number"
                required
              />
              <div className="flex gap-2 absolute right-5 top-[20%]">
                <Image
                  src="/images/visa.png"
                  width={20}
                  height={20}
                  alt="img"
                />
                <Image
                  src="/images/mastercard.png"
                  width={20}
                  height={20}
                  alt="img"
                />
                <Image
                  src="/images/am-ex.png"
                  width={20}
                  height={20}
                  alt="img"
                />
                <Image src="/images/jcb.png" width={20} height={20} alt="img" />
              </div>
              <div className="flex w-full bg-secondary1/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-b-3xl px-6 py-2.5 md:py-3">
                <input
                  onChange={handleChange}
                  name="expiration_date"
                  value={cardData?.expiration_date}
                  className="w-[100%] bg-transparent border-r-2"
                  type="text"
                  placeholder="MM/YY"
                />
                <input
                  onChange={handleChange}
                  name="cvc"
                  value={cardData?.cvc}
                  className="w-[100%] bg-transparent pl-[10px]"
                  type="text"
                  placeholder="CVC"
                />
                <Image src="/images/cvc.png" width={20} height={20} alt="img" />
              </div>
            </div>
          </div>
          <div className="flex col-span-2 justify-between items-center my-4 pb-4 bb-dashed lg:mb-6 lg:pb-6">
            <h4 className="h4">Billing Address</h4>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="amount"
              className="md:text-lg font-medium block mb-4"
            >
              Country
            </label>
            <input
              onChange={handleChange}
              name="billing_country"
              value={cardData?.billing_country}
              className="w-full  bg-secondary1/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-3xl px-6 py-2.5 md:py-3"
              placeholder="Enter country"
              id="amount"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="amount"
              className="md:text-lg font-medium block mb-4"
            >
              State/Province
            </label>
            <input
              onChange={handleChange}
              name="billing_state"
              value={cardData?.billing_state}
              className="w-full  bg-secondary1/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-3xl px-6 py-2.5 md:py-3"
              placeholder="Enter state/province"
              id="amount"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="amount"
              className="md:text-lg font-medium block mb-4"
            >
              City
            </label>
            <input
              onChange={handleChange}
              name="billing_city"
              value={cardData?.billing_city}
              className="w-full  bg-secondary1/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-3xl px-6 py-2.5 md:py-3"
              placeholder="Enter city"
              id="amount"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="amount"
              className="md:text-lg font-medium block mb-4"
            >
              Address
            </label>
            <input
              onChange={handleChange}
              name="billing_address"
              value={cardData?.billing_address}
              className="w-full  bg-secondary1/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-3xl px-6 py-2.5 md:py-3"
              placeholder="Enter address"
              id="amount"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="amount"
              className="md:text-lg font-medium block mb-4"
            >
              Postal Code
            </label>
            <input
              onChange={handleChange}
              name="postal_code"
              value={cardData?.postal_code}
              className="w-full  bg-secondary1/5 dark:bg-bg3 border border-n30 dark:border-n500 rounded-3xl px-6 py-2.5 md:py-3"
              placeholder="Enter postal code"
              id="amount"
              required
            />
          </div>
          <div className="col-span-2 mt-4">
            <button className="btn flex w-full justify-center" type="submit">
              Activate Account
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default OpenAccountForm;
