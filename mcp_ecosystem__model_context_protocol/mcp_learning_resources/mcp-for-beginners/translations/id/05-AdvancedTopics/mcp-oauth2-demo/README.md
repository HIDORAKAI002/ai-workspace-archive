# Demo OAuth2 MCP

## Pendahuluan

OAuth2 adalah protokol standar industri untuk otorisasi, memungkinkan akses aman ke sumber daya tanpa berbagi kredensial. Dalam implementasi MCP (Model Context Protocol), OAuth2 menyediakan cara yang kuat untuk mengotentikasi dan mengotorisasi klien (seperti agen AI) untuk mengakses server MCP dan alatnya.

Pelajaran ini menunjukkan cara mengimplementasikan otentikasi OAuth2 untuk server MCP menggunakan Spring Boot, pola umum untuk penyebaran perusahaan dan produksi.

## Tujuan Pembelajaran

Di akhir pelajaran ini, Anda akan:
- Memahami bagaimana OAuth2 terintegrasi dengan server MCP
- Mengimplementasikan Spring Authorization Server untuk penerbitan token
- Melindungi endpoint MCP dengan otentikasi berbasis JWT
- Mengonfigurasi alur kredensial klien untuk komunikasi mesin-ke-mesin

## Prasyarat

- Pemahaman dasar tentang Java dan Spring Boot
- Familiar dengan konsep MCP dari modul sebelumnya
- Maven atau Gradle terpasang

---

## Gambaran Proyek

Proyek ini adalah aplikasi **Spring Boot minimal** yang bertindak sebagai:

* **Spring Authorization Server** (mengeluarkan token akses JWT melalui alur `client_credentials`), dan  
* **Resource Server** (melindungi endpoint `/hello` sendiri).

Ini meniru pengaturan yang ditampilkan dalam [posting blog Spring (2 Apr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Mulai cepat (lokal)

```bash
# bangun & jalankan
./mvnw spring-boot:run

# dapatkan token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# panggil endpoint yang dilindungi
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Menguji Konfigurasi OAuth2

Anda dapat menguji konfigurasi keamanan OAuth2 dengan langkah-langkah berikut:

### 1. Verifikasi server berjalan dan aman

```bash
# Ini harus mengembalikan 401 Unauthorized, mengonfirmasi bahwa keamanan OAuth2 aktif
curl -v http://localhost:8081/
```

### 2. Dapatkan token akses menggunakan kredensial klien

```bash
# Dapatkan dan ekstrak respons token lengkap
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Atau untuk mengekstrak hanya token (memerlukan jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Catatan: Header Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) adalah encoding Base64 dari `mcp-client:secret`.

### 3. Akses endpoint yang dilindungi menggunakan token

```bash
# Menggunakan token yang disimpan
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Atau langsung dengan nilai token
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Respons berhasil dengan "Hello from MCP OAuth2 Demo!" mengonfirmasi bahwa konfigurasi OAuth2 berfungsi dengan benar.

---

## Membangun Container

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Deploy ke **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

FQDN ingress menjadi **issuer** Anda (`https://<fqdn>`).  
Azure menyediakan sertifikat TLS terpercaya secara otomatis untuk `*.azurecontainerapps.io`.

---

## Integrasi dengan **Azure API Management**

Tambahkan kebijakan inbound ini ke API Anda:

```xml
<inbound>
  <validate-jwt header-name="Authorization">
    <openid-config url="https://<fqdn>/.well-known/openid-configuration"/>
    <audiences>
      <audience>mcp-client</audience>
    </audiences>
  </validate-jwt>
  <base/>
</inbound>
```

APIM akan mengambil JWKS dan memvalidasi setiap permintaan.

---

## Apa selanjutnya

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berusaha untuk memberikan terjemahan yang akurat, harap diingat bahwa terjemahan otomatis mungkin mengandung kesalahan atau kekurangan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sahih. Untuk informasi penting, disarankan menggunakan jasa terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang salah yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->