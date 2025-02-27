import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
