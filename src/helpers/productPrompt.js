const formatProductPrompt = (data) => {
  return `
    Create a detailed product description for my ecommerce website.
    Follow these instructions:
    1. You will be provided with product's name, brand and category.
    2. The description should be in markdown format.
    3. Remove any unnessesary spacings.
    4. Ignore extra messages.

    Name: ${data.name}, Category: ${data.category}, Brand: ${data.brand}
  `;
};

export default formatProductPrompt;
