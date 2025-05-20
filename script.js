const API_KEY = 'AIzaSyBNsb7af_rjcnNH5LFOExMxR5Ucp0gLGYg'; // Replace with your actual Gemini API key

async function explainDoubt() {
  const input = document.getElementById("userInput").value;
  const responseBox = document.getElementById("responseBox");

  if (!input.trim()) {
    responseBox.innerText = "Please enter a question first.";
    return;
  }

  responseBox.innerText = "Thinking... 🤔";

  const prompt = `Explain this programming question in simple Hindi and English:\n\n${input}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  const data = await response.json();

  try {
    const explanation = data.candidates[0].content.parts[0].text;
    responseBox.innerText = explanation;
  } catch (error) {
    responseBox.innerText = "Sorry, couldn't get an explanation. Try again.";
  }
}

