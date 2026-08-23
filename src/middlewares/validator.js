import z, { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "Invalid input data." });
  }

  try {
    schema.parse(req.body);

    next();
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      const formattedError = z.flattenError(error);

      return res.status(400).json(formattedError);
    }

    res.status(400).json({ message: error.message });
  }
};

export default validate;
