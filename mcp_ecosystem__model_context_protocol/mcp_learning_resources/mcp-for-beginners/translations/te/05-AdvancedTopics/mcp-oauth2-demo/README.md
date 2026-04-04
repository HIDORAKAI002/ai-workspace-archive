# MCP OAuth2 డెమో

## పరిచయం

OAuth2 అనేది అనుమతికి పరిశ్రమ-స్థాయి ప్రోటోకాల్, ఇది క్రెడెన్షియల్స్ ను పంచుకోకుండా వనరులకు సురక్షిత యాక్సెస్‌ను అందిస్తుంది. MCP (మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్) అమలు లలో, OAuth2 క్లయింట్లను (ఉదాహరణకు AI ఏజెంట్లు) MCP సర్వర్లు మరియు వాటి టూల్స్ యాక్సెస్ చేయడానికి ధృవీకరించడం మరియు అనుమతించడం కోసం బలమైన మార్గాన్ని అందిస్తుంది.

ఈ పాఠం Spring Boot ఉపయోగించి MCP సర్వర్ల కోసం OAuth2 ధృవీకరణను ఎలా అమలు చేయాలో చూపిస్తుంది, ఇది ఎంటర్ప్రైజ్ మరియు ప్రొడక్షన్ డిప్లాయ్‌మెంట్లకు సాధారణ ప్యాటర్న్.

## నేర్చుకోవాల్సిన లక్ష్యాలు

ఈ పాఠం చివర‌కు, మీరు:
- OAuth2 MCP సర్వర్లతో ఎలా అనుసంధానవుతుందో అర్థం చేసుకోగలరు
- టోకెన్ జారీ కోసం Spring అనుమతిఎ సర్వర్‌ను అమలు చేయగలరు
- JWT ఆధారిత ధృవీకరణతో MCP ఎండ్పాయింట్లను రక్షించగలరు
- యంత్రానికి-యంత్రం సంభాషణ కోసం క్లయింట్ క్రెడెన్షియల్స్ ఫ్లోని కాన్ఫిగర్ చేయగలరు

## ముందస్తు అవసరాలు

- జావా మరియు Spring Boot యొక్క ప్రాథమిక అవగాహన
- మొదటి మాడ్యూల్స్ నుండి MCP కాన్సెప్ట్స్‌పై పరిచయం
- Maven లేదా Gradle ఇన్‌స్టాల్ అయి ఉండాలి

---

## ప్రాజెక్ట్ అవలోకనం

ఈ ప్రాజెక్ట్ ఒక **సహజమైన Spring Boot అప్లికేషన్** గాను పనిచేస్తుంది, ఇది రెండు విధంగా ఉంటుంది:

* ఒక **Spring అనుమతిసర్వర్** (client_credentials ఫ్లో ద్వారా JWT యాక్సెస్ టోకెన్లు జారీ చేస్తుంది), మరియు  
* ఒక **రెసోర్స్ సర్వర్** (దాని స్వంత `/hello` ఎండ్పాయింట్‌ను రక్షిస్తుంది).

ఇది [Spring బ్లాగ్ పోస్ట్ (2 ఏప్రిల్ 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) లో చూపించిన సెటప్‌ను ప్రతిబింబిస్తుంది.

---

## త్వరిత ప్రారంభం (లోకల్)

```bash
# నిర్మించండి & నడపండి
./mvnw spring-boot:run

# ఒక టోకెన్ పొందండి
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# రక్షిత ఎండ్‌పాయింట్‌ను పిలవండి
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 కాన్ఫిగరేషన్‌ను పరీక్షించడం

ఈ క్రింది దశలతో మీరు OAuth2 సెక్యూరిటీ కాన్ఫిగరేషన్‌ను పరీక్షించవచ్చు:

### 1. సర్వర్ నడుస్తూ ఉంది మరియు రక్షించబడిందని ధృవీకరించండి

```bash
# ఇది 401 అనుమతించబడలేదు తిరిగి ఇవ్వాలి, OAuth2 భద్రత సక్రియంగా ఉందని నిర్ధారించటం.
curl -v http://localhost:8081/
```

### 2. క్లయింట్ క్రెడెన్షియల్స్ ఉపయోగించి యాక్సెస్ టోకెన్ పొందండి

```bash
# పూర్తి టోకెన్ ప్రతిస్పందనను పొందండి మరియు వెలికి తీయండి
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# లేదా కేవలం టోకెన్ మాత్రమే వెలికి తీయండి (jq అవసరం)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

గమనిక: Basic Authentication హెడ్డర్ (`bWNwLWNsaWVudDpzZWNyZXQ=`) అనేది `mcp-client:secret` యొక్క Base64 ఎంకోడింగ్.

### 3. టోకెన్ ఉపయోగించి రక్షించబడిన ఎండ్పాయింట్‌ను యాక్సెస్ చేయండి

```bash
# సేవ్ చేయబడిన టోకెన్ ఉపయోగిస్తోంది
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# లేదా టోకెన్ విలువతో నేరుగా
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

"Hello from MCP OAuth2 Demo!" అనే విజయవంతమైన ప్రతిస్పందన OAuth2 కాన్ఫిగరేషన్ సరిగ్గా పనిచేస్తున్నదని నిర్థారిస్తుంది.

---

## కంటైనర్ బిల్డ్

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## **Azure Container Apps**కు డిప్లాయ్ చేయండి

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

ఇన్‌గ్రెస్స్ FQDN మీ **ఇష్యూ** (`https://<fqdn>`) అవుతుంది.  
Azure ఆటోమాటిగ్గా `*.azurecontainerapps.io` కోసం ట్రస్టెడ్ TLS సర్టిఫికెట్ అందిస్తుంది.

---

## **Azure API మేనేజ్మెంట్**లో అనుసంధానం

మీ APIకి ఈ ఇన్‌బౌండ్ పాలసీని జోడించండి:

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

APIM JWKS తీసుకొని ప్రతి అభ్యర్థనని వెరిఫై చేస్తుంది.

---

## తదుపరి ఏమిటి

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**స్పష్టం**:
ఈ డాక్యుమెంట్ [Co-op Translator](https://github.com/Azure/co-op-translator) అనే AI అనువాద సేవ ఉపయోగించి అనువాదమైంది. మేము ఖచ్చితత్వానికి ప్రయత్నించగా, ఆటోమేటెడ్ అనువాదాల్లో తప్పులు లేదా పొరపాట్లు ఉండే అవకాశం ఉంది. మూల భాషలో ఉన్న అసలు డాక్యుమెంట్ అధికారిక మూలంగా పరిగణించాలి. కీలక సమాచారానికి, నిపుణుల మానవ అనువాదాన్ని సిఫార్సు చేస్తాము. ఈ అనువాదాన్ని ఉపయోగించడంతో సంభవించే ఏవైనా తప్పుదోవలు లేదా వ్యతిరేక అర్థాల గురించి మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->