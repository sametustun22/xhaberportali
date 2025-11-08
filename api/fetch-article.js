// Bu dosya, Vercel/Netlify gibi platformlarda sunucu taraflı bir işlev (serverless function) olarak çalışır.
// Görevi, istemciden (tarayıcıdan) gelen bir URL'yi alıp, o URL'nin içeriğini çekmek ve geri göndermektir.
// Bu sayede tarayıcıdaki CORS kısıtlamalarını aşmış oluruz.

export default async function handler(request, response) {
  // Tarayıcıdan gelen isteğin içinden 'url' parametresini alıyoruz.
  // Örnek: /api/fetch-article?url=https://www.habersitesi.com/haber
  const { searchParams } = new URL(request.url, `http://${request.headers.host}`);
  const articleUrl = searchParams.get('url');

  // Eğer URL parametresi yoksa, hata döndür.
  if (!articleUrl) {
    return response.status(400).json({ error: 'URL parametresi eksik.' });
  }

  try {
    // Belirtilen URL'ye sunucu tarafından bir istek gönderiyoruz.
    // Bazı siteler botları engellediği için gerçek bir tarayıcı gibi görünmek adına User-Agent ekliyoruz.
    const articleResponse = await fetch(articleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!articleResponse.ok) {
      throw new Error(`Haber sitesine ulaşılamadı: ${articleResponse.status}`);
    }

    const html = await articleResponse.text();
    response.status(200).send(html);
  } catch (error) {
    console.error('Sunucu taraflı içerik çekme hatası:', error);
    response.status(500).json({ error: 'Makale içeriği çekilemedi.', details: error.message });
  }
}