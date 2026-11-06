"use client";
import { useEffect, useRef, useState } from "react";

// Mounted once in the root layout. Listens for the global `gs:toast` event.
export default function ToastHost() {
  const [msg, setMsg] = useState("");
  const [on, setOn] = useState(false);
  const t = useRef(null);
  useEffect(() => {
    const h = (e) => {
      setMsg((e && e.detail) || "");
      setOn(true);
      clearTimeout(t.current);
      t.current = setTimeout(() => setOn(false), 2600);
    };
    window.addEventListener("gs:toast", h);
    return () => window.removeEventListener("gs:toast", h);
  }, []);
  return (
    <div className={"toast" + (on ? " on" : "")} role="status" aria-live="polite">
      {msg}
    </div>
  );
}
