import * as z from "zod";

const productSchema = z.object({
  name: z
    .string({ error: "Product name is required." })
    .trim()
    .check(z.minLength(3, { error: "Name too small." }), z.maxLength(50)),
  brand: z.string().trim().optional(),
  category: z.string({ error: "Category is required." }).trim(),
  price: z
    .number({
      error: (data) =>
        data.input ? "Price must be number." : "Price is required.",
    })
    .min(1, { error: "Price must be greater than 0." })
    .max(9999999),
  stock: z
    .number()
    .min(1, { error: "Stock must be greater than 0." })
    .optional(),
  description: z.string().trim().optional(),
  imageUrls: z.array(z.string().trim()).optional(),
});

export { productSchema };
