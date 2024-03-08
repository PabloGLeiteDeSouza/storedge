/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { contextBridge, ipcRenderer } from "electron";
import { IpcRendererEvent } from "electron/main";

// We are using the context bridge to securely expose NodeAPIs.
// Please note that many Node APIs grant access to local system resources.
// Be very cautious about which globals and APIs you expose to untrusted remote content.
contextBridge.exposeInMainWorld("electron", {
  sayHello: () => ipcRenderer.send("message", "hi from next"),
  receiveHello: (handler: (event: IpcRendererEvent, ...args: any[]) => void) =>
    ipcRenderer.on("message", handler),
  stopReceivingHello: (
    handler: (event: IpcRendererEvent, ...args: any[]) => void,
  ) => ipcRenderer.removeListener("message", handler),
  
});

contextBridge.exposeInMainWorld("app",  {
  getAppName: () => ipcRenderer.send("get-app-name"),
  receiveAppName: (handler: (event: IpcRendererEvent, ...args: any[]) => void) =>
    ipcRenderer.on("get-app-name", handler),
  stopReceivingAppName: (
    handler: (event: IpcRendererEvent, ...args: any[]) => void,
  ) => ipcRenderer.removeListener("get-app-name", handler),
  closeApp: () => ipcRenderer.send('close-app'),
  maximizeAndRestore: (handler: (event: IpcRendererEvent, ...args: any[]) => void) => { ipcRenderer.send('maximize-and-restore-app'); ipcRenderer.on('maximize-and-restore-app', handler); },
  stopReceivingMaximizeAndRestore: (handler: (event: IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.removeListener("maximize-and-restore-app", handler),
  minimize: (handler: (event: IpcRendererEvent, ...args: any[]) => void) => { ipcRenderer.send("minimize-app"); ipcRenderer.on("minimize-app", handler); ipcRenderer.removeListener("minimize-app", handler)},
})

contextBridge.exposeInMainWorld("monitoring", {

})