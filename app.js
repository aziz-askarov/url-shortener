const shortenBtn = document.getElementById('shortenBtn');
const longUrlInput = document.getElementById('longUrl');
const resultDiv = document.getElementById('result');

// API Base URL
const baseApiUrl = "https://azizbekaskarov.bsite.net/api/";

shortenBtn.addEventListener('click', async () => {
    const longUrl = longUrlInput.value.trim();

    if (!longUrl) {
        resultDiv.textContent = "Iltimos, URL kiriting!";
        return;
    }

    // Loading holatini ko'rsatish
    resultDiv.innerHTML = `<p>Ishlayapti... ⏳</p>`;

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

        const data = await response.json(); // { shortUrl, qrImage }

        resultDiv.innerHTML = `
            <p>Qisqartirilgan URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a></p>
            <p>QR Code:</p>
            <img src="data:image/png;base64,${data.qrImage}" alt="QR Code" style="width:200px;height:200px;" />
        `;

    } catch (error) {
        resultDiv.textContent = "API bilan bog‘lanishda xatolik yuz berdi.";
        console.error(error);
    }
});
