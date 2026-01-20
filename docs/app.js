const baseApiUrl = "https://azizbekaskarov.bsite.net/api/";

shortenBtn.addEventListener('click', async () => {
    const longUrl = longUrlInput.value.trim();

    if (!longUrl) {
        resultDiv.textContent = "Iltimos, URL kiriting!";
        return;
    }

    try {
        const response = await fetch(baseApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: longUrl })
        });

        if (!response.ok) {
            const errorText = await response.text();
            resultDiv.textContent = `Xatolik: ${errorText}`;
            return;
        }

        const data = await response.json(); // JSON format
        resultDiv.innerHTML = `
            Qisqartirilgan URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a><br/>
            <img src="data:image/png;base64,${data.qrImage}" alt="QR code"/>
        `;
    } catch (error) {
        resultDiv.textContent = "API bilan bog‘lanishda xatolik yuz berdi.";
        console.error(error);
    }
});
