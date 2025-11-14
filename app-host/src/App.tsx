import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { RemoteAppContainer } from "./components/RemoteAppContainer";

// import type { lodash, formatName } from "appA/utils";
// const { formatName, lodash } = await import("app-remote/utils").then(
//   (utils) => utils.default
// );

export default function App() {
  // useEffect(() => {
  //   console.log(formatName("foo", "bar"));
  //   console.log(lodash.camelCase("text to transform into camel case"));
  // }, []);

  return (
    <div className="min-h-screen w-full relative text-white">
      <div
        className="absolute inset-0 z-0 "
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
        }}
      />

      <Header />
      <div className="absolute pt-20.5 flex flex-col sm:flex-row w-full h-full">
        <Navbar />
        <RemoteAppContainer />
      </div>
    </div>
  );
}
