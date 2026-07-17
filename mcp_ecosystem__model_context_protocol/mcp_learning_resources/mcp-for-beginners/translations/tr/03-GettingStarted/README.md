## Başlarken  

[![İlk MCP Sunucunuzu Oluşturun](../../../translated_images/tr/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Bu dersin videosunu görmek için yukarıdaki görsele tıklayın)_

Bu bölüm birkaç dersten oluşmaktadır:

- **1 İlk sunucunuz**, bu ilk derste ilk sunucunuzu nasıl oluşturacağınızı ve sunucunuzu test edip hata ayıklamak için değerli bir yöntem olan denetleyici aracıyla nasıl inceleyeceğinizi öğreneceksiniz, [derse git](01-first-server/README.md)

- **2 İstemci**, bu derste sunucunuza bağlanabilen bir istemci yazmayı öğreneceksiniz, [derse git](02-client/README.md)

- **3 LLM ile İstemci**, daha da iyi bir istemci yazma yöntemi, sunucunuzla ne yapılacağı konusunda "müzakere edebilecek" bir LLM eklemektir, [derse git](03-llm-client/README.md)

- **4 Visual Studio Code'da bir sunucu GitHub Copilot Ajan modunu kullanmak**. Burada, MCP Sunucumuzu Visual Studio Code içinden çalıştırmayı inceliyoruz, [derse git](04-vscode/README.md)

- **5 stdio Transport Sunucusu** stdio aktarımı, yerel MCP sunucu-istemci iletişimi için önerilen standarttır ve yerleşik süreç izolasyonu ile güvenli alt süreç tabanlı iletişim sağlar [derse git](05-stdio-server/README.md)

- **6 MCP ile HTTP Akışı (Akışlı HTTP)**. Modern HTTP akış aktarımları hakkında bilgi sahibi olun (uzaktan MCP sunucuları için önerilen yaklaşım [MCP Spesifikasyonu 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http) uyarınca), ilerleme bildirimleri ve Akışlı HTTP kullanarak ölçeklenebilir, gerçek zamanlı MCP sunucuları ve istemcileri nasıl uygulayacağınızı öğrenin. [derse git](06-http-streaming/README.md)

- **7 MCP İstemci ve Sunucularınızı tüketmek ve test etmek için VSCode için AI Araç Setini kullanmak** [derse git](07-aitk/README.md)

- **8 Test Etme**. Burada özellikle sunucu ve istemcimizi farklı şekillerde nasıl test edebileceğimizi ele alacağız, [derse git](08-testing/README.md)

- **9 Dağıtım**. Bu bölüm MCP çözümlerinizi dağıtmanın farklı yollarına bakacaktır, [derse git](09-deployment/README.md)

- **10 Gelişmiş sunucu kullanımı**. Bu bölüm gelişmiş sunucu kullanımlarını kapsar, [derse git](./10-advanced/README.md)

- **11 Kimlik Doğrulama**. Bu bölüm Basit Kimlik Doğrulamayı ele alır, Temel Kimlik Doğrulamadan JWT ve RBAC kullanımına kadar. Burada başlamanız ve ardından Bölüm 5'teki Gelişmiş Konulara bakmanız ve Bölüm 2'de önerilen ek güvenlik sertleştirmelerini yapmanız tavsiye edilir, [derse git](./11-simple-auth/README.md)

- **12 MCP Hostları**. Claude Desktop, Cursor, Cline ve Windsurf gibi popüler MCP host istemcilerini yapılandırın ve kullanın. Aktarım türlerini ve hata giderme yöntemlerini öğrenin, [derse git](./12-mcp-hosts/README.md)

- **13 MCP Denetleyici**. MCP Denetleyici aracı ile MCP sunucularınızı etkileşimli olarak hata ayıklayın ve test edin. Araçları, kaynakları ve protokol mesajlarını nasıl çözümleyeceğinizi öğrenin, [derse git](./13-mcp-inspector/README.md)

- **14 Örnekleme**. MCP İstemcileri ile LLM ilgili görevlerde işbirliği yapan MCP Sunucuları oluşturun (2026-07-28 sürüm adayında kullanım dışı kaldı; 2025-11-25 için halen geçerli). [derse git](./14-sampling/README.md)

- **15 MCP Uygulamaları**. Ayrıca UI yönergeleriyle yanıt veren MCP Sunucuları oluşturun, [derse git](./15-mcp-apps/README.md)

Model Context Protocol (MCP), uygulamaların LLM'lere bağlam sağlamasını standartlaştıran açık bir protokoldür. MCP'yi yapay zeka uygulamaları için bir USB-C portu gibi düşünün – AI modellerini farklı veri kaynaklarına ve araçlara bağlamanın standart bir yolunu sunar.

## Öğrenme Hedefleri

Bu dersin sonunda şunları yapabileceksiniz:

- C#, Java, Python, TypeScript ve JavaScript için MCP geliştirme ortamlarını kurmak
- Özel özelliklerle (kaynaklar, istemler ve araçlar) temel MCP sunucuları oluşturmak ve dağıtmak
- MCP sunucularına bağlanan host uygulamalar oluşturmak
- MCP uygulamalarını test etmek ve hata ayıklamak
- Yaygın kurulum sorunlarını ve çözümlerini anlamak
- MCP uygulamalarınızı popüler LLM servislerine bağlamak

## MCP Ortamınızı Kurma

MCP ile çalışmaya başlamadan önce, geliştirme ortamınızı hazırlamak ve temel iş akışını anlamak önemlidir. Bu bölüm, MCP'ye sorunsuz bir başlangıç yapmanızı sağlamak için ilk kurulum adımlarında rehberlik edecektir.

### Ön Koşullar

MCP geliştirmeye başlamadan önce aşağıdakilere sahip olduğunuzdan emin olun:

- **Geliştirme Ortamı**: Seçtiğiniz dil için (C#, Java, Python, TypeScript veya JavaScript)
- **IDE/Düzenleyici**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm veya herhangi modern bir kod editörü
- **Paket Yöneticileri**: NuGet, Maven/Gradle, pip veya npm/yarn
- **API Anahtarları**: Host uygulamalarınızda kullanmayı planladığınız herhangi bir AI servisi için


### Resmi SDK'lar

Önümüzdeki bölümlerde Python, TypeScript, Java ve .NET kullanılarak yapılmış çözümleri göreceksiniz. İşte resmi olarak desteklenen tüm SDK'lar.

MCP, birden fazla dil için resmi SDK'lar sağlar ([MCP Spesifikasyonu 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) ile uyumlu):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Microsoft ile işbirliği içinde sürdürülür
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Spring AI ile işbirliği içinde sürdürülür
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Resmi TypeScript uygulaması
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Resmi Python uygulaması (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Resmi Kotlin uygulaması
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Loopwork AI ile işbirliği içinde sürdürülür
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Resmi Rust uygulaması
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Resmi Go uygulaması

## Önemli Noktalar

- MCP geliştirme ortamı, dil spesifik SDK'larla kurulumu kolaydır
- MCP sunucuları net şemalara sahip araçlar oluşturup kaydetmeyi içerir
- MCP istemcileri, genişletilmiş yeteneklerden faydalanmak için sunuculara ve modellere bağlanır
- Test etmek ve hata ayıklamak güvenilir MCP uygulamaları için esastır
- Dağıtım seçenekleri yerelden bulut tabanlı çözümlere kadar çeşitlidir

## Uygulama Yapma

Bu bölümdeki tüm bölümlerde göreceğiniz alıştırmaları tamamlayıcı örneklerimiz var. Ayrıca her bölümün kendi alıştırmaları ve görevleri vardır.

- [Java Hesap Makinesi](./samples/java/calculator/README.md)
- [.Net Hesap Makinesi](../../../03-GettingStarted/samples/csharp)
- [JavaScript Hesap Makinesi](./samples/javascript/README.md)
- [TypeScript Hesap Makinesi](./samples/typescript/README.md)
- [Python Hesap Makinesi](../../../03-GettingStarted/samples/python)

## Ek Kaynaklar

- [Model Context Protocol kullanarak Azure'da Ajanlar Oluşturma](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Azure Container Apps ile Uzaktan MCP (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Ajanı](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Sonrası

İlk derse başlayın: [İlk MCP Sunucunuzu Oluşturmak](01-first-server/README.md)

Bu modülü tamamladıktan sonra devam edin: [Modül 4: Pratik Uygulama](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->