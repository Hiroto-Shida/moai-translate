import { MOAI_LANG } from "@/constants/moaiLang";

const translateMoaiToHira = async (moai: string): Promise<string> => {
  const pattern = Object.values(MOAI_LANG).reverse().join("|");
  const regexp = new RegExp(pattern, "g");
  return moai.replace(regexp, (char) => {
    const matchedEntries = Object.entries(MOAI_LANG).find(
      // matchedEntries[0]でkeyを使用しているため、buildエラー対策
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([key, value]) => value === char
    );
    return matchedEntries ? matchedEntries[0] : char;
  });
};

export default translateMoaiToHira;
