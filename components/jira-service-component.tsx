"use client";
import { useEffect } from "react";

export default function JiraServiceComponent({
  username,
  email,
}: {
  username: string;
  email: string;
}) {
  // @ts-expect-error ignore
  function extend(a, b) {
    for (const key in b) if (b.hasOwnProperty(key)) a[key] = b[key];
    return a;
  }
  useEffect(() => {
    const fullUrl = window.location.href;
    // @ts-expect-error ignore
    window.ATL_JQ_PAGE_PROPS = extend(window.ATL_JQ_PAGE_PROPS || {}, {
      fieldValues: {
        email: email,
        fullname: username,
        customfield_10059: fullUrl,
      },
    });
  }, [email, username]);
  return null;
}
