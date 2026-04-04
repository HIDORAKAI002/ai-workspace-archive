# MCP OAuth2 டெமோ

## அறிமுகம்

OAuth2 என்பது அதிகாரப்பூர்வத்துக்கு தொழிற்துறையில் நிலையான ப்ரொடோக்கோல் ஆகும், அங்கீகார விவரங்களை பகிராமையே வளங்களை பாதுகாப்புடன் அணுக அனுமதிக்கும். MCP (மொடல் கான்டெக்ஸ்ட் ப்ரொடோக்கோல்) அமலாக்கங்களில், OAuth2 AI முகவர்கள் போன்ற கிளையன்ட்களை MCP சர்வர்களுக்கும் அவற்றின் கருவிகளுக்கும் அணுக அங்கீகாரம் தர வலுவான முறையாக உள்ளது.

இந்த பாடத்தில் Spring Boot ஐப் பயன்படுத்தி MCP சர்வர்களுக்கான OAuth2 அங்கீகாரத்தை எப்படி அமல்படுத்துவது என்பதைக் காட்டப்பட்டுள்ளது. இது பொதுவான நிறுவன மற்றும் உற்பத்தித் திட்டங்களுக்கான மாதிரியாகும்.

## கற்றல் இலக்குகள்

இந்த பாட முடிவிற்கு நீங்கள்:

- OAuth2 எப்படி MCP சர்வர்களுடன் இணைகிறது என்பதை புரிந்துகொள்ளலாம்  
- டோக்கன் வழங்குவதற்கான Spring அங்கீகார சர்வரை அமல்படுத்தலாம்  
- JWT அடிப்படையிலான அங்கீகாரத்துடன் MCP முடிவுகளை பாதுகாப்பாக்கலாம்  
- இயந்திரத்துக்கு-இயந்திர கம்யூனிகேஷனுக்கான கிளையன்ட் விழுப்புரிமைகள் ஓட்டத்தை அமைக்கலாம்

## முன்னேற்பாடுகள்

- ஜாவா மற்றும் ஸ்பிரிங் பூட் அடிப்படைக் க்ருத்தியங்கள்  
- முதற்பகுதி தொகுதிகளிலிருந்து MCP கருத்துக்களை அறிவது  
- Maven அல்லது Gradle நிறுவப்பட்டிருப்பது

---

## திட்டம் நோக்கம்

இந்தத் திட்டம் ஒரு **அதிகமான ஸ்பிரிங் பூட் பயன்பாடு** ஆகும், அது இரண்டும் செயல் படுத்துகிறது:

* ஒரு **ஸ்பிரிங் அங்கீகார சர்வர்** (JWT அணுகல் டோக்கன்களை `client_credentials` ஓட்டத்தின் மூலம் வழங்குகிறது), மற்றும்  
* ஒரு **வள சர்வர்** (அது தன்னுடைய `/hello` முடிவை பாதுகாக்கிறது).

இது [ஸ்பிரிங் வலைப்பதிவில் (2 ஏப்ரல் 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) காண்பிக்கப்பட்ட அமைப்பை பிரதிபலிக்கிறது.

---

## விரைவு தொடக்கம் (உள்ளூர்)

```bash
# கட்டமைத்து இயக்கவும்
./mvnw spring-boot:run

# ஒரு டோக்கன் பெறவும்
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# பாதுகாக்கப்பட்ட எண்ட்பாயிண்டை அழைக்கவும்
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2ဖான்பட்டமைப்பை சோதனை செய்தல்

பின்வரும் படிகளின் மூலம் OAuth2 பாதுகாப்பு அமைப்பை சோதிக்கலாம்:

### 1. சர்வர் இயங்குகிறதா மற்றும் பாதுகாப்பானதா என்பதை சரி பாருங்கள்

```bash
# இது 401 Unauthorized ஐ திருப்ப வேண்டும், OAuth2 பாதுகாப்பு செயல்பாட்டில் இருப்பதை உறுதிப்படுத்துகிறது
curl -v http://localhost:8081/
```

### 2. கிளையன்ட் விழுப்புரிமைகளைப் பயன்படுத்தி அணுகல் டோக்கனை பெற்றுக்கொள்ளுங்கள்

```bash
# முழு டோக்கன் பதிலை பெறவும் பிரிக்கவும்
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# அல்லது கொண்ட டோக்கனை பிரிக்கவும் (jq தேவை)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

குறிப்பு: Basic Authentication தலைப்பு (`bWNwLWNsaWVudDpzZWNyZXQ=`) என்பது `mcp-client:secret` இன் Base64 குறியீடு ஆகும்.

### 3. டோக்கனைப் பயன்படுத்தி பாதுகாக்கப்பட்ட முடிவை அணுகுங்கள்

```bash
# சேமிக்கப்பட்ட டோக்கனை பயன்படுத்துதல்
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# அல்லது டோக்கன் மதிப்புடன் நேரடியாக
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

"Hello from MCP OAuth2 Demo!" என்ற வெற்றிகரமான பதில் கிடைத்தால், OAuth2 அமைப்பு சரியாக இயங்குகிறது என்பதைக் குறிக்கிறது.

---

## செயலி கட்டுமானம்

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## **Azure Container Apps**ல் 배포

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

இதரணி FQDN உங்கள் **வழங்குபவராகும்** (`https://<fqdn>`).  
Azure தானாகவே `*.azurecontainerapps.io` க்கு நம்பகமான TLS சான்றிதழை வழங்குகிறது.

---

## **Azure API Management** உடன் இணைத்தல்

உங்கள் APIக்கான இந்த உள்ளுக பிரகடனக் கொள்கையைச் சேர்:

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

APIM JWKS ஐ பெறவும் அத்தனை கோரிக்கையையும் சரிபார்க்கும்.

---

## அடுத்தது என்ன

- [5.4 ரூட் கருத்துக்கள்](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**உறுதிப்பத்திரம்**:  
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) மூலம் மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயலுகிறோம் என்றாலும், தானியங்கி மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கக்கூடும் என்பதனை தயவுசெய்து கவனியுங்கள். சொந்த மொழியிலுள்ள அசல் ஆவணம் அதிகாரபூர்வமான ஆதாரமாகக் கருதப்பட வேண்டும். முக்கியமான தகவலுக்கு, தொழில்முறை மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்தையும் தவறான புரிதல்கள் அல்லது தவறுதல்களுக்கு நாங்கள் பொறுப்பாக இருக்க மாட்டோம்.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->