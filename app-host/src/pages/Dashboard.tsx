import { lazy, Suspense } from "react";

const RemoteAreaChart = lazy(() => import("app-remote/components/AreaChart"));
const LineChart = lazy(() => import("app-remote/components/LineChart"));
const BarChart = lazy(() => import("app-remote/components/BarChart"));
const ColumnChart = lazy(() => import("app-remote/components/ColumnChart"));
const PieChart = lazy(() => import("app-remote/components/PieChart"));

export const Dashboard = () => {
  return (
    <div className={`flex w-full p-3 sm:p-6 overflow-y-auto`}>
      <div
        className={
          "w-full h-fit bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl max-sm:p-3 sm:p-6"
        }
      >
        <div className="flex sm:flex-row justify-center align-center flex-wrap gap-6 h-fit">
          <Suspense fallback={<p>Loading remote...</p>}>
            <RemoteAreaChart />
            <LineChart />
            <BarChart />
            <ColumnChart />
            <PieChart />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
