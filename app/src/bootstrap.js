import * as React from "react";

console.log('Hello World from "app"', React);

function loadMicrofrontend(name) {
  return System.import(name).then(async (m) => {
    await __webpack_init_sharing__("default");
    await m.init(__webpack_share_scopes__.default);
    const factory = await m.get("app");
    return factory();
  });
}

importMapOverrides
  .getDefaultMap()
  .then((res) => {
    const mfs = Object.keys(res.imports);

    return Promise.all(
      mfs.map((mf) =>
        loadMicrofrontend(mf).then((res) => {
          console.log("Loaded MF", mf, res);

          if ("setup" in res && typeof res.setup === "function") {
            res.setup();
          }

          return [mf, res];
        })
      )
    );
  })
  .then(
    () => {
      console.log("All MFs loaded");
    },
    (err) => {
      console.error("Could not load the MFs", err);
    }
  );
