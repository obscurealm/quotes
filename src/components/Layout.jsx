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
      <h1 data-testid="heading">
        <Link href="/">Quotes</Link>
      </h1>
      {showBreadcrumbs && <Breadcrumbs />}
      {children}
    </>
  );
};

export default Layout;
