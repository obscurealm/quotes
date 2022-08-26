import Head from "next/head";
import React from "react";
import Breadcrumbs from "./Breadcrumbs";

const Layout = ({ title = "Quotes", children, showBreadcrumbs }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {showBreadcrumbs && <Breadcrumbs />}
      {children}
    </>
  );
};

export default Layout;
