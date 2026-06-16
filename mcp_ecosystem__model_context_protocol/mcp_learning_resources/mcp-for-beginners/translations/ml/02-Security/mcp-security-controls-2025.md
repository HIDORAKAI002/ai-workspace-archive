# MCP സെക്യൂരിറ്റി നിയന്ത്രണങ്ങൾ - ഫെബ്രുവരി 2026 അപ്‌ഡേറ്റ്

> **നിലവിലെ സ്റ്റാൻഡേർഡ്**: ഈ പ്രമാണം [MCP സ്പെസിഫിക്കേഷൻ 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) സെക്യൂരിറ്റി ആവശ്യകതകളും ഔദ്യോഗിക [MCP സെക്യൂരിറ്റി ബെസ്റ്റ് പ്രാക്ടീസുകളും](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) പ്രതിഫലിപ്പിക്കുന്നു.

Model Context Protocol (MCP) पारंपരിക സോഫ്റ്റ്‌വെയർ സെക്യൂരിറ്റിയുടെയും AI-സവിശേഷ ഭീഷണികളുടെയും അഭിമുഖീകരിക്കുന്ന മെച്ചപ്പെട്ട സെക്യൂരിറ്റി നിയന്ത്രണങ്ങളോടെ ശ്രദ്ധ്യതരമായി വളർന്നു. ഈ പ്രമാണം OWASP MCP ടോപ്പ് 10 ഫ്രെയിംവർകിനൊപ്പം സुसൂക്ഷ്മമായ MCP നടപ്പിലാക്കലിനുള്ള സമഗ്ര സെക്യൂരിറ്റി നിയന്ത്രണങ്ങൾ നൽകുന്നു.

## 🏔️ പ്രായോഗിക സെക്യൂരിറ്റി പരിശീലനം

പ്രായോഗിക, ഹാൻഡ്സ്-ഓൺ സെക്യൂരിറ്റി നടപ്പിലാക്കൽ പരിചയം നേടാനായി, നാം ശിപാർശ ചെയ്യുന്നത് **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** ആണ് - "വളർന്നു → ദുർവിനിയോഗം → പരിഹാരം → പരിശോധന" കാലക്രമം ഉപയോഗിച്ച് Azure-യിൽ MCP സെർവറുകൾ സുസൂക്ഷ്മമായി സുനിശ്ചിതമാക്കാനുള്ള സമഗ്ര ഗൈഡഡ് ექსპിഡിഷൻ.

ഈ പ്രമാണത്തിലെ എല്ലാ സെക്യൂരിറ്റി നിയന്ത്രണങ്ങളും **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** നുമായി സാദൃശ്യമുണ്ട്, ഇത് OWASP MCP ടോപ്പ് 10 അപകടങ്ങളുടെ Azure-നിർദ്ദിഷ്ട നടപ്പ് മാർഗനിർദേശങ്ങളും റഫറൻസ് ആർക്കിടെക്ചറും നൽകുന്നു.

## **ബന്ധമായുള്ള സെക്യൂരിറ്റി ആവശ്യകതകൾ**

### **MCP സ്പെസിഫിക്കേഷൻ നിന്നുള്ള അത്യാവശ്യം നിരോധനങ്ങൾ:**

> **നിരോധിച്ചിരിക്കുന്നു**: MCP സെർവറുകൾക്ക് MCP സെർവറിനായി സ്തുതി നൽകിയിട്ടില്ലാത്ത ടോകണുകൾ സ്വീകരിക്കരുത്  
>
> **നിരോധിച്ചിരിക്കുന്നു**: MCP സെർവറുകൾക്ക് ഓതന്റിക്കേഷനിൽ സെഷനുകൾ ഉപയോഗിക്കരുത്  
>
> **ആവശ്യമാണ്**: MCP സെർവറുകളിൽ അവകാശസൂത്രണം (authorization) നടപ്പിലാക്കുമ്പോൾ എല്ലാ ഇൻബൗണ്ട് അഭ്യർത്ഥനകളും പരിശോധിക്കണം  
>
> **ആവശ്യമാണ്**: സ്റ്റാറ്റിക് ക്ലയന്റ് ഐഡികൾ ഉപയോഗിക്കുന്ന MCP പ്രോക്സി സെർവറുകൾക്ക് ഡൈനാമിക് ആയി രജിസ്റ്റർ ചെയ്ത ഓരോ ക്ലയന്റിനും ഉപയോക്തൃ സമ്മതമെടുക്കണം

---

## 1. **ഓതന്റിക്കേഷൻ & അവകാശസൂത്രണ നിയന്ത്രണങ്ങൾ**

### **ബാഹ്യ ഐഡന്റിറ്റി പ്രൊവൈഡർ ഇന്റഗ്രേഷൻ**

**നിലവിലെ MCP സ്റ്റാൻഡേർഡ് (2025-11-25)** MCP സെർവറുകൾക്ക് ഓതന്റിക്കേഷൻ ബാഹ്യ ഐഡന്റിറ്റി പ്രൊവൈഡറുകളിലേക്ക് വകവരുത്തൽ അനുവദിക്കുന്നു, ഇത് ഒരു വമ്പിച്ച സെക്യൂരിറ്റി പുരോഗതിയാണ്:

**OWASP MCP അപകടം പരിഹരിച്ചത്**: [MCP07 - അപര്യാപ്തമായ ഓതന്റിക്കേഷൻ & അവകാശസൂത്രണം](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**സെക്യൂരിറ്റി ലാഭങ്ങൾ:**
1. **കസ്റ്റം ഓതന്റിക്കേഷൻ അപകടങ്ങൾ ഇല്ലാതാക്കുന്നു**: കസ്റ്റം ഓതന്റിക്കേഷൻ നടപ്പിലാക്കലുകൾ ഒഴിവാക്കുന്നതിലൂടെ ദുർബലതകൾ കുറയ്‌ക്കുന്നു  
2. **എന്റർപ്രൈസ് ഗ്രേഡ് സെക്യൂരിറ്റി**: Microsoft Entra ID പോലുള്ള സ്ഥാപിത ഐഡന്റിറ്റി പ്രൊവൈഡറുകൾ ഉപയോഗിച്ച് പരമാവധി ഭൂതകാല സുരക്ഷാ സവിശേഷതകൾ  
3. **കേന്ദ്രംകേന്ദ്രമായ ഐഡന്റിറ്റി മാനേജ്മെന്റ്**: ഉപയോക്തൃ ജീവിതചക്രം മാനേജ്മെന്റ്, ആക്‌സസ് നിയന്ത്രണം, അനുരൂപത ഓഡിറ്റിംഗ് ലളിതമാക്കുന്നു  
4. **മൾട്ടി-ഫാക്ടർ ഓതന്റിക്കേഷൻ**: എന്റർപ്രൈസ് ഐഡന്റിറ്റി പ്രൊവൈഡറുകളിൽ നിന്ന് MFA ശേഷികൾ  
5. **ഷരതമാന ആക്‌സസ് നയങ്ങൾ**: അപകടസംഗ്രഹീത ആക്‌സസ് നിയന്ത്രണങ്ങളും ചേരുവാനുസരണമുള്ള ഓതന്റിക്കേഷനും

**നടപടി ആവശ്യകതകൾ:**
- **ടോകൺ ഓഡിയൻസ് പരിശോധന**: എല്ലാ ടോക്കണുകളും MCP സെർവറിനായി സുതാര്യമായി നൽകിയിട്ടുണ്ടെന്ന് പരിശോധന  
- **ഇസ്യൂവിന്റെ സത്യമായില്ലായ്മ നിർണയം**: ടോകൺ ഇസ്യൂവർ പ്രതീക്ഷിച്ച ഐഡന്റിറ്റി പ്രൊവൈഡറുമായി പൊരുത്തപ്പെടുന്നുവെന്ന് സ്ഥിരീകരണം  
- **സിഗ്നേച്ചർ പരിശോധന**: ടോകണിന്റെ ക്രിപ്‌റ്റോഗ്രാഫിക് അഖണ്ഡത പരിശോധന  
- **കാലാവധി നിർവഹണം**: ടോകൺ ആയുസ്സിനെ കുറിച്ച് കടുത്ത നിർവഹണം  
- **സ്കോപ്പ് പരിശോധന**: അഭ്യർത്ഥിച്ച പ്രവർത്തനങ്ങൾക്ക് അനുയോജ്യമായ അനുമതികൾ ടോക്കണുകളിൽ അടങ്ങിയിട്ടുണ്ടെന്ന് ഉറപ്പാക്കൽ

### **അവകാശസൂത്രണ നിരീക്ഷണ സുരക്ഷ**

**പ്രധാന നിയന്ത്രണങ്ങൾ:**
- **സമഗ്ര അവകാശസൂത്രണം ഓഡിറ്റുകൾ**: എല്ലാ അവകാശനിർണ്ണയ പോയിന്റുകൾക്കും regelmäßige സെക്യൂരിറ്റി നിരീക്ഷണങ്ങൾ  
- **ഫെയിൽ-സേഫ് ഡിഫോൾറ്റുകൾ**: അവകാശസൂത്രണ ലജിക് വ്യക്തമായ തീരുമാനം കിട്ടില്ലെങ്കിൽ ആക്‌സസ് നിഷേധം  
- **അനുമതി പരിമിതികൾ**: വ്യത്യസ്ത പ്രീവിലേജ് തലങ്ങൾക്കും റിസോഴ്‌സ് ആക്‌സസിനും വ്യക്തമായ വ്യത്യാസം  
- **ഓഡിറ്റ് ലോഗിംഗ്**: എല്ലാ അവകാശ തീരുമാനങ്ങളുടെ സമഗ്ര ലോഗിംഗ് സുരക്ഷാ നിരീക്ഷണത്തിനായി  
- **നിയത ആക്‌സസ് റിവ്യൂസ്**: ഉപയോക്തൃ അനുമതികൾ, പ്രീവിലേജ് നിയോഗങ്ങൾ കാലാന്തരലക്ഷ്യം പരിശോധിക്കൽ

## 2. **ടോക്കൺ സെക്യൂരിറ്റിയും എന്റി-പാസ്സ്ത്രൂ നിയന്ത്രണങ്ങളും**

**OWASP MCP അപകടം പരിഹരിച്ചത്**: [MCP01 - ടോക്കൺ തെറ്റായ കൈകാര്യം & രഹസ്യ അനാവരണം](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **ടോക്കൺ പാസ്സ്ത്രൂ തടയൽ**

MCP അവകാശസൂത്രണ സ്പെസിഫിക്കേഷനിൽ ടോക്കൺ പാസ്സ്ത്രൂ **തടങ്ങിയിരിക്കുന്നു**, കാരണം അത്യന്തം പ്രധാനപ്പെട്ട സെക്യൂരിറ്റി അപകടങ്ങൾ:

**സെക്യൂരിറ്റി അപകടങ്ങൾ:**
- **നിയന്ത്രണം മറികടക്കൽ**: നിരക്ക് നിയന്ത്രണം, അഭ്യർത്ഥന സ്ഥിരീകരണം, ട്രീഫിക് നിരീക്ഷണം പോലുള്ള നിർണായക നിയന്ത്രണങ്ങൾ മറികടക്കുന്നു  
- **കൃത്യക്കാർവർ അധിവസം**: ക്ലയന്റ് തിരിച്ചറിയൽ അസാധ്യമായി, ഓഡിറ്റ് ട്രെയിലുകളും സംഭവ പരിശോധനയും അശുദ്ധമാക്കുന്നു  
- **പ്രോക്സി അധിഷ്ഠിത പുറത്തെടുക്കൽ**: ദുർവിനിയോഗ ക്ഷേത്രങ്ങൾ അനധികൃത ഡാറ്റ ആക്‌സസിനായി സെർവറുകൾ പ്രോക്സികൾ ആയി ഉപയോഗിക്കുന്നു  
- **വിശ്വസന പരിധി ലംഘനം**: ടോക്കൺ ഉത്ഭവത്തെ കുറിച്ചുള്ള ഡൗൺസ്ട്രീം സർവീസ് വിശ്വാസം പരാജയപ്പെടുന്നു  
- **ലാറ്ററൽ മൂവ്‌മെന്റ്**: നിരവധി സേവനങ്ങളിൽ കവര്‍ന്ന ടോക്കണുകൾ വ്യാപക ആക്രമണത്തിന്റെ വഴി തുറക്കുന്നു

**നടപടി നിയന്ത്രണങ്ങൾ:**
```yaml
Token Validation Requirements:
  audience_validation: MANDATORY
  issuer_verification: MANDATORY  
  signature_check: MANDATORY
  expiration_enforcement: MANDATORY
  scope_validation: MANDATORY
  
Token Lifecycle Management:
  rotation_frequency: "Short-lived tokens preferred"
  secure_storage: "Azure Key Vault or equivalent"
  transmission_security: "TLS 1.3 minimum"
  replay_protection: "Implemented via nonce/timestamp"
```

### **സുരക്ഷിത ടോക്കൺ മാനേജ്മെന്റ് പാറ്റേണുകൾ**

**ശ്രേഷ്ട പ്രാക്ടീസുകൾ:**
- **ഷോർട്-ലൈവഡ് ടോക്കണുകൾ**: ആവർത്തിച്ച് ടോക്കൺ റോട്ടേഷൻ വഴി എകെസോഴ്ച മഴവ് കുറയ്ക്കൽ  
- **ജസ്റ്റ്-ഇൻ-ടൈം ഇഷ്യു**: നിർദ്ദിഷ്ട പ്രവർത്തനങ്ങൾക്ക് മാത്രമേ ടോക്കണുകൾ പുറത്തുവിടാവൂ  
- **സുരക്ഷിത സംഭരണം**: ഹാർഡ്‌വെയർ സെക്യൂരിറ്റി മോഡ്യൂളുകൾ (HSMs) അല്ലെങ്കിൽ സുരക്ഷിത കീ വോള്റ്റുകൾ ഉപയോഗിക്കുക  
- **ടോക്കൺ ബൈൻഡിങ്**: സാധിക്കുന്തോറും ടോക്കണുകൾ പ്രത്യേക ക്ലയന്റുകളിലേക്ക്, സെഷനുകളിലേക്കോ പ്രവർത്തനങ്ങളിലേക്കോ ബന്ധിപ്പിക്കുക  
- **നിരീക്ഷണവും അലർട്ടിംഗും**: ടോക്കൺ ദുരുപയോഗം അല്ലെങ്കിൽ അനധികൃത ആക്‌സസ് പാറ്റേണുകൾ സമയോചിതമായി കണ്ടെത്തൽ

## 3. **സെഷൻ സെക്യൂരിറ്റി നിയന്ത്രണങ്ങൾ**

### **സെഷൻ ഹിജാക്കിംഗ് തടയൽ**

**ആക്രമണ മാർഗങ്ങൾ:**
- **സെഷൻ ഹിജാക്ക് പ്രോംപ്റ്റ് ഇൻജക്ഷൻ**: പങ്കുവെക്കുന്ന സെഷൻ സ്‌റ്റേറ്റിൽ ദുർദ്ദേശിയായ സംഭവങ്ങൾ ഇൻജക്ട് ചെയ്യുക  
- **സെഷൻ നകലി**: മോഷൺചെയ്ത സെഷൻ ഐഡി അനധികൃതമായി ഉപയോഗിച്ച് ഓതന്റിക്കേഷൻ മറികടക്കുക  
- **റിസ്യൂമബിൾ സ്ട്രീം ആക്രമണങ്ങൾ**: ദുർവിനിയോഗത്തിന് സർവർ-സെൻറ് ഇവന്റ് റിസംപ്ഷൻ ഉപയോഗം

**അത്യാവശ്യം സെഷൻ നിയന്ത്രണങ്ങൾ:**
```yaml
Session ID Generation:
  randomness_source: "Cryptographically secure RNG"
  entropy_bits: 128 # Minimum recommended
  format: "Base64url encoded"
  predictability: "MUST be non-deterministic"

Session Binding:
  user_binding: "REQUIRED - <user_id>:<session_id>"
  additional_identifiers: "Device fingerprint, IP validation"
  context_binding: "Request origin, user agent validation"
  
Session Lifecycle:
  expiration: "Configurable timeout policies"
  rotation: "After privilege escalation events"
  invalidation: "Immediate on security events"
  cleanup: "Automated expired session removal"
```

**ട്രാൻസ്പോർട്ട് സുരക്ഷ:**
- **HTTPS നിർബന്ധിതമാക്കൽ**: എല്ലാ സെഷൻ ആശയവിനിമയം TLS 1.3 വഴി  
- **സുരക്ഷിത കുക്കി ഗുണങ്ങൾ**: HttpOnly, Secure, SameSite=Strict  
- **സർട്ടിഫിക്കറ്റ് പിന്നിങ്ങ്**: MITM ആക്രമണങ്ങൾ തടയാൻ നിർണായക ബന്ധങ്ങൾക്കായി

### **സ്റ്റേറ്റ്ഫുൾ vs സ്റ്റേറ്റ്ലെസ് പരിഗണനകൾ**

**സ്റ്റേറ്റ്ഫുൾ നടപ്പിലാക്കലുകൾക്ക്:**
- പങ്കുവെക്കുന്ന സെഷൻ സ്‌റ്റേറ്റ് ഇൻജക്ഷൻ ആക്രമണങ്ങളിൽ നിന്ന് അധിക സംരക്ഷണം ആവശ്യമാണ്  
- ക്യൂ-അധിഷ്ഠിത സെഷൻ മാനേജ്മെന്റ് ഇന്റഗ്രിറ്റി പരിശോധന ആവശ്യമാണ്  
- ഒട്ടേറെ സെർവർ നോർമബന്ധികൾക്ക് സുരക്ഷിത സെഷൻ സ്‌റ്റേറ്റ് സിംക്രണൈസേഷൻ പ്രധാനമാണ്

**സ്റ്റേറ്റ്ലെസ് നടപ്പിലാക്കലുകൾക്ക്:**
- JWT പോലുള്ള ടോക്കൺ അടിസ്ഥാന സെഷൻ മാനേജ്മെന്റ്  
- സെഷൻ സ്‌റ്റേറ്റ് ഇന്റഗ്രിറ്റി ക്രിപ്‌റ്റോഗ്രാഫിക് പരിശോധന  
- ആക്രമണ ഉപരിതല ചെറുതായിരിക്കുന്നു പക്ഷെ ശക്തമായ ടോക്കൺ പരിശോധന ആവശ്യമാണ്

## 4. **AI-സവിശേഷ സെക്യൂരിറ്റി നിയന്ത്രണങ്ങൾ**

**OWASP MCP അപകടങ്ങൾ പരിഹരിച്ചത്**:
- [MCP06 - ഇന്റന്റ് ഫ്ലോ ഉപദ്രവം](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - ടൂൾ വിഷബാധ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - കമാൻഡ് ഇൻജക്ഷൻ & എക്സിക്യൂഷൻ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **പ്രോംപ്റ്റ് ഇൻജക്ഷൻ പ്രതിരോധം**

**Microsoft Prompt Shields ഇന്റഗ്രേഷൻ:**
```yaml
Detection Mechanisms:
  - "Advanced ML-based instruction detection"
  - "Contextual analysis of external content"
  - "Real-time threat pattern recognition"
  
Protection Techniques:
  - "Spotlighting trusted vs untrusted content"
  - "Delimiter systems for content boundaries"  
  - "Data marking for content source identification"
  
Integration Points:
  - "Azure Content Safety service"
  - "Real-time content filtering"
  - "Threat intelligence updates"
```

**നടപടി നിയന്ത്രണങ്ങൾ:**
- **ഇൻപുട്ട് ശുദ്ധീകരണം**: എല്ലാ ഉപയോക്തൃ ഇൻപുട്ടുകളും സമഗ്രമായി പരിശോധനയും ഫിൽട്ടറിംഗും  
- **വിഷയപരിധി നിർവ്വചനം**: സിസ്റ്റം നിർദ്ദേശങ്ങൾക്കും ഉപയോക്തൃ ഉള്ളടക്കത്തിനും വ്യക്തമായ വിഭജനം  
- **നിർദ്ദേശം പരമ്പര**: പരസ്പരവിരുദ്ധമായ നിർദ്ദേശങ്ങൾക്ക് ശരിയായ മുൻഗണന നിബന്ധനകൾ  
- **ഔട്ട്‌പുട്ട് നിരീക്ഷണം**: ദുർദ്ദേശിയായ അല്ലെങ്കിൽ മാനിപുലേറ്റ് ചെയ്ത ഔട്ട്‌പുട്ടുകൾ കണ്ടെത്തൽ

### **ടൂൾ വിഷബാധ തടയൽ**

**ടൂൾ സെക്യൂരിറ്റി ഫ്രെയിംവർക്ക്:**
```yaml
Tool Definition Protection:
  validation:
    - "Schema validation against expected formats"
    - "Content analysis for malicious instructions" 
    - "Parameter injection detection"
    - "Hidden instruction identification"
  
  integrity_verification:
    - "Cryptographic hashing of tool definitions"
    - "Digital signatures for tool packages"
    - "Version control with change auditing"
    - "Tamper detection mechanisms"
  
  monitoring:
    - "Real-time change detection"
    - "Behavioral analysis of tool usage"
    - "Anomaly detection for execution patterns"
    - "Automated alerting for suspicious modifications"
```

**ഡൈനാമിക് ടൂൾ മാനേജ്മെന്റ്:**
- **അനുമതി പ്രവാഹങ്ങൾ**: ടൂൾ മാറ്റങ്ങൾക്ക് വ്യക്തമായ ഉപയോക്തൃ സമ്മതമെടുക്കൽ  
- **റോള്ബാക്ക് കഴിവുകൾ**: മുൻ ടൂൾ പതിപ്പുകളിലേക്ക് മടങ്ങാനുള്ള കഴിവ്  
- **മാറ്റ ഓഡിറ്റിങ്**: ടൂൾ നിർവചന മാറ്റങ്ങളുടെ സമഗ്ര ചരിത്രം  
- **അപകടനിർണ്ണയം**: ടൂൾ സെക്യൂരിറ്റി നില വിലയിരുത്തൽ ഓട്ടോമേറ്റഡ്

## 5. **Confused Deputy ആക്രമണ പ്രതിരോധം**

### **OAuth പ്രോക്സി സെക്യൂരിറ്റി**

**ആക്രമണം തടയൽ നിയന്ത്രണങ്ങൾ:**
```yaml
Client Registration:
  static_client_protection:
    - "Explicit user consent for dynamic registration"
    - "Consent bypass prevention mechanisms"  
    - "Cookie-based consent validation"
    - "Redirect URI strict validation"
    
  authorization_flow:
    - "PKCE implementation (OAuth 2.1)"
    - "State parameter validation"
    - "Authorization code binding"
    - "Nonce verification for ID tokens"
```

**നടപടി ആവശ്യകതകൾ:**
- **ഉപയോക്തൃ സമ്മത പരിശോധന**: ഡൈനാമിക് ക്ലയന്റ് രജിസ്ട്രേഷനിൽ സമ്മത സ്ക്രീനുകൾ ഒരിക്കലും ഒഴിവാക്കരുത്  
- **റിഡയരക്ട് URI പരിശോധന**: റിഡയറക്ഷൻ ഗമ്യസ്ഥലങ്ങളുടെ കർശന വൈറ്റ്‌ലിസ്റ്റ് അടിസ്ഥാന പരിശോധന  
- **അവകാശസൂത്രണ കോഡ് സംരക്ഷണം**: കുറുങ്ങായ കാലാവധിയുള്ള ഒറ്റത്തവണ ഉപയോഗ കോഡുകൾ  
- **ക്ലയന്റ് ഐഡന്റിറ്റി പരിശോധന**: ക്ലയന്റ് ക്രെഡൻഷ്യലും മെടാഡാറ്റയും കൃത്യമായി പരിശോധിക്കൽ

## 6. **ടൂൾ എക്സിക്യൂഷൻ സെക്യൂരിറ്റി**

### **സാൻഡ്ബോക്ഷിംഗ് & ഐസൊലേഷൻ**

**കന്റെയ്നർ അടിസ്ഥാന ഐസൊലേഷൻ:**
```yaml
Execution Environment:
  containerization: "Docker/Podman with security profiles"
  resource_limits:
    cpu: "Configurable CPU quotas"
    memory: "Memory usage restrictions"
    disk: "Storage access limitations"
    network: "Network policy enforcement"
  
  privilege_restrictions:
    user_context: "Non-root execution mandatory"
    capability_dropping: "Remove unnecessary Linux capabilities"
    syscall_filtering: "Seccomp profiles for syscall restriction"
    filesystem: "Read-only root with minimal writable areas"
```

**പ്രോസസ് ഐസൊലേഷൻ:**
- **വിവിധ പ്രോസസ് കോൺടെക്‌സ്റ്റുകൾ**: ഓരോ ടൂൾ എക്സിക്യൂഷനും പ്രത്യേകം പ്രോസസ് സ്‌പേസിൽ  
- **ഇൻറർ-പ്രോസസ് കമ്മ്യൂണിക്കേഷൻ**: പരിശുദ്ധമായ IPC സംവിധാനങ്ങൾ  
- **പ്രോസസ് മോണിറ്ററിംഗും**: റൺടൈം പെരുമാറ്റ വിശകലനവും അനോമലി കണ്ടെത്തലും  
- **സ്രോതസ്സ് നിയന്ത്രണം**: CPU, മെമ്മറി, I/O പ്രവർത്തനങ്ങളിൽ കഠിന പരിധികൾ

### **അതിനും വൈകാരികമായാവശ്യമായ അനുവദനങ്ങൾ**

**അനുമതി മാനേജ്മെന്റ്:**
```yaml
Access Control:
  file_system:
    - "Minimal required directory access"
    - "Read-only access where possible"
    - "Temporary file cleanup automation"
    
  network_access:
    - "Explicit allowlist for external connections"
    - "DNS resolution restrictions" 
    - "Port access limitations"
    - "SSL/TLS certificate validation"
  
  system_resources:
    - "No administrative privilege elevation"
    - "Limited system call access"
    - "No hardware device access"
    - "Restricted environment variable access"
```

## 7. **സപ്ലൈ ചെയിൻ സെക്യൂരിറ്റി നിയന്ത്രണങ്ങൾ**

**OWASP MCP അപകടം പരിഹരിച്ചത്**: [MCP04 - സോഫ്റ്റ്വെയർ സപ്ലൈ ചെയിൻ ആക്രമണങ്ങളും ആശ്രിതന്മാരുടെ തട്ടിപ്പും](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **ആശ്രിതത്വ പരിശോധന**

**സമഗ്ര ഘടകം സെക്യൂരിറ്റി:**
```yaml
Software Dependencies:
  scanning: 
    - "Automated vulnerability scanning (GitHub Advanced Security)"
    - "License compliance verification"
    - "Known vulnerability database checks"
    - "Malware detection and analysis"
  
  verification:
    - "Package signature verification"
    - "Checksum validation"
    - "Provenance attestation"
    - "Software Bill of Materials (SBOM)"

AI Components:
  model_verification:
    - "Model provenance validation"
    - "Training data source verification" 
    - "Model behavior testing"
    - "Adversarial robustness assessment"
  
  service_validation:
    - "Third-party API security assessment"
    - "Service level agreement review"
    - "Data handling compliance verification"
    - "Incident response capability evaluation"
```

### **ദീർഘകാല നിരീക്ഷണം**

**സപ്ലൈ ചെയിൻ ഭീഷണിവിവരം കണ്ടെത്തൽ:**
- **ആശ്രിതാരോഗ്യ നിരീക്ഷണം**: എല്ലാ ആശ്രിതങ്ങളുടെയും സുരക്ഷാ പ്രശ്നങ്ങൾക്കുള്ള തുടർച്ചയായ മൂല്യനിർണ്ണയം  
- **ഭീഷണി ഇന്റലിജൻസ് ഇന്റഗ്രേഷൻ**: ഉയരുന്ന സപ്ലൈ ചെയിൻ ഭീഷണികളെ കുറിച്ച് യഥാർത്ഥ സമയ അപ്‌ഡേറ്റുകൾ  
- **പ്രവൃത്തി വിശകലനം**: ബാഹ്യ ഘടകങ്ങളിൽ അസാധാരണ പെരുമാറ്റം തിരിച്ചറിയൽ  
- **ഓട്ടോമേറ്റഡ് പ്രതികരണം**: അപകടമേറ്റ ഘടകങ്ങളുടെ ഉടൻ തടയൽ

## 8. **നിരീക്ഷണവും കണ്ടെത്തലും നിയന്ത്രണങ്ങൾ**

**OWASP MCP അപകടം പരിഹരിച്ചത്**: [MCP08 - ഓഡിറ്റ് & ടെലിമെട്രി അഭാവം](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **സെക്യൂരിറ്റി ഇൻഫർമേഷൻ & ഇവന്റ് മാനേജ്മെന്റ് (SIEM)**

**സമഗ്ര ലോഗിംഗ് സ്ട്രാറ്റജി:**
```yaml
Authentication Events:
  - "All authentication attempts (success/failure)"
  - "Token issuance and validation events"
  - "Session creation, modification, termination"
  - "Authorization decisions and policy evaluations"

Tool Execution:
  - "Tool invocation details and parameters"
  - "Execution duration and resource usage"
  - "Output generation and content analysis"
  - "Error conditions and exception handling"

Security Events:
  - "Potential prompt injection attempts"
  - "Tool poisoning detection events"
  - "Session hijacking indicators"
  - "Unusual access patterns and anomalies"
```

### **യഥാർത്ഥസമയം ഭീഷണി കണ്ടെത്തൽ**

**പ്രവൃത്തി വിശകലനം:**
- **ഉപയോക്തൃ പ്രവൃത്തി അനലിറ്റിക്സ് (UBA)**: അസാധാരണ ഉപയോക്തൃ ആക്‌സസ് പാറ്റേണുകൾ കണ്ടെത്തൽ  
- **ഇക്വിറ്റി അതിന്റെ അടിസ്ഥാന നടത്തുന്ന MCP സെർവർ & ടൂളുകൾ**: സെർവർ, ടൂൾ പ്രവർത്തന നിരീക്ഷണം  
- **മെഷീൻ ലേണിംഗ് അനോമലി കണ്ടെത്തൽ**: AI-ച്ചാലിതമായ സെക്യൂരിറ്റി ഭീഷണികൾ തിരിച്ചറിയൽ  
- **ഭീഷണി ഇന്റലിജൻസ് കോറിലേഷൻ**: അറിയപ്പെടുന്ന ആക്രമണ പാറ്റേണുകളുമായി കാണപ്പെട്ട പ്രവർത്തനം താരതമ്യം

## 9. **സംഭവ പ്രതികരണം & പുനഃസ്ഥാപനം**

### **ഓട്ടോമേറ്റഡ് പ്രതികരണ ശേഷികൾ**

**ത്വരിത പ്രതികരണ നടപടികൾ:**
```yaml
Threat Containment:
  session_management:
    - "Immediate session termination"
    - "Account lockout procedures"
    - "Access privilege revocation"
  
  system_isolation:
    - "Network segmentation activation"
    - "Service isolation protocols"
    - "Communication channel restriction"

Recovery Procedures:
  credential_rotation:
    - "Automated token refresh"
    - "API key regeneration"
    - "Certificate renewal"
  
  system_restoration:
    - "Clean state restoration"
    - "Configuration rollback"
    - "Service restart procedures"
```

### **ഫോറൻസിക് ശേഷികൾ**

**പരിശോധന സഹായം:**
- **ഓഡിറ്റ് ട്രെയിൽ സംരക്ഷണം**: ക്രിപ്‌റ്റോഗ്രാഫിക് അഖണ്ഡതയുള്ള അനിയന്ത്രിത ലോഗിംഗ്  
- **രേഖശേഖരണം**: അനുയോജ്യമായ സെക്യൂരിറ്റി അനുബന്ധങ്ങൾ ഓട്ടോമാറ്റിക് ശേഖരണം  
- **താരിവേള സംവിധാനം**: സുരക്ഷാ സംഭവങ്ങളിലേക്കുള്ള സംഭവങ്ങളുടെ വിശദമായ ക്രമീകരണം  
- **പ്രഭാവത്തിന്റെ മൂല്യനിർണ്ണയം**: കവര്‍ച്ച പരിധിയും ഡാറ്റ അനാവരണവും വിലയിരുത്തൽ

## **പ്രധാന സെക്യൂരിറ്റി ആർക്കിടെക്ചർ സിദ്ധാന്തങ്ങൾ**

### **ആഴത്തിലുള്ള പ്രതിരോധം**
- **ഒട്ടേറെ സെക്യൂരിറ്റി നിലകൾ**: സെക്യൂരിറ്റി ആർക്കിടെക്ചറിലുള്ള ഒരൊറ്റ പരാജയബിന്ദു ഇല്ല  
- **പുനരാവർത്തന നിയന്ത്രണങ്ങൾ**: നിർണ്ണായക പ്രവർത്തനങ്ങൾക്ക് ആവശ്യമായ സുരക്ഷാ നിയന്ത്രണങ്ങളുടെ മടങ്ങിവരവ്  
- **ഫെയിൽ-സേഫ് മെക്കാനിസങ്ങൾ**: സിസ്റ്റങ്ങളിലുണ്ടാകുന്ന പിഴവുകളോ ആക്രമണങ്ങളോ നേരെ വരുമ്പോൾ സുരക്ഷിതമായ ഡിസ്ഫോൾട് ക്രമീകരണം

### **സീറോ ട്രസ്റ്റ് നടപ്പിലാക്കൽ**
- **ഒരിക്കലും വിശ്വസിക്കല്ല, സദാ പരിശോധിക്കുക**: എല്ലാ ഏജന്റുകളും അഭ്യർത്ഥനകളും തുടർച്ചയായ പരിശോധന  
- **കുറഞ്ഞാനുമതി സിദ്ധാന്തം**: എല്ലാ ഘടകങ്ങൾക്കും കുറഞ്ഞ ആക്‌സസ് അവകാശങ്ങൾ  
- **മൈക്രോ സെഗ്മെന്റേഷൻ**: നാനാതുറകളുള്ള നെറ്റ്‌വർക്ക് & ആക്‌സസ് നിയന്ത്രണങ്ങൾ

### **തുടർച്ചയായ സെക്യൂരിറ്റി പുരോഗതി**
- **ഭീഷണി ഭൂപ്രദേശം അനുസരണം**: ഉയരുന്ന ഭീഷണികളെ നേരിടാൻ കൃത്യമായ ലളിതമായ അപ്‌ഡേറ്റുകൾ  
- **സെക്യൂരിറ്റി നിയന്ത്രണ ഫലപ്രാപ്തി**: നിയന്ത്രണങ്ങളുടെ നിരന്തര വിലയിരുത്തലും മെച്ചപ്പെടുത്തലും  
- **സ്പെസിഫിക്കേഷൻ അനുകൂലത**: വളരുന്ന MCP സെക്യൂരിറ്റി സ്റ്റാൻഡേർഡുകൾക്കൊപ്പം സമന്വയം

---

## **നടപടി ഉറവിടങ്ങൾ**

### **അധികാരിക MCP ഡോക്യുമെന്റേഷൻ**
- [MCP സ്പെസിഫിക്കേഷൻ (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP സെക്യൂരിറ്റി ബെസ്റ്റ് പ്രാക്ടീസുകൾ](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP അവകാശസൂത്രണ സ്പെസിഫിക്കേഷൻ](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP സെക്യൂരിറ്റി ഉറവിടങ്ങൾ**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 ന്റെ സമഗ്രവും Azure നടപ്പിലാക്കലും  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - ഔദ്യോഗിക OWASP MCP സെക്യൂരിറ്റി അപകടങ്ങൾ  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure-ൽ MCP-ക്കായി ഹാൻഡ്സ്-ഓൺ സെക്യൂരിറ്റി പരിശീലനം

### **Microsoft സെക്യൂരിറ്റി സൊല്യൂഷനുകൾ**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **സെക്യൂരിറ്റി സ്റ്റാൻഡേർഡുകൾ**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

> **പ്രധാനമാണ്**: ഈ സെക്യൂരിറ്റി നിയന്ത്രണങ്ങൾ നിലവിലെ MCP സ്പെസിഫിക്കേഷൻ (2025-11-25) പ്രതിഫലിപ്പിക്കുന്നു. സ്റ്റാൻഡേർഡുകൾ വേഗത്തിൽ മാറികൊണ്ടിരിക്കുന്നതിനാൽ ഏറ്റവും പുതിയ [അധികാരിക ഡോക്യുമെന്റേഷൻ](https://spec.modelcontextprotocol.io/) ൽന്നും സ്ഥിരം സ്ഥിരീകരിക്കുക.

## അടുത്തത് എന്താണ്

- തിരികെ പോകുക: [Security Module Overview](./README.md)
- തുടര്‍ന്ന് പോകുക: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->