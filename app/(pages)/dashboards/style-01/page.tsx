import AssetChart from "@/components/dashboards/style-01/AssetChart";
import LatestTransactions from "@/components/dashboards/style-01/LatestTransactions";
import Statistics from "@/components/dashboards/style-01/Statistics";
import TransactionAccount from "@/components/dashboards/style-01/TransactionAccount";
import Banner from "@/components/shared/Banner";

const page = () => {
  return (
    <div>
      <Banner title="Dashboard" />
      <div className="grid grid-cols-12 gap-4 xxl:gap-6">
        <Statistics />
        <AssetChart />
        <LatestTransactions />
        <TransactionAccount />
      </div>
    </div>
  );
};

export default page;
