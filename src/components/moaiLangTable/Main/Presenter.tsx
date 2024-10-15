import { useContext } from "react";
import OneTable from "../OneTable";
import styles from "./index.module.scss";
import { LanguagesContext } from "@/components/layout/Layout";

const Presenter: React.FC = () => {
  const language = useContext(LanguagesContext);
  return (
    <div className={styles.moaiLangTableWrapper}>
      <p className={styles.title}>
        {language === "ja"
          ? "モアイ語対応表"
          : `モォィモアモァモォア"モアｱモァモォモイモァイﾓォｲモイ`}
      </p>
      <div className={styles.tableDisplayWrapper}>
        <div className={styles.tableWrapper}>
          <div className={styles.columnWrapper}>
            <OneTable jp="あ" />
            <OneTable jp="い" />
            <OneTable jp="う" />
            <OneTable jp="え" />
            <OneTable jp="お" />
          </div>
          <div className={styles.columnWrapper}>
            <OneTable jp="か" />
            <OneTable jp="き" />
            <OneTable jp="く" />
            <OneTable jp="け" />
            <OneTable jp="こ" />
          </div>
          <div className={styles.columnWrapper}>
            <OneTable jp="さ" />
            <OneTable jp="し" />
            <OneTable jp="す" />
            <OneTable jp="せ" />
            <OneTable jp="そ" />
          </div>
          <div className={styles.columnWrapper}>
            <OneTable jp="た" />
            <OneTable jp="ち" />
            <OneTable jp="つ" />
            <OneTable jp="て" />
            <OneTable jp="と" />
          </div>
          <div className={styles.columnWrapper}>
            <OneTable jp="な" />
            <OneTable jp="に" />
            <OneTable jp="ぬ" />
            <OneTable jp="ね" />
            <OneTable jp="の" />
          </div>
          <div className={styles.columnWrapper}>
            <OneTable jp="は" />
            <OneTable jp="ひ" />
            <OneTable jp="ふ" />
            <OneTable jp="へ" />
            <OneTable jp="ほ" />
          </div>
          <div className={styles.columnWrapper}>
            <OneTable jp="ま" />
            <OneTable jp="み" />
            <OneTable jp="む" />
            <OneTable jp="め" />
            <OneTable jp="も" />
          </div>
          <div className={styles.columnWrapper}>
            <OneTable jp="や" />
            <OneTable />
            <OneTable jp="ゆ" />
            <OneTable />
            <OneTable jp="よ" />
          </div>
          <div className={styles.columnWrapper}>
            <OneTable jp="ら" />
            <OneTable jp="り" />
            <OneTable jp="る" />
            <OneTable jp="れ" />
            <OneTable jp="ろ" />
          </div>
          <div className={styles.columnWrapper}>
            <OneTable jp="わ" />
            <OneTable />
            <OneTable jp="を" />
            <OneTable />
            <OneTable jp="ん" />
          </div>
        </div>
      </div>
      <div className={styles.otherCharWrapper}>
        <p className={styles.title}>
          {language === "ja"
            ? "その他対応文字"
            : `モォァモォｧモアｱ モアｱモァモォモイモォィモァァ"`}
        </p>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>
                {language === "ja"
                  ? `濁点：文字の後ろに「"」`
                  : `モアｱ"モイアモィｱモォォ：モォィモァァ"モォｧ モイモァァモォｨモァｧ「"」`}
              </td>
              <td>
                {language === "ja"
                  ? `例）「ざ」→「モアァ"」`
                  : `モィｨモァ）「ざ」→「モアァ"」`}
              </td>
            </tr>
            <tr>
              <td>
                {language === "ja"
                  ? `半濁点：文字の後ろに「°」`
                  : `モアイモォォモアｱ"モイアモィｱモォォ：モォィモァァ"モォｧ モイモァァモォｨモァｧ「°」`}
              </td>
              <td>
                {language === "ja"
                  ? `例）「ぱ」→「モアイ°」`
                  : `モィｨモァ）「ぱ」→「モアイ°」`}
              </td>
            </tr>
            <tr>
              <td>
                {language === "ja"
                  ? `小文字：先頭が半角の「ﾓ」`
                  : `モォアモォィモァァ"：モィァモォォモォｱモイモアア" モアイモォォモアアモイアモォｧ「ﾓ」`}
              </td>
              <td>
                {language === "ja"
                  ? `例）「ぁ」→「ﾓア」`
                  : `モィｨモァ）「ぁ」→「ﾓア」`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Presenter;
