document.getElementById('convertButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    if (!inputText) {
        alert("Please enter some text.");
        return;
    }
    try {
        // Send the input text to the Lambda API via the API Gateway URL
        const response = await fetch('https://lhod2395s0.execute-api.region.amazonaws.com/dev/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText })
        });
        if (response.ok) {
            const data = await response.json();
            const audioUrl = data.audioUrl; // The URL for the generated audio file
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = audioUrl;
            audioPlayer.play();
        } else {
            alert("Failed to generate speech.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("There was an error with the request.");
    }
});
