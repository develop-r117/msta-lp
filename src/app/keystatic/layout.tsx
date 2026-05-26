import type { ReactNode } from "react";

export const metadata = {
  title: "Keystatic",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
