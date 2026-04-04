# MCP 安全最佳實務 - 2026年2月更新

> **重要**：本文檔反映了最新的 [MCP 規範 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) 安全要求及官方 [MCP 安全最佳實務](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)。請始終參考當前規範以獲取最新指南。

## 🏔️ 實作安全培訓

為了獲得實務實作經驗，我們推薦 **[MCP 安全高峰研討會工作坊（Sherpa）](https://azure-samples.github.io/sherpa/)** — 一次全面指導在 Azure 中保護 MCP 伺服器的實作探險。工作坊涵蓋所有 OWASP MCP Top 10 風險，採用「易受攻擊 → 利用 → 修復 → 驗證」的方法。

本文所有做法均與 Azure 專用實作指導的 **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** 保持一致。

## MCP 實作的基本安全實務

Model Context Protocol 引入了超越傳統軟件安全的獨特安全挑戰。這些做法針對基礎安全需求以及 MCP 特有的威脅，包括提示注入、工具汙染、會話劫持、混淆代理問題及令牌傳遞漏洞。

### **強制性安全需求**

**MCP 規範中的關鍵需求：**

### **強制性安全需求**

**MCP 規範中的關鍵需求：**

> **絕對禁止**：MCP 伺服器**絕對禁止**接受任何未明確為 MCP 伺服器簽發的令牌  
>  
> **必須**：實作用於授權的 MCP 伺服器**必須**驗證所有入站請求  
>  
> **絕對禁止**：MCP 伺服器**絕對禁止**使用會話進行身份驗證  
>  
> **必須**：使用靜態客戶端 ID 的 MCP 代理伺服器**必須**為每個動態註冊客戶端取得用戶同意

---

## 1. **令牌安全與身份驗證**

**身份驗證與授權控制：**  
   - **嚴格授權審查**：全面審核 MCP 伺服器授權邏輯，確保只有預期用戶和客戶端可存取資源  
   - **外部身份提供者整合**：使用 Microsoft Entra ID 等現成身份提供者，避免自行實作驗證  
   - **令牌受眾驗證**：始終驗證令牌是否明確簽發給您的 MCP 伺服器，絕不接受上游令牌  
   - **妥善令牌生命週期管理**：實作安全的令牌輪替、過期政策，防止令牌重放攻擊  

**受保護的令牌儲存：**  
   - 對所有機密資訊使用 Azure Key Vault 或類似安全憑證庫  
   - 對令牌靜態與傳輸過程均進行加密  
   - 定期輪替憑證並監控未授權存取

## 2. **會話管理與傳輸安全**

**安全會話實務：**  
   - **加密安全的會話 ID**：使用安全隨機數產生非決定性會話 ID  
   - **用戶特定綁定**：用 `<user_id>:<session_id>` 格式將會話 ID 綁定至用戶身分，防止跨用戶會話濫用  
   - **會話生命週期管理**：實作適當的過期、輪替與失效限制弱點時間窗  
   - **強制 HTTPS/TLS**：所有通訊強制使用 HTTPS 防止會話 ID 被攔截

**傳輸層安全：**  
   - 可能時配置 TLS 1.3 並妥善管理憑證  
   - 為關鍵連線實作憑證釘紮  
   - 定期輪替憑證並驗證有效性

## 3. **AI 特定威脅防護** 🤖

**提示注入防禦：**  
   - **Microsoft 提示盾牌**：部署 AI 提示盾牌以進階偵測及過濾惡意指令  
   - **輸入淨化**：驗證與清理所有輸入，防止注入攻擊與混淆代理問題  
   - **內容邊界**：使用分隔符和數據標記系統區分可信指令與外部內容

**工具汙染預防：**  
   - **工具元數據驗證**：實施工具定義完整性檢查，監控異常變更  
   - **動態工具監控**：監控執行時行為，設置異常執行模式警示  
   - **核准工作流程**：工具修改及功能變動需用戶明確同意

## 4. **存取控制與權限**

**最小權限原則：**  
   - 僅授予 MCP 伺服器執行所需的最小權限  
   - 實作角色基礎存取控制（RBAC），細分權限  
   - 定期檢查權限，持續監控權限升級

**運行時權限控制：**  
   - 限制資源，防止資源耗盡攻擊  
   - 使用容器隔離工具執行環境  
   - 管理功能實作即時存取

## 5. **內容安全與監控**

**內容安全實作：**  
   - **Azure 內容安全整合**：使用 Azure 內容安全偵測有害內容、越獄嘗試及違規行為  
   - **行為分析**：執行運作時行為監控以偵測 MCP 伺服器和工具執行異常  
   - **全面日誌**：紀錄所有身份驗證嘗試、工具調用及安全事件，使用安全且防篡改的儲存

**持續監控：**  
   - 實時警報即時偵測可疑模式及未授權嘗試  
   - 與 SIEM 系統整合，集中管理安全事件  
   - 定期進行安全審核及滲透測試 MCP 實作

## 6. **供應鏈安全**

**元件驗證：**  
   - **依賴掃描**：使用自動化漏洞掃描所有軟件依賴及 AI 元件  
   - **來源驗證**：驗證模型、數據來源及外部服務的來源、授權及完整性  
   - **簽名套件**：使用加密簽章套件，部署前驗證簽章

**安全開發管線：**  
   - **GitHub 先進安全**：實作秘密掃描、依賴分析及 CodeQL 靜態分析  
   - **CI/CD 安全**：在自動部署管線中整合安全驗證  
   - **產物完整性**：實施加密驗證已部署的產物及設定

## 7. **OAuth 安全與混淆代理預防**

**OAuth 2.1 實作：**  
   - **PKCE 實作**：所有授權請求使用交換碼證明 (PKCE)  
   - **明確同意**：為每個動態註冊客戶端取得用戶同意，以防混淆代理攻擊  
   - **重定向 URI 驗證**：嚴格驗證重定向 URI 及客戶端標識

**代理安全：**  
   - 防止利用靜態客戶端 ID 進行授權繞過  
   - 實作妥善的同意流程管理第三方 API 存取  
   - 監控授權碼竊取及未授權 API 存取

## 8. **事件響應與復原**

**快速響應能力：**  
   - **自動化響應**：執行自動化憑證輪替及威脅控制系統  
   - **回滾程序**：快速恢復至已知良好配置與元件  
   - **鑑識能力**：詳細稽核軌跡及日誌支援事件調查

**溝通與協調：**  
   - 清楚的安全事件升級程序  
   - 與組織事件響應團隊整合  
   - 定期進行安全事件模擬與桌面演練

## 9. **合規與治理**

**法規遵循：**  
   - 確保 MCP 實作符合行業特定要求（GDPR、HIPAA、SOC 2）  
   - AI 數據處理實施資料分類與隱私控管  
   - 維護完整文件以便合規審計

**變更管理：**  
   - 所有 MCP 系統修改均須正式安全審查  
   - 配置變更採用版本控制及核准流程  
   - 定期進行合規評估與差距分析

## 10. **進階安全控制**

**零信任架構：**  
   - **永不信任，持續驗證**：持續驗證用戶、裝置與連線  
   - **微分段網路控制**：細粒度隔離各個 MCP 元件  
   - **條件存取**：基於風險的存取控制，依情境與行為調整

**運行時應用防護：**  
   - **運行時應用自我防護 (RASP)**：部署 RASP 技術實時威脅偵測  
   - **應用效能監控**：監控效能異常，偵測攻擊跡象  
   - **動態安全政策**：根據當前威脅態勢自動調整安全政策

## 11. **微軟安全生態整合**

**完整微軟安全方案：**  
   - **Microsoft Defender for Cloud**：MCP 工作負載的雲端安全姿態管理  
   - **Azure Sentinel**：雲端原生 SIEM 與 SOAR 功能，實現進階威脅偵測  
   - **Microsoft Purview**：AI 工作流程與數據來源資料治理及合規

**身份與存取管理：**  
   - **Microsoft Entra ID**：企業身份管理帶條件存取政策  
   - **特權身份管理 (PIM)**：行政功能即時存取及核准流程  
   - **身份保護**：基於風險的條件存取與自動威脅響應

## 12. **持續安全演進**

**保持最新：**  
   - **規範監控**：定期審閱 MCP 規範更新及安全指導變更  
   - **威脅情報**：整合 AI 特定威脅來源與妥協指標  
   - **安全社群參與**：積極參加 MCP 安全社群與漏洞揭露計劃

**適應性安全：**  
   - **機器學習安全**：採用 ML 為基礎的異常偵測來識別新型攻擊模式  
   - **預測性安全分析**：實作預測模型主動識別威脅  
   - **安全自動化**：根據威脅情報及規範變更自動更新安全政策

---

## **關鍵安全資源**

### **官方 MCP 文件**
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳實務](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授權規範](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP 安全資源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 全面 OWASP MCP Top 10 與 Azure 實作  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全風險  
- [MCP 安全高峰研討會工作坊（Sherpa）](https://azure-samples.github.io/sherpa/) - MCP 在 Azure 上的實作安全培訓

### **微軟安全方案**
- [Microsoft 提示盾牌](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure 內容安全](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub 先進安全](https://github.com/security/advanced-security)

### **安全標準**
- [OAuth 2.0 安全最佳實務 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP 大型語言模型 Top 10](https://genai.owasp.org/)
- [NIST AI 風險管理框架](https://www.nist.gov/itl/ai-risk-management-framework)

### **實作指南**
- [Azure API 管理 MCP 認證閘道](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 與 MCP 伺服器](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **安全公告**：MCP 安全實務快速演進。實作前，請務必依據當前 [MCP 規範](https://spec.modelcontextprotocol.io/)及[官方安全文件](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)驗證。

## 接下來的步驟

- 閱讀：[MCP 安全控制 2025](./mcp-security-controls-2025.md)
- 返回至：[安全模組概觀](./README.md)
- 繼續至：[模組 3：快速入門](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件乃使用人工智能翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。儘管我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們對因使用本翻譯而引起的任何誤解或誤釋不承擔任何責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->