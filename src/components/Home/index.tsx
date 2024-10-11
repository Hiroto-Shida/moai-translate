import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MOAI_GO } from "../../tools/moaiLanguage";
import Presenter from "./Presenter";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { convertToHiragana } from "@/servers/convertToHiragana";

export type FormType = {
  textJp?: string;
  textMoai?: string;
};

const schema = yup.object({
  textJp: yup.string(),
  textMoai: yup.string(),
});

const Home: React.FC = () => {
  const methods = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      textJp: "",
      textMoai: "",
    },
  });

  const { setValue } = methods;

  const [hiragana, setHiragana] = useState<string>("");

  // 日本語をモアイ語に変換する
  const translateToMoai: SubmitHandler<FormType> = async (data) => {
    if (!data.textJp) return;

    const convertedText = await convertToHiragana(data.textJp);
    setHiragana(convertedText);

    const textMoai = convertedText
      .split("")
      .map((char) => MOAI_GO[char] || char)
      .join("");
    const textMoaiElement = document.getElementById(
      "textMoai"
    ) as HTMLTextAreaElement;
    if (textMoaiElement) textMoaiElement.value = textMoai;
    handleChangeMoaiLang(textMoai);
  };

  // モアイ語を日本語に変換する
  const translateToJp: SubmitHandler<FormType> = (data) => {
    setHiragana("");
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
    setValue("textMoai", value);
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
        hiragana={hiragana}
        moaiLangText={moaiLangText}
        notMoaiLangIndices={notMoaiLangIndices}
        handleChangeMoaiLang={handleChangeMoaiLang}
      />
    </FormProvider>
  );
};

export default Home;
