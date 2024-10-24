import { MOAI_LANG } from "@/constants/moaiLang";

const translateHiraToMoai = async (hira: string): Promise<string> => {
  return hira
    .split("")
    .map((char) => MOAI_LANG[char] || char)
    .join("");
};

export default translateHiraToMoai;
