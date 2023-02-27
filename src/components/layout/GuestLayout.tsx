import React from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (data?.user) {
      void router.push("/dashboard");
    }
  }, [data, router]);

  return <React.Fragment>{children}</React.Fragment>;
}
