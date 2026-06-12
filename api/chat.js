export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    const { message } = req.body;

    const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SAMBANOVA_API_KEY}`
      },
      body: JSON.stringify({
        model: "Meta-Llama-3.1-8B-Instruct",
        messages: [
          {
            role: "system",
            content: "You are Ambivora AI, an expert digital marketing assistant. Help with SEO, Meta Ads, content creation, branding, AI tools and social media marketing. Reply in simple Hindi-English."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No response received."
    });

  } catch (error) {
    return res.status(500).json({
      reply: "Server error. Check SambaNova API key."
    });
  }
}
