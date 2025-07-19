import { createContext, useCallback, useContext, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import Button from "./Button";

type ConfirmOptions<T> = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColorScheme?: string;
  onConfirm?: () => Promise<T>;
};

type ConfirmState<T> = {
  isOpen: boolean;
  options: ConfirmOptions<T>;
  resolve: (value: T | null) => void;
};


const ConfirmDialogContext = createContext<{
  confirm: <T>(options: ConfirmOptions<T>) => Promise<T>;
} | null>(null);

export const useConfirmDialog = () => {
  const ctx = useContext(ConfirmDialogContext);
  if (!ctx) throw new Error("useConfirmDialog must be used within a ConfirmationDialogProvider");
  return ctx;
};

export const ConfirmationDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ConfirmState<any>>({
    isOpen: false,
    options: {},
    resolve: async () => {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const confirm = useCallback(<T,>(options: ConfirmOptions<T>) => {
    return new Promise<T>((resolve) => {
      setState({ isOpen: true, options, resolve });
    });
  }, []);

  const handleConfirm = async () => {
    setIsLoading(true);
     try {
      const result = state.options.onConfirm ? await state.options.onConfirm() : true;
      state.resolve(result);
    } catch (e) {
      console.error(e);
      state.resolve(null);
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
