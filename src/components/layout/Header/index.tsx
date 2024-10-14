import Presenter from "./Presenter";

type Props = {
  height: number;
  onClickSwitch: (language: "ja" | "moai") => void;
};

const Header: React.FC<Props> = ({ height, onClickSwitch }) => {
  return <Presenter height={height} onClickSwitch={onClickSwitch} />;
};

export default Header;
