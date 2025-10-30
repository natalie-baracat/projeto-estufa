// Layout.jsx
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-lime-50 to-white">
      {children}
    </div>
  );
}
