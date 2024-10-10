import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { FormType } from ".";
import styles from "./index.module.scss";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import React from "react";

type Props = {
  translateToMoai: SubmitHandler<FormType>;
  translateToJp: SubmitHandler<FormType>;
  translateInvalidToJp: SubmitErrorHandler<FormType>;
  hiragana: string;
  moaiLangText: string;
  notMoaiLangIndices: number[];
  handleChangeMoaiLang: (value: string) => void;
};

const Presenter: React.FC<Props> = ({
  translateToMoai,
  translateToJp,
  translateInvalidToJp,
  hiragana,
  moaiLangText,
  notMoaiLangIndices,
  handleChangeMoaiLang,
}) => {
  const { register, handleSubmit, formState, setValue } =
    useFormContext<FormType>();

  const textMoaiRef = useRef<HTMLTextAreaElement | null>(null);
  const displayAreaRef = useRef<HTMLDivElement | null>(null);

  // モアイ語のテキストをスタイル付きで表示する
  const styledMoaiLangText = useMemo(() => {
    return moaiLangText.split("").map((char, index) => {
      if (char === "\n") {
        // MEMO: 改行した時の自動スクロール考慮
        if (index === moaiLangText.length - 1)
          return (
            <React.Fragment key={index}>
              <br />
              <br />
            </React.Fragment>
          );
        return <br key={index} />;
      }
      // TODO: spanを最小限にする
      if (notMoaiLangIndices.includes(index)) {
        return (
          <span key={index} className={styles.error}>
            {char}
          </span>
        );
      }
      return <span key={index}>{char}</span>;
    });
  }, [moaiLangText, notMoaiLangIndices]);

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
        onSubmit={handleSubmit(translateToMoai)}
        className={styles.formElement}
      >
        <textarea
          className={styles.textarea}
          id="textJp"
          {...register("textJp")}
          placeholder="こんにちは"
        />
        <p className={styles.hiragana}>{hiragana}</p>
        {/* <span className={styles.error}>{formState.errors.textJp?.message}</span> */}
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
      <form
        id="translateToJp"
        onSubmit={handleSubmit(translateToJp, translateInvalidToJp)}
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
            setValue("textMoai", e.currentTarget.value);
            handleChangeMoaiLang(e.currentTarget.value);
          }}
          placeholder="モーアモーｨモァィモァイモアー"
        />
        <span className={styles.validationError}>
          {formState.errors.textMoai?.message?.split("*").map((text, index) => {
            return index % 2 === 0 ? (
              <React.Fragment key={index}>{text}</React.Fragment>
            ) : (
              <span key={index} className={styles.error}>
                {text}
              </span>
            );
          })}
        </span>
      </form>
    </div>
  );
};

export default Presenter;
