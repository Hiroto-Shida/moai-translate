import { createContext, useState } from "react";
import Header from "../Header";

type Languages = "ja" | "moai";

export const LanguagesContext = createContext<Languages>("ja");

type Props = {
  children: React.ReactNode;
};

const headerHeight = 60;

export const Layout = ({ children }: Props) => {
  const [language, setLangage] = useState<Languages>("ja");

  return (
    <LanguagesContext.Provider value={language}>
      <Header height={headerHeight} onClickSwitch={setLangage} />
      <div
        style={{
          marginTop: `${headerHeight + 30}px`,
          marginBottom: "100px",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </LanguagesContext.Provider>
  );
};
