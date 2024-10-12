import { MOAI_LANG } from "./moaiLang";

const MOAI = Object.values(MOAI_LANG).reverse().join("|");

const OTHER = "ー、。".split("").join("|");

// モアイ語"のみ"かどうかを判定する正規表現
export const ALL_MOAI_LANG_REGEXP = new RegExp(`^(${MOAI}|${OTHER}|\\s)*$`);

// モアイ語かを判定する正規表現
export const MOAI_LANG_REGEXP = new RegExp(`${MOAI}|${OTHER}|\\s`, "g");
