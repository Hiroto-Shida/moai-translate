import Header from "../Header";

type Props = {
  children: React.ReactNode;
};

const headerHeight = 60;

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header height={headerHeight} />
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
    </>
  );
};
