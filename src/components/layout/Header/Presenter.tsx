import { ComponentProps, useContext } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Header from ".";
import TranslateSwitch from "../TranslateSwitch";
import { LanguagesContext } from "../Layout";
import clsx from "clsx";

type Props = ComponentProps<typeof Header>;

const Presenter: React.FC<Props> = ({ height, onClickSwitch }) => {
  const language = useContext(LanguagesContext);

  return (
    <div className={styles.headerWrapper} style={{ height: height }}>
      <Image
        src="/moai_normal.png"
        alt="moai_normal"
        className={styles.image}
        width={30}
        height={60}
      />
      <h1
        className={clsx(styles.title, {
          [styles.Small]: language === "moai",
        })}
      >
        {language === "ja" ? (
          "モアイ翻訳"
        ) : (
          <>
            <p>モォィモアモァ</p>
            <p>モォイモォォモアｲモイア</p>
          </>
        )}
      </h1>
      <Image
        src="/moai_normal.png"
        alt="moai_normal"
        className={styles.image}
        width={30}
        height={60}
      />
      <TranslateSwitch onClickSwitch={onClickSwitch} />
    </div>
  );
};
export default Presenter;
