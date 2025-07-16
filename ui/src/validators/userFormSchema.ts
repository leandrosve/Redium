import { z } from "zod";

/** Esquema de validacion del formulario de configuracion del usuario */
export const userFormSchema = z.object({
  name: z
    .string()
    .nonempty("name_required")
    .min(3, "min_3_characters")
    .max(50, "max_50_characters"),

  avatar: z.string().nonempty("avatar_required"),
});
