import { Alert } from "@/components/common/Alert";
import Button from "@/components/common/Button";
import { useConfirmDialog } from "@/components/common/ConfirmationDialog";
import { useToast } from "@/components/common/Toast";

const alertVariant: ["danger", "success", "info"] = ["danger", "success", "info"];
const PlaygroundPage = () => {
  const { confirm } = useConfirmDialog();
  const {toast} = useToast();
  const showToast = () => {
    toast("HOLAA", "success");
  };

  const showConfirm = async () => {
    await confirm({
      title: "CONFIRMAR",
      message: "ESTA ES UNA DESCRIPCION",
      confirmText: "aceptar",
      cancelText: "cancelar",
      onConfirm: async () => alert(),
    });
  };
  return (
    <div className="flex flex-wrap gap-5">
      {alertVariant.map((v) => (
        <Alert status={v} title="Something went wrong" />
      ))}

      <Button onClick={showToast}>show toast</Button>

      <Button onClick={showConfirm}>show confirm</Button>
    </div>
  );
};

export default PlaygroundPage;
