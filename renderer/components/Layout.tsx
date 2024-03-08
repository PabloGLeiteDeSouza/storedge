import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { FaXmark, FaWindowRestore, FaWindowMaximize, FaWindowMinimize } from 'react-icons/fa6'

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) =>{

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [appName, setAppName] = useState<string>('');

  const [windowState, setWindowState] = useState<'maximize' | 'restore'>('restore')

  useEffect(() => {
    async function startLayout() {
      window.app.getAppName();
      if (window) {
        const ajustSetName = (_event, args) => {
          setAppName(args)
        }
        // listen to the 'message' channel
        window.app.receiveAppName(ajustSetName);
        
        if (appName != "") {
          setIsLoading(false)
        } else {
          setIsLoading(false)
          setIsLoading(true)
        }

        return () => {
          window.app.stopReceivingAppName(ajustSetName);
        };
      }
    }

    if (isLoading) { 
      startLayout();
      setIsLoading(false)
    }
  }, [isLoading])

  function MinimizeApp() {
    window.app.minimize(() => {});
  }

  function MaximizeAndRestoreApp() {
    function handler (event, args){
      console.log("handler modification: " + args)
      setWindowState(args)
    }
    window.app.maximizeAndRestore(handler);
  }

  function CloseApp() {
    window.app.closeApp(() => {});
  }

  if (isLoading) {
    return null 
  }

  return (
    <div>
      <div className='w-full pl-2 flex flex-row justify-between bg-gray-900' >
        <div className='flex flex-row items-center justify-center' >
          <span className='text-white' >{appName}</span>
        </div>
        <div>
          
        </div>
        <div>
          <button type='button' onClick={MinimizeApp} className='h-full py-2 px-[14px] text-white hover:bg-gray-800' ><FaWindowMinimize/></button>
          <button type='button' onClick={MaximizeAndRestoreApp} className='h-full py-2 px-[14px] text-white hover:bg-gray-800' >{windowState === 'maximize' ? <FaWindowRestore/> : <FaWindowMaximize />}</button>
          <button type='button' onClick={CloseApp} className="h-full py-2 px-[14px] text-white hover:bg-red-600" ><FaXmark /></button>
        </div>
      </div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">Home</Link> | <Link href="/about">About</Link> |{" "}
          <Link href="/initial-props">With Initial Props</Link>
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  )
}
export default Layout;
