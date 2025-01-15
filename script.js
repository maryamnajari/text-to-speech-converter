document.getElementById('convert-btn').addEventListener('click', async () => {
    const text = document.getElementById('text-input').value;

    try {
        const response = await fetch(
            'https://<your-api-id>.execute-api.us-east-1.amazonaws.com/test/TextToSpeechConverter?text=' + encodeURIComponent(text)
        );

        if (!response.ok) {
            throw new Error('Error during the API request');
        }

        const data = await response.json();

        // Decode and play the audio
        const audioBase64 = data.audioBase64;
        const audioBlob = new Blob([Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0))], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const audioElement = new Audio(audioUrl);
        audioElement.play();
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred: ' + error.message);
    }
});
