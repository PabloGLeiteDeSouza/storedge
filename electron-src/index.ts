// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    titleBarStyle:'hidden',
    titleBarOverlay: false,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(url);

  ipcMain.on("maximize-and-restore-app", (event: IpcMainEvent) => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
      event.sender.send("maximize-and-restore-app", "restore")
    } else {
      mainWindow.maximize();
      event.sender.send("maximize-and-restore-app", "maximize")
    }
  })

  ipcMain.on("minimize-app", () => {
    mainWindow.minimize()
  })

});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});

ipcMain.on("get-app-name", (event: IpcMainEvent,) => {
  event.sender.send("get-app-name", app.getName());
})

ipcMain.on("close-app", () => {
  app.exit();
})


