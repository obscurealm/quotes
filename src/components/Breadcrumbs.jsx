import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumbs = () => {
  const { asPath } = useRouter();
  const linkPath = asPath.split("/");
  linkPath.shift();

  const pathArray = linkPath.map((path, i) => {
    if (path == "quotes") {
      path = "Home";
    }

    return { breadcrumb: path, href: "/" + linkPath.slice(0, i + 1).join("/") };
  });

  return (
    <ul
      data-testid="breadcrumbs"
      style={{ listStyleType: "none", paddingInlineStart: "0px" }}
    >
      {pathArray
        .slice(0, -1)
        .map((breadcrumb, index) => {
          if (breadcrumb.breadcrumb == "Home") {
            return (
              <Link href="/" key={index}>
                <li>{breadcrumb.breadcrumb}</li>
              </Link>
            );
          }

          return (
            <Link href={breadcrumb.href} key={index}>
              <li>{breadcrumb.breadcrumb}</li>
            </Link>
          );
        })
        .reduce((prev, curr) => [prev, " > ", curr])}
    </ul>
  );
};

export default Breadcrumbs;
