import OneTable from "../OneTable";
import styles from "./index.module.scss";

const Presenter: React.FC = () => {
  return (
    <div className={styles.moaiLangTableWrapper}>
      <p className={styles.title}>モアイ語対応表</p>
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
        <p className={styles.title}>その他対応文字</p>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>{`濁点：文字の後ろに「"」`}</td>
              <td>{`例）「ざ」→「モアァ"」`}</td>
            </tr>
            <tr>
              <td>半濁点：文字の後ろに「°」</td>
              <td>例）「ぱ」→「モアイ°」</td>
            </tr>
            <tr>
              <td>小文字：先頭が半角の「ﾓ」</td>
              <td>例）「ぁ」→「ﾓア」</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Presenter;
