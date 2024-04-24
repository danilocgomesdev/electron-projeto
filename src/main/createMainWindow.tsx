import { BrowserWindow } from "electron";
import path from "path";

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1120,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: "hiddenInset",
    trafficLightPosition: {
      x: 20,
      y: 20,
    },
    icon: path.join(__dirname, "../../build/icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.maximize();

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.loadURL("http://localhost:8084/cr5-web");

  return mainWindow;
}

export default createMainWindow;
