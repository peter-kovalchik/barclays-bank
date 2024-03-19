import RecentInvoice from "@/components/invoicing/invoice-style-01/RecentInvoice";
import Banner from "@/components/shared/Banner";

const InvoiceStyleOnePage = () => {
  return (
    <div>
      <Banner title="Invoice Details" />
      <RecentInvoice />
    </div>
  );
};

export default InvoiceStyleOnePage;
