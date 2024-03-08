// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  interface Window {
    electron: {
      sayHello: () => void;
      receiveHello: (handler: (event, args) => void) => void;
      stopReceivingHello: (handler: (event, args) => void) => void;
    };
    app: {
      getAppName: () => void;
      receiveAppName: (handler: (event, appname: string) => void) => void;
      stopReceivingAppName: (handler: (event, args) => void) => void;
      closeApp: (handler: (event, args) => void) => void;
      maximizeAndRestore: (handler: (event, args) => void) => void;
      stopReceivingMaximizeAndRestore: (handler: (event, args) => void) => void;
      minimize: (handler: (event, args) => void) => void;
    }

    monitoring: {

    }
  }
}

export type User = {
  id: number;
  name: string;
};
