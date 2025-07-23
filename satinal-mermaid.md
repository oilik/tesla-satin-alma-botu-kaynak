# Tesla Satın Alma Botu - Mermaid.js Diyagramı

## Ana Akış Diyagramı

```mermaid
flowchart TD
    A[Bot Başlatılıyor] --> B[RxJS ve Diğer Kütüphaneler Yükleniyor]
    B --> C[Kullanıcı Bilgileri Tanımlanıyor]
    C --> D[Bot Konfigürasyonu Ayarlanıyor]
    D --> E[hCaptcha Yükleniyor]
    E --> F[Gizli Captcha Butonu Oluşturuluyor]
    F --> G[Timer Başlatılıyor - 240s Aralıklarla]
    G --> H[Tesla Oturum Kontrolü]
    H --> I[WebSocket Bağlantısı Kurulıyor]
    I --> J[Araç Verilerini Dinleme Pipeline'ı]
    
    J --> K{Araç Verisi Geldi mi?}
    K -->|Hayır| J
    K -->|Evet| L[Verileri Buffer'la]
    L --> M[Listeyi Karıştır]
    M --> N[Boya Rengi Önceliğine Göre Sırala]
    N --> O{RWD_NV36 Trim Kodu?}
    O -->|Hayır| J
    O -->|Evet| P{İç Mekan Filtresi Geçiyor?}
    P -->|Hayır| J
    P -->|Evet| Q{Beyaz İç Mekan Hariç?}
    Q -->|Hayır| J
    Q -->|Evet| R[Araç Rezervasyon İşlemi]
    
    R --> S[CSRF Token'ları Al]
    S --> T[Teslimat Lokasyonu Kontrolü]
    T --> U{Lokasyon Mevcut?}
    U -->|Hayır| V[Hata: Lokasyon Bulunamadı]
    U -->|Evet| W[hCaptcha Render Et]
    W --> X[Captcha'yı Çöz]
    X --> Y[Rastgele Lokasyon Seç]
    Y --> Z[Tesla API'sine Sipariş Gönder]
    
    Z --> AA{Sipariş Durumu?}
    AA -->|403 Hata| BB[IP Akamai Tarafından Bloklandı]
    AA -->|428 Hata| CC[Akamai Güvenlik Kontrolü Başarısız]
    AA -->|Başarılı| DD{Rezervasyon Numarası Var?}
    
    DD -->|Hayır| EE[Rezervasyon Başarısız]
    DD -->|Evet| FF[Rezervasyon Başarılı]
    FF --> GG[Webhook'a Bildirim Gönder]
    GG --> HH[İlk Çalıştırma Bayrağını Kapat]
    
    V --> J
    BB --> J
    CC --> J
    EE --> J
    HH --> J
```

## Veri İşleme Pipeline'ı

```mermaid
flowchart LR
    A[WebSocket Verisi] --> B[Buffer Time]
    B --> C[Boş Olmayan Filtresi]
    C --> D[Listeyi Karıştır]
    D --> E[Boya Rengi Sıralaması]
    E --> F[Trim Kodu Filtresi]
    F --> G[İç Mekan Filtresi]
    G --> H[Beyaz İç Mekan Filtresi]
    H --> I[Rezervasyon İşlemi]
```

## Rezervasyon İşlemi Detayı

```mermaid
sequenceDiagram
    participant Bot
    participant Tesla API
    participant hCaptcha
    participant Webhook
    
    Bot->>Tesla API: CSRF Token İsteği
    Tesla API-->>Bot: CSRF Token
    
    Bot->>hCaptcha: Captcha Render
    Bot->>hCaptcha: Captcha Çözme İsteği
    hCaptcha-->>Bot: Captcha Token
    
    Bot->>Tesla API: Sipariş İsteği (Captcha Token ile)
    
    alt Başarılı Rezervasyon
        Tesla API-->>Bot: Rezervasyon Numarası
        Bot->>Webhook: Başarı Bildirimi
    else Hata Durumu
        Tesla API-->>Bot: Hata Mesajı
        Bot->>Bot: Hata Logla
    end
    
    Bot->>hCaptcha: Captcha Temizle
```

## State Machine Diyagramları

### Lokasyon Kontrolü State Machine

```mermaid
stateDiagram-v2
    [*] --> LocationCheck20
    LocationCheck20 --> LocationCheck22 : Array boş veya null
    LocationCheck20 --> LocationCheck33 : Array dolu
    LocationCheck22 --> [*] : Hata döndür
    LocationCheck33 --> [*] : Devam et
```

### Sipariş Durumu State Machine

```mermaid
stateDiagram-v2
    [*] --> OrderCheck18
    OrderCheck18 --> OrderCheck27 : Status 403
    OrderCheck18 --> OrderCheck32 : Status != 403
    OrderCheck27 --> [*] : IP Bloklandı Hatası
    OrderCheck32 --> [*] : Devam et
```

## Sistem Bileşenleri

```mermaid
graph TB
    subgraph "External Services"
        TS[Tesla API]
        HC[hCaptcha]
        WH[Webhook]
        WS[WebSocket Server]
    end
    
    subgraph "Bot Components"
        RX[RxJS Pipeline]
        CF[Configuration]
        UF[User Info]
        BF[Buffer System]
        FF[Filter System]
    end
    
    subgraph "Browser Environment"
        CS[Cookie Store]
        NL[Navigator Locks]
        DF[DOM Functions]
    end
    
    RX --> TS
    RX --> HC
    RX --> WH
    RX --> WS
    RX --> CS
    RX --> NL
    RX --> DF
    
    CF --> RX
    UF --> RX
    BF --> RX
    FF --> RX
```

## Kullanılan Teknolojiler

- **RxJS**: Reaktif programlama ve veri akışı yönetimi
- **WebSocket**: Gerçek zamanlı araç verisi alma
- **hCaptcha**: Bot koruması aşma
- **Tesla API**: Araç rezervasyonu
- **Lodash**: Yardımcı fonksiyonlar
- **Fetch API**: HTTP istekleri
- **Navigator Locks**: Eşzamanlılık kontrolü