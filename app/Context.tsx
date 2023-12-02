"use client";

import { useMemo } from "react";
import { SWRConfig } from "swr";
import { api } from "../libs/api";

export default function Context({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={useMemo(
        () => ({
          fetcher: (key) => api.get(key).then((c) => c.data),
        }),
        []
      )}
    >
      {children}
    </SWRConfig>
  );
}
