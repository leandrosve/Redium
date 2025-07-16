import { z } from "zod";

/** Esquema de validacion del formulario de posts */
export const postFormSchema = z.object({
  title: z
    .string()
    .nonempty("name_required")
    .min(3, "min_3_characters")
    .max(200, "max_200_characters"),
  content: z
    .string()
    .nonempty("name_required")
    .min(3, "min_3_characters")
    .max(200, "max_200_characters"),
});
