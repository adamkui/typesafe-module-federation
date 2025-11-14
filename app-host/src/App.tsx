import React, { Suspense, useEffect } from "react";

// import type { lodash, formatName } from "appA/utils";
const RemoteUserCard = React.lazy(() => import("app-remote/UserCard"));
const { formatName, lodash } = await import("app-remote/utils").then(
  (utils) => utils.default
);

export default function App() {
  useEffect(() => {
    console.log(formatName("foo", "bar"));
    console.log(lodash.camelCase("text to transform into camel case"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Host App</h2>
      <Suspense fallback={<p>Loading remote...</p>}>
        <RemoteUserCard firstName="Grace" lastName="Hopper" />
      </Suspense>
    </div>
  );
}
