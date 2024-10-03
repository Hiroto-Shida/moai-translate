import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MOAI_GO } from "../../tools/moaiLanguage";
import Presenter from "./Presenter";

export type FormType = {
  textJp: string;
  textMoai: string;
};

const Home = () => {
  const methods = useForm<FormType>({
    defaultValues: {
      textJp: "",
      textMoai: "",
    },
  });

  const { setValue } = methods;

  const translateToMoai: SubmitHandler<FormType> = (data) => {
    const textMoai = data.textJp
      .split("")
      .map((char) => MOAI_GO[char])
      .join("");
    setValue("textMoai", textMoai);
  };

  const translateToJp: SubmitHandler<FormType> = (data) => {
    const pattern = Object.values(MOAI_GO).reverse().join("|");
    const regexp = new RegExp(pattern, "g");
    const textJp = data.textMoai.replace(regexp, (matched) => {
      const a = Object.values(MOAI_GO).find((value) => value === matched);
      return a ? a[0] : matched;
    });

    setValue("textJp", textJp);
  };

  return (
    <FormProvider {...methods}>
      <Presenter
        translateToMoai={translateToMoai}
        translateToJp={translateToJp}
      />
    </FormProvider>
  );
};

export default Home;
