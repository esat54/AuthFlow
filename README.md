# AuthFlow

Basit bir kimlik doğrulama (giriş, kayıt), yetkilendirme ve ürün yönetimi sistemi.

## Açıklama

Bu proje, bir web uygulamasının temel yapısını anlamak için Node.js, Express ve PostgreSQL kullanılarak oluşturulmuştur. Proje, Model-View-Controller (MVC) mimarisini pratik bir şekilde uygulamayı hedefler. Kullanıcılar kendi ürünlerini ekleyip görüntüleyebilirken, admin rolüne sahip kullanıcılar tüm kullanıcı listesini görebilir.

## Başlangıç

### Ön Gereksinimker

* Node.js (v14 veya üzeri)
* PostgreSQL (Supabase ile kolayca kurulabilir)
* Git (Depoyu klonlamak için)

### Kurulum

* Depoyu Klonlayın
  
```
git clone https://github.com/esat54/AuthFlow.git
cd AuthFlow
```

  
* Gerekli Node.js paketlerini yükleyin:

```
npm install
```


* .env dosyasını oluşturun ve veritabanı bağlantı bilgilerinizi girin:

```
DATABASE_URL="postgresql://postgres:[KENDİ_ŞİFRENİZİ]@db.[KENDİ_ADRESİNİZİ].supabase.co:5432/postgres"
```



## Programı Çalıştırma

* Supabase panelinizde SQL Editor bölümüne giderek aşağıdaki tabloları oluşturun:

```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user'
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES users(id)
);

-- Örnek admin kullanıcısı oluşturma
INSERT INTO users (username, password, role) VALUES ('admin', 'admin123', 'admin');
```


* Uygulamayı başlatın:

```
npm start
```

* Tarayıcınızda ```http://localhost:3000``` adresine giderek uygulamayı kullanmaya başlayın.






