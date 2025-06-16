import { createContext, useContext, useState } from "react";

type QueryContextType = {
  query: string;
  setQuery: (query: string) => void;
};

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export function useQuery() {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("useQuery must be used within a QueryProvider");
  }
  return context;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
}
