import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import UserAvatarSelector from "./UserAvatarSelector";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userFormSchema } from "@/validators/userFormSchema";
import type { User } from "@/types/models/User";
import Tooltip from "@/components/common/Tooltip";
import HelperText from "@/components/common/HelperText";
import { useLocalized } from "@/hooks/useLocalized";

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

  const { translate: t } = useLocalized();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-stretch">
      <div className="mt-4">
        <label className="text-sm font-bold ml-3 mb-2 inline-block" htmlFor="name">
          {t("user.name")}
        </label>
        <Input placeholder={t("user.namePlaceholder")} id="name" variant="filled" {...register("name")} />
        {errors.name && <HelperText type="error" message={t(`validationErrors.${errors.name.message}`)} />}
      </div>

      <div>
        <span className="text-sm font-bold mt-4 ml-3 mb-2 block">{t("user.avatar")}</span>
        <UserAvatarSelector
          value={watch("avatar")}
          onChange={(avatar) => setValue("avatar", avatar, { shouldValidate: true })}
        />
      </div>

      <div className="ml-auto mt-4">
        <Tooltip content={t("validationErrors.complete_required_fields")} position="left" disabled={isValid}>
          <Button disabled={!isValid || isSubmitting} type="submit">
            {submitMessage}
          </Button>
        </Tooltip>
      </div>
    </form>
  );
};

export default UserConfigForm;
