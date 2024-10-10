import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { MOAI_GO } from "../../tools/moaiLanguage";
import Presenter from "./Presenter";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as schemas from "../../validations/schemas";
import { useState } from "react";

export type FormType = {
  textJp?: string;
  textMoai?: string;
};

const schema = yup.object({
  textJp: yup.string(),
  textMoai: schemas.moaiLang,
});

const Home = () => {
  const methods = useForm<FormType>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      textJp: "",
      textMoai: "",
    },
  });

  const { setValue, getValues } = methods;

  // 日本語をモアイ語に変換する
  const translateToMoai: SubmitHandler<FormType> = (data) => {
    if (!data.textJp) return;

    const textMoai = data.textJp
      .split("")
      .map((char) => MOAI_GO[char])
      .join("");
    const textMoaiElement = document.getElementById(
      "textMoai"
    ) as HTMLTextAreaElement;
    if (textMoaiElement) textMoaiElement.value = textMoai;
    handleChangeMoaiLang(textMoai);
  };

  // バリデーションエラーがある時の処理
  const translateInvalidToJp: SubmitErrorHandler<FormType> = () => {
    const value = getValues("textMoai");
    translateToJp({ textMoai: value });
  };

  // モアイ語を日本語に変換する
  const translateToJp: SubmitHandler<FormType> = (data) => {
    if (!data.textMoai) return;

    const pattern = Object.values(MOAI_GO).reverse().join("|");
    const regexp = new RegExp(pattern, "g");
    const textJp = data.textMoai.replace(regexp, (char) => {
      const matchedEntries = Object.entries(MOAI_GO).find(
        // matchedEntries[0]でkeyを使用しているため、buildエラー対策
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([key, value]) => value === char
      );
      return matchedEntries ? matchedEntries[0] : char;
    });

    setValue("textJp", textJp);
  };

  const [notMoaiLangIndices, setNotMoaiLangIndices] = useState<number[]>([]);
  const [moaiLangText, setMoaiLangText] = useState<string>("");

  const handleChangeMoaiLang = (value: string) => {
    setMoaiLangText(value);

    const PATTERN = Object.values(MOAI_GO).reverse().join("|");
    const allMoaiLangRegExp = new RegExp(`^(${PATTERN}|\\s)*$`);
    const moaiLangRegExp = new RegExp(`${PATTERN}|\\s`, "g");
    let match;

    // マッチしない部分のインデックスを保存する配列
    const errorIndices: number[] = [];

    // 全体が正しいかどうかチェック
    if (!allMoaiLangRegExp.test(value)) {
      // 許可されているパターンをすべてサーチし、その範囲を除外
      let lastIndex = 0;
      while ((match = moaiLangRegExp.exec(value)) !== null) {
        if (match.index > lastIndex) {
          // マッチしない部分のインデックスを記録
          for (let i = lastIndex; i < match.index; i++) {
            errorIndices.push(i);
          }
        }
        lastIndex = match.index + match[0].length;
      }
      // 末尾(後半)のマッチしない部分をチェック
      if (lastIndex < value.length) {
        for (let i = lastIndex; i < value.length; i++) {
          errorIndices.push(i);
        }
      }
    }
    setNotMoaiLangIndices(errorIndices);
  };

  return (
    <FormProvider {...methods}>
      <Presenter
        translateToMoai={translateToMoai}
        translateToJp={translateToJp}
        translateInvalidToJp={translateInvalidToJp}
        moaiLangText={moaiLangText}
        notMoaiLangIndices={notMoaiLangIndices}
        handleChangeMoaiLang={handleChangeMoaiLang}
      />
    </FormProvider>
  );
};

export default Home;
