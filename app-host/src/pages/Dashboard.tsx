import { lazy, Suspense } from "react";

const RemoteAreaChart = lazy(() => import("app-remote/components/AreaChart"));
const LineChart = lazy(() => import("app-remote/components/LineChart"));

export const Dashboard = () => {
  return (
    <div className={`flex w-full p-3 sm:p-6`}>
      <div
        className={
          "w-full h-fit bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-3 sm:p-6"
        }
      >
        <Suspense fallback={<p>Loading remote...</p>}>
          <div className="flex flex-col justify-center align-center sm:flex-row flex-wrap gap-6">
            <RemoteAreaChart />
            <LineChart />
          </div>
        </Suspense>
      </div>
    </div>
  );
};
