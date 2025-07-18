import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Tooltip from "@/components/common/Tooltip";
import { postFormSchema } from "@/validators/postFormSchema";
import type { Post, PostContent } from "@/types/models/Post";
import Field from "@/components/common/Field";
import Textarea from "@/components/common/Textarea";
import type { User } from "@/types/models/User";
import { CheckCircle, Dot } from "lucide-react";
import { useCallback, useState } from "react";
import PostService from "@/services/api/PostService";
import { Alert } from "@/components/common/Alert";
import { useLocalized } from "@/hooks/useLocalized";
import { useOwnershipContext } from "@/context/OwnershipContext";
import DateDisplay from "@/components/common/DateDisplay";
import type { APIResponse } from "@/types/APIResponse";

interface Props {
  onSuccess: (post: Post) => void;
  post?: Post | null;
  user: User;
}

const PostForm = ({ onSuccess, post, user }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PostContent>({
    resolver: zodResolver(postFormSchema),
    mode: "all",
    defaultValues: {
      title: post?.title ?? "",
      content: post?.content ?? "",
    },
  });

  const { translate } = useLocalized();
  const { markPostAsOwned } = useOwnershipContext();

  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<boolean>(false);
  const submit = useCallback(
    async (postContent: PostContent) => {
      setError(null);
      let res: APIResponse<Post>;
      if (post) {
        res = await PostService.update(post.id, postContent, user);
      } else {
        res = await PostService.create(postContent, user);
      }
      if (res.hasError) {
        setError(res.error);
        return;
      }
      markPostAsOwned(res.data.id);
      setSuccess(true);
      setTimeout(() => {
        onSuccess(res.data);
      }, 1000);
    },
    [user, post]
  );

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-stretch gap-2"
    >
      {success && (
        <SuccessOverlay message={translate(post ? "posts.create.saved" : "posts.create.published")} />
      )}
      <h2 className="text-lg font-semibold text-foreground-100">
        {translate(!!post ? "posts.updatePost" : "posts.createPost")}
      </h2>
      {error && (
        <Alert
          title={translate(error, {
            defaultKey: "common.error",
            defaultValue: "",
          })}
          status="info"
        />
      )}

      <Field
        id="title"
        label={translate("posts.create.title")}
        error={translate(errors.title?.message, { prefix: "validationErrors" })}
      >
        <Input
          id="title"
          variant="filled"
          placeholder={translate("posts.create.titlePlaceholder")}
          {...register("title")}
        />
      </Field>
      <Field
        id="content"
        label={translate("posts.create.content")}
        error={translate(errors.content?.message, {
          prefix: "validationErrors",
        })}
      >
        <Textarea
          id="content"
          variant="filled"
          placeholder={translate("posts.create.contentPlaceholder")}
          className="h-[15em]"
          maxLength={500}
          {...register("content", { maxLength: 500 })}
        />
      </Field>

      {!!post && (
        <div className="flex rounded-full text-sm font-bold">
          <Dot/> Created at:
          <DateDisplay date={post.createdAt} format="date" className="ml-2 font-medium"/>
        </div>
      )}

      <div className="ml-auto mt-4">
        <Tooltip
          content={translate("validationErrors.complete_required_fields")}
          position="left"
          disabled={isValid || isSubmitting}
        >
          <Button
            disabled={!isValid || isSubmitting}
            type="submit"
            loading={isSubmitting}
          >
            {translate(!!post ? "common.save" : "posts.create.publish")}
          </Button>
        </Tooltip>
      </div>
    </form>
  );
};

const SuccessOverlay = ({ message }: { message: string }) => (
  <div className="absolute h-full w-full text-primary-600 bg-black/20 top-0 left-0 flex items-center justify-center flex-col text-2xl font-bold post-success-overlay z-10">
    <div className="flex flex-col items-center post-success-overlay-content">
      <CheckCircle className="h-20 w-20 " />
      {message}
    </div>
  </div>
);
export default PostForm;
