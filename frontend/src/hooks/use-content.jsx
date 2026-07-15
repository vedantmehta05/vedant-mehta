import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const res = await api.get("/content");
      setContent(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const updateSection = async (section, value) => {
    const res = await api.put(`/content/${section}`, { value });
    setContent((prev) => ({ ...prev, [section]: res.data.value }));
    return res.data.value;
  };

  return (
    <ContentContext.Provider value={{ content, loading, updateSection, refetch: fetchContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
