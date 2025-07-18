import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import Button from "./Button";

type ConfirmOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColorScheme?: string;
  onConfirm?: () => Promise<void>;
};

let setConfirmState: ((state: ConfirmState) => void) | null = null;

type ConfirmState = {
  isOpen: boolean;
  options: ConfirmOptions;
  resolve: (value: boolean) => void;
};

export const useConfirmDialog = () => {
  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState?.({
        isOpen: true,
        options,
        resolve,
      });
    });
  }, []);

  return { confirm };
};

export const ConfirmationDialogProvider = () => {
  const [state, setState] = useState<ConfirmState>({
    isOpen: false,
    options: {},
    resolve: () => {},
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setConfirmState = setState;
  }, []);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      if (state.options.onConfirm) {
        await state.options.onConfirm();
      }
      state.resolve(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setState((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const handleCancel = () => {
    if (isLoading) return;
    state.resolve(false);
    setIsLoading(false);
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <Modal
      isOpen={state.isOpen}
      title={state.options.title}
      onClose={() => handleCancel()}
    >
      <p>{state.options.message}</p>

      <div className="flex justify-between items-center mt-5">
        <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
          {state.options.cancelText}
        </Button>
        <Button variant="solid" color="secondary" onClick={handleConfirm} loading={isLoading}>
          {state.options.confirmText}
        </Button>
      </div>
    </Modal>,
    document.body
  );
};
