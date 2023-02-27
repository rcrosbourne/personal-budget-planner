import React from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!data?.user) {
      void router.push("/auth/signin");
    }
  }, [data, router]);

  return <React.Fragment>{children}</React.Fragment>;
}
