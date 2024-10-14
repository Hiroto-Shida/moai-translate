import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormType } from ".";
import styles from "./index.module.scss";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import React from "react";
import TranslateButton from "../TranslateButton";
import { LanguagesContext } from "../layout/Layout";

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
  const language = useContext(LanguagesContext);

  const { register, watch, handleSubmit, formState, setValue } =
    useFormContext<FormType>();

  const textMoaiRef = useRef<HTMLTextAreaElement | null>(null);
  const displayAreaRef = useRef<HTMLDivElement | null>(null);

  // TODO: その他の無駄な再レンダリングをなくす
  const [jpCount, setJpCount] = useState<number>(0);
  const [moaiCount, setMoaiCount] = useState<number>(0);

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

  const [watchJp, watchMoai] = watch(["textJp", "textMoai"]);
  useEffect(() => {
    if (watchJp !== undefined) setJpCount(watchJp.length);
    if (watchMoai !== undefined) setMoaiCount(watchMoai.length);
  }, [watchJp, watchMoai]);

  return (
    <div className={styles.bodyWrapper}>
      <form
        id="translateToMoai"
        onSubmit={handleSubmit(translateJpToMoai)}
        className={styles.formElement}
      >
        <textarea
          className={clsx(styles.textarea, {
            [styles.Error]: formState.errors.textJp,
          })}
          id="textJp"
          {...register("textJp")}
          placeholder="こんにちは"
        />
        <div className={styles.counter}>
          <span
            className={clsx({
              [styles.error]: formState.errors.textJp,
            })}
          >
            {jpCount}
          </span>
          /1000
        </div>
      </form>
      <p className={styles.hiragana}>{hiragana}</p>
      <div className={styles.buttonsWrapper}>
        <TranslateButton
          form="translateToMoai"
          disabled={formState.isSubmitting || !!formState.errors.textJp}
          onClick={() => setValue("textMoai", "")}
          direction="down"
          text={
            language === "ja"
              ? "モアイ語に翻訳"
              : `モォィモアモァモォア"モァｧ\nモォイモォォモアｲモイア`
          }
        />
        <TranslateButton
          form="translateToJp"
          disabled={formState.isSubmitting || !!formState.errors.textMoai}
          onClick={() => setValue("textJp", "")}
          direction="up"
          text={
            language === "ja"
              ? "日本語に翻訳"
              : `モァｧモォイモォォモォア"モァｧ\nモォイモォォモアｲモイア`
          }
        />
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
          className={clsx(styles.textarea, {
            [styles.Error]: formState.errors.textMoai,
          })}
          id="textMoai"
          {...register("textMoai")}
          ref={textMoaiRef}
          onInput={(e) => {
            handleChangeMoaiLang(e.currentTarget.value);
          }}
          placeholder="モォアモォォモァｧモァｱモアイ"
        />
        <div className={styles.counter}>
          <span
            className={clsx({
              [styles.error]: formState.errors.textMoai,
            })}
          >
            {moaiCount}
          </span>
          /2000
        </div>
      </form>
      <div className={styles.validationError}>
        {isValidationError && (
          <>
            ※
            <span className={styles.emphasis}>
              {language === "ja"
                ? "モアイ語以外"
                : `モォィモアモァモォア"モァモアア"モァ`}
            </span>
            {language === "ja"
              ? "は翻訳されず、そのまま反映されます"
              : `モアイ モォイモォォモアｲモイアモアァモィｨモイァ"、 モォァモォｧモアィモアィ モアイモォォモィモァモアァモィｨモアィモイァ`}
          </>
        )}
      </div>
    </div>
  );
};

export default Presenter;
