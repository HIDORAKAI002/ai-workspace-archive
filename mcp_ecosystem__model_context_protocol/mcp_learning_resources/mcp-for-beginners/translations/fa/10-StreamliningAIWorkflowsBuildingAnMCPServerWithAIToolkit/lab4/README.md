# 🐙 ماژول ۴: توسعه عملی MCP - سرور کلون گیت‌هاب سفارشی

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ شروع سریع:** ساخت یک سرور MCP آماده برای تولید که کلون کردن مخازن گیت‌هاب و ادغام با VS Code را تنها در ۳۰ دقیقه خودکار می‌کند!

## 🎯 اهداف یادگیری

در پایان این آزمایشگاه، شما قادر خواهید بود:

- ✅ ساخت سرور MCP سفارشی برای جریان‌های کاری توسعه واقعی
- ✅ پیاده‌سازی قابلیت کلون کردن مخازن گیت‌هاب از طریق MCP
- ✅ ادغام سرورهای MCP سفارشی با VS Code و Agent Builder
- ✅ استفاده از حالت Agent در GitHub Copilot با ابزارهای MCP سفارشی
- ✅ آزمایش و استقرار سرورهای MCP سفارشی در محیط‌های تولید

## 📋 پیش‌نیازها

- اتمام آزمایشگاه‌های ۱ تا ۳ (مبانی MCP و توسعه پیشرفته)
- اشتراک GitHub Copilot ([ثبت نام رایگان موجود](https://github.com/github-copilot/signup))
- VS Code با افزونه‌های Microsoft Foundry Toolkit و GitHub Copilot
- نصب و تنظیم کامل Git CLI

## 🏗️ نمای کلی پروژه

### **چالش توسعه واقعی**
به عنوان توسعه‌دهندگان، اغلب برای کلون کردن مخازن و باز کردن آن‌ها در VS Code یا VS Code Insiders از گیت‌هاب استفاده می‌کنیم. این روند دستی شامل موارد زیر است:
۱. باز کردن ترمینال/خط فرمان
۲. رفتن به دایرکتوری مقصد
۳. اجرای دستور `git clone`
۴. باز کردن VS Code در دایرکتوری کلون شده

**راه‌حل MCP ما این فرایند را به یک دستور هوشمند تبدیل می‌کند!**

### **چه چیزی می‌سازید**
یک **سرور MCP کلون گیت‌هاب** (`git_mcp_server`) که ارائه می‌دهد:

| ویژگی | توضیح | مزیت |
|---------|-------------|---------|
| 🔄 **کلون هوشمند مخازن** | کلون کردن مخازن گیت‌هاب همراه با اعتبارسنجی | بررسی خودکار خطاها |
| 📁 **مدیریت هوشمند دایرکتوری** | بررسی و ایجاد ایمن دایرکتوری‌ها | جلوگیری از بازنویسی اشتباه |
| 🚀 **ادغام چندسکویی با VS Code** | باز کردن پروژه‌ها در VS Code/Insiders | انتقال بی‌وقفه در جریان کاری |
| 🛡️ **مدیریت قوی خطا** | رسیدگی به مشکلات شبکه، مجوز و مسیر | قابلیت اطمینان مناسب تولید |

---

## 📖 پیاده‌سازی گام‌به‌گام

### گام ۱: ایجاد Agent گیت‌هاب در Agent Builder

۱. **Agent Builder را از طریق افزونه Microsoft Foundry Toolkit باز کنید**
۲. **یک Agent جدید بسازید** با پیکربندی زیر:
   ```
   Agent Name: GitHubAgent
   ```

۳. **سرور MCP سفارشی را مقداردهی اولیه کنید:**
   - به **Tools** → **Add Tool** → **MCP Server** بروید
   - گزینه **"Create A new MCP Server"** را انتخاب کنید
   - قالب **Python** را برای بیشترین انعطاف‌پذیری انتخاب کنید
   - **نام سرور:** `git_mcp_server`

### گام ۲: پیکربندی حالت Agent در GitHub Copilot

۱. **GitHub Copilot را در VS Code باز کنید** (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
۲. **مدل Agent را در رابط Copilot انتخاب کنید**
۳. **مدل Claude 3.7 را برای قابلیت‌های استنتاج پیشرفته انتخاب کنید**
۴. **ادغام MCP را برای دسترسی به ابزار فعال کنید**

> **💡 نکته حرفه‌ای:** Claude 3.7 در درک جریان‌های کاری توسعه و الگوهای مدیریت خطا عملکرد بهتری دارد.

### گام ۳: پیاده‌سازی عملکرد اصلی سرور MCP

**از پرامپت دقیق زیر با حالت Agent در GitHub Copilot استفاده کنید:**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### گام ۴: آزمایش سرور MCP خود

#### ۴الف. آزمایش در Agent Builder

۱. **پیکربندی دیباگ Agent Builder را اجرا کنید**
۲. **Agent خود را با این پرامپت سیستمی تنظیم کنید:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

۳. **با سناریوهای واقعی کاربر آزمایش کنید:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/fa/DebugAgent.81d152370c503241.webp)

**نتایج مورد انتظار:**
- ✅ کلون موفق همراه با تایید مسیر
- ✅ راه‌اندازی خودکار VS Code
- ✅ پیام‌های خطای واضح برای شرایط نامعتبر
- ✅ مدیریت درست موارد لبه

#### ۴ب. آزمایش در MCP Inspector


![MCP Inspector Testing](../../../../translated_images/fa/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 تبریک!** شما با موفقیت یک سرور MCP عملی و آماده تولید ساختید که چالش‌های جریان کاری واقعی توسعه را حل می‌کند. سرور کلون گیت‌هاب سفارشی شما قدرت MCP را برای خودکارسازی و بهبود بهره‌وری توسعه‌دهندگان نشان می‌دهد.

### 🏆 موفقیت کسب‌شده:
- ✅ **توسعه‌دهنده MCP** - ساخت سرور MCP سفارشی
- ✅ **اتوماسیون جریان کاری** - ساده‌سازی فرآیندهای توسعه  
- ✅ **کارشناس ادغام** - اتصال چندین ابزار توسعه
- ✅ **آماده تولید** - ساخت راه‌حل‌های قابل استقرار

---

## 🎓 پایان کارگاه: سفر شما با پروتکل مدل کانتکست

**شرکت‌کننده گرامی کارگاه،**

تبریک به شما برای اتمام کامل چهار ماژول کارگاه Model Context Protocol! شما مسیر طولانی‌ای از درک اصول Microsoft Foundry Toolkit تا ساخت سرورهای MCP آماده برای تولید که چالش‌های واقعی توسعه را حل می‌کنند، طی کرده‌اید.

### 🚀 مرور مسیر یادگیری شما:

**[ماژول ۱](../lab1/README.md)**: با اصول Microsoft Foundry Toolkit، تست مدل و ساخت اولین Agent هوش مصنوعی خود شروع کردید.

**[ماژول ۲](../lab2/README.md)**: معماری MCP را یاد گرفتید، MCP Playwright را ادغام کردید و اولین Agent خودکارسازی مرورگر را ساختید.

**[ماژول ۳](../lab3/README.md)**: توسعه سرور MCP سفارشی با سرور هوای MCP را پیش بردید و ابزارهای دیباگ را فرا گرفتید.

**[ماژول ۴](../lab4/README.md)**: حالا همه مهارت‌ها را برای ساخت یک ابزار کاربردی خودکارسازی گردش کار مخزن گیت‌هاب به کار بردید.

### 🌟 آنچه تسلط پیدا کرده‌اید:

- ✅ **اکوسیستم Microsoft Foundry Toolkit**: مدل‌ها، Agentها و الگوهای ادغام
- ✅ **معماری MCP**: طراحی کلاینت-سرور، پروتکل‌های انتقال و امنیت
- ✅ **ابزارهای توسعه‌دهنده**: از Playground تا Inspector و استقرار تولید
- ✅ **توسعه سفارشی**: ساخت، تست و استقرار سرورهای MCP خودتان
- ✅ **کاربردهای عملی**: حل چالش‌های واقعی گردش کاری با هوش مصنوعی

### 🔮 گام‌های بعدی شما:

۱. **ساخت سرور MCP خودتان**: این مهارت‌ها را برای خودکارسازی جریان‌های کاری منحصربه‌فرد استفاده کنید  
۲. **پیوستن به جامعه MCP**: آثار خود را به اشتراک بگذارید و از دیگران بیاموزید  
۳. **کاوش ادغام پیشرفته**: اتصال سرورهای MCP به سیستم‌های سازمانی  
۴. **سهیم شدن در متن‌باز**: به بهبود ابزارها و مستندات MCP کمک کنید

یادآوری: این کارگاه فقط آغاز مسیر است. اکوسیستم Model Context Protocol به سرعت در حال تکامل است و حالا شما مجهز به پیشرو بودن در ابزارهای توسعه مبتنی بر هوش مصنوعی هستید.

**از مشارکت و انضباط شما در یادگیری سپاسگزاریم!**

امیدواریم این کارگاه ایده‌هایی را برانگیخته باشد که نحوه ساخت و تعامل شما با ابزارهای هوش مصنوعی را در مسیر توسعه تغییر دهد.

**برنامه‌نویسی خوش!**

---

## مرحله بعدی چیست

تبریک برای اتمام تمامی آزمایشگاه‌های ماژول ۱۰!

- بازگشت به: [نمای کلی ماژول ۱۰](../README.md)
- ادامه به: [ماژول ۱۱: آزمایشگاه‌های عملی سرور MCP](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->