import { ReactNode } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export const MainContent = ({ children }: { children: ReactNode }) => (
  <main className="flex flex-1 flex-col p-4 lg:p-6">{children}</main>
);
