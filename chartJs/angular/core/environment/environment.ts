export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api', // Laravel API'nizin URL'si
  corsOptions: {
    allowedOrigins: ['http://localhost:4200'], // Angular uygulamanızın URL'si
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'], // İzin verilen HTTP metotları
    allowedHeaders: ['Content-Type', 'Authorization'], // İzin verilen başlıklar
    exposedHeaders: [], // İstenilen başlıklar
    maxAge: 0, // Önbellek süresi
    supportsCredentials: false, // Kimlik doğrulama bilgileri
  },
};
