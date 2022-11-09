import Head from "next/head";
import Link from "next/link";
import React from "react";
import Breadcrumbs from "./Breadcrumbs";

const Layout = ({ title = "Quotes", children, showBreadcrumbs }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Link href="/">
        <h1 data-testid="heading">Quotes</h1>
      </Link>
      {showBreadcrumbs && <Breadcrumbs />}
      {children}
    </>
  );
};

export default Layout;
