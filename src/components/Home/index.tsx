import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MOAI_LANG } from "../../tools/moaiLanguage";
import Presenter from "./Presenter";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { convertToHiragana } from "@/servers/convertToHiragana";
import { ALL_MOAI_LANG_REGEXP, MOAI_LANG_REGEXP } from "@/constants/regexp";

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

  // 日本語(ひらがな)をモアイ語に変換する
  const translateToMoai: SubmitHandler<FormType> = async (data) => {
    if (!data.textJp) return;

    const convertedText = await convertToHiragana(data.textJp);
    setHiragana(convertedText);

    const textMoai = convertedText
      .split("")
      .map((char) => MOAI_LANG[char] || char)
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

    const pattern = Object.values(MOAI_LANG).reverse().join("|");
    const regexp = new RegExp(pattern, "g");
    const textJp = data.textMoai.replace(regexp, (char) => {
      const matchedEntries = Object.entries(MOAI_LANG).find(
        // matchedEntries[0]でkeyを使用しているため、buildエラー対策
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([key, value]) => value === char
      );
      return matchedEntries ? matchedEntries[0] : char;
    });

    setValue("textJp", textJp);
  };

  const [dividedMoalLang, setDividedMoalLang] = useState<string[]>([]);
  const [isStartMoaiLang, setIsStartMoaiLang] = useState<boolean>(true);
  const [isValidationError, setIsValidationError] = useState<boolean>(false);

  const handleChangeMoaiLang = (value: string) => {
    setValue("textMoai", value);

    const tmpDividedMoalLang: string[] = [];
    let tmpIsStartMoaiLang = false;

    // 全体でモアイ語以外があるかチェック
    if (!ALL_MOAI_LANG_REGEXP.test(value)) {
      setIsValidationError(true);
      let match;
      let lastIndex = 0;
      while ((match = MOAI_LANG_REGEXP.exec(value)) !== null) {
        if (lastIndex !== match.index) {
          tmpDividedMoalLang.push(value.slice(lastIndex, match.index));
        }
        if (tmpDividedMoalLang.length > 0 && lastIndex === match.index) {
          tmpDividedMoalLang[tmpDividedMoalLang.length - 1] += match[0];
        } else {
          if (tmpDividedMoalLang.length === 0) tmpIsStartMoaiLang = true;
          tmpDividedMoalLang.push(match[0]);
        }
        lastIndex = MOAI_LANG_REGEXP.lastIndex;
      }
      // 末尾(後半)のマッチしない部分をチェック
      if (lastIndex < value.length) {
        tmpDividedMoalLang.push(value.slice(lastIndex));
      }
    } else {
      // 全体がモアイ語onlyの場合
      tmpDividedMoalLang.push(value);
      tmpIsStartMoaiLang = true;
      setIsValidationError(false);
    }
    setDividedMoalLang(tmpDividedMoalLang);
    setIsStartMoaiLang(tmpIsStartMoaiLang);
  };

  return (
    <FormProvider {...methods}>
      <Presenter
        translateToMoai={translateToMoai}
        translateToJp={translateToJp}
        hiragana={hiragana}
        dividedMoalLang={dividedMoalLang}
        isStartMoaiLang={isStartMoaiLang}
        isValidationError={isValidationError}
        handleChangeMoaiLang={handleChangeMoaiLang}
      />
    </FormProvider>
  );
};

export default Home;
