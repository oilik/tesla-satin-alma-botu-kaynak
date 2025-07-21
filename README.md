<h1 align="center">Tesla Türkiye Satın Alma Botu</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Durum-Kullanılamaz-red?style=for-the-badge" alt="Durum">
  <img src="https://img.shields.io/badge/Teknoloji-JavaScript-yellow?style=for-the-badge" alt="Teknoloji">
  <img src="https://img.shields.io/badge/Kullanım-Tarayıcı%20Konsolu-lightgrey?style=for-the-badge" alt="Kullanım">
</p>

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" width="200" alt="Tesla Logo">
</p>

---


## 🚀 Proje Hakkında

Bu projede, bazı kişiler tarafından şifrelenmiş (obfuscate edilmiş) şekilde geliştirilen JavaScript (JS) kodlarının **şifreleri çözülmüş (deobfuscate)** halleri yer almaktadır. Söz konusu kişiler, geliştirdikleri botlarla **Tesla Türkiye** envanter sitesini canlı olarak takip etmekte ve belirli filtrelere uyan araçlar bulunduğunda sistem üzerinden **otomatik rezervasyon** gerçekleştirmektedirler.

Ayrıca bu kişiler, rezervasyon sonrası kredi kartı ile ödeme yapılmasını simüle eden örnek bir `ödeme.js` dosyası da kullanmaktadır.

Bu sistemi kullanarak haksız avantaj sağlayan kişiler, geliştirdikleri bot hizmetini başkalarına **1000 USD** karşılığında satmaktadır.

## 🎯 Projenin Amacı

Bu projenin temel amacı, **Tesla yazılım güvenliği ekiplerinin** bu tür açıkları tespit ederek önlem almasını sağlamaktır. Amacımız, Tesla araçlarının sipariş sürecinde **herkesin eşit ve adil koşullarda** işlem yapabilmesini desteklemektir.


⚠️ **Dikkat!**  
Bu bot, **Tesla'nın 16 Temmuz 2025 "Login" güncellemesi** sonrası artık **çalışmamaktadır**. Bu repodaki kodlar yalnızca **eğitimsel/demonstrasyon** amaçlıdır.

## 📂 Dosyalar

- `satinal.js`:  
  Tesla envanterini sürekli takip eder ve kriterlere uyan araç bulunduğunda otomatik olarak rezervasyon yapar.  
  WebSocket, RxJS, Lodash, hCaptcha gibi modern teknolojiler kullanılmıştır.

- `odeme.js`:  
  Gerçek rezervasyon sonrasında ödeme adımı için hazırlanmıştır. Adyen ödeme sistemine gerekli kart bilgileri ile POST isteği gönderir.

## 🔧 Kurulum Gerekliliği Yoktur

Bu proje **herhangi bir kurulum veya sunucu** gerektirmez.  
Kodlar doğrudan tarayıcıda çalıştırılmak üzere yazılmıştır.

## 🧪 Nasıl Kullanılır? (Artık çalışmaz, sadece örnek)

1. Tesla web sitesini açın:  
[https://www.tesla.com/tr_TR/inventory/new/my](https://www.tesla.com/tr_TR/inventory/new/my)

2. Tarayıcı konsolunu açın (`F12` veya `Ctrl+Shift+I` tuşlarına basın)

3. `satinal.js` içeriğini kopyalayın ve konsola yapıştırıp çalıştırın.

4. Eğer rezervasyon başarılı olursa, `odeme.js` içeriğini kopyalayın ve konsola yapıştırıp, ödeme adımını test edebilirsiniz.  
[https://static-assets-pay.tesla.com/v5/](https://static-assets-pay.tesla.com/v5/)

> **UYARI:** Gerçek kart bilgilerini asla kullanmayın. Bu sadece test senaryosudur.

## 🧩 Kullanılan Teknolojiler

- ✅ `JavaScript` (ES2020+)
- ✅ `RxJS` üzerinden reactive veri akışı
- ✅ `WebSocket` üzerinden canlı stok takibi
- ✅ `hCaptcha` çözümü
- ✅ `Adyen` şifreli kredi kartı ödeme API'si

## 📷 Ekran Görüntüsü
![467445077-fbb5851b-6e52-4e8e-b832-791eacec34c6](https://github.com/user-attachments/assets/686bffe4-8dfc-42e0-9532-cd8934448aea)
![467445065-b46b9186-275d-4fde-bf1c-945150a5bb62](https://github.com/user-attachments/assets/7537600e-928f-40f8-ae46-2b0248c68193)



## 📛 Sorumluluk Reddi

Bu repo, sadece **eğitim ve etik araştırma** amacıyla hazırlanmıştır. Herhangi bir yasa dışı kullanım, proje sahibinin sorumluluğunda değildir.
Gerçek ödeme işlemleri veya bot kullanımı kullanıcı sorumluluğundadır.
