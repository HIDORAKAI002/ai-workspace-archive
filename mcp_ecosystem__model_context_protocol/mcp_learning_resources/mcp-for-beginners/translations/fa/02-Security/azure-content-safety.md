# امنیت پیشرفته MCP با Azure Content Safety

> **ریسک MCP آی‌دبلیو‌ای‌اس‌پی پرداخت‌شده**: [MCP06 - نفوذ جریان قصد](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety چندین ابزار قدرتمند ارائه می‌دهد که می‌تواند امنیت پیاده‌سازی‌های MCP شما را افزایش دهد. برای تجربه پیاده‌سازی عملی، به [کارگاه MCP Security Summit (شرپا)](https://azure-samples.github.io/sherpa/) کمپ ۳: امنیت ورودی/خروجی مراجعه کنید.

## سپرهای ورودی

سپرهای ورودی هوش مصنوعی مایکروسافت حفاظت قوی در برابر حملات تزریق ورودی مستقیم و غیرمستقیم ارائه می‌دهند از طریق:

1. **شناسایی پیشرفته**: استفاده از یادگیری ماشین برای شناسایی دستورالعمل‌های مخرب جاسازی شده در محتوا.
۲. **برجسته‌سازی**: تبدیل متن ورودی برای کمک به سیستم‌های هوش مصنوعی در تمایز بین دستورالعمل‌های معتبر و ورودی‌های خارجی.
۳. **مرزها و علامت‌گذاری داده‌ها**: نشان‌گذاری مرز بین داده‌های مورد اعتماد و غیرمطمئن.
۴. **یکپارچگی با Content Safety**: همکاری با Azure AI Content Safety برای شناسایی تلاش‌های فرار از محدودیت و محتوای مضر.
۵. **به‌روزرسانی‌های مستمر**: مایکروسافت به طور منظم مکانیزم‌های حفاظت را در برابر تهدیدات نوظهور به‌روزرسانی می‌کند.

## پیاده‌سازی Azure Content Safety با MCP

این روش حفاظت چندلایه ارائه می‌دهد:
- اسکن ورودی‌ها قبل از پردازش
- اعتبارسنجی خروجی‌ها قبل از بازگشت
- استفاده از فهرست‌های مسدودکننده برای الگوهای مضر شناخته‌شده
- بهره‌گیری از مدل‌های به‌روزرسانی شده مداوم Azure Content Safety

## منابع Azure Content Safety

برای یادگیری بیشتر درباره پیاده‌سازی Azure Content Safety با سرورهای MCP خود، به این منابع رسمی مراجعه کنید:

1. [مستندات Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - مستندات رسمی Azure Content Safety.
2. [مستندات سپر ورودی](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - یادگیری چگونگی جلوگیری از حملات تزریق ورودی.
3. [مرجع API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - مرجع کامل API برای پیاده‌سازی Content Safety.
4. [شروع سریع: Azure Content Safety با C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - راهنمای پیاده‌سازی سریع با C#.
5. [کتابخانه‌های کلاینت Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - کتابخانه‌های کلاینت برای زبان‌های برنامه‌نویسی مختلف.
6. [شناسایی تلاش‌های فرار از محدودیت](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - راهنمای دقیق برای شناسایی و پیشگیری از تلاش‌های فرار از محدودیت.
7. [بهترین شیوه‌ها برای Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - بهترین روش‌ها برای پیاده‌سازی مؤثر Content Safety.

برای پیاده‌سازی دقیق‌تر، به [راهنمای پیاده‌سازی Azure Content Safety](./azure-content-safety-implementation.md) مراجعه کنید.

## گام بعدی چیست

- مطالعه: [پیاده‌سازی Azure Content Safety](./azure-content-safety-implementation.md)
- بازگشت به: [مرور کلی ماژول امنیت](./README.md)
- ادامه به: [ماژول ۳: شروع کار](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->