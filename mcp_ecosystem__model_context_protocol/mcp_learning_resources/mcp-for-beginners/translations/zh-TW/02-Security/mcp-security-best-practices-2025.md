# MCP 安全最佳實務 - 2026 年 2 月更新

> **重要**：本文件反映最新的 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) 安全需求及官方 [MCP 安全最佳實務](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)。請始終參考最新規範以取得最新指南。

## 🏔️ 實作安全訓練

為獲得實務落地經驗，我們推薦 **[MCP 安全高峰工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/)** — 這是一趟全面引導 MCP 伺服器在 Azure 中的安全保護之旅。工作坊涵蓋所有 OWASP MCP 前十大風險，採用「漏洞 → 利用 → 修復 → 驗證」的方法論。

本文檔中的所有實務均符合 **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)**，提供 Azure 特定的實施指導。

## MCP 實作的基本安全措施

模型上下文協定引入許多超越傳統軟體安全的獨特安全挑戰。這些實務涵蓋基礎安全需求和 MCP 特有的威脅，包括提示注入、工具中毒、會話劫持、混淆代理問題和令牌轉發漏洞。

### **強制性安全要求**

**MCP 規範中的關鍵要求：**

### **強制性安全要求**

**MCP 規範中的關鍵要求：**

> **禁止**：MCP 伺服器 **禁止** 接受未明確為其簽發的任何令牌
> 
> **必須**：實作授權的 MCP 伺服器 **必須** 驗證所有傳入請求
>  
> **禁止**：MCP 伺服器 **禁止** 使用會話作為身份驗證方式
>
> **必須**：使用靜態客戶端 ID 的 MCP 代理伺服器 **必須** 取得使用者同意，針對每個動態註冊的用戶端

---

## 1. **令牌安全與身份驗證**

**身份驗證與授權控制：**
   - **嚴格授權審核**：全面審核 MCP 伺服器的授權邏輯，確保只有授權的用戶及客戶端能存取資源
   - **外部身份提供者整合**：使用 Microsoft Entra ID 等成熟身份提供者，避免自訂身份驗證實作
   - **令牌受眾驗證**：務必驗證令牌明確簽發於你的 MCP 伺服器，絕不可接受上游令牌
   - **適當令牌生命週期管理**：實施安全的令牌輪替、過期政策，防範令牌重放攻擊

**保護令牌存儲：**
   - 使用 Azure Key Vault 或類似安全憑證存儲庫保存所有祕密
   - 令牌在存放和傳輸過程均應加密
   - 定期輪替憑證並監控未授權存取

## 2. **會話管理與傳輸安全**

**安全會話實務：**
   - **密碼學安全的會話 ID**：使用安全、非決定性的亂數產生器生成會話 ID
   - **用戶綁定**：使用如 `<user_id>:<session_id>` 格式將會話 ID 綁定至使用者身份，防止跨用戶會話濫用
   - **會話生命週期管理**：適當設定過期、輪替與失效，以限制風險暴露時間
   - **強制 HTTPS/TLS**：所有通訊必須使用 HTTPS 防止會話 ID 被攔截

**傳輸層安全：**
   - 盡可能配置 TLS 1.3，並管理好證書
   - 為關鍵連線實施證書釘選
   - 定期輪替與驗證證書有效性

## 3. **AI 專屬威脅防護** 🤖

**提示注入防禦：**
   - **Microsoft 提示盾牌**：部署 AI 提示盾牌以進階檢測與過濾惡意指令
   - **輸入淨化**：驗證並淨化所有輸入，防止注入攻擊及混淆代理問題
   - **內容界限**：透過分隔符與資料標記系統區別信任指令與外來內容

**工具中毒防止：**
   - **工具元資料驗證**：實施完整性檢查並監控工具定義異常變更
   - **動態工具監控**：監測運行時行為並設定異常執行模式警示
   - **批准工作流程**：工具修改與能力變更需明確使用者批准

## 4. **存取控制與權限**

**最小權限原則：**
   - 僅授予 MCP 伺服器執行所需的最低權限
   - 實施具細粒度權限的角色存取控制（RBAC）
   - 定期權限審查與連續監控防止權限升級

**執行時權限控管：**
   - 限制資源使用防止耗盡攻擊
   - 使用容器隔離工具執行環境
   - 實施即時存取以控制管理功能

## 5. **內容安全與監控**

**內容安全實施：**
   - **Azure 內容安全整合**：使用 Azure 內容安全偵測有害內容、越獄嘗試和政策違規
   - **行為分析**：執行 MCP 伺服器與工具執行的運行時行為監控以偵測異常
   - **全面日誌記錄**：所有身份驗證嘗試、工具執行及安全事件皆應有安全且防篡改的記錄

**持續監控：**
   - 即時警示異常模式與未授權存取嘗試
   - 與 SIEM 系統整合以集中管理安全事件
   - 定期安全稽核與滲透測試 MCP 實作

## 6. **供應鏈安全**

**元件驗證：**
   - **依賴掃描**：自動化掃描所有軟體依賴與 AI 元件的漏洞
   - **來源驗證**：確認模型、資料源及外部服務的來源、授權與完整性
   - **簽署套件**：使用密碼學簽署套件，並於部署前驗證簽章

**安全開發流程：**
   - **GitHub 高階安全**：實施祕密掃描、依賴分析與 CodeQL 靜態分析
   - **CI/CD 安全**：在自動化部署流程中整合安全驗證
   - **產物完整性**：部署產物與配置實施密碼學驗證

## 7. **OAuth 安全與混淆代理防範**

**OAuth 2.1 實作：**
   - **PKCE 實作**：所有授權請求使用代碼交換驗證碼（PKCE）
   - **明確同意**：為每個動態註冊客戶端取得使用者同意，防止混淆代理攻擊
   - **回調 URI 驗證**：嚴格驗證重定向 URI 與用戶端標識

**代理安全：**
   - 防止靜態客戶端 ID 利用導致授權繞過
   - 實施第三方 API 存取的適當同意工作流程
   - 監控授權碼竊取及未授權 API 存取

## 8. **事件應變與回復**

**快速反應能力：**
   - **自動化反應**：實現自動化憑證輪替及威脅隔離
   - **回滾程序**：快速回退至已知良好配置與元件
   - **鑑識能力**：詳盡稽核軌跡與日誌以利事件調查

**溝通與協調：**
   - 安全事件清晰的升級流程
   - 與組織事件應變團隊整合
   - 定期進行安全事件模擬與桌面演練

## 9. **合規與治理**

**法規遵循：**
   - 確保 MCP 實作符合產業特定規範（GDPR、HIPAA、SOC 2）
   - 對 AI 資料處理實施資料分類與隱私控管
   - 維護完善文件以供合規審核

**變更管理：**
   - 所有 MCP 系統變更均需正式安全審查
   - 配置變更版本控制與審批流程
   - 定期合規評估與差距分析

## 10. **先進安全控管**

**零信任架構：**
   - **永不信任，持續驗證**：持續驗證使用者、裝置與連線
   - **微分段**：對單一 MCP 元件實施細緻網路控管
   - **條件存取**：基於風險調整的存取控管

**執行時應用防護：**
   - **執行時應用自我防護 (RASP)**：部署 RASP 技術以實時偵測威脅
   - **應用效能監控**：偵測可能代表攻擊的效能異常
   - **動態安全策略**：根據當前威脅情況調整安全策略

## 11. **微軟安全生態系統整合**

**完整微軟安全方案：**
   - **Microsoft Defender for Cloud**：MCP 工作負載的雲端安全態勢管理
   - **Azure Sentinel**：原生雲端 SIEM 與 SOAR，強化威脅偵測
   - **Microsoft Purview**：AI 工作流程與資料源的資料治理與合規

**身份與存取管理：**
   - **Microsoft Entra ID**：企業身分管理與條件存取政策
   - **特權身份管理 (PIM)**：及時存取與管理功能的核准工作流程
   - **身份保護**：基於風險的條件存取及自動化威脅反應

## 12. **持續安全演進**

**保持更新：**
   - **規範監控**：定期審查 MCP 規範更新及安全指導變更
   - **威脅情報**：整合 AI 專屬威脅情報與妥協指標
   - **安全社群參與**：積極參與 MCP 安全社群與漏洞揭露計畫

**適應性安全：**
   - **機器學習安全**：使用 ML 异常檢測以識別新型攻擊模式
   - **預測性安全分析**：部署預測模型，主動識別威脅
   - **安全自動化**：根據威脅情報與規範變更自動更新安全政策

---

## **關鍵安全資源**

### **官方 MCP 文件**
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實務](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 包含 Azure 實現的 OWASP MCP 前十大風險指南
- [OWASP MCP 前十大](https://owasp.org/www-project-mcp-top-10/) - OWASP 官方 MCP 安全風險
- [MCP 安全高峰工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - MCP Azure 平台實戰安全培訓

### **微軟安全解決方案**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure 內容安全](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub 高階安全](https://github.com/security/advanced-security)

### **安全標準**
- [OAuth 2.0 安全最佳實務 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP 大型語言模型前十大](https://genai.owasp.org/)
- [NIST AI 風險管理框架](https://www.nist.gov/itl/ai-risk-management-framework)

### **實作指南**
- [Azure API 管理 MCP 身份驗證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 與 MCP 伺服器整合](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **安全通知**：MCP 安全實務快速演進。實作前務必對照最新 [MCP 規範](https://spec.modelcontextprotocol.io/) 與 [官方安全文件](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) 檢核。

## 下一步

- 閱讀: [MCP 安全控管 2025](./mcp-security-controls-2025.md)
- 返回: [安全模組總覽](./README.md)
- 繼續: [模組 3：入門](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威資料。對於關鍵資訊，建議採用專業人工翻譯。我們不承擔因使用本翻譯所引起的任何誤解或誤譯之責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->