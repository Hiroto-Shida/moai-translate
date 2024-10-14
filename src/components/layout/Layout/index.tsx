import Header from "../Header";

type Props = {
  children: React.ReactNode;
};

const headerHeight = 60;

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header height={headerHeight} />
      <div style={{ marginTop: `${headerHeight + 30}px` }}>{children}</div>
    </>
  );
};
