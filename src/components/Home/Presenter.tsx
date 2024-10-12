import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormType } from ".";
import styles from "./index.module.scss";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import React from "react";

type Props = {
  translateJpToMoai: SubmitHandler<FormType>;
  translateMoaiToJp: SubmitHandler<FormType>;
  hiragana: string;
  dividedMoalLang: string[];
  isStartMoaiLang: boolean;
  isValidationError: boolean;
  handleChangeMoaiLang: (value: string) => void;
};

const Presenter: React.FC<Props> = ({
  translateJpToMoai,
  translateMoaiToJp,
  hiragana,
  dividedMoalLang,
  isStartMoaiLang,
  isValidationError,
  handleChangeMoaiLang,
}) => {
  const { register, handleSubmit, formState, setValue } =
    useFormContext<FormType>();

  const textMoaiRef = useRef<HTMLTextAreaElement | null>(null);
  const displayAreaRef = useRef<HTMLDivElement | null>(null);

  // モアイ語のテキストをスタイル付きで表示する
  const styledMoaiLangText = useMemo(() => {
    const moaiLangIndex = isStartMoaiLang ? 0 : 1;
    return dividedMoalLang.map((text, index) => {
      const splitText = text.split("\n");
      const element = splitText.map((t, i) => (
        <React.Fragment key={i}>
          {i !== 0 && <br />}
          {t}
          {index === dividedMoalLang.length - 1 &&
            i === splitText.length - 1 && <br />}
        </React.Fragment>
      ));
      if (index % 2 === moaiLangIndex) {
        return <span key={index}>{element}</span>;
      }
      return (
        <span key={index} className={styles.error}>
          {element}
        </span>
      );
    });
  }, [dividedMoalLang, isStartMoaiLang]);

  // 入力要素と表示要素のスクロールを連動させる
  useEffect(() => {
    const textMoaiElement = textMoaiRef.current;
    if (textMoaiElement) {
      const handleScroll = () => {
        const scrollTop = textMoaiRef.current?.scrollTop;
        const displayAreaElement = displayAreaRef.current;
        if (displayAreaElement) {
          displayAreaElement.scrollTo({ top: scrollTop });
        }
      };
      textMoaiElement.addEventListener("scroll", handleScroll);
      return () => {
        textMoaiElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className={styles.bodyWrapper}>
      <form
        id="translateToMoai"
        onSubmit={handleSubmit(translateJpToMoai)}
        className={styles.formElement}
      >
        <textarea
          className={styles.textarea}
          id="textJp"
          {...register("textJp")}
          placeholder="こんにちは"
        />
        <p className={styles.hiragana}>{hiragana}</p>
      </form>
      <div className={styles.validationError}>
        <p>{formState.errors.textJp?.message}</p>
      </div>
      <div className={styles.buttonWrapper}>
        <button
          type="submit"
          form="translateToMoai"
          className={styles.button}
          disabled={formState.isSubmitting || !!formState.errors.textJp}
          onClick={() => setValue("textMoai", "")}
        >
          <ArrowDownwardIcon />
          モアイ語に変換
        </button>
        <button
          type="submit"
          form="translateToJp"
          className={styles.button}
          disabled={formState.isSubmitting || !!formState.errors.textMoai}
          onClick={() => setValue("textJp", "")}
        >
          <ArrowUpwardIcon />
          日本語に変換
        </button>
      </div>
      <form
        id="translateToJp"
        onSubmit={handleSubmit(translateMoaiToJp)}
        className={clsx(styles.formElement, styles.moaiTextWrapper)}
      >
        <div className={styles.displayArea} ref={displayAreaRef}>
          {styledMoaiLangText}
        </div>
        <textarea
          className={styles.textarea}
          id="textMoai"
          {...register("textMoai")}
          ref={textMoaiRef}
          onInput={(e) => {
            handleChangeMoaiLang(e.currentTarget.value);
          }}
          placeholder="モォアモォォモァｧモァｱモアイ"
        />
        <div className={styles.validationError}>
          {isValidationError && (
            <>
              ※<span className={styles.emphasis}>モアイ語以外</span>
              は翻訳されず、そのまま反映されます
            </>
          )}
          <p>{formState.errors.textMoai?.message}</p>
        </div>
      </form>
    </div>
  );
};

export default Presenter;
