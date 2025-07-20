import Textarea from "@/components/common/Textarea";
import { useMemo, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import Avatar from "@/components/common/Avatar";
import { MessageCircle } from "lucide-react";
import Button from "@/components/common/Button";
import type { Comment } from "@/types/models/Comment";
import { useUserContext } from "@/context/UserContext";

interface Props {
  mode?: "create" | "edit";
  comment: Comment | null; // Para la edicion
  parentId?: string | null;
  postId: string;
  autoFocus?: boolean;
  inputId?: string;
  onCancel?: () => void;
  isSubmiting?: boolean;
  onSubmit: (content: string) => Promise<boolean>;
}

const CommentFormContent = ({
  parentId,
  autoFocus,
  inputId,
  onCancel,
  isSubmiting,
  comment,
  onSubmit,
  mode = "create",
}: Props) => {
  const { t } = useTranslation();
  const { user } = useUserContext();

  const [value, setValue] = useState(comment?.content ?? "");
  const sanitizedContent = useMemo(() => value.trim(), [value]);

  const disabled = !user;
  const showSubmit = mode == "edit" || (!disabled && (!!sanitizedContent || parentId)); // Para las replies siempre muestro los botones

  const handleCancel = () => {
    setValue("");
    onCancel?.();
  };

  let icon = null;
  if (mode === "create") {
    icon = user ? <Avatar name={user.name} src={user.avatar} size="sm" className="mr-3" /> : <MessageCircle />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ok = await onSubmit(sanitizedContent);
    if (ok) {
      setValue("");
      onCancel?.();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        disabled={!user}
        id={inputId}
        placeholder={t(
          mode == "edit" ? "comments.editPlaceholder" : parentId ? "comments.replyPlaceholder" : "comments.placeholder"
        )}
        innerClassName={`h-auto pr-12 ${mode == "edit" ? "text-sm" : "text-md"}`}
        className="dark:bg-transparent bg-content-100"
        maxLength={500}
        value={value}
        autoFocus={autoFocus}
        displayCharCount={!parentId}
        onChange={(e) => setValue(e.target.value)}
        icon={icon}
      />
      {showSubmit && (
        <div className="flex align-center justify-end mt-2 gap-2 animate-scale-in duration-200">
          <Button size="sm" variant="ghost" onClick={handleCancel} type="reset">
            {t("common.cancel")}
          </Button>

          <Button
            size="sm"
            variant="solid"
            color="secondary"
            type="submit"
            loading={isSubmiting}
            disabled={!sanitizedContent}
          >
            {t(parentId ? "comments.reply" : "comments.comment")}
          </Button>
        </div>
      )}
    </form>
  );
};

export default CommentFormContent;
