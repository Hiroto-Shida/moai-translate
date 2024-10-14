import clsx from "clsx";
import styles from "./index.module.scss";
import ArrowDownImage from "@/../public/arrowDown.svg";
import ArrowUpImage from "@/../public/arrowUp.svg";

type Props = {
  form: string;
  disabled: boolean;
  onClick: () => void;
  direction: "up" | "down";
  text: string;
};

const TranslateButton: React.FC<Props> = ({
  form,
  disabled,
  onClick,
  direction,
  text,
}) => {
  return (
    <button
      type="submit"
      form={form}
      className={clsx(styles.buttonWrapper, {
        [styles.Disabled]: disabled,
        [styles.Active]: !disabled,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {direction === "down" ? (
        <ArrowDownImage className={clsx(styles.arrow, styles.Down)} />
      ) : (
        <ArrowUpImage className={clsx(styles.arrow, styles.Up)} />
      )}
      <p className={styles.text}>{text}</p>
    </button>
  );
};

export default TranslateButton;
