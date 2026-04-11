# ចាប់ផ្តើមជាមួយ MCP

សូមស្វាគមន៍ទៅកាន់ជំហានដំបូងរបស់អ្នកជាមួយនឹង Model Context Protocol (MCP)! មិនថាអ្នកជាអ្នកថ្មីនឹង MCP ឬកំពុងស្វែងរកការយល់ដឹងច្បាស់ជាងនេះទេ, មគ្គុទេសក៍នេះនឹងដើរឆ្វេងអ្នកតាមដំណោះស្រាយដំណាក់កាលដំណើរការ និងការអភិវឌ្ឍតំរូវការសំខាន់ៗ។ អ្នកនឹងស្វែងយល់ពីរបៀបដែល MCP អនុញ្ញាតឱ្យមានការបញ្ចូលគ្នាបានដោយរលូនចន្លោះគំរូ AI និងកម្មវិធី ហើយរៀនពីរបៀបរៀបចំបរិយាកាសរបស់អ្នកឱ្យប្រកបដោយប្រសិទ្ធភាពសម្រាប់សង់ និងសាកល្បងដំណោះស្រាយដំណើរការដោយ MCP។

> TLDR; ប្រសិនបើអ្នកសង់កម្មវិធី AI អ្នកច្បាស់ថាអ្នកអាចបន្ថែមឧបករណ៍ និងធនធានផ្សេងទៀតទៅកាន់ LLM (គំរូភាសាធំ) របស់អ្នក ដើម្បីធ្វើឱ្យ LLM មានចំណេះដឹងច្រើនមួយ។ ទោះយ៉ាងណា ប្រសិនបើអ្នកដាក់ឧបករណ៍និងធនធាននោះនៅលើម៉ាស៊ីនបម្រើ កម្មវិធី និងសមត្ថភាពម៉ាស៊ីនបម្រើអាចត្រូវបានប្រើដោយអតិថិជនណាមួយដែលមាន/គ្មាន LLM ក៏ដោយ។

## មហាសង្ខេប

មគ្គុទេសក៍នេះផ្ដល់ការណែនាំអំពីការតំឡើងបរិយាកាស MCP និងសង់កម្មវិធី MCP ដំបូងរបស់អ្នក។ អ្នកនឹងរៀនពីរបៀបតំឡើងឧបករណ៍ និងបណ្ណាល័យដែលចាំបាច់ សង់ម៉ាស៊ីនបម្រើ MCP មូលដ្ឋាន បង្កើតកម្មវិធីម៉ាស៊ីនភ្ញៀវ ហើយសាកល្បងការអនុវត្ត។

Model Context Protocol (MCP) គឺជាពិធីការបើកដែលស្តង់ដារនៃរបៀបកម្មវិធីផ្ដល់ន័យបរិបទដល់ LLMs។ គិតថា MCP ដូចជាជំពូក USB-C សម្រាប់កម្មវិធី AI - វាបង្កើតមធ្យោបាយស្តង់ដារ ដើម្បីភ្ជាប់គំរូ AI ទៅវិញទៅមកដំណើរការ ទិន្នន័យ និងឧបករណ៍ផ្សេងៗ។

## គោលបំណងសិក្សា

នៅចុងบทនេះ អ្នកនឹងអាច៖

- តំឡើងបរិយាកាសអភិវឌ្ឍសម្រាប់ MCP ក្នុង C#, Java, Python, TypeScript, និង Rust
- សង់ និងដាក់បង្ហាញម៉ាស៊ីនបម្រើ MCP មូលដ្ឋានជាមួយមុខងារបង្គាប់ (ធនធាន, ជំពូក, និងឧបករណ៍)
- បង្កើតកម្មវិធីម៉ាស៊ីនភ្ញៀវដែលភ្ជាប់ទៅម៉ាស៊ីនបម្រើ MCP
- សាកល្បង និងដោះស្រាយបញ្ហាកូដ MCP

## ការតំឡើងបរិយាកាស MCP របស់អ្នក

មុនពេលអ្នកចាប់ផ្តើមការងារជាមួយ MCP វាសំខាន់ក្នុងការរៀបចំបរិយាកាសអភិវឌ្ឍរបស់អ្នក និងយល់ដឹងពីដំណើរការមូលដ្ឋាន។ ផ្នែកនេះនឹងណែនាំអ្នកពីជំហានដំណើរការធ្វើអោយចាប់ផ្តើមបានដោយរលូនជាមួយ MCP។

### ចាំបាច់មុន

មុនពេលចាប់ផ្តើមអភិវឌ្ឍ MCP សូមប្រាកដថាអ្នកមាន៖

- **បរិយាកាសអភិវឌ្ឍ**៖ សម្រាប់ភាសាដែលអ្នកបានជ្រើស (C#, Java, Python, TypeScript, ឬ Rust)
- **IDE/កម្មវិធីកំណត់កូដ**៖ Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm ឬកម្មវិធីកូដទំនើបណាមួយ
- **អ្នកគ្រប់គ្រងក пакែ**៖ NuGet, Maven/Gradle, pip, npm/yarn, ឬ Cargo
- **កូនសោ API**៖ សម្រាប់សេវា AI ដែលអ្នកចង់ប្រើនៅក្នុងកម្មវិធីម៉ាស៊ីនភ្ញៀវរបស់អ្នក

## រចនាសម្ព័ន្ធម៉ាស៊ីនបម្រើ MCP មូលដ្ឋាន

ម៉ាស៊ីនបម្រើ MCP ទូទៅរួមមាន៖

- **ការកំណត់ម៉ាស៊ីនបម្រើ**៖ កំណត់ផ្នែកច្រក, សម្ងាត់ភាព, និងការកំណត់ផ្សេងៗ
- **ធនធាន**៖ ទិន្នន័យ និងបរិបទដែលមានសម្រាប់ LLMs
- **ឧបករណ៍**៖ មុខងារដែលគំរូអាចហៅប្រើ
- **ជំពូក**៖ គំរូសម្រាប់បង្កើត ឬរៀបចំប្​ស្​ត

នេះជាគំរូសាមញ្ញមួយនៅក្នុង TypeScript:

```typescript
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// បង្កើតម៉ាស៊ីនមេ MCP
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// បន្ថែមឧបករណ៍បន្ថែមមួយ
server.tool("add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// បន្ថែមប្រភពការស្វាគមន៍ដំណើរការបទ
server.resource(
  "file",
  // ប៉ារ៉ាម៉ែត្រ 'list' គ្រប់គ្រងរបៀបធ្វើបញ្ជីឯកសារដែលមានស្រាប់សម្រាប់ប្រភព។ ការកំណត់វាទៅ undefined នឹងបិទការបង្ហាញបញ្ជីសម្រាប់ប្រភពនេះ។
  new ResourceTemplate("file://{path}", { list: undefined }),
  async (uri, { path }) => ({
    contents: [{
      uri: uri.href,
      text: `File, ${path}!`
    }]
  })
);

// បន្ថែមប្រភពឯកសារដែលអានមាតិកាឯកសារ
server.resource(
  "file",
  new ResourceTemplate("file://{path}", { list: undefined }),
  async (uri, { path }) => {
    let text;
    try {
      text = await fs.readFile(path, "utf8");
    } catch (err) {
      text = `Error reading file: ${err.message}`;
    }
    return {
      contents: [{
        uri: uri.href,
        text
      }]
    };
  }
);

server.prompt(
  "review-code",
  { code: z.string() },
  ({ code }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Please review this code:\n\n${code}`
      }
    }]
  })
);

// ចាប់ផ្តើមទទួលសារ​នៅលើ stdin និងផ្ញើសារនៅលើ stdout
const transport = new StdioServerTransport();
await server.connect(transport);
```

ក្នុងកូដខាងលើ យើងបាន៖

- នាំចូលថ្នាក់ដែលចាំបាច់ពី MCP TypeScript SDK។
- បង្កើត និងកំណត់ម៉ាស៊ីនបម្រើ MCP ថ្មីមួយ។
- ចុះឈ្មោះឧបករណ៍ប្តូរតាម (`calculator`) ជាមួយមុខងារគ្រប់គ្រង។
- ចាប់ផ្តើមម៉ាស៊ីនបម្រើដើម្បីស្ដាប់សំណើ MCP ដែលចូលមក។

## សាកល្បង និងដោះស្រាយបញ្ហា

មុនពេលចាប់ផ្តើមសាកល្បងម៉ាស៊ីនបម្រើ MCP របស់អ្នក គួរតែយល់ដឹងពីឧបករណ៍ និងចំណេះដឹងល្អៗក្នុងការរកមើលបញ្ហា។ ការសាកល្បងមានប្រសិទ្ធភាពធ្វើអោយម៉ាស៊ីនបម្រើរបស់អ្នកធ្វើការតាមការរំពឹងទុក ហើយជួយអ្នកស្គាល់បញ្ហានិងដោះស្រាយយ៉ាងរហ័ស។ ផ្នែកក្រោមនេះបង្ហាញពីវិធីសាស្រ្តណែនាំក្នុងការផ្ទៀងផ្ទាត់ការអនុវត្ត MCP របស់អ្នក។

MCP ផ្ដល់ឧបករណ៍ជួយអ្នកសាកល្បង និងដោះស្រាយបញ្ហា ម៉ាស៊ីនបម្រើរបស់អ្នក៖

- **ឧបករណ៍ Inspector**, មុខងារប្រភេទក្រាហ្វិកដែលអនុញ្ញាតឱ្យអ្នកភ្ជាប់ទៅម៉ាស៊ីនបម្រើរបស់អ្នក និងសាកល្បងឧបករណ៍, ជំពូក និងធនធាន។ 
- **curl**, អ្នកអាចភ្ជាប់ទៅម៉ាស៊ីនបម្រើដោយប្រើឧបករណ៍បន្ទាត់ពាក្យបញ្ជាចំណុចcurl ឬអតិថិជនផ្សេងៗដែលអាចបង្កើត និងបញ្ជា HTTP ។

### ការប្រើប្រាស់ MCP Inspector

[MCP Inspector](https://github.com/modelcontextprotocol/inspector) គឺជាប្រព័ន្ធសាកល្បងភ្នែកដែលជួយអ្នក៖

1. **រកឃើញសមត្ថភាពម៉ាស៊ីនបម្រើ**៖ ការរកឃើញធនធាន, ឧបករណ៍, និងជំពូកដែលមានស្រាប់ ស្វ័យប្រវត្ដិ
2. **សាកល្បងការប្រើប្រាស់ឧបករណ៍**៖ សាកល្បងប៉ារ៉ាម៉ែត្រផ្សេងៗ និងមើលចម្លើយបានភ្លាមៗ
3. **មើលទិន្នន័យម៉ាស៊ីនបម្រើ**៖ ពិនិត្យព័ត៌មានម៉ាស៊ីនបម្រើ, គំរូ, និងការកំណត់

```bash
# ឧទាហរណ៍ TypeScript, ការតំឡើង និងការប្រតិបត្តិ MCP Inspector
npx @modelcontextprotocol/inspector node build/index.js
```

នៅពេលដែលអ្នកបញ្ចូលពាក្យបញ្ជាខាងលើ MCP Inspector នឹងបើកផ្ទាំងបណ្ដាញក្នុងកម្មវិធីរុករករបស់អ្នក។ អ្នកអាចរំពឹងថានឹងឃើញផ្ទាំងគ្រប់គ្រងបង្ហាញម៉ាស៊ីនបម្រើ MCP ដែលបានចុះបញ្ជី រួមទាំងឧបករណ៍, ធនធាន និងជំពូកដែលមាន។ ផ្ទាំងនេះអនុញ្ញាតឱ្យអ្នកមានអន្តរកម្មក្នុងការសាកល្បងការប្រើប្រាស់ឧបករណ៍, ពិនិត្យទិន្នន័យម៉ាស៊ីនបម្រើ, ហើយមើលចម្លើយពេលជាក់លាក់ បានធ្វើឱ្យងាយស្រួលក្នុងការផ្ទៀងផ្ទាត់ និងដោះស្រាយបញ្ហាអនុវត្ត MCP របស់អ្នក។

នេះគឺជារូបថតអេក្រង់មួយដែលវាអាចមើលទៅដូចជា៖

![MCP Inspector server connection](../../../../translated_images/km/connected.73d1e042c24075d3.webp)

## បញ្ហាតំឡើងធម្មតា និងដំណោះស្រាយ

| បញ្ហា | ដំណោះស្រាយអាចធ្វើបាន |
|-------|-------------------------|
| ការភ្ជាប់ត្រូវបានទេរ | ពិនិត្យមើលថាម៉ាស៊ីនបម្រើកំពុងដំណើរការ ហើយផ្នែកច្រកត្រឹមត្រូវ |
| កំហុសពេលដំណើរការឧបករណ៍ | ពិនិត្យការផ្ទៀងផ្ទាត់ប៉ារ៉ាម៉ែត្រ និងការដោះស្រាយកំហុស |
| ការបរាជ័យសម្ងាត់ភាព | ពិនិត្យកូនសោ API និងសិទ្ធិចូលប្រើ |
| កំហុសផ្ទ្រីងសមាជនschema | ប្រាកដថាប៉ារ៉ាម៉ែត្រចំរូងតាមschema ដែលបានកំណត់ |
| ម៉ាស៊ីនបម្រើមិនចាប់ផ្តើម | ពិនិត្យការប្រឈមផ្នែកច្រក ឬការខ្វះខាតបំណងបណ្ដាញ |
| កំហុស CORS | កំណត់ក្បាល CORS ឱ្យត្រឹមត្រូវសម្រាប់សំណើកាត់ដែន |
| បញ្ហាសម្ងាត់ភាព | ពិនិត្យសុពលភាពសញ្ញាហត្ថលេខា និងសិទ្ធិចូលប្រើឱ្យបានត្រឹមត្រូវ |

## អភិវឌ្ឍន៍ក្នុងក្នុងតំបន់ (Local)

សម្រាប់ការអភិវឌ្ឍន៍ និងសាកល្បងក្នុងតំបន់ អ្នកអាចដំណើរការ MCP servers ជាប្រព័ន្ធម៉ាស៊ីនផ្ទាល់ខ្លួនបាន៖

1. **ចាប់ផ្តើមដំណើរការម៉ាស៊ីនបម្រើ**៖ ប្រតិបត្តិកម្ម MCP server របស់អ្នក
2. **កំណត់បណ្តាញ**៖ ប្រាកដថាម៉ាស៊ីនបម្រើអាចចូលដំណើរការបាននៅផ្នែកច្រកដែលរំពឹងទុក
3. **ភ្ជាប់អតិថិជន**៖ ប្រើ URL ភ្ជាប់ក្នុងតំបន់ដូចជា `http://localhost:3000`

```bash
# ឧទាហរណ៍ៈ កំពុងដំណើរការតាម TypeScript MCP ប្រតិបត្តិករផ្សេងៗនៅក្នុងកន្លែង
npm run start
# ប្រតិបត្តិការផ្សេងៗកំពុងដំណើរការនៅ http://localhost:3000
```

## សង់ MCP Server ដំបូងរបស់អ្នក

យើងបានពិភាក្សាពី [គំនិតមូលដ្ឋាន](/01-CoreConcepts/README.md) នៅមេរៀនមុន, ឥឡូវនេះ ពេលវេលាសម្រាប់ប្រើចំណេះដឹងនោះក្នុងការងារ។

### ម៉ាស៊ីនបម្រើអាចធ្វើអ្វីខ្លះ

មុនចាប់ផ្តើមសរសេរកូដ យើងត្រូវចងចាំពីអ្វីដែលម៉ាស៊ីនបម្រើអាចធ្វើបាន៖

ម៉ាស៊ីនបម្រើ MCP អាច៖

- ចូលទៅកាន់ឯកសារផ្ទាល់ខ្លួន និងមូលដ្ឋានទិន្នន័យ
- ភ្ជាប់ទៅកាន់ API ពីចម្ងាយ
- ជួញដូរការគណនាគណនា
- លាយបញ្ចូលជាមួយឧបករណ៍ និងសេវាកម្មផ្សេងៗ
- ផ្ដល់ផ្ទាំងអ្នកប្រើសម្រាប់អន្តរកម្ម

ល្អណាស់, ឥឡូវនេះយើងដឹងថាអ្វីដែលអាចធ្វើបាន, ចាប់ផ្តើមសរសេរកូដ។

## ការផ្តល់អត្ថកម្ម៖ បង្កើតម៉ាស៊ីនបម្រើ

ដើម្បីបង្កើតម៉ាស៊ីនបម្រើ អ្នកត្រូវធ្វើតាមជំហាន៖

- តំឡើង MCP SDK។
- បង្កើតគម្រោង និងរៀបចំរចនាសម្ព័ន្ធគម្រោង។
- សរសេរកូដម៉ាស៊ីនបម្រើ។
- សាកល្បងម៉ាស៊ីនបម្រើ។

### -1- បង្កើតគម្រោង

#### TypeScript

```sh
# បង្កើតថតគម្រោង និងផ្តើមគម្រោង npm
mkdir calculator-server
cd calculator-server
npm init -y
```

#### Python

```sh
# បង្កើតថតគម្រោង
mkdir calculator-server
cd calculator-server
# បើកថតក្នុង Visual Studio Code - លើកលែងបើអ្នកកំពុងប្រើ IDE ផ្សេងទៀត
code .
```

#### .NET

```sh
dotnet new console -n McpCalculatorServer
cd McpCalculatorServer
```

#### Java

សម្រាប់ Java, បង្កើតគម្រោង Spring Boot៖

```bash
curl https://start.spring.io/starter.zip \
  -d dependencies=web \
  -d javaVersion=21 \
  -d type=maven-project \
  -d groupId=com.example \
  -d artifactId=calculator-server \
  -d name=McpServer \
  -d packageName=com.microsoft.mcp.sample.server \
  -o calculator-server.zip
```

ដកស្រង់ឯកសារ zip៖

```bash
unzip calculator-server.zip -d calculator-server
cd calculator-server
# ជម្រើសលុបការប្រឡងដែលមិនបានប្រើប្រាស់
rm -rf src/test/java
```

បន្ថែមការកំណត់ពេញលេញទៅឯកសារ *pom.xml* របស់អ្នក៖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <!-- Spring Boot parent for dependency management -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.0</version>
        <relativePath />
    </parent>

    <!-- Project coordinates -->
    <groupId>com.example</groupId>
    <artifactId>calculator-server</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>Calculator Server</name>
    <description>Basic calculator MCP service for beginners</description>

    <!-- Properties -->
    <properties>
        <java.version>21</java.version>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
    </properties>

    <!-- Spring AI BOM for version management -->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.ai</groupId>
                <artifactId>spring-ai-bom</artifactId>
                <version>1.0.0-SNAPSHOT</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <!-- Dependencies -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-starter-mcp-server-webflux</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-test</artifactId>
         <scope>test</scope>
      </dependency>
    </dependencies>

    <!-- Build configuration -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <release>21</release>
                </configuration>
            </plugin>
        </plugins>
    </build>

    <!-- Repositories for Spring AI snapshots -->
    <repositories>
        <repository>
            <id>spring-milestones</id>
            <name>Spring Milestones</name>
            <url>https://repo.spring.io/milestone</url>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
        <repository>
            <id>spring-snapshots</id>
            <name>Spring Snapshots</name>
            <url>https://repo.spring.io/snapshot</url>
            <releases>
                <enabled>false</enabled>
            </releases>
        </repository>
    </repositories>
</project>
```

#### Rust

```sh
mkdir calculator-server
cd calculator-server
cargo init
```

### -2- បន្ថែមការពឹងពាក់

ឥឡូវនេះដែលអ្នកបានបង្កើតគម្រោងរួចហើយ, អ្នកត្រូវបន្ថែមការពឹងពាក់៖

#### TypeScript

```sh
# ប្រសិនបើមិនទាន់បានដំឡើង សូមដំឡើង TypeScript ទូទាំងប្រព័ន្ធ
npm install typescript -g

# ដំឡើង MCP SDK និង Zod សម្រាប់ការផ្ទៀងផ្ទាត់ schema
npm install @modelcontextprotocol/sdk zod
npm install -D @types/node typescript
```

#### Python

```sh
# បង្កើតបរិបទមេសិងតម្លើងការពឹងផ្អែក
python -m venv venv
venv\Scripts\activate
pip install "mcp[cli]"
```

#### Java

```bash
cd calculator-server
./mvnw clean install -DskipTests
```

#### Rust

```sh
cargo add rmcp --features server,transport-io
cargo add serde
cargo add tokio --features rt-multi-thread
```

### -3- បង្កើតឯកសារគម្រោង

#### TypeScript

បើកឯកសារ *package.json* ហើយជំនួសអត្ថបទដោយខាងក្រោម ដើម្បីធានាថាអ្នកអាចបង្កើត និងដំណើរការម៉ាស៊ីនបម្រើបាន៖

```json
{
  "name": "calculator-server",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "npm run build && node ./build/index.js",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "A simple calculator server using Model Context Protocol",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.16.0",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@types/node": "^24.0.14",
    "typescript": "^5.8.3"
  }
}
```

បង្កើតឯកសារ *tsconfig.json* ដែលមានអត្ថបទដូចខាងក្រោម៖

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

បង្កើតថតសម្រាប់កូដប្រភពរបស់អ្នក៖

```sh
mkdir src
touch src/index.ts
```

#### Python

បង្កើតឯកសារ *server.py*

```sh
touch server.py
```

#### .NET

តំឡើងកញ្ចប់ NuGet ដែលត្រូវការ៖

```sh
dotnet add package ModelContextProtocol --prerelease
dotnet add package Microsoft.Extensions.Hosting
```

#### Java

សម្រាប់គម្រោង Java Spring Boot, រចនាសម្ព័ន្ធគម្រោងត្រូវបានបង្កើតស្វ័យប្រវត្តិ។

#### Rust

សម្រាប់ Rust, ឯកសារ *src/main.rs* ត្រូវបានបង្កើតដោយលំនាំដើមពេលអ្នកប្រតិបត្តិ `cargo init`។ បើកឯកសារនោះ ហើយលុបកូដលំនាំដើម។

### -4- សរសេរកូដម៉ាស៊ីនបម្រើ

#### TypeScript

បង្កើតឯកសារ *index.ts* ហើយបញ្ចូលកូដដូចខាងក្រោម៖

```typescript
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
 
// បង្កើតម៉ាស៊ីនបម្រើ MCP
const server = new McpServer({
  name: "Calculator MCP Server",
  version: "1.0.0"
});
```

ឥឡូវអ្នកមានម៉ាស៊ីនបម្រើមួយ, ប៉ុន្តែមិនធ្វើអ្វីច្រើនទេ, បានហើយ, យើងគួរជួសជុលវា។

#### Python

```python
# server.py
from mcp.server.fastmcp import FastMCP

# បង្កើតម៉ាស៊ីនមេ MCP
mcp = FastMCP("Demo")
```

#### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);
builder.Logging.AddConsole(consoleLogOptions =>
{
    // Configure all logs to go to stderr
    consoleLogOptions.LogToStandardErrorThreshold = LogLevel.Trace;
});

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithToolsFromAssembly();
await builder.Build().RunAsync();

// add features
```

#### Java

សម្រាប់ Java, បង្កើតផ្នែកស្នូលម៉ាស៊ីនបម្រើ។ ដំបូងកែសម្រួលថ្នាក់កម្មវិធីសាកល្បង៖

*src/main/java/com/microsoft/mcp/sample/server/McpServerApplication.java*:

```java
package com.microsoft.mcp.sample.server;

import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.ai.tool.method.MethodToolCallbackProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.microsoft.mcp.sample.server.service.CalculatorService;

@SpringBootApplication
public class McpServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(McpServerApplication.class, args);
    }
    
    @Bean
    public ToolCallbackProvider calculatorTools(CalculatorService calculator) {
        return MethodToolCallbackProvider.builder().toolObjects(calculator).build();
    }
}
```

បង្កើតសេវាកម្មគណនាបូក *src/main/java/com/microsoft/mcp/sample/server/service/CalculatorService.java*:

```java
package com.microsoft.mcp.sample.server.service;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;

/**
 * Service for basic calculator operations.
 * This service provides simple calculator functionality through MCP.
 */
@Service
public class CalculatorService {

    /**
     * Add two numbers
     * @param a The first number
     * @param b The second number
     * @return The sum of the two numbers
     */
    @Tool(description = "Add two numbers together")
    public String add(double a, double b) {
        double result = a + b;
        return formatResult(a, "+", b, result);
    }

    /**
     * Subtract one number from another
     * @param a The number to subtract from
     * @param b The number to subtract
     * @return The result of the subtraction
     */
    @Tool(description = "Subtract the second number from the first number")
    public String subtract(double a, double b) {
        double result = a - b;
        return formatResult(a, "-", b, result);
    }

    /**
     * Multiply two numbers
     * @param a The first number
     * @param b The second number
     * @return The product of the two numbers
     */
    @Tool(description = "Multiply two numbers together")
    public String multiply(double a, double b) {
        double result = a * b;
        return formatResult(a, "*", b, result);
    }

    /**
     * Divide one number by another
     * @param a The numerator
     * @param b The denominator
     * @return The result of the division
     */
    @Tool(description = "Divide the first number by the second number")
    public String divide(double a, double b) {
        if (b == 0) {
            return "Error: Cannot divide by zero";
        }
        double result = a / b;
        return formatResult(a, "/", b, result);
    }

    /**
     * Calculate the power of a number
     * @param base The base number
     * @param exponent The exponent
     * @return The result of raising the base to the exponent
     */
    @Tool(description = "Calculate the power of a number (base raised to an exponent)")
    public String power(double base, double exponent) {
        double result = Math.pow(base, exponent);
        return formatResult(base, "^", exponent, result);
    }

    /**
     * Calculate the square root of a number
     * @param number The number to find the square root of
     * @return The square root of the number
     */
    @Tool(description = "Calculate the square root of a number")
    public String squareRoot(double number) {
        if (number < 0) {
            return "Error: Cannot calculate square root of a negative number";
        }
        double result = Math.sqrt(number);
        return String.format("√%.2f = %.2f", number, result);
    }

    /**
     * Calculate the modulus (remainder) of division
     * @param a The dividend
     * @param b The divisor
     * @return The remainder of the division
     */
    @Tool(description = "Calculate the remainder when one number is divided by another")
    public String modulus(double a, double b) {
        if (b == 0) {
            return "Error: Cannot divide by zero";
        }
        double result = a % b;
        return formatResult(a, "%", b, result);
    }

    /**
     * Calculate the absolute value of a number
     * @param number The number to find the absolute value of
     * @return The absolute value of the number
     */
    @Tool(description = "Calculate the absolute value of a number")
    public String absolute(double number) {
        double result = Math.abs(number);
        return String.format("|%.2f| = %.2f", number, result);
    }

    /**
     * Get help about available calculator operations
     * @return Information about available operations
     */
    @Tool(description = "Get help about available calculator operations")
    public String help() {
        return "Basic Calculator MCP Service\n\n" +
               "Available operations:\n" +
               "1. add(a, b) - Adds two numbers\n" +
               "2. subtract(a, b) - Subtracts the second number from the first\n" +
               "3. multiply(a, b) - Multiplies two numbers\n" +
               "4. divide(a, b) - Divides the first number by the second\n" +
               "5. power(base, exponent) - Raises a number to a power\n" +
               "6. squareRoot(number) - Calculates the square root\n" + 
               "7. modulus(a, b) - Calculates the remainder of division\n" +
               "8. absolute(number) - Calculates the absolute value\n\n" +
               "Example usage: add(5, 3) will return 5 + 3 = 8";
    }

    /**
     * Format the result of a calculation
     */
    private String formatResult(double a, String operator, double b, double result) {
        return String.format("%.2f %s %.2f = %.2f", a, operator, b, result);
    }
}
```

**ផ្នែកជាជម្រើសសម្រាប់សេវាផលិតកម្ម៖**

បង្កើតការកំណត់ចាប់ផ្តើម *src/main/java/com/microsoft/mcp/sample/server/config/StartupConfig.java*:

```java
package com.microsoft.mcp.sample.server.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StartupConfig {
    
    @Bean
    public CommandLineRunner startupInfo() {
        return args -> {
            System.out.println("\n" + "=".repeat(60));
            System.out.println("Calculator MCP Server is starting...");
            System.out.println("SSE endpoint: http://localhost:8080/sse");
            System.out.println("Health check: http://localhost:8080/actuator/health");
            System.out.println("=".repeat(60) + "\n");
        };
    }
}
```

បង្កើតកម្មវិធីឆែកសុខភាព *src/main/java/com/microsoft/mcp/sample/server/controller/HealthController.java*:

```java
package com.microsoft.mcp.sample.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("service", "Calculator MCP Server");
        return ResponseEntity.ok(response);
    }
}
```

បង្កើតអ្នកគ្រប់គ្រងករណីកំហុស *src/main/java/com/microsoft/mcp/sample/server/exception/GlobalExceptionHandler.java*:

```java
package com.microsoft.mcp.sample.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
        ErrorResponse error = new ErrorResponse(
            "Invalid_Input", 
            "Invalid input parameter: " + ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    public static class ErrorResponse {
        private String code;
        private String message;

        public ErrorResponse(String code, String message) {
            this.code = code;
            this.message = message;
        }

        // អ្នកទទួលបាន
        public String getCode() { return code; }
        public String getMessage() { return message; }
    }
}
```

បង្កើតបដាសកម្ម(Custom banner) *src/main/resources/banner.txt*:

```text
_____      _            _       _             
 / ____|    | |          | |     | |            
| |     __ _| | ___ _   _| | __ _| |_ ___  _ __ 
| |    / _` | |/ __| | | | |/ _` | __/ _ \| '__|
| |___| (_| | | (__| |_| | | (_| | || (_) | |   
 \_____\__,_|_|\___|\__,_|_|\__,_|\__\___/|_|   
                                                
Calculator MCP Server v1.0
Spring Boot MCP Application
```

</details>

#### Rust

បន្ថែមកូដខាងក្រោមទៅលើកំពូលឯកសារ *src/main.rs*។ នេះនាំចូលបណ្ណាល័យ និងម៉ូឌុលដែលតំរូវសម្រាប់ម៉ាស៊ីនបម្រើ MCP របស់អ្នក។

```rust
use rmcp::{
    handler::server::{router::tool::ToolRouter, tool::Parameters},
    model::{ServerCapabilities, ServerInfo},
    schemars, tool, tool_handler, tool_router,
    transport::stdio,
    ServerHandler, ServiceExt,
};
use std::error::Error;
```

ម៉ាស៊ីនបម្រើ calculator នឹងធ្វើការងាយស្រួលបូកលេខពីរចូលគ្នា។ យើងបង្កើត struct មួយសម្រាប់តំណាងតំណើរការគណនា។

```rust
#[derive(Debug, serde::Deserialize, schemars::JsonSchema)]
pub struct CalculatorRequest {
    pub a: f64,
    pub b: f64,
}
```

បន្ទាប់មក បង្កើត struct មួយសម្រាប់តំណាងម៉ាស៊ីនបម្រើ calculator។ Struct នេះនឹងកាន់ router ឧបករណ៍ ដែលប្រើសម្រាប់ចុះឈ្មោះឧបករណ៍។

```rust
#[derive(Debug, Clone)]
pub struct Calculator {
    tool_router: ToolRouter<Self>,
}
```

ឥឡូវនេះ យើងអាចអនុវត្ត `Calculator` struct ដើម្បីបង្កើតឧទាហរណ៍ថ្មីនៃម៉ាស៊ីនបម្រើ និងអនុវត្តអ្នកគ្រប់គ្រងម៉ាស៊ីនបម្រើដើម្បីផ្ដល់ព័ត៌មានម៉ាស៊ីនបម្រើ។

```rust
#[tool_router]
impl Calculator {
    pub fn new() -> Self {
        Self {
            tool_router: Self::tool_router(),
        }
    }
}

#[tool_handler]
impl ServerHandler for Calculator {
    fn get_info(&self) -> ServerInfo {
        ServerInfo {
            instructions: Some("A simple calculator tool".into()),
            capabilities: ServerCapabilities::builder().enable_tools().build(),
            ..Default::default()
        }
    }
}
```

ចុងក្រោយនេះ យើងត្រូវអនុវត្តមុខងារ main ដើម្បីចាប់ផ្តើមម៉ាស៊ីនបម្រើ។ មុខងារនេះនឹងបង្កើតឧទាហរណ៍ `Calculator` struct និងបម្រើវាតាមរយៈ input/output ស្តង់ដារ។

```rust
#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let service = Calculator::new().serve(stdio()).await?;
    service.waiting().await?;
    Ok(())
}
```

ម៉ាស៊ីនបម្រើឥឡូវបានផ្ដល់ព័ត៌មានមូលដ្ឋានអំពីខ្លួនវា។ បន្ទាប់មក យើងនឹងបន្ថែមឧបករណ៍សម្រាប់បូកលេខ។

### -5- បន្ថែមឧបករណ៍ និងធនធាន

បន្ថែមឧបករណ៍ និងធនធានដោយបន្ថែមកូដខាងក្រោម៖

#### TypeScript

```typescript
server.tool(
  "add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);
```

ឧបករណ៍របស់អ្នកទទួលប៉ារ៉ាម៉ែត្រ `a` និង `b` ហើយដំណើរការមុខងារដែលបង្កើតចម្លើយក្នុងទ្រង់ទ្រាយ៖

```typescript
{
  contents: [{
    type: "text", content: "some content"
  }]
}
```

ធនធានរបស់អ្នកត្រូវបានចូលដំណើរការតាម string "greeting" ហើយទទួលប៉ារ៉ាម៉ែត្រ `name` ហើយបង្កើតចម្លើយស្រដៀងគ្នានឹងឧបករណ៍៖

```typescript
{
  uri: "<href>",
  text: "a text"
}
```

#### Python

```python
# បន្ថែមឧបករណ៍បូក
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b


# បន្ថែមធនធានស្វាគមន៍動ភាព
@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    """Get a personalized greeting"""
    return f"Hello, {name}!"
```

នៅក្នុងកូដខាងលើ យើងបាន：

- កំណត់ឧបករណ៍ `add` ដែលទទួលប៉ារ៉ាម៉ែត្រ `a` និង `b` ដែលជាចំនួនពេញលេញទាំងពីរ។
- បង្កើតធនធានដែលមានឈ្មោះ `greeting` ដែលទទួលប៉ារ៉ាម៉ែត្រ `name`។

#### .NET

បន្ថែមនេះទៅក្នុងឯកសារ Program.cs របស់អ្នក៖

```csharp
[McpServerToolType]
public static class CalculatorTool
{
    [McpServerTool, Description("Adds two numbers")]
    public static string Add(int a, int b) => $"Sum {a + b}";
}
```

#### Java

ឧបករណ៍បានបង្កើតរួចនៅជំហានមុន។

#### Rust

បន្ថែមឧបករណ៍ថ្មីនៅក្នុងកូដ `impl Calculator`៖

```rust
#[tool(description = "Adds a and b")]
async fn add(
    &self,
    Parameters(CalculatorRequest { a, b }): Parameters<CalculatorRequest>,
) -> String {
    (a + b).to_string()
}
```

### -6- កូដចុងក្រោយ

យើងបន្ថែមកូដចុងក្រោយដែលត្រូវការ ដើម្បីម៉ាស៊ីនបម្រើអាចចាប់ផ្តើមបាន៖

#### TypeScript

```typescript
// ចាប់ផ្តើមទទួលសារ​លើ stdin និងផ្ញើសារ​លើ stdout
const transport = new StdioServerTransport();
await server.connect(transport);
```

នេះគឺជាកូដពេញលេញ៖

```typescript
// index.ts
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// បង្កើតម៉ាស៊ីនមេ MCP
const server = new McpServer({
  name: "Calculator MCP Server",
  version: "1.0.0"
});

// បន្ថែមឧបករណ៍បូកបន្ថែម
server.tool(
  "add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// បន្ថែមធនធានស្វាគមន៍ឌីណាមិច
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);

// ចាប់ផ្តើមទទួលសារ នៅលើ stdin និងផ្ញើសារ នៅលើ stdout
const transport = new StdioServerTransport();
server.connect(transport);
```

#### Python

```python
# server.py
from mcp.server.fastmcp import FastMCP

# បង្កើតម៉ាស៊ីនមេ MCP
mcp = FastMCP("Demo")


# បន្ថែមឧបករណ៍បូក
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b


# បន្ថែមធនធានស្វាគមន៍ δυναμικά
@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    """Get a personalized greeting"""
    return f"Hello, {name}!"

# ប្លុកអនុវត្ត៍សំខាន់ - នេះគឺចាំបាច់សម្រាប់រត់ម៉ាស៊ីនមេ
if __name__ == "__main__":
    mcp.run()
```

#### .NET

សរសេរ Program.cs ដោយមានអត្ថបទដូចខាងក្រោម៖

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);
builder.Logging.AddConsole(consoleLogOptions =>
{
    // Configure all logs to go to stderr
    consoleLogOptions.LogToStandardErrorThreshold = LogLevel.Trace;
});

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithToolsFromAssembly();
await builder.Build().RunAsync();

[McpServerToolType]
public static class CalculatorTool
{
    [McpServerTool, Description("Adds two numbers")]
    public static string Add(int a, int b) => $"Sum {a + b}";
}
```

#### Java

ថ្នាក់កម្មវិធីបណ្ដូលរបស់អ្នកគួរតែមានរូបរាងដូចខាងក្រោម៖

```java
// McpServerApplication.java
package com.microsoft.mcp.sample.server;

import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.ai.tool.method.MethodToolCallbackProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.microsoft.mcp.sample.server.service.CalculatorService;

@SpringBootApplication
public class McpServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(McpServerApplication.class, args);
    }
    
    @Bean
    public ToolCallbackProvider calculatorTools(CalculatorService calculator) {
        return MethodToolCallbackProvider.builder().toolObjects(calculator).build();
    }
}
```

#### Rust

កូដចុងក្រោយសម្រាប់ម៉ាស៊ីនបម្រើ Rust គួរតែមានរូបរាងដូចខាងក្រោម៖

```rust
use rmcp::{
    ServerHandler, ServiceExt,
    handler::server::{router::tool::ToolRouter, tool::Parameters},
    model::{ServerCapabilities, ServerInfo},
    schemars, tool, tool_handler, tool_router,
    transport::stdio,
};
use std::error::Error;

#[derive(Debug, serde::Deserialize, schemars::JsonSchema)]
pub struct CalculatorRequest {
    pub a: f64,
    pub b: f64,
}

#[derive(Debug, Clone)]
pub struct Calculator {
    tool_router: ToolRouter<Self>,
}

#[tool_router]
impl Calculator {
    pub fn new() -> Self {
        Self {
            tool_router: Self::tool_router(),
        }
    }
    
    #[tool(description = "Adds a and b")]
    async fn add(
        &self,
        Parameters(CalculatorRequest { a, b }): Parameters<CalculatorRequest>,
    ) -> String {
        (a + b).to_string()
    }
}

#[tool_handler]
impl ServerHandler for Calculator {
    fn get_info(&self) -> ServerInfo {
        ServerInfo {
            instructions: Some("A simple calculator tool".into()),
            capabilities: ServerCapabilities::builder().enable_tools().build(),
            ..Default::default()
        }
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let service = Calculator::new().serve(stdio()).await?;
    service.waiting().await?;
    Ok(())
}
```

### -7- សាកល្បងម៉ាស៊ីនបម្រើ

ចាប់ផ្តើមម៉ាស៊ីនបម្រើជាមួយបញ្ជាទីខាងក្រោម៖

#### TypeScript

```sh
npm run build
```

#### Python

```sh
mcp run server.py
```

> ដើម្បីប្រើ MCP Inspector, ប្រើ `mcp dev server.py` ដែលនឹងបើក Inspector ដោយស្វ័យប្រវត្តិ និងផ្ដល់សញ្ញាសម័យភ្ជាប់ចាំបាច់។ ប្រសិនបើប្រើ `mcp run server.py` អ្នកត្រូវចាប់ផ្តើម Inspector ដោយដៃ និងកំណត់ការភ្ជាប់។

#### .NET

ប្រាកដថាអ្នកនៅក្នុងថតគម្រោងរបស់អ្នក៖

```sh
cd McpCalculatorServer
dotnet run
```

#### Java

```bash
./mvnw clean install -DskipTests
java -jar target/calculator-server-0.0.1-SNAPSHOT.jar
```

#### Rust

រត់បញ្ជាទីខាងក្រោមដើម្បីរចនាសម្ព័ន្ធ និងដំណើរការម៉ាស៊ីនបម្រើ៖

```sh
cargo fmt
cargo run
```

### -8- ប្រើ Inspector ដើម្បីដំណើរការ

Inspector គឺជាឧបករណ៍ដ៏ល្អមួយដែលអាចចាប់ផ្តើមម៉ាស៊ីនបម្រើរបស់អ្នក និងអនុញ្ញាតឱ្យអ្នកអាចទំនាក់ទំនងជាមួយវា ដើម្បីសាកល្បងថាវាធ្វើការល្អឬអត់។ ចាប់ផ្តើមវា៖

> [!NOTE]
> វាអាចមើលខុសគ្នា នៅក្នុងវាល "command" ព្រោះវាមានពាក្យបញ្ជារតំរូវសម្រាប់រត់ម៉ាស៊ីនបម្រើជាមួយ runtime ពិសេសរបស់អ្នក។

#### TypeScript

```sh
npx @modelcontextprotocol/inspector node build/index.js
```

ឬបន្ថែមវាទៅក្នុង *package.json* របស់អ្នកដូចជា៖ `"inspector": "npx @modelcontextprotocol/inspector node build/index.js"` បន្ទាប់មករត់ `npm run inspector`

#### Python

Python ខុងបានបំពាក់ឧបករណ៍ Node.js ដែលមានឈ្មោះ inspector។ អាចហៅឧបករណ៍នោះដូចខាងក្រោម៖

```sh
mcp dev server.py
```

 ទោះជាយ៉ាងណាវាមិនបំពេញមុខងារទាំងអស់ដែលមាននូវឧបករណ៍នោះទេ ដូច្នេះ អ្នកត្រូវបានណែនាំឲ្យរត់ឧបករណ៍ Node.js ដោយផ្ទាល់ដូចខាងក្រោម៖

```sh
npx @modelcontextprotocol/inspector mcp run server.py
```

ប្រសិនបើអ្នកប្រើឧបករណ៍ ឬ IDE ដែលអនុញ្ញាតឱ្យអ្នកកំណត់បញ្ជា និងអាគុយម៉ង់សម្រាប់រត់ស្គ្រីប,

make sure to set `python` នៅក្នុង​ប្រអប់ `Command` ហើយ `server.py` ជា `Arguments`។ វានឹងធានាថាស្គ្រីបរត់បានត្រឹមត្រូវ។

#### .NET

ប្រាកដថាអ្នកនៅក្នុងថតគម្រោងរបស់អ្នក៖

```sh
cd McpCalculatorServer
npx @modelcontextprotocol/inspector dotnet run
```

#### Java

ធានាថាសេវាកម្ម calculator server របស់អ្នកកំពុងរត់
បន្ទាប់មករត់កម្មវិធី inspector ៖

```cmd
npx @modelcontextprotocol/inspector
```

នៅក្នុងចំណុចចុច inspector web interface:

1. ជ្រើសរើស "SSE" ជាប្រភេទការដឹកជញ្ជូន
2. កំណត់ URL ទៅ: `http://localhost:8080/sse`
3. ចុច "Connect"

![Connect](../../../../translated_images/km/tool.163d33e3ee307e20.webp)

**ឥឡូវនេះអ្នកបានភ្ជាប់ទៅកាន់ម៉ាស្សឺរ**
**ផ្នែកសាកល្បងម៉ាស្សឺរ Java បានបញ្ចប់រួចហើយ**

ផ្នែកបន្ទាប់គឺអំពីការប្រាស្រ័យទាក់ទងជាមួយម៉ាស្សឺរ។

អ្នកគួរមើលឃើញផ្ទាំងមុខអ្នកប្រើដូចខាងក្រោម៖

![Connect](../../../../translated_images/km/connect.141db0b2bd05f096.webp)

1. ភ្ជាប់ទៅម៉ាស្សឺរដោយជ្រើសចុចប៊ូតុង Connect
  មុនពេលអ្នកភ្ជាប់ទៅម៉ាស្សឺរ អ្នកគួរមើលឃើញដូចខាងក្រោម៖

  ![Connected](../../../../translated_images/km/connected.73d1e042c24075d3.webp)

1. ជ្រើសរើស "Tools" និង "listTools", អ្នកគួរមើលឃើញ "Add" បង្ហាញឡើងជ្រើស "Add" ហើយបញ្ចូលតម្លៃប៉ារ៉ាម៉ែត្រ។

  អ្នកគួរមើលឃើញការឆ្លើយតបដូចខាងក្រោម ដែលជាសំណល់នៃឧបករណ៍ "add"៖

  ![Result of running add](../../../../translated_images/km/ran-tool.a5a6ee878c1369ec.webp)

សូមអបអរសាទរ អ្នកបានបង្កើតនិងរត់ម៉ាស្សឺរដំបូងរបស់អ្នកបានរួចហើយ!

#### Rust

ដើម្បីរត់ម៉ាស្សឺរ Rust ជាមួយ MCP Inspector CLI ប្រើបញ្ជាខាងក្រោម៖

```sh
npx @modelcontextprotocol/inspector cargo run --cli --method tools/call --tool-name add --tool-arg a=1 b=2
```

### Official SDKs

MCP ផ្ដល់ SDKs ផ្លូវការសម្រាប់ភាសាជាច្រើន៖

- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - រង់ចាំតម្កល់និងរួមសហការជាមួយ Microsoft
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - រង់ចាំតម្កល់និងរួមសហការជាមួយ Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - ការអនុវត្តTypeScript ផ្លូវការ
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - ការអនុវត្ត Python ផ្លូវការ
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - ការអនុវត្ត Kotlin ផ្លូវការ
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - រង់ចាំតម្កល់និងរួមសហការជាមួយ Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - ការអនុវត្ត Rust ផ្លូវការ

## Key Takeaways

- ការតំឡើងបរិយាកាសអភិវឌ្ឍ MCP គឺងាយស្រួលជាមួយ SDKs តាមភាសាគ្រប់ប្រភេទ
- ការបង្កើតម៉ាស្សឺរ MCP ប្រើការបង្កើតនិងចុះបញ្ជីឧបករណ៍ជាមួយស្កីម៉ាផ្សេងៗ
- ការសាកល្បងនិងជួសជុលកំហុស ជាសារៈសំខាន់សម្រាប់ការអនុវត្ត MCP ដែលអាចទុកចិត្តបាន

## Samples

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python)
- [Rust Calculator](../../../../03-GettingStarted/samples/rust)

## Assignment

បង្កើតម៉ាស្សឺរ MCP ពីរូបភាពឧបករណ៍ដែលអ្នកបញ្ជាក់របស់អ្នក៖

1. អនុវត្តឧបករណ៍ក្នុងភាសាដែលអ្នកចូលចិត្ត (.NET, Java, Python, TypeScript, ឬ Rust)។
2. កំណត់ប៉ារ៉ាម៉ែត្រចូលនិងតម្លៃត្រឡប់។
3. រត់ឧបករណ៍ inspector ដើម្បីធានាថាម៉ាស្សឺរធ្វើការដោយសមរម្យ។
4. សាកល្បងការអនុវត្តជាមួយបញ្ចូលផ្សេងៗគ្នា។

## Solution

[Solution](./solution/README.md)

## Additional Resources

- [Build Agents using Model Context Protocol on Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Remote MCP with Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## What's next

បន្ទាប់៖ [Getting Started with MCP Clients](../02-client/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការព្រមាន**៖  
ឯកសារនេះត្រូវបានបកប្រែដោយប្រើសេវាកម្មបកប្រែ AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះបីយើងខិតខំរកភាពត្រឹមត្រូវក៏ដោយ សូមយល់ព្រមថាការបកប្រែដោយស្វ័យប្រវត្តិអាចមានកំហុស ឬការត្រូវខុស។ ឯកសារដើមដែលមានភាសាទ្រង់ទ្រាយដើម គួរត្រូវបានគេយកជាអស់សិទ្ធិដែនកំណត់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឲ្យប្រើការបកប្រែដោយមនុស្សជំនាញ។ យើងមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសពីការប្រើប្រាស់ការបកប្រែនេះឡើយ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->