# امنیت پیشرفته MCP با Azure Content Safety

> **ریسک MCP که توسط OWASP پوشش داده شده است**: [MCP06 - تزریق درخواست از طریق بارگذاری زمینه‌ای](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety ابزارهای قدرتمندی ارائه می‌دهد که می‌توانند امنیت پیاده‌سازی‌های MCP شما را بهبود بخشند. برای تجربه عملی پیاده‌سازی، بخش [کارگاه اجلاس امنیت MCP (Sherpa)](https://azure-samples.github.io/sherpa/) کمپ ۳: امنیت I/O را مشاهده کنید.

## سپرهای درخواست (Prompt Shields)

سپرهای درخواست هوش مصنوعی مایکروسافت حفاظت قوی در برابر حملات تزریق درخواست مستقیم و غیرمستقیم را از طریق:

1. **شناسایی پیشرفته**: استفاده از یادگیری ماشین برای شناسایی دستورالعمل‌های مخرب جاسازی شده در محتوا.
2. **نورافکنی**: تبدیل متن ورودی به گونه‌ای که سیستم‌های هوش مصنوعی بتوانند بین دستورالعمل‌های معتبر و ورودی‌های خارجی تمایز قائل شوند.
3. **مرزبندی‌ها و نشانه‌گذاری داده‌ها**: علامت‌گذاری مرز بین داده‌های مورد اعتماد و غیرمورد اعتماد.
4. **ادغام با Content Safety**: کار با Azure AI Content Safety برای شناسایی تلاش‌های فرار از محدودیت و محتواهای مضر.
5. **به‌روزرسانی‌های مداوم**: مایکروسافت به طور منظم مکانیزم‌های حفاظتی را در برابر تهدیدات جدید به‌روزرسانی می‌کند.

## پیاده‌سازی Azure Content Safety با MCP

این رویکرد حفاظت چندلایه ارائه می‌دهد:
- اسکن ورودی‌ها قبل از پردازش
- اعتبارسنجی خروجی‌ها قبل از بازگرداندن
- استفاده از لیست‌های مسدودکننده برای الگوهای شناخته شده مضر
- بهره‌گیری از مدل‌های به‌روز شده مداوم Azure Content Safety

## منابع Azure Content Safety

برای کسب اطلاعات بیشتر درباره پیاده‌سازی Azure Content Safety با سرورهای MCP خود، از منابع رسمی زیر استفاده کنید:

1. [مستندات Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - مستندات رسمی Azure Content Safety.
2. [مستندات سپر درخواست](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - آموزش جلوگیری از حملات تزریق درخواست.
3. [مرجع API content safety](https://learn.microsoft.com/rest/api/contentsafety/) - مرجع کامل API برای پیاده‌سازی Content Safety.
4. [شروع سریع: Azure Content Safety با C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - راهنمای پیاده‌سازی سریع با استفاده از C#.
5. [کتابخانه‌های مشتری Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - کتابخانه‌های مشتری برای زبان‌های برنامه‌نویسی مختلف.
6. [شناسایی تلاش‌های فرار از محدودیت](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - راهنمای خاص برای شناسایی و جلوگیری از تلاش‌های فرار از محدودیت.
7. [بهترین روش‌ها برای Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - بهترین شیوه‌ها برای پیاده‌سازی مؤثر امنیت محتوا.

برای پیاده‌سازی عمیق‌تر، بخش [راهنمای پیاده‌سازی Azure Content Safety](./azure-content-safety-implementation.md) را مشاهده کنید.

## ادامه کار

- مطالعه: [پیاده‌سازی Azure Content Safety](./azure-content-safety-implementation.md)
- بازگشت به: [مروری بر ماژول امنیت](./README.md)
- ادامه به: [ماژول ۳: شروع به کار](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نواقصی باشند. سند اصلی به زبان مادری خود، باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حساس، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هر گونه سوءتفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->