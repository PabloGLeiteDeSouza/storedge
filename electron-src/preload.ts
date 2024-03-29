/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { contextBridge, ipcRenderer } from "electron";
import { IpcRendererEvent } from "electron/main";
import { CallbackType } from "./apis/file-manager";

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

contextBridge.exposeInMainWorld("ApiFileManager", {
  createEvent: (handler: (event: IpcRendererEvent, ...args: any[]) => void, Directory: string, Destination: string, Callback: CallbackType, ...Events: string[]) => { ipcRenderer.send('api-file-manager-create-event-email', Directory, Destination, Callback, ...Events); ipcRenderer.on('api-file-manager-create-event-email', handler); ipcRenderer.removeListener('api-file-manager-create-event-email', handler); },
  removeEventListener: (handler: (event: IpcRendererEvent, ...args: any[]) => void, Directory: string, Callback: CallbackType) => { ipcRenderer.send('api-file-manager-remove-event', Directory, Callback); ipcRenderer.on('api-file-manager-remove-event', handler); ipcRenderer.removeListener('api-file-manager-remove-event', handler); },  
  removeAllListeners: (handler: (event: IpcRendererEvent, ...args: any[]) => void, Directory: string) => { ipcRenderer.send('api-file-manager-remove-all-events', Directory); ipcRenderer.on('api-file-manager-remove-all-events', handler); ipcRenderer.removeListener('api-file-manager-remove-all-events', handler); },
})