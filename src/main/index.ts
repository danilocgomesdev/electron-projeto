import { BrowserWindow, app } from "electron";

import createMainWindow from "./createMainWindow";

app.whenReady().then(() => {
  const mainWindow = createMainWindow();

  mainWindow.setMenuBarVisibility(false);

  app.on("web-contents-created", (_, contents) =>
    contents.on("will-navigate", () => {
      BrowserWindow.getAllWindows().map((a) => a.setMenuBarVisibility(false));
    }),
  );

  app.on("activate", () => {
    createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
