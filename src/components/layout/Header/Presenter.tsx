import { ComponentProps } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Header from ".";

type Props = ComponentProps<typeof Header>;

const Presenter: React.FC<Props> = ({ height }) => {
  return (
    <div className={styles.headerWrapper} style={{ height: height }}>
      <Image
        src="/moai_normal.png"
        alt="moai_normal"
        className={styles.image}
        width={60}
        height={60}
      />
      <h1 className={styles.title}>モアイ翻訳</h1>
      <Image
        src="/moai_normal.png"
        alt="moai_normal"
        className={styles.image}
        width={60}
        height={60}
      />
    </div>
  );
};
export default Presenter;
