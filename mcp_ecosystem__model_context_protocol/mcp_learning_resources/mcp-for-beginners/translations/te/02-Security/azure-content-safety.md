# Azure Content Safetyతో అభివృద్ధి చెందిన MCP భద్రత

> **OWASP MCP ప్రమాదం పరిష్కరించబడింది**: [MCP06 - సాందర్భిక పలోడ్ల ద్వారా ప్రాంప్ట్ ఇంజెక్షన్](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety మీ MCP అమలులను మరింత భద్రతగా చేయడానికి బలమైన పలు సాధనాలను అందిస్తుంది. పరిక్షణాత్మక అమలు అనుభవానికి, [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) క్యాంప్ 3: I/O భద్రత చూడండి.

## ప్రాంప్ట్ షీల్డ్లు

Microsoft యొక్క AI ప్రాంప్ట్ షీల్డ్లు నేరుగా మరియు పరోక్షంగా జరిగే ప్రాంప్ట్ ఇంజెక్షన్ దాడులపై బలమైన రక్షణను అందిస్తాయి:

1. **అత్యాధునిక గుర్తింపు**: కంటెంట్‌లో ఉన్న దుష్టమైన సూచనలను గుర్తించడానికి మెషీన్ లెర్ణింగ్ ఉపయోగిస్తుంది.
2. **స్పాట్‌లైటింగ్**: AI సిస్టమ్స్ చెల్లుబాటు అయ్యే సూచనలు మరియు బయటి ఇన్పుట్‌లను తేడా పడేలా ఇన్‌పుట్ టెక్స్ట్‌ను మారుస్తుంది.
3. **డెలిమిటర్లు మరియు డాటామార్కింగ్**: నమ్మకమైన మరియు నమ్మకంలేని డేటా మధ్య సరిహద్దులను గుర్తిస్తుంది.
4. **కంటెంట్ సేఫ్టీ అనుసంధానం**: Azure AI Content Safetyతో కలిసి జైల్బ్రేక్ ప్రయత్నాలు మరియు హాని కలిగించే కంటెంట్‌ను గుర్తిస్తుంది.
5. **నిరంతర అప్డేట్స్**: Microsoft కొత్తగా ఎదుగుతున్న ముప్పులపై రక్షణ మెకానిజంలను తరచుగా నవీకరిస్తుంది.

## MCPతో Azure Content Safetyను అమలు చేయటం

ఈ విధానం బహుళ-పాటాల రక్షణను అందిస్తుంది:
- ప్రాసెసింగ్ ప్రారంభించేముందు ఇన్పుట్‌లు స్కాన్ చేయడం
- రాబట్టే అవుట్పుట్‌లను ధృవీకరించడం
- హాని కలిగించే నమూనాల కోసం బ్లాక్‌లిస్టులను వినియోగించడం
- Azure యొక్క నిరంతర నవీకరింపబడుతున్న కంటెంట్ సేఫ్టీ మోడల్స్‌ను ఉపయోగించడం

## Azure Content Safety వనరులు

మీ MCP సర్వర్లతో Azure Content Safetyని అమలుచేయడంపై మరింత తెలుసుకోవడానికి, ఈ అధికారిక వనరులను పరిశీలించండి:

1. [Azure AI Content Safety డాక్యుమెంటేషన్](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety అధికారిక డాక్యుమెంటేషన్.
2. [ప్రాంప్ట్ షీల్డ్ డాక్యుమెంటేషన్](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - ప్రాంప్ట్ ఇంజెక్షన్ దాడులను నిరోధించడం ఎలా అనే సమాచారం.
3. [Content Safety API సూచిక](https://learn.microsoft.com/rest/api/contentsafety/) - Content Safety అమలుకు వివరమైన API సూచిక.
4. [క్విక్ స్టార్ట్: C#తో Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# ఉపయోగించి వేగవంతమైన అమలు మార్గదర్శకము.
5. [Content Safety క్లయింట్ లైబ్రరీలు](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - వివిధ ప్రోగ్రామింగ్ భాషల కోసం క్లయింట్ లైబ్రరీలు.
6. [జైల్బ్రేక్ ప్రయత్నాల గుర్తింపు](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - జైల్బ్రేక్ ప్రయత్నాలను గుర్తించి నిరోధించేందుకు వివరాలు.
7. [Content Safetyకి ఉత్తమ ఆచారాలు](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - అందుబాటులో ఉండే ఉత్తమ అమలులు.

వివరణాత్మక అమలుకు మా [Azure Content Safety అమలు గైడ్](./azure-content-safety-implementation.md) చూడండి.

## తదుపరి

- చదవండి: [Azure Content Safety అమలు](./azure-content-safety-implementation.md)
- తిరిగి వెళ్లండి: [భద్రత మాడ్యూల్ అవలోకనం](./README.md)
- కొనసాగించండి: [మాడ్యూల్ 3: ప్రారంభ దశ](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**తప్పింపు**:
ఈ డాక్యుమెంట్‌ను AI అనువాద సేవ [కో-ఓప్ ట్రాన్స్‌లేటర్](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించారు. మనం సరిగా ఉండేందుకు ప్రయత్నించినప్పటికీ, అంతర్జాల అనువాదాల్లో తప్పులు లేదా పొరపాట్లు ఉండవచ్చు. అసలు డాక్యుమెంట్ native (మూల) భాషలోని అధికారం ఉన్న మూలంగా పరిగణించబడాలి. అత్యవసరమైన సమాచారానికి, వృత్తిపరమైన మానవ అనువాదం సిఫార్సు చేయబడుతుంది. ఈ అనువాదం వలన ఏర్పడిన ఏవైనా తప్పుదోవలు లేదా తప్పుగా అర్థం చేసుకోవడంవల్ల మేము బాధ్యులు కిమ్మం.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->