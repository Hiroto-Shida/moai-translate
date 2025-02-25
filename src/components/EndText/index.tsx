import React from "react";
import { useContext } from "react";
import { LanguagesContext } from "../layout/Layout";
import styles from "./index.module.scss";

const EndText: React.FC = () => {
  const language = useContext(LanguagesContext);

  if (language === "ja") {
    return (
      <div className={styles.bodyWrapper}>
        <p>本サービスは2025年2月25日をもって終了しました。</p>
        <p>
          今後は新たな代替サービス「
          <a href="https://moai-converter.netlify.app/" target="_blank">
            モアイ語変換
          </a>
          」をご利用ください
        </p>
      </div>
    );
  }

  return (
    <div className={styles.bodyWrapper}>
      <p>
        モﾓｱﾓｲイｵモィアｨォーモィアｫィモィアｨｧモィアﾓｱﾓｨ2025モォﾓｧﾓｲオ2モﾓｱﾓｲアｱ25モﾓｱォﾓｧォモィアｧイモィアｱイモィアﾓｱィモィアﾓｱﾓｱモﾓｲｫオイモオﾓｧｱﾓｱモィアォﾓｲモィアﾓｲﾓｧモィアォﾓｲモィアォﾓｨ。
      </p>
      <p>
        モオﾓｧｵｲモォﾓｨｱｵモィアﾓｱﾓｨモﾓｱォｨアモィアォﾓｨモィアﾓｱｲモオﾓｧﾓｧィモﾓｱﾓｱﾓｨﾓｨモィアｨォーモィアｫィモィアｨｧ「
        <a href="https://moai-converter.netlify.app/" target="_blank">
          モィアﾓｧイモィアｲイモィアｲオモｱｲｧﾓｧモォｧアｧモﾓｱィｫｨ
        </a>
        」モィアｧイモィアォオモォイイｧモﾓｲォイｱモィアオﾓｨモィアﾓｱアモィアォォモィアオオ
      </p>
    </div>
  );
};

export default EndText;
