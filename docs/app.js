const shortenBtn = document.getElementById('shortenBtn');
const longUrlInput = document.getElementById('longUrl');
const resultDiv = document.getElementById('result');
const loadingDiv = document.getElementById('loading');

// API URL (sizning bsite.net API)
const baseApiUrl = "https://azizbekaskarov.bsite.net/api/";

shortenBtn.addEventListener('click', async () => {
    const longUrl = longUrlInput.value.trim();
    resultDiv.innerHTML = '';
    if (!longUrl) {
        resultDiv.textContent = "Iltimos, URL kiriting!";
        return;
    }

    loadingDiv.classList.remove('hidden'); // Loading ko‘rsatish

    try {
        const response = await fetch(baseApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: longUrl })
        });

        loadingDiv.classList.add('hidden'); // Loading o‘chirish

        if (!response.ok) {
            const errorText = await response.text();
            resultDiv.textContent = `Xatolik: ${errorText}`;
            return;
        }

        const data = await response.json();

        resultDiv.innerHTML = `
            <strong>Qisqartirilgan URL:</strong><br/>
            <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a><br/>
            <img src="data:image/png;base64,${data.qrImage}" alt="QR code"/>
        `;
    } catch (error) {
        loadingDiv.classList.add('hidden');
        resultDiv.textContent = "API bilan bog‘lanishda xatolik yuz berdi.";
        console.error(error);
    }
});
