import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  FaXmark,
  FaWindowRestore,
  FaWindowMaximize,
  FaWindowMinimize,
} from "react-icons/fa6";
import { MdEventNote } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [appName, setAppName] = useState<string>("");

  const [windowState, setWindowState] = useState<"maximize" | "restore">(
    "restore"
  );

  useEffect(() => {
    async function startLayout() {
      window.app.getAppName();
      if (window) {
        const ajustSetName = (_event, args) => {
          setAppName(args);
        };
        // listen to the 'message' channel
        window.app.receiveAppName(ajustSetName);

        if (appName != "") {
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsLoading(true);
        }

        return () => {
          window.app.stopReceivingAppName(ajustSetName);
        };
      }
    }

    if (isLoading) {
      startLayout();
      setIsLoading(false);
    }
  }, [isLoading]);

  function MinimizeApp() {
    window.app.minimize(() => {});
  }

  function MaximizeAndRestoreApp() {
    function handler(event, args) {
      console.log("handler modification: " + args);
      setWindowState(args);
    }
    window.app.maximizeAndRestore(handler);
  }

  function CloseApp() {
    window.app.closeApp(() => {});
  }

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <div className="w-full pl-2 flex flex-row justify-between bg-gray-900">
        <div className="flex flex-row items-center justify-center">
          <span className="text-white">{appName}</span>
        </div>
        <div></div>
        <div>
          <button
            type="button"
            onClick={MinimizeApp}
            className="h-full py-2 px-[14px] text-white hover:bg-gray-800"
          >
            <FaWindowMinimize />
          </button>
          <button
            type="button"
            onClick={MaximizeAndRestoreApp}
            className="h-full py-2 px-[14px] text-white hover:bg-gray-800"
          >
            {windowState === "maximize" ? (
              <FaWindowRestore />
            ) : (
              <FaWindowMaximize />
            )}
          </button>
          <button
            type="button"
            onClick={CloseApp}
            className="h-full py-2 px-[14px] text-white hover:bg-red-600"
          >
            <FaXmark />
          </button>
        </div>
      </div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link className="" href="/">
                    Dashboard
                  </Link>  
                </li>
                <li>
                  <Link href="/view-events">
                    <MdEventNote />
                    Visualizar eventos
                  </Link>
                </li>
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </li>
                <li><a>Item 3</a></li>
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                <li>
                  <Link className="" href="/">
                    Dashboard
                  </Link>  
                </li>
                <li>
                  <Link href="/view-events">
                    <MdEventNote />
                    Visualizar eventos
                  </Link>
                </li>
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </details>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <div className="navbar-end">
            <details className="dropdown dropdown-end">
              <summary className="m-1 btn"><IoSettings/></summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </details>
          </div>
        </div>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  );
};
export default Layout;
