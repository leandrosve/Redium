import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ConfirmationDialogProvider, useConfirmDialog } from "../../src/components/common/ConfirmationDialog";
import { useState } from "react";

const confirmData = {
  title: "Este es un titulo",
  message: "Este es un mensaje",
  confirmText: "Este es un texto de confirmacion",
  cancelText: "Este es un texto de cancelacion",
};

type ResultType = {
  result: boolean;
  otherProp: string;
};
const confirmResult: ResultType = {
  result: true,
  otherProp: "Esta es otra propiedad",
};

const TestComponent = ({ onConfirm }: { onConfirm: () => Promise<ResultType> }) => {
  const { confirm } = useConfirmDialog();
  const [result, setResult] = useState<ResultType | null>(null);
  const onClick = async () => {
    const res = await confirm<ResultType>({
      ...confirmData,
      onConfirm: onConfirm,
    });
    setResult(res);
  };
  return (
    <>
      <button onClick={onClick} id="test-button">
        Abrir Confirmación
      </button>
      {result && <p data-testid="result">{JSON.stringify(result)}</p>}
    </>
  );
};

const TestWrapper = ({ onConfirm }: { onConfirm: () => Promise<ResultType> }) => (
  <ConfirmationDialogProvider>
    <TestComponent onConfirm={onConfirm} />
  </ConfirmationDialogProvider>
);

describe("ConfirmationDialog", () => {
  it("debe abrirse al clickear el botón y mostrar texto y botones", async () => {
    const onConfirmMock = vi.fn().mockResolvedValue(confirmResult);

    render(<TestWrapper onConfirm={onConfirmMock} />);

    // No debe mostrarse hasta clickear el boton
    expect(screen.queryByText(confirmData.title)).not.toBeInTheDocument();
    expect(screen.queryByText(confirmData.message)).not.toBeInTheDocument();

    // Click para abrir el diálogo
    fireEvent.click(screen.getByText("Abrir Confirmación"));

    // Esperar que aparezcan los elementos del diálogo
    await waitFor(() => {
      expect(screen.getByText(confirmData.title)).toBeDefined();
      expect(screen.getByText(confirmData.message)).toBeDefined();
      expect(screen.getByRole("button", { name: confirmData.confirmText })).toBeDefined();
      expect(screen.getByRole("button", { name: confirmData.cancelText })).toBeDefined();
    });

    // Verificar que aun no se llamo al confirm function
    expect(onConfirmMock).toHaveBeenCalledTimes(0);

    // Click en confirmar
    fireEvent.click(screen.getByText(confirmData.confirmText));

    // Verificar que aun no se llamo la funcion
    expect(onConfirmMock).toHaveBeenCalledTimes(1);

    const resultElement = await screen.findByTestId("result");
    expect(resultElement).toHaveTextContent(JSON.stringify(confirmResult));
  });

  it("debe abrirse al clickear el botón y cerrarse al cancelar, sin llamar a la funcion de confirmacion", async () => {
    const onConfirmMock = vi.fn().mockResolvedValue(confirmResult);

    render(<TestWrapper onConfirm={onConfirmMock} />);

    // No debe mostrarse hasta clickear el boton
    expect(screen.queryByText(confirmData.title)).not.toBeInTheDocument();
    expect(screen.queryByText(confirmData.message)).not.toBeInTheDocument();

    // Click para abrir el diálogo
    fireEvent.click(screen.getByText("Abrir Confirmación"));

    // Esperar que aparezcan los elementos del diálogo
    await waitFor(() => {
      expect(screen.getByText(confirmData.title)).toBeDefined();
      expect(screen.getByText(confirmData.message)).toBeDefined();
      expect(screen.getByRole("button", { name: confirmData.confirmText })).toBeDefined();
      expect(screen.getByRole("button", { name: confirmData.cancelText })).toBeDefined();
    });

    // Click en confirmar
    fireEvent.click(screen.getByText(confirmData.cancelText));

    // Verificar que aun no se llamo la funcion
    expect(onConfirmMock).toHaveBeenCalledTimes(0);

    expect(screen.queryByTestId("result")).toBeNull();

    await waitFor(() => {
      expect(screen.queryByText(confirmData.title)).toBeNull();
      expect(screen.queryByText(confirmData.message)).toBeNull();
      expect(screen.queryByRole("button", { name: confirmData.confirmText })).toBeNull();
      expect(screen.queryByRole("button", { name: confirmData.cancelText })).toBeNull();
    });
    
  });
});
