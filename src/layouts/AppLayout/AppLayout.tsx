import { Container } from "@mui/material";
import { FC, ReactNode } from "react";
import { TopBar } from "../../components";

export const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Container maxWidth="lg" className="mt-8 p-4 shadow-md bg-white rounded">{children}</Container>
    </div>
  );
};
