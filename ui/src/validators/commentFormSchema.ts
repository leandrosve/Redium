import { z } from "zod";

/** Esquema de validacion del formulario de configuracion del usuario */
export const commentFormSchema = z.object({
  comment: z
    .string()
    .nonempty("required")
    .max(50, "max_500_characters"),
});
