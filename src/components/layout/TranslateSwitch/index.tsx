import { useContext } from "react";
import styles from "./index.module.scss";
import { LanguagesContext } from "../Layout";

type Props = {
  onClickSwitch: (language: "ja" | "moai") => void;
};

const TranslateSwitch: React.FC<Props> = ({ onClickSwitch }) => {
  const language = useContext(LanguagesContext);

  return (
    <div className={styles.translateSwitch}>
      <label htmlFor="switch" className={styles.switchLabel}>
        <input
          type="checkbox"
          id="switch"
          onChange={(e) => {
            onClickSwitch(e.target.checked ? "moai" : "ja");
          }}
        />
        <div className={styles.base} />
        <div className={styles.circle}>
          <span className={styles.text}>{language === "ja" ? "あ" : "ﾓｱ"}</span>
        </div>
      </label>
    </div>
  );
};

export default TranslateSwitch;
