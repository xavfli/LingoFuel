import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      {children}
    </div>
  );
}
