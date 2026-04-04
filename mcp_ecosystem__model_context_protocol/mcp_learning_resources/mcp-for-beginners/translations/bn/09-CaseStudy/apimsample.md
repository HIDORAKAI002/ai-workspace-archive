# কেস স্টাডি: API ম্যানেজমেন্ট-এ MCP সার্ভার হিসেবে REST API প্রকাশ করা

Azure API Management হলো একটি সার্ভিস যা আপনার API Endpoints এর উপরে একটি গেটওয়ে প্রদান করে। এটি কাজ করে আপনার APIs এর সামনে একটি প্রক্সি হিসেবে এবং আসা অনুরোধগুলোর জন্য কী করতে হবে তা নির্ধারণ করে।

এটি ব্যবহার করে, আপনি অনেকগুলো ফিচার পেতে পারেন যেমন:

- **সিকিউরিটি**, আপনি API কী, JWT থেকে ম্যানেজড আইডেন্টিটি পর্যন্ত সব কিছু ব্যবহার করতে পারেন।
- **রেট লিমিটিং**, একটি চমৎকার ফিচার যা নির্ধারণ করতে দেয় কতগুলি কল একটি নির্দিষ্ট সময় এককে পাস পাবে। এটি নিশ্চিত করে সব ব্যবহারকারীর জন্য ভালো অভিজ্ঞতা থাকে এবং আপনার সার্ভিসও অনুরোধে অধিকর পরিমাণে চাপপ্রাপ্ত হয় না।
- **স্কেলিং ও লোড ব্যালেন্সিং**। আপনি লোড ভারসাম্যের জন্য অনেকগুলো এন্ডপয়েন্ট সেট আপ করতে পারেন এবং কিভাবে "লোড ব্যালেন্স" করতে হবে তা নির্ধারণ করতে পারেন।
- **AI ফিচার যেমন সেমান্টিক ক্যাশিং**, টোকেন সীমা এবং টোকেন মনিটরিং ইত্যাদি। এগুলো দারুণ ফিচার যা প্রতিক্রিয়াশীলতা উন্নত করে এবং আপনার টোকেন খরচে নজর রাখতে সাহায্য করে। [এখানে আরও পড়ুন](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities)। 

## কেন MCP + Azure API Management?

Model Context Protocol দ্রুত এজেন্টিক AI অ্যাপসগুলোর জন্য একটি স্ট্যান্ডার্ড হচ্ছে এবং কিভাবে টুলস ও ডেটা সুনির্দিষ্টভাবে প্রকাশ করা যায় তা নির্ধারণ করছে। যখন আপনি API গুলো "ম্যানেজ" করতে চান, তখন Azure API Management একটি স্বাভাবিক পছন্দ। MCP সার্ভারগুলি প্রায়শই অন্য API গুলোর সাথে ইন্টিগ্রেট করে রিকোয়েস্ট সমাধান করে একটি টুলের জন্য। সুতরাং Azure API Management ও MCP এর সংমিশ্রণ অনেক যুক্তিযুক্ত।

## সারসংক্ষেপ

এই নির্দিষ্ট ব্যবহারের ক্ষেত্রে আমরা শিখব কিভাবে API এন্ডপয়েন্টগুলো MCP সার্ভার হিসেবে প্রকাশ করা যায়। এর ফলে, আমরা সহজেই এই এন্ডপয়েন্টগুলোকে এজেন্টিক অ্যাপের অংশ করতে পারব এবং Azure API Management এর ফিচারগুলোও ব্যবহার করতে পারব।

## মূল ফিচারসমূহ

- আপনি যেসব এন্ডপয়েন্ট মেথড প্রকাশ করতে চান সেগুলো নির্বাচন করবেন।
- অতিরিক্ত ফিচারগুলো আপনি কীভাবে API এর পলিসি সেকশন এ সেট করবেন তার উপর নির্ভর করে। কিন্তু এখানে আমরা দেখাব কিভাবে রেট লিমিটিং যোগ করা যায়।

## পূর্ববর্তী ধাপ: একটি API ইম্পোর্ট করা

যদি আপনার Azure API Management-এ ইতিমধ্যেই একটি API থাকে, তো দারুণ, আপনি এই ধাপটি এড়িয়ে যেতে পারেন। না হলে, এই লিঙ্কটি দেখুন, [Azure API Management-এ API ইম্পোর্ট করা](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api)।

## MCP সার্ভার হিসেবে API প্রকাশ করা

API এন্ডপয়েন্টগুলো প্রকাশ করতে নিচের ধাপগুলো অনুসরণ করুন:

1. Azure Portal-এ যান এবং এই ঠিকানা খুলুন <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
আপনার API Management ইনস্ট্যান্সে যান।

1. বাম মেনু থেকে নির্বাচন করুন APIs > MCP Servers > + Create new MCP Server।

1. API থেকে একটি REST API নির্বাচন করুন যা MCP সার্ভার হিসেবে প্রকাশ করতে চান।

1. একটি বা একাধিক API অপারেশন নির্বাচন করুন যা টুল হিসেবে প্রকাশ করতে চান। আপনি সব অপারেশন অথবা নির্দিষ্ট কিছু অপারেশন নির্বাচন করতে পারেন।

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. নির্বাচন করুন **Create**।

1. মেনু অপশন **APIs** এবং **MCP Servers**-এ যান, আপনি নিম্নলিখিত দেখতে পাবেন:

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP সার্ভার তৈরি হয়েছে এবং API অপারেশনগুলো টুল হিসেবে প্রকাশিত হয়েছে। MCP সার্ভারটি MCP Servers পেইনে তালিকাভুক্ত। URL কলামে MCP সার্ভারের এন্ডপয়েন্ট দেখায় যেটি আপনি টেস্টিং বা ক্লায়েন্ট অ্যাপ্লিকেশনে কল করতে পারেন।

## ঐচ্ছিক: পলিসি কনফিগার করা

Azure API Management এর মূল ধারণা হলো পলিসিস যেখানে আপনি আপনার এন্ডপয়েন্টের জন্য বিভিন্ন নিয়ম সেট করেন যেমন রেট লিমিটিং বা সেমান্টিক ক্যাশিং। এই পলিসিসগুলো XML এ লেখা হয়।

MCP সার্ভারের জন্য রেট লিমিটিং পলিসি সেট আপ করার পদ্ধতি:

1. পোর্টালে APIs এর অধীনে **MCP Servers** নির্বাচন করুন।

1. আপনি যে MCP সার্ভার তৈরি করেছেন তা নির্বাচন করুন।

1. বাম মেনু থেকে MCP এর অধীনে **Policies** নির্বাচন করুন।

1. পলিসি এডিটরে, আপনার MCP সার্ভারের টুলগুলোর জন্য যেসব পলিসি প্রয়োগ করতে চান যুক্ত করুন বা সম্পাদনা করুন। পলিসিস XML ফরম্যাটে সংজ্ঞায়িত। উদাহরণস্বরূপ, আপনি MCP সার্ভারের টুলগুলোর কল সীমাবদ্ধ করতে পারেন (এই উদাহরণে, ৩০ সেকেন্ডে ৫টি কল প্রতি ক্লায়েন্ট IP ঠিকানার জন্য)। XML কেমন হবে তা নিচে দেখুন:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```
  
    পলিসি এডিটরের একটি ছবি:

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## পরীক্ষা করে দেখুন

আমাদের MCP সার্ভার ঠিকঠাক কাজ করছে কিনা যাচাই করি।

এর জন্য, আমরা Visual Studio Code ও GitHub Copilot এর Agent মোড ব্যবহার করব। MCP সার্ভারটি *mcp.json* তে যুক্ত করব। এর ফলে, Visual Studio Code একটি এজেন্টিক সক্ষমতাসম্পন্ন ক্লায়েন্ট হিসেবে কাজ করবে এবং শেষ ব্যবহারকারীরা প্রম্পট টাইপ করে সার্ভারের সাথে যোগাযোগ করতে পারবে।

Visual Studio Code-এ MCP সার্ভার যুক্ত করার উপায়:

1. কমান্ড প্যালেট থেকে MCP: **Add Server কমান্ড ব্যবহার করুন**।

1. প্রম্পট আসলে, সার্ভার টাইপ নির্বাচন করুন: **HTTP (HTTP বা Server Sent Events)**।

1. API Management-এ MCP সার্ভারের URL লিখুন। উদাহরণ: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE এন্ডপয়েন্টের জন্য) অথবা **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP এন্ডপয়েন্টের জন্য), লক্ষ্য করুন ট্রান্সপোর্টের পার্থক্য হলো `/sse` বা `/mcp`।

1. আপনার পছন্দমত একটি সার্ভার ID দিন। এটি গুরুত্বপূর্ণ নয় তবে এটি সার্ভার ইন্সট্যান্সটি চিনে রাখতে সাহায্য করবে।

1. আপনি কনফিগারেশনটি ওয়ার্কস্পেস সেটিংসে সংরক্ষণ করবেন না কি ইউজার সেটিংসে তা নির্বাচন করুন।

  - **ওয়ার্কস্পেস সেটিংস** - সার্ভার কনফিগারেশন একটি .vscode/mcp.json ফাইলে সংরক্ষিত হয়, যা কেবল চলতি ওয়ার্কস্পেসে উপলব্ধ।

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```
  
    অথবা আপনি যদি স্ট্রিমিং HTTP কে ট্রান্সপোর্ট হিসেবে বেছে নেন তাহলে কিছুটা ভিন্ন হবে:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```
  
  - **ইউজার সেটিংস** - সার্ভার কনফিগারেশন আপনার গ্লোবাল *settings.json* ফাইলে যুক্ত হয় এবং সব ওয়ার্কস্পেসে উপলব্ধ থাকে। কনফিগারেশন দেখতে নিচের মতো:

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. এছাড়াও কনফিগারেশন এ একটি হেডার যোগ করতে হবে যাতে সঠিকভাবে Azure API Management-এর সাথে প্রমাণীকরণ হয়। এটি একটি হেডার **Ocp-Apim-Subscription-Key** ব্যবহার করে।

    - এটি কিভাবে সেটিংসে যোগ করবেন:

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), এটি একটি প্রম্পট দেখাবে যেখানে আপনি API কী এর মান দেবেন যা Azure Portal-এ আপনার API Management ইনস্ট্যান্স থেকে পেতে পারেন।

    - *mcp.json* তে এটি যোগ করতে হলে এভাবে করতে পারেন:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```
  
### Agent মোড ব্যবহার করুন

এখন আমরা সেটিংস অথবা *.vscode/mcp.json* এ সব ঠিকঠাক সেট করে ফেলেছি। চলুন পরীক্ষা করি।

টুলস আইকন থাকবে, যেখানে আপনার সার্ভারের প্রকাশিত টুলগুলি তালিকাভুক্ত থাকবে:

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. টুলস আইকনে ক্লিক করুন, আপনি নিচের মতো টুলসের একটি তালিকা দেখতে পারবেন:

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. চ্যাটে একটি প্রম্পট লিখুন টুল আহ্বান করার জন্য। উদাহরণস্বরূপ, আপনি যদি একটি অর্ডারের তথ্য জানার জন্য টুল নির্বাচন করে থাকেন, তাহলে এজেন্টকে একটি অর্ডার সম্পর্কে জিজ্ঞাসা করুন। একটি উদাহরণ প্রম্পট:

    ```text
    get information from order 2
    ```
  
    এখন আপনাকে একটি টুলস আইকন দেখানো হবে যা আপনাকে টুল কল করতে অনুরোধ করবে। চালিয়ে যেতে নির্বাচন করুন, এরপর নিচের মতো আউটপুট দেখতে পাবেন:

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **উপরের প্রদর্শিত ফলাফল আপনি যেসব টুলস সেটআপ করেছেন তার উপর নির্ভরশীল, কিন্তু মূল ধারনা হলো আপনি টেক্সট ভিত্তিক একটি প্রতিক্রিয়া পাবেন**

## রেফারেন্সসমূহ

এখানে আরও জানতে পারেন:

- [Azure API Management ও MCP সম্পর্কিত টিউটোরিয়াল](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python স্যাম্পল: Azure API Management ব্যবহার করে নিরাপদ দূরবর্তী MCP সার্ভার (প্রयोगশীল)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [MCP ক্লায়েন্ট অথরাইজেশন ল্যাব](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)
- [VS Code-এর জন্য Azure API Management এক্সটেনশন ব্যবহার করে API ইম্পোর্ট ও ম্যানেজ করুন](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)
- [Azure API Center-এ দূরবর্তী MCP সার্ভার রেজিস্টার ও ডিসকভার করুন](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) - Azure API Management-এর সাথে AI সক্ষমতার চমৎকার রেপো
- [AI Gateway ওয়ার্কশপস](https://azure-samples.github.io/AI-Gateway/) - এতে Azure Portal ব্যবহার করে কর্মশালা রয়েছে, যা AI সক্ষমতা মূল্যায়ন শুরু করার জন্য দারুণ।

## পরবর্তী ধাপ

- ফিরে যান: [কেস স্টাডি সারসংক্ষেপ](./README.md)
- পরবর্তী: [Azure AI ট্রাভেল এজেন্টস](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**দাকিলীকরণ**:
এই নথিটি AI অনুবাদ সেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনুবাদ করা হয়েছে। আমরা যথাসাধ্য সঠিকতার জন্য চেষ্টা করি, তবে অনুগ্রহ করে জেনে রাখুন যে স্বয়ংক্রিয় অনুবাদে ভুল বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার নিজস্ব ভাষায়ই প্রামাণিক উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে উদ্ভূত যেকোনো ভুল বোঝাবুঝি বা অপব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->