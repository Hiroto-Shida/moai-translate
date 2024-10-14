import { MOAI_LANG } from "@/constants/moaiLang";
import styles from "./index.module.scss";

type Props = {
  jp?: string;
};

const OneTable: React.FC<Props> = ({ jp }) => {
  return jp ? (
    <table className={styles.tableElement}>
      <tbody>
        <tr className={styles.trElement}>
          <th>{jp}</th>
        </tr>
        <tr>
          <td>{MOAI_LANG[jp] ?? ""}</td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div className={styles.none} />
  );
};

export default OneTable;
