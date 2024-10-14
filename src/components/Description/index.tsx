import { useContext } from "react";
import styles from "./index.module.scss";
import { LanguagesContext } from "../layout/Layout";

const Description: React.FC = () => {
  const language = useContext(LanguagesContext);
  return (
    <div className={styles.descriptionWrapper}>
      <p>
        {language === "ja"
          ? "本サービスは日本語の「ひらがな」と「モアイ語」を相互に変換します。"
          : `モォイモォォモアァーモァイ"モイァモアイ モァｧモォイモォォモォア"モォｧ 「モァイモアｨモアア"モアｧ」モォｱ 「モォィモアモァモォア"」モイォ モォァモイモォア"モァｧ モィイモォォモアアモォォモァァモアィモイァ。`}
      </p>
      <p>
        {language === "ja"
          ? "日本語入力欄には「カタカナ」「漢字」「英単語」なども入力可能ですが、自動でひらがなに変換されてから翻訳を行います。"
          : `モァｧモォイモォォモォア"モァｧﾓイｲモイモァｨﾓォｲモイアモアｨモォォモァｧモアイ 「モアアモアｱモアアモアｧ」 「モアアモォォモァァ"」 「モィモァモアｱモォォモォア"」モアｧモォｱ"モォィ モァｧﾓイｲモイモァｨﾓォｲモイアモアアモォｧモイモィｱ"モイァモアア"、 モァァ"モォｱ"モイモィｱ" モァイモアｨモアア"モアｧモァｧ モィイモォォモアアモォォモアァモィｨモィｱモアアモアｨ モォイモォォモアｲモイアモイォ モォモォアモアｧモァモアィモイァ。`}
      </p>
    </div>
  );
};
export default Description;
