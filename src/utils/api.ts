export const fetchCurrencies = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch currencies:", error);
    throw error;
  }
};

export const convertCurrency = async (url: string, body: object) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    console.error("Conversion failed:", error);
    throw error;
  }
};
