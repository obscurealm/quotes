import Head from "next/head";
import React from 'react';

const Layout = ({ title = 'Home', children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  )
}

export default Layout;
