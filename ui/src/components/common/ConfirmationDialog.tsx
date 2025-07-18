import { createContext, useCallback, useContext, useState } from "react";
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

type ConfirmState = {
  isOpen: boolean;
  options: ConfirmOptions;
  resolve: (value: boolean) => void;
};

const ConfirmDialogContext = createContext<{
  confirm: (options: ConfirmOptions) => Promise<boolean>;
} | null>(null);

export const useConfirmDialog = () => {
  const ctx = useContext(ConfirmDialogContext);
  if (!ctx) throw new Error("useConfirmDialog must be used within a ConfirmationDialogProvider");
  return ctx;
};

export const ConfirmationDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ConfirmState>({
    isOpen: false,
    options: {},
    resolve: () => {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setState({ isOpen: true, options, resolve });
    });
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

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      {typeof window !== "undefined" &&
        createPortal(
          <Modal isOpen={state.isOpen} title={state.options.title} onClose={handleCancel}>
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
        )}
    </ConfirmDialogContext.Provider>
  );
};
