document.getElementById('convertButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    if (!inputText) {
        alert("Please enter some text.");
        return;
    }

    try {
        // Encode the input text to ensure special characters are handled correctly
        const encodedText = encodeURIComponent(inputText);

        // Update the API URL to include the query string with the text
        const url = `https://lhod2395s0.execute-api.us-east-1.amazonaws.com/test/TextToSpeechConverter?text=${encodedText}`;

        // Send the GET request
        const response = await fetch(url, {
            method: 'GET', // Using GET since you're sending the text in the URL
        });

        if (response.ok) {
            const data = await response.json();

            // Decode base64 audio data
            const audioBase64 = data.body;
            const audioBuffer = Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0));

            // Create a Blob from the decoded audio buffer
            const audioBlob = new Blob([audioBuffer], { type: 'audio/mp3' });

            // Create an audio URL from the Blob
            const audioUrl = URL.createObjectURL(audioBlob);

            // Play the audio using the HTML audio element
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = audioUrl;
            audioPlayer.play();
        } else {
            console.error("Response not OK:", response.status, response.statusText);
            alert("Failed to generate speech. Please check the console for more details.");
        }
    } catch (error) {
        console.error("Error during the API request:", error);
        alert("There was an error with the request. Check the console for more information.");
    }
});
