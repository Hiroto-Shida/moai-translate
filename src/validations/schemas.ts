// /** @file スキーマの定義 */
// import { MOAI_GO } from "@/tools/moaiLanguage";
// import * as yup from "yup";

// const PATTERN = Object.values(MOAI_GO).reverse().join("|");
// const REGEXP = new RegExp(`^(${PATTERN}|\\s)*$`);

// export const moaiLang = yup
//   .string()
//   .test(
//     "moaiLang",
//     "※*モアイ語以外*は翻訳されず、そのまま反映されます",
//     (value) => {
//       return REGEXP.test(value ? value : "");
//     }
//   );
