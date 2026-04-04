# MCP OAuth2 Demo

## Pengenalan

OAuth2 adalah protokol piawai industri untuk kebenaran, membolehkan akses yang selamat ke sumber tanpa berkongsi kelayakan. Dalam pelaksanaan MCP (Model Context Protocol), OAuth2 menyediakan cara yang kukuh untuk mengesahkan dan memberi kebenaran kepada klien (seperti ejen AI) untuk mengakses pelayan MCP dan alat-alatnya.

Pelajaran ini menunjukkan cara melaksanakan pengesahan OAuth2 untuk pelayan MCP menggunakan Spring Boot, satu corak biasa untuk pengeluaran korporat dan pengeluaran.

## Objektif Pembelajaran

Menjelang akhir pelajaran ini, anda akan:
- Memahami bagaimana OAuth2 berintegrasi dengan pelayan MCP
- Melaksanakan Pelayan Kebenaran Spring untuk pengeluaran token
- Melindungi titik akhir MCP dengan pengesahan berasaskan JWT
- Mengkonfigurasi aliran kelayakan klien untuk komunikasi mesin-ke-mesin

## Prasyarat

- Pemahaman asas Java dan Spring Boot
- Kefahaman konsep MCP dari modul sebelumnya
- Maven atau Gradle dipasang

---

## Gambaran Projek

Projek ini adalah **aplikasi Spring Boot minimum** yang berperanan sebagai:

* **Pelayan Kebenaran Spring** (mengeluarkan token akses JWT melalui aliran `client_credentials`), dan  
* **Pelayan Sumber** (melindungi titik akhir `/hello` sendiri).

Ia mencerminkan persediaan yang ditunjukkan dalam [catatan blog Spring (2 Apr 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Mula cepat (lokal)

```bash
# bina & jalankan
./mvnw spring-boot:run

# dapatkan token
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# panggil titik akhir yang dilindungi
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Menguji Konfigurasi OAuth2

Anda boleh menguji konfigurasi keselamatan OAuth2 dengan langkah berikut:

### 1. Sahkan pelayan berjalan dan dilindungi

```bash
# Ini sepatutnya mengembalikan 401 Tidak Dibenarkan, mengesahkan keselamatan OAuth2 aktif
curl -v http://localhost:8081/
```

### 2. Dapatkan token akses menggunakan kelayakan klien

```bash
# Dapatkan dan ekstrak respon token penuh
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Atau untuk mengekstrak hanya token sahaja (memerlukan jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Nota: Header Pengesahan Asas (`bWNwLWNsaWVudDpzZWNyZXQ=`) adalah pengekodan Base64 bagi `mcp-client:secret`.

### 3. Akses titik akhir yang dilindungi menggunakan token

```bash
# Menggunakan token yang disimpan
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Atau terus dengan nilai token
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Balasan yang berjaya dengan "Hello from MCP OAuth2 Demo!" mengesahkan konfigurasi OAuth2 berfungsi dengan betul.

---

## Pembangunan kontena

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Terbitkan ke **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Ingress FQDN menjadi **penyemak imbas** anda (`https://<fqdn>`).  
Azure menyediakan sijil TLS yang dipercayai secara automatik untuk `*.azurecontainerapps.io`.

---

## Sambungkan ke **Azure API Management**

Tambah polisi masuk ini ke API anda:

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

APIM akan mendapatkan JWKS dan mengesahkan setiap permintaan.

---

## Apa seterusnya

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha mencapai ketepatan, sila maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya hendaklah dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan profesional oleh manusia adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->