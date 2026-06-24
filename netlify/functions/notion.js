exports.handler = async (event) => {
  const NOTION_TOKEN = "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";
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

  try {
    const { method, path, body } = JSON.parse(event.body);
    const res = await fetch(`https://api.notion.com/v1/${path}`, {
      method: method || "GET",
      headers: {
        "Authorization": "Bearer " + NOTION_TOKEN,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
      },
      body: body ? JSON.stringify(body) : undefined
    });
    const data = await res.json();
    return { statusCode: res.status, headers, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
