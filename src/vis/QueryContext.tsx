import { createContext } from "react";

export interface Collection {
  [k: string]: string | number;
}

export interface SDKResponse {
  ok: boolean;
  value: Collection | Collection[];
}

interface QueryContextValue {
  result: SDKResponse;
  config: Collection;
}

export const QueryContext = createContext<QueryContextValue>({
  result: {
    ok: true,
    value: [],
  },
  config: {},
});
