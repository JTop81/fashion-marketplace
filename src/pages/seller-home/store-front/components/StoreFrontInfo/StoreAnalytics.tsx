import { IStoreFrontAnalytics } from "api/services/store-front/interfaces/storefront-analytics.interface";
import AnalyticArrowGreen from "assets/Icons/store-front-analytics/arrow-green-analytic.svg";
import AnalyticArrowRed from "assets/Icons/store-front-analytics/arrow-red-analytic.svg";
type StoreAnalyticsProps = {
  analytics: IStoreFrontAnalytics;
};

export default function StoreAnalytics(props: StoreAnalyticsProps) {
  const { analytics } = props;
  return (
    <div className="mt-6 grid grid-cols-2 grid-rows-2 gap-4 px-6 xl:flex xl:gap-6 lg:px-0">
      <div className="xl:w-[175px] p-4 flex flex-col items-start rounded-lg border border-black/10 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 group">
        <div className="flex items-center">
          <h4 className="text-lg font-semibold mr-3 text-gray-800 group-hover:text-primary">
            {analytics.totalActiveItems}
          </h4>
        </div>
        <span className="text-sm font-medium text-gray-500 mt-2">
          Active Items
        </span>
      </div>
      <div className="xl:w-[175px] p-4 flex flex-col items-start rounded-lg border border-black/10 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 group">
        <div className="flex items-center">
          <h4 className="text-lg font-semibold mr-3 text-gray-800 group-hover:text-primary">
            {analytics.averageResponseTime}
          </h4>
          <div className="w-[16px] transition-transform group-hover:scale-110">
            {analytics.averageResponseTime > 0 ? (
              <img
                className="w-full h-full"
                src={AnalyticArrowGreen}
                alt="positive trend"
              />
            ) : (
              <img
                className="w-full h-full"
                src={AnalyticArrowRed}
                alt="negative trend"
              />
            )}
          </div>
        </div>
        <span className="text-sm font-medium text-gray-500 mt-2">
          Response Time
        </span>
      </div>
      <div className="xl:w-[175px] p-4 flex flex-col items-start rounded-lg border border-black/10 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 group">
        <div className="flex items-center">
          <h4 className="text-lg font-semibold mr-3 text-gray-800 group-hover:text-primary">
            {analytics.numOfFollowers}
          </h4>
          <div className="w-[16px] transition-transform group-hover:scale-110">
            {analytics.numOfFollowers > 5 ? (
              <img
                className="w-full h-full"
                src={AnalyticArrowGreen}
                alt="positive trend"
              />
            ) : (
              <img
                className="w-full h-full"
                src={AnalyticArrowRed}
                alt="negative trend"
              />
            )}
          </div>
        </div>
        <span className="text-sm font-medium text-gray-500 mt-2">
          Store Followers
        </span>
      </div>
      <div className="xl:w-[175px] p-4 flex flex-col items-start rounded-lg border border-black/10 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 group">
        <div className="flex items-center">
          <h4 className="text-lg font-semibold mr-3 text-gray-800 group-hover:text-primary">
            {analytics.totalImpressions}
          </h4>
          <div className="w-[16px] transition-transform group-hover:scale-110">
            {analytics.totalImpressions > 10 ? (
              <img
                className="w-full h-full"
                src={AnalyticArrowGreen}
                alt="positive trend"
              />
            ) : (
              <img
                className="w-full h-full"
                src={AnalyticArrowRed}
                alt="negative trend"
              />
            )}
          </div>
        </div>
        <span className="text-sm font-medium text-gray-500 mt-2">
          Impressions
        </span>
      </div>
    </div>
  );
}
