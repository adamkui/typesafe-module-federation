import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { HomePage } from "./pages/Home";
import { Calculations } from "./pages/Calculations";

export default function App() {
  return (
    <div className="min-h-screen w-full relative text-white">
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
        }}
      />

      <Header />
      <div
        id={"BelowHeader"}
        className="absolute pt-20.5 flex max-sm:flex-col w-full sm:flex-row"
      >
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calculations" element={<Calculations />} />
        </Routes>
      </div>
    </div>
  );
}
