import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Tooltip from "@/components/common/Tooltip";
import { postFormSchema } from "@/validators/postFormSchema";
import type { PostContent } from "@/types/models/Post";
import Field from "@/components/common/Field";
import Textarea from "@/components/common/Textarea";
import { useLocalizedError } from "@/hooks/useLocalizedError";
import Avatar from "@/components/common/Avatar";
import type { User } from "@/types/models/User";
import { CheckCircle } from "lucide-react";
import { useCallback, useState } from "react";
import PostService from "@/services/PostService";

interface Props {
  onSuccess: () => void;
  initialData?: PostContent | null;
  user: User;
}

const PostForm = ({ onSuccess, initialData, user }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<PostContent>({
    resolver: zodResolver(postFormSchema),
    mode: "all",
    defaultValues: { title: "", content: "", ...initialData },
  });

  const { getErrorMessage } = useLocalizedError("post.errors");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const submit = useCallback(
    async (post: PostContent) => {
      const res = await PostService.create(post, user);
      if (res.hasError) {
        setError(res.error);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        alert();
      }, 2000);
    },
    [user]
  );
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-stretch"
    >
      {success && <SuccessOverlay />}

      <div className="flex gap-2 items-center">
        <Avatar name={user.name} src={user.avatar} size="sm" /> {user.name}
      </div>
      <Field
        id="title"
        label="Título"
        error={getErrorMessage(errors.title?.message, dirtyFields.title)}
      >
        <Input
          id="title"
          variant="filled"
          placeholder="Escribe tu título"
          {...register("title")}
        />
      </Field>
      <Field
        id="content"
        label="Contenido"
        error={getErrorMessage(errors.content?.message, dirtyFields.content)}
      >
        <Textarea
          id="content"
          variant="filled"
          placeholder={`What's on your mind, ${user.name.split(" ")[0]}?`}
          className="h-[15em]"
          maxLength={500}
          {...register("content", { maxLength: 500 })}
        />
      </Field>

      <div className="ml-auto mt-4">
        <Tooltip
          content="Completa los campos necesarios"
          position="left"
          disabled={isValid || isSubmitting}
        >
          <Button disabled={!isValid || isSubmitting} type="submit" loading={isSubmitting}>
            Publicar
          </Button>
        </Tooltip>
      </div>
    </form>
  );
};

const SuccessOverlay = () => (
  <div className="absolute h-full w-full text-primary-600 bg-black/20 top-0 left-0 flex items-center justify-center flex-col text-2xl font-bold post-success-overlay z-10">
    <div className="flex flex-col items-center post-success-overlay-content">
      <CheckCircle className="h-20 w-20 " />
      ¡Publicado!
    </div>
  </div>
);
export default PostForm;
