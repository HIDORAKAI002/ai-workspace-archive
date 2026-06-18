# Panimula sa MCP Database Integration

## 🎯 Ano ang Saklaw ng Lab na Ito

Ang panimulang lab na ito ay nagbibigay ng komprehensibong pangkalahatang-ideya tungkol sa paggawa ng Model Context Protocol (MCP) servers na may integrasyon ng database. Maiintindihan mo ang kaso ng negosyo, teknikal na arkitektura, at mga aplikasyon sa totoong mundo sa pamamagitan ng Zava Retail analytics use case sa https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Pangkalahatang-ideya

**Model Context Protocol (MCP)** ay nagpapahintulot sa mga AI assistant na ligtas na ma-access at makipag-interact sa mga panlabas na pinagkukunan ng data nang real-time. Kapag pinagsama sa integrasyon ng database, binubuksan ng MCP ang mga makapangyarihang kakayahan para sa data-driven AI applications.

Itinuturo ng learning path na ito kung paano bumuo ng production-ready MCP servers na nag-uugnay sa mga AI assistant sa retail sales data gamit ang PostgreSQL, na nagpapatupad ng mga enterprise pattern tulad ng Row Level Security, semantic search, at multi-tenant data access.

## Mga Layunin sa Pagkatuto

Sa pagtatapos ng lab na ito, magagawa mong:

- **Ilarawan** ang Model Context Protocol at ang mga pangunahing benepisyo nito para sa integrasyon ng database  
- **Tukuyin** ang mga pangunahing bahagi ng arkitektura ng MCP server na may mga database  
- **Maunawaan** ang Zava Retail use case at ang mga pangangailangan nito sa negosyo  
- **Kilalanin** ang mga enterprise pattern para sa ligtas at scalable na pag-access sa database  
- **Ilista** ang mga kagamitan at teknolohiya na ginamit sa buong learning path na ito  

## 🧭 Ang Hamon: Pagtatagpo ng AI at Tunay na Mundo ng Data

### Mga Limitasyon ng Tradisyunal na AI

Napakalakas ng mga modernong AI assistant ngunit may malalaking limitasyon kapag gumagawa sa tunay na data ng negosyo:

| **Hamon** | **Paglalarawan** | **Epekto sa Negosyo** |
|---------------|-----------------|-------------------|
| **Static Knowledge** | AI models na sinanay sa mga fixed na dataset ay hindi makaka-access sa kasalukuyang data ng negosyo | Lumang insights, napalaktang mga oportunidad |
| **Data Silos** | Mga impormasyong naka-lock sa mga database, API, at sistema na hindi maabot ng AI | Hindi kumpletong pagsusuri, pira-pirasong workflows |
| **Security Constraints** | Direktang database access ay nagpapataas ng mga usapin sa seguridad at pagsunod | Limitadong deployment, manwal na paghahanda ng data |
| **Complex Queries** | Kailangan ng teknikal na kaalaman ng mga business user para makakuha ng data insights | Bawas na paggamit, di-episyenteng proseso |

### Ang Solusyon ng MCP

Tinutugunan ng Model Context Protocol ang mga hamong ito sa pamamagitan ng:

- **Real-time Data Access**: Nag-q-query ang AI assistant sa mga live na database at API  
- **Secure Integration**: Kontroladong access na may authentication at permissions  
- **Natural Language Interface**: Nagtatanong ang mga business user gamit ang simpleng Ingles  
- **Standardized Protocol**: Gumagana ito sa iba't ibang AI platform at tool  

## 🏪 Kilalanin ang Zava Retail: Ang Aming Learning Case Study https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Sa buong learning path na ito, bubuo tayo ng MCP server para sa **Zava Retail**, isang kathang-isip na DIY retail chain na may maraming lokasyon ng tindahan. Ipinapakita ng makatotohanang scenario na ito ang enterprise-grade MCP implementation.

### Konteksto ng Negosyo

**Zava Retail** ay nagpapatakbo ng:  
- **8 pisikal na tindahan** sa iba't ibang lugar sa estado ng Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 online store** para sa e-commerce sales  
- **Iba't ibang produkto** kasama ang mga tools, hardware, garden supplies, at mga materyales sa konstruksyon  
- **Multi-level management** na may mga store manager, regional manager, at mga executive  

### Mga Pangangailangan sa Negosyo

Kailangan ng mga store manager at executive ng AI-powered analytics upang:  

1. **Suriin ang performance ng benta** sa iba't ibang tindahan at panahon  
2. **Subaybayan ang lebel ng imbentaryo** at tukuyin ang mga kailangang punan  
3. **Unawain ang kilos ng mga customer** at mga pattern sa pagbili  
4. **Diskubrehin ang mga insight ng produkto** gamit ang semantic search  
5. **Gumawa ng mga ulat** gamit ang mga tanong sa natural na wika  
6. **Panatilihin ang seguridad ng data** gamit ang role-based access control  

### Mga Pangangailangan sa Teknikal

Dapat magbigay ang MCP server ng:

- **Multi-tenant data access** kung saan nakikita lang ng store manager ang data ng kanilang tindahan  
- **Flexible querying** na sumusuporta sa mga komplikadong SQL operation  
- **Semantic search** para sa pagtuklas ng produkto at mga rekomendasyon  
- **Real-time data** na sumasalamin sa kasalukuyang estado ng negosyo  
- **Secure authentication** gamit ang row-level security  
- **Scalable architecture** na sumusuporta sa maraming sabay-sabay na user  

## 🏗️ Pangkalahatang-ideya ng Arkitektura ng MCP Server

Ipinapatupad ng aming MCP server ang isang layered architecture na optimized para sa database integration:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### Mga Pangunahing Bahagi

#### **1. MCP Server Layer**
- **FastMCP Framework**: Makabagong implementasyon ng Python MCP server  
- **Tool Registration**: Declarative na paglalarawan ng mga tool na may type safety  
- **Request Context**: Pamamahala ng identity at session ng user  
- **Error Handling**: Matibay na pamamahala at pag-log ng error  

#### **2. Database Integration Layer**
- **Connection Pooling**: Mahusay na pamamahala gamit ang asyncpg connection pooling  
- **Schema Provider**: Dynamic na pagtuklas ng table schema  
- **Query Executor**: Ligtas na pagpapatupad ng SQL kasama ang RLS context  
- **Transaction Management**: Pagsunod sa ACID at paghawak ng rollback  

#### **3. Security Layer**
- **Row Level Security**: PostgreSQL RLS para sa multi-tenant data isolation  
- **User Identity**: Authentication at authorization ng store manager  
- **Access Control**: Pinong permissions at audit trail  
- **Input Validation**: Pag-iwas sa SQL injection at pag-validate ng query  

#### **4. AI Enhancement Layer**
- **Semantic Search**: Vector embeddings para sa pagtuklas ng produkto  
- **Azure OpenAI Integration**: Pagbuo ng text embedding  
- **Similarity Algorithms**: pgvector cosine similarity search  
- **Search Optimization**: Indexing at pagpapahusay ng performance  

## 🔧 Teknolohiyang Ginamit

### Pangunahing Teknolohiya

| **Bahagi** | **Teknolohiya** | **Layunin** |
|---------------|----------------|-------------|
| **MCP Framework** | FastMCP (Python) | Makabagong implementasyon ng MCP server |
| **Database** | PostgreSQL 17 + pgvector | Relational data na may vector search |
| **AI Services** | Azure OpenAI | Text embeddings at mga language model |
| **Containerization** | Docker + Docker Compose | Development environment |
| **Cloud Platform** | Microsoft Azure | Production deployment |
| **IDE Integration** | VS Code | AI Chat at workflow sa development |

### Development Tools

| **Tool** | **Layunin** |
|----------|-------------|
| **asyncpg** | Mataas na performance na PostgreSQL driver |
| **Pydantic** | Data validation at serialization |
| **Azure SDK** | Integrasyon ng cloud service |
| **pytest** | Testing framework |
| **Docker** | Containerization at deployment |

### Production Stack

| **Service** | **Azure Resource** | **Layunin** |
|-------------|-------------------|-------------|
| **Database** | Azure Database for PostgreSQL | Managed database service |
| **Container** | Azure Container Apps | Serverless container hosting |
| **AI Services** | Microsoft Foundry | OpenAI models at endpoints |
| **Monitoring** | Application Insights | Observability at diagnostics |
| **Security** | Azure Key Vault | Secrets at configuration management |

## 🎬 Mga Senaryo ng Paggamit sa Totoong Mundo

Tuklasin natin kung paano nakikipag-interact ang iba't ibang user sa aming MCP server:

### Senaryo 1: Review ng Performance ng Store Manager

**User**: Sarah, Store Manager sa Seattle  
**Layunin**: Suriin ang sales performance noong nakaraang quarter

**Tanong sa Natural Language**:
> "Ipakita ang top 10 produkto ayon sa kita para sa aking tindahan sa Q4 2024"

**Ano ang Nangyayari**:
1. Nagpadala ang VS Code AI Chat ng query sa MCP server  
2. Tinukoy ng MCP server ang konteksto ng tindahan ni Sarah (Seattle)  
3. Pinili ng mga polisiya ng RLS ang data para sa tindahan sa Seattle lamang  
4. Nalikha at naipatupad ang SQL query  
5. Inayos ang mga resulta at ibinalik sa AI Chat  
6. Nagbigay ang AI ng pagsusuri at insight  

### Senaryo 2: Pagtuklas ng Produkto gamit ang Semantic Search

**User**: Mike, Inventory Manager  
**Layunin**: Humanap ng mga produktong katulad sa request ng customer

**Tanong sa Natural Language**:
> "Anong mga produkto ang binebenta natin na katulad ng 'waterproof electrical connectors para sa panlabas na gamit'?"

**Ano ang Nangyayari**:
1. Pinoproseso ang query ng semantic search tool  
2. Gumagawa ng embedding vector ang Azure OpenAI  
3. Gumagawa ng similarity search gamit ang pgvector  
4. Rank ang mga kaugnay na produkto ayon sa relevance  
5. Kasama sa resulta ang detalye ng produkto at availability  
6. Nagsusulong ang AI ng alternatibo at mga bundling opportunity  

### Senaryo 3: Cross-Store Analytics

**User**: Jennifer, Regional Manager  
**Layunin**: Ihambing ang performance sa lahat ng tindahan

**Tanong sa Natural Language**:
> "Ihambing ang benta ayon sa kategorya para sa lahat ng tindahan sa nakaraang 6 na buwan"

**Ano ang Nangyayari**:
1. Naitakda ang RLS context para sa access ng regional manager  
2. Nalikha ang komplikadong multi-store query  
3. Nag-aggregate ang data mula sa iba’t ibang lokasyon ng tindahan  
4. Naibigay ang mga resulta kasama ang trend at paghahambing  
5. Nakilala ng AI ang mga insight at rekomendasyon  

## 🔒 Malalim na Pagtingin sa Seguridad at Multi-Tenancy

Pinapahalagahan ng aming implementasyon ang enterprise-grade security:

### Row Level Security (RLS)

Siniguro ng PostgreSQL RLS ang isolation ng data:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### Pamamahala ng Identity ng User

Kasama sa bawat koneksyon ng MCP ang:  
- **Store Manager ID**: Natatanging identifier para sa konteksto ng RLS  
- **Role Assignment**: Mga permiso at level ng access  
- **Session Management**: Ligtas na authentication tokens  
- **Audit Logging**: Kumpletong kasaysayan ng access  

### Proteksyon ng Data

Maraming layer ng seguridad:  
- **Connection Encryption**: TLS para sa lahat ng koneksyon sa database  
- **SQL Injection Prevention**: Parameterized queries lamang  
- **Input Validation**: Komprehensibong pag-validate ng mga hiling  
- **Error Handling**: Walang sensitibong data sa mga mensahe ng error  

## 🎯 Pangunahing Mga Natutunan

Pagkatapos ng panimulang ito, dapat mong maunawaan:

✅ **Halaga ng MCP**: Paano pinagdudugtong ng MCP ang AI assistant at tunay na data  
✅ **Konteksto ng Negosyo**: Mga pangangailangan at hamon ng Zava Retail  
✅ **Pangkalahatang Arkitektura**: Pangunahing bahagi at ang kanilang ugnayan  
✅ **Teknolohiyang Ginamit**: Mga kagamitan at framework na ginamit  
✅ **Modelo ng Seguridad**: Multi-tenant data access at proteksyon  
✅ **Mga Pattern ng Paggamit**: Mga senaryo ng query at workflow sa totoong mundo  

## 🚀 Ano ang Susunod

Handa ka na bang magpatuloy? Sundan ang:

**[Lab 01: Core Architecture Concepts](../01-Architecture/README.md)**

Matuto tungkol sa mga pattern ng arkitektura ng MCP server, prinsipyo sa disenyo ng database, at ang detalyadong teknikal na implementasyon na nagbibigay-lakas sa aming retail analytics solution.

## 📚 Karagdagang mga Sanggunian

### MCP Dokumentasyon
- [MCP Specification](https://modelcontextprotocol.io/docs/) - Opisyal na dokumentasyon ng protocol  
- [MCP for Beginners](https://aka.ms/mcp-for-beginners) - Komprehensibong gabay sa MCP  
- [FastMCP Documentation](https://github.com/modelcontextprotocol/python-sdk) - Dokumentasyon ng Python SDK  

### Integrasyon ng Database
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Kumpletong sanggunian ng PostgreSQL  
- [pgvector Guide](https://github.com/pgvector/pgvector) - Dokumentasyon ng vector extension  
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Gabay sa PostgreSQL RLS  

### Mga Serbisyo ng Azure
- [Azure OpenAI Documentation](https://docs.microsoft.com/azure/cognitive-services/openai/) - Integrasyon ng AI service  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Managed database service  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Serverless containers  

---

**Paalala**: Ito ay isang learning exercise gamit ang kathang-isip na retail data. Laging sundin ang mga patakaran ng inyong organisasyon sa data governance at seguridad kapag nagsasagawa ng katulad na mga solusyon sa production environments.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->