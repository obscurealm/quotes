import Head from "next/head";
import Link from "next/link";
import React from "react";
import Breadcrumbs from "./Breadcrumbs";

const Layout = ({ title, children, showBreadcrumbs }) => {
  const pageTitle = `${title == null ? "" : `${title} - `}Quotes`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
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
