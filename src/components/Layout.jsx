import Head from "next/head";
import React from 'react';

const Layout = ({ title = 'Home' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  )
}

export default Layout;
