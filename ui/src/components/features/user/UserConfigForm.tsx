import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import UserAvatarSelector from "./UserAvatarSelector";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userFormSchema } from "@/validators/userFormSchema";
import type { User } from "@/types/models/User";
import Tooltip from "@/components/common/Tooltip";
import { useTranslation } from "react-i18next";
import HelperText from "@/components/common/HelperText";

interface Props {
  onSubmit: (user: User) => void;
  submitMessage?: string;
  initialData?: User | null;
}
const UserConfigForm = ({ onSubmit, submitMessage, initialData }: Props) => {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<User>({
    resolver: zodResolver(userFormSchema),
    mode: "all",
    defaultValues: { name: "", avatar: "", ...initialData },
  });

  const { t } = useTranslation();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-stretch"
    >
      <div className="mt-4">
        <label
          className="text-sm font-bold ml-3 mb-2 inline-block"
          htmlFor="name"
        >
          Nombre
        </label>
        <Input
          placeholder="Escribe tu nombre"
          id="name"
          variant="filled"
          {...register("name")}
        />
        {errors.name && (
          <HelperText
            type="error"
            message={t(`user.formErrors.${errors.name.message}`)}
          />
        )}
      </div>

      <div>
        <span className="text-sm font-bold mt-4 ml-3 mb-2 block">Avatar</span>
        <UserAvatarSelector
          value={watch("avatar")}
          onChange={(avatar) =>
            setValue("avatar", avatar, { shouldValidate: true })
          }
        />
      </div>

      <div className="ml-auto mt-4">
        <Tooltip
          content="Completa los campos necesarios"
          position="left"
          disabled={isValid}
        >
          <Button disabled={!isValid || isSubmitting} type="submit">
            {submitMessage}
          </Button>
        </Tooltip>
      </div>
    </form>
  );
};

export default UserConfigForm;
