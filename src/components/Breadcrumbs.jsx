import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumbs = () => {
  const router = useRouter();
  const linkPath = router.asPath.split("/");
  linkPath.shift();

  const pathArray = linkPath.map((path, i) => {
    if (path == "quotes") {
      path = "Home";
    }

    return { breadcrumb: path, href: "/" + linkPath.slice(0, i + 1).join("/") };
  });

  return (
    <ul style={{ listStyleType: "none", paddingInlineStart: "0px" }}>
      {pathArray
        .slice(0, -1)
        .map((breadcrumb, index) => {
          if (breadcrumb.breadcrumb == "Home") {
            return (
              <Link href="/" key={index}>
                <a>
                  <li>{breadcrumb.breadcrumb}</li>
                </a>
              </Link>
            );
          }

          return (
            <Link href={breadcrumb.href} key={index}>
              <a>
                <li>{breadcrumb.breadcrumb}</li>
              </a>
            </Link>
          );
        })
        .reduce((prev, curr) => [prev, " > ", curr])}
    </ul>
  );
};

export default Breadcrumbs;
