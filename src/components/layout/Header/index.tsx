import Presenter from "./Presenter";

type Props = {
  height: number;
};

const Header: React.FC<Props> = ({ height }) => {
  return <Presenter height={height} />;
};

export default Header;
