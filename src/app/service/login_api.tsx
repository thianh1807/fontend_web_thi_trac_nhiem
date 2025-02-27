
export const requestLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Failed to parse response data");
  }
};


