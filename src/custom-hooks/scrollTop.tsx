"use client";

import { useEffect } from "react";

export function ScrollTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return null;
}
