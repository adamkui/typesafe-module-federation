import { Suspense, useState } from "react";

const { lodash: _ } = await import("app-remote/libs").then(
  (utils) => utils.default
);

const SalesSummaryCard = ({ sales }: any) => {
  const [showLast, setShowLast] = useState(7);

  const filteredSales = _.takeRight(sales, showLast);
  const totalSales = _.sumBy(filteredSales, "amount");
  const avgSale = _.meanBy(filteredSales, "amount").toFixed(2);

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-lg shadow-lg w-96">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Sales Summary</h3>
        <select
          className="bg-neutral-800 text-white px-2 py-1 rounded"
          value={showLast}
          onChange={(e) => setShowLast(Number(e.target.value))}
        >
          <option value={7}>Last 7 days</option>
          <option value={14}>Last 14 days</option>
          <option value={30}>Last 30 days</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div>
          <dt className="text-xs">Total Sales</dt>
          <dd className="text-xl font-bold">${totalSales}</dd>
        </div>
        <div>
          <dt className="text-xs">Average Sale</dt>
          <dd className="text-xl font-bold">${avgSale}</dd>
        </div>
      </div>
    </div>
  );
};

const TopProductsCard = ({ products }: any) => {
  const [showTop, setShowTop] = useState(3);

  const topProducts = _.take(_.orderBy(products, ["sold"], ["desc"]), showTop);

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-lg shadow-lg w-96">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Top Products</h3>
        <div className="flex items-center space-x-2">
          <label className="text-sm">Show top:</label>
          <input
            type="number"
            min="1"
            max={products.length}
            value={showTop}
            onChange={(e) => setShowTop(Number(e.target.value))}
            className="w-12 bg-neutral-800 text-white px-1 py-0.5 rounded"
          />
        </div>
      </div>
      <ul className="space-y-2">
        {topProducts.map((p) => (
          <li key={p.name} className="flex justify-between">
            <span>{p.name}</span>
            <span className="font-semibold">{p.sold}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserStatsCard = ({ users }: any) => {
  const [showActive, setShowActive] = useState(true);

  const filteredUsers = showActive
    ? _.filter(users, { active: true })
    : _.filter(users, { active: false });

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-lg shadow-lg w-96">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">User Stats</h3>
        <button
          onClick={() => setShowActive(!showActive)}
          className="bg-neutral-800 text-white px-3 py-1 rounded"
        >
          {showActive ? "Show Inactive" : "Show Active"}
        </button>
      </div>
      <ul className="space-y-2">
        {filteredUsers.map((u) => (
          <li key={u.name} className="flex justify-between">
            <span>{u.name}</span>
            <span className={u.active ? "text-green-400" : "text-red-400"}>
              {u.active ? "Active" : "Inactive"}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-sm text-neutral-400">
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  );
};

export const Calculations = () => {
  const salesData = [
    { amount: 120 },
    { amount: 300 },
    { amount: 450 },
    { amount: 200 },
    { amount: 180 },
    { amount: 220 },
    { amount: 360 },
    { amount: 400 },
  ];

  const productsData = [
    { name: "Product A", sold: 120 },
    { name: "Product B", sold: 80 },
    { name: "Product C", sold: 150 },
    { name: "Product D", sold: 60 },
    { name: "Product E", sold: 90 },
  ];

  const usersData = [
    { name: "Alice", active: true },
    { name: "Bob", active: false },
    { name: "Charlie", active: true },
    { name: "Dave", active: true },
    { name: "Eve", active: false },
  ];

  return (
    <div className={`flex w-full p-3 sm:p-6 overflow-y-auto`}>
      <div
        className={
          "w-full h-fit bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl max-sm:p-3 sm:p-6"
        }
      >
        <div className="flex sm:flex-row justify-center align-center flex-wrap gap-6 h-fit">
          <Suspense fallback={<p>Loading remote...</p>}>
            <SalesSummaryCard sales={salesData} />
            <TopProductsCard products={productsData} />
            <UserStatsCard users={usersData} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
