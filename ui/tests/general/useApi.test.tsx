import { act, renderHook, waitFor } from "@testing-library/react";
import useAPI from "../../src/hooks/useAPI";
import { describe, expect, it, vi } from "vitest";
import { APIResponse } from "../../src/types/APIResponse";

interface ExampleType {
  name: string;
  id: number;
}

const mockData = { id: 1, name: "Test" };
const mockAPIResponse: APIResponse<ExampleType> = {
  data: mockData,
  hasError: false,
  ok: true,
};

describe("Comportamiento del hook useAPI", () => {
  it("debería cargar los datos correctamente", async () => {
    const fetchFunction = vi.fn().mockResolvedValue(mockAPIResponse);

    const { result } = renderHook(() => useAPI<ExampleType | null>({ fetchFunction, initialData: null }));

    expect(result.current.loading).toBe(true);
    expect(result.current.entity).toBe(null);

    // Esperar a que loading sea false
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verificamos que los datos se hayan cargado
    expect(result.current.entity).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("debería capturar el error", async () => {
    const fetchFailFunction = vi.fn().mockResolvedValue({ data: null, error: "api_error", hasError: true, ok: false });

    const { result } = renderHook(() =>
      useAPI<ExampleType | null>({ fetchFunction: fetchFailFunction, initialData: null, initialFetch: true })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.entity).toBe(null);

    // Esperar a que loading sea false
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verificamos que los datos se hayan cargado
    expect(result.current.entity).toEqual(null);
    expect(result.current.error).toEqual("api_error");
  });

  it("Con initialFetch = false no deberia hacer el fetch hasta que se llame a la funcion", async () => {
    const fetchFunction = vi.fn().mockResolvedValue(mockAPIResponse);

    const { result } = renderHook(() =>
      useAPI<ExampleType | null>({ fetchFunction: fetchFunction, initialData: null, initialFetch: false })
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.entity).toBe(null);

    await waitFor(() => {
      expect(fetchFunction).not.toHaveBeenCalled();
    });

    act(() => {
      result.current.fetchEntity();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.entity).toEqual(mockData);
  });
});
