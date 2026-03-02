export const getWeather = async (city: string): Promise<string> => {
  try {
    const res = await fetch(
      `https://wttr.in/${encodeURIComponent(city)}?format=%l+%t+%C`,
      { headers: { "User-Agent": "curl" } },
    );
    const text = await res.text();
    return text || `Could not fetch weather for ${city}`;
  } catch {
    return `Api broke 😢 No weather for you.`;
  }
};

export const getJoke = async (): Promise<string> => {
  try {
    const res = await fetch("https://v2.jokeapi.dev/joke/Programming");
    const data = await res.json();
    if (data.type === "single") {
      return data.joke ?? "No joke today.";
    }
    return `${data.setup}\n${data.delivery}`;
  } catch {
    return "Are yaar bad luck 😢 Try again later.";
  }
};

export const getQuote = async (): Promise<string> => {
  try {
    const res = await fetch("https://zenquotes.io/api/random");
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const arr = (await res.json()) as { q?: string; a?: string }[];
    const data = Array.isArray(arr) ? arr[0] : arr;
    if (data?.q && data?.a) {
      return `"${data.q}" — ${data.a}`;
    }
    throw new Error("Invalid response format");
  } catch {
    return "Bad luck 😢 Try again later.";
  }
};
