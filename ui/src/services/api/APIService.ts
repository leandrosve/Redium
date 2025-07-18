import type { APIResponse } from "@/types/APIResponse";

interface Options {
  delay?: number;
}
export default abstract class ApiService {
  protected static BASE_URL = `https://665de6d7e88051d60408c32d.mockapi.io`;

  protected static PATH: string;

  // Para testing
  protected static sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }

  // Metodo generico
  private static async doFetch<T>(
    method: string,
    path: string,
    params?: string,
    body?: any,
    options?: Options
  ): Promise<APIResponse<T>> {
    if (options?.delay) await this.sleep(options.delay);

    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");

    let url = `${this.BASE_URL}${this.PATH || ""}${path || ""}`;

    if (params) {
      url = url + "?" + params;
    }

    try {
      let req: { method: string; headers: Headers; body?: string } = {
        method: method,
        headers: headers,
      };

      if (body) {
        const jsonBody = body ? JSON.stringify(body) : undefined;
        req.body = jsonBody;
      }

      const res = await fetch(url, req);

      if (!res.ok) {
        const textBody = await res.text();
        let error = "api_error";
        if (textBody == '"Not found"') error = "not_found";
        return {
          hasError: true,
          ok:false,
          error: error,
        };
      }
      const responseBody = await res.json();
      return {
        data: responseBody as T,
        hasError: false,
        ok:true,
      };
    } catch (err) {
      console.log(err);
      return { hasError: true, error: "unknown_error", ok:false };
    }
  }

  protected static get<T>(path: string, params?: string, options?: Options) {
    return this.doFetch<T>("GET", path, params, null, options);
  }

  protected static post<T>(path: string, body?: any, options?: Options) {
    return this.doFetch<T>("POST", path, undefined, body, options);
  }

  protected static put<T>(path: string, body?: any, options?: Options) {
    return this.doFetch<T>("PUT", path, undefined, body, options);
  }

  /* Le llamo del solamente para que no colisione con los metodos de quien extiende*/
  protected static del<T>(path: string, options?: Options) {
    return this.doFetch<T>("DELETE", path, undefined, null, options);
  }
}
