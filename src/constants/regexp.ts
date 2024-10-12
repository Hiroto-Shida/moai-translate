import { MOAI_LANG } from "./moaiLang";

const PATTERN = Object.values(MOAI_LANG).reverse().join("|");

// モアイ語"のみ"かどうかを判定する正規表現
export const ALL_MOAI_LANG_REGEXP = new RegExp(`^(${PATTERN}|\\s)*$`);

// モアイ語かを判定する正規表現
export const MOAI_LANG_REGEXP = new RegExp(`${PATTERN}|\\s`, "g");
