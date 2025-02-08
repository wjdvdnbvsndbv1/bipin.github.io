document.getElementById('askButton').addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value;
  const responseArea = document.getElementById('responseArea');

  if (!userInput.trim()) { // ✅ Trim whitespace
    responseArea.textContent = "Please enter a question!";
    return;
  }

  responseArea.textContent = "Thinking..."; // ✅ Show loading message

  try {
    const response = await fetch('http://localhost:5000/chat', { // ✅ Fixed route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput }), // ✅ Updated key name
    });

    const data = await response.json();
    
    if (data.reply) {
      responseArea.textContent = data.reply;
    } else {
      responseArea.textContent = "No response received. Try again!";
    }
  } catch (error) {
    console.error("Error:", error);
    responseArea.textContent = "Error fetching response. Please try again.";
  }
});
