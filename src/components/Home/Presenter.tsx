import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormType } from ".";
import styles from "./index.module.scss";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

type Props = {
  translateToMoai: SubmitHandler<FormType>;
  translateToJp: SubmitHandler<FormType>;
};

const Presenter: React.FC<Props> = ({ translateToMoai, translateToJp }) => {
  const { register, handleSubmit } = useFormContext<FormType>();
  return (
    <div className={styles.bodyWrapper}>
      <form id="translateToMoai" onSubmit={handleSubmit(translateToMoai)}>
        <textarea
          className={styles.textarea}
          // type="text"
          id="textJp"
          {...register("textJp")}
          placeholder="こんにちは"
        />
      </form>
      <div className={styles.buttonWrapper}>
        <button type="submit" form="translateToMoai" className={styles.button}>
          <ArrowDownwardIcon />
          モアイ語に変換
        </button>
        <button type="submit" form="translateToJp" className={styles.button}>
          <ArrowUpwardIcon />
          日本語に変換
        </button>
      </div>
      <form id="translateToJp" onSubmit={handleSubmit(translateToJp)}>
        <textarea
          className={styles.textarea}
          // type="text"
          id="textMoai"
          {...register("textMoai")}
          placeholder="モーアモーiモァィモァイモアー"
        />
      </form>
    </div>
  );
};

export default Presenter;
