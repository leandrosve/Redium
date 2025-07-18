import { z } from "zod";

/** Esquema de validacion del formulario de posts */
export const postFormSchema = z.object({
  title: z.string().trim().nonempty("title_required").min(3, "min_3_characters").max(200, "max_200_characters"),
  content: z.string().trim().nonempty("content_required").min(3, "min_3_characters").max(500, "max_500_characters"),
});
