# Azure உள்ளடக்க பாதுகாப்புடன் மேம்பட்ட MCP பாதுகாப்பு

> **OWASP MCP அபாயத்தை அணுகியது**: [MCP06 - Contextual Payloads மூலம் Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure உள்ளடக்க பாதுகாப்பு உங்கள் MCP செயல்பாடுகளின் பாதுகாப்பை மேம்படுத்த கூடிய பல சக்திவாய்ந்த கருவிகளை வழங்குகிறது. நேரடி செயல்பாட்டு அனுபவத்திற்காக, [MCP Security Summit வேலைமுறைப் பாடம் (Sherpa)](https://azure-samples.github.io/sherpa/) முகாம் 3: I/O பாதுகாப்பைப் பாருங்களேன்.

## Prompt உடைப்பாணிகள்

Microsoft இன் AI Prompt உடைப்பாணிகள் நேரடி மற்றும் மறைமுக prompt injection தாக்குதல்களுக்குப் வலுவான பாதுகாப்பை வழங்குகின்றன:

1. **மேம்பட்ட கண்டறிதல்**: உள்ளடக்கத்தில் உள்ள தீனமான指令களை கண்டறிய மெஷின் லெர்னிங் பயன்படுத்துகிறது.
2. **ஒளிபடுதல்**: AI அமைப்புக்கள் செல்லுபடியாகும்指令க்கும் வெளி இடுக்கிகளைக்குமான வேறுபாட்டை உதவுவதற்காக உள்ளீட்டு உரையை மாற்றுகிறது.
3. **குறியீட்டானிகள் மற்றும் தரவுமுத்திரை**: நம்பகத்தக்க மற்றும் நம்பமுடாத தரவுகளுக்கிடையேயான எல்லைகளை குறிக்கிறது.
4. **உள்ளடக்க பாதுகாப்பு ஒருங்கிணைப்பு**: Azure AI உள்ளடக்க பாதுகாப்புடன் இணைந்து jailbreak முயற்சிகள் மற்றும் தீங்கான உள்ளடக்கங்களை கண்டறிகிறது.
5. **தொடர்ச்சியான மேம்படுத்தல்கள்**: Microsoft புதுப்பிக்கப்படும் ஆபத்துக்களை எதிர்கொள்ள பாதுகாப்பு முறைகளை தொடர்ச்சியாக மேம்படுத்துகிறது.

## MCP உடன் Azure உள்ளடக்க பாதுகாப்பை செயல்படுத்துதல்

இந்த முறையில் பல அடுக்கு பாதுகாப்புகள் வழங்கப்படுகின்றன:
- செயலாக்கத்திற்கு முன் உள்ளீடுகளை ஸ்கேன் செய்தல்
- திருப்புவதற்கு முன் வெளிப்படுத்தல்களை சரிபார்த்தல்
- அறிந்த தீங்கான வடிவங்களுக்கான தடுப்பு பட்டியல்களை பயன்படுத்துதல்
- Azure இன் தொடர்ந்து புதுப்பிக்கப்படும் உள்ளடக்க பாதுகாப்பு மாதிரிகளை நம்புதல்

## Azure உள்ளடக்க பாதுகாப்பு வளங்கள்

உங்கள் MCP சர்வர்களுடன் Azure உள்ளடக்க பாதுகாப்பை செயல்படுத்துவது பற்றி மேலும் அறிய இதைப் பரிசீலிக்கவும்:

1. [Azure AI Content Safety ஆவணம்](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure உள்ளடக்க பாதுகாப்புக்கான அங்கீகாரம் ஆவணம்.
2. [Prompt Shield ஆவணம்](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - prompt injection தாக்குதல்களை தடுக்கும் முறைகள்.
3. [Content Safety API குறிப்பு](https://learn.microsoft.com/rest/api/contentsafety/) - Content Safety செயல்படுத்துவதற்கான விரிவான API குறிப்பு.
4. [Quickstart: Azure Content Safety C# உடன்](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# பயன்படுத்தி விரைவான செயல்பாட்டு வழிகாட்டு.
5. [Content Safety Client நூலகங்கள்](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - பல நிரலைக் மொழிகளுக்கான கிளயண்ட் நூலகங்கள்.
6. [Jailbreak முயற்சிகளை கண்டறிதல்](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Jailbreak முயற்சிகளை கண்டறிய மற்றும் தடுப்பதில் குறிப்புகள்.
7. [Content Safetyக்கும் சிறந்த நடைமுறைகள்](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - உள்ளடக்க பாதுகாப்பை திறம்பட செயல்படுத்த சிறந்த நடைமுறைகள்.

மேலும் ஆழமான செயல்பாட்டிற்கு, எமது [Azure Content Safety Implementation வழிகாட்டி](./azure-content-safety-implementation.md) என்பதைக் காண்க.

## அடுத்து என்ன

- வாசிக்கவும்: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- திரும்பவும்: [பாதுகாப்பு தொகுதி அவலோகம்](./README.md)
- தொடரவும்: [தொகுதி 3: தொடங்குதல்](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**குறிப்பு**:
இந்த ஆவணம் AI மொழி மாற்ற சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) மூலம் மொழி மாற்றப்பட்டது. நாம் துல்லியத்திற்காக முயல்வினும், தானியங்கி மொழி மாற்றங்களில் பிழைகள் அல்லது தவறுகள் இருக்கக்கூடும் என்பதை தயவுசெய்து கவனத்தில் கொள்ளவும். இயல்பான மொழியில் உள்ள மூல ஆவணம் அதிகாரப்பூர்வ மூலமாகக் கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, நிபுணர் மனித மொழி மாற்றத்தை பரிந்துரைக்கிறோம். இந்த மொழி மாற்றத்தைப் பயன்படுத்துவதால் ஏற்படும் எந்தவொரு தவறான புரிதல்களுக்கும் அல்லதுMissinterpretationsக்கும் நாங்கள் பொறுப்பல்ல.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->