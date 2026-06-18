# 🌟 Leçons des Premiers Utilisateurs

[![Leçons des Premiers Utilisateurs MCP](../../../translated_images/fr/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Cliquez sur l'image ci-dessus pour regarder la vidéo de cette leçon)_

## 🎯 Ce Module Couvre

Ce module explore comment de véritables organisations et développeurs tirent parti du Model Context Protocol (MCP) pour résoudre des défis réels et stimuler l'innovation. À travers des études de cas détaillées, des projets pratiques et des exemples concrets, vous découvrirez comment MCP permet une intégration sécurisée et évolutive de l'IA qui connecte les modèles de langage, les outils et les données d'entreprise.

### 📚 Voir MCP en Action

Vous souhaitez voir ces principes appliqués à des outils prêts pour la production ? Découvrez nos [**10 Serveurs Microsoft MCP qui Transforment la Productivité des Développeurs**](microsoft-mcp-servers.md), qui présentent de vrais serveurs MCP Microsoft que vous pouvez utiliser dès aujourd'hui.

## Aperçu

Cette leçon explore comment les premiers utilisateurs ont exploité le Model Context Protocol (MCP) pour résoudre des défis concrets et stimuler l'innovation dans divers secteurs. À travers des études de cas détaillées et des projets pratiques, vous verrez comment MCP permet une intégration d'IA standardisée, sécurisée et évolutive—connectant les grands modèles de langage, les outils et les données d'entreprise dans un cadre unifié. Vous acquerrez une expérience pratique dans la conception et la construction de solutions basées sur MCP, apprendrez des modèles d'implémentation éprouvés et découvrirez les meilleures pratiques pour déployer MCP en production. La leçon met également en lumière les tendances émergentes, les orientations futures et les ressources open source pour vous aider à rester à la pointe de la technologie MCP et de son écosystème en évolution.

## Objectifs d'Apprentissage

- Analyser des implémentations MCP réelles dans différents secteurs
- Concevoir et construire des applications complètes basées sur MCP
- Explorer les tendances émergentes et les directions futures de la technologie MCP
- Appliquer les meilleures pratiques dans des scénarios de développement concrets

## Implémentations MCP Réelles

### Étude de Cas 1 : Automatisation du Support Client en Entreprise

Une multinationale a mis en place une solution basée sur MCP pour standardiser les interactions IA à travers ses systèmes de support client. Cela leur a permis de :

- Créer une interface unifiée pour plusieurs fournisseurs de LLM
- Maintenir une gestion cohérente des prompts entre départements
- Implémenter des contrôles robustes de sécurité et conformité
- Passer facilement d’un modèle d’IA à un autre selon les besoins spécifiques

**Implémentation Technique :**

```python
# Implémentation du serveur MCP Python pour le support client
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Configurer la journalisation
logging.basicConfig(level=logging.INFO)

async def main():
    # Créer la configuration du serveur
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Initialiser le serveur MCP
    server = create_server(config)
    
    # Enregistrer les ressources de la base de connaissances
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Enregistrer les modèles d'invite
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Enregistrer les outils de support
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Démarrer le serveur avec le transport HTTP
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**Résultats :** Réduction de 30 % des coûts des modèles, amélioration de 45 % de la cohérence des réponses, et conformité renforcée à l’échelle mondiale.

### Étude de Cas 2 : Assistant de Diagnostic en Santé

Un prestataire de soins de santé a développé une infrastructure MCP pour intégrer plusieurs modèles médicaux spécialisés en IA tout en assurant la protection des données sensibles des patients :

- Passage fluide entre des modèles médicaux généralistes et spécialistes
- Contrôles stricts de confidentialité et pistes d'audit
- Intégration avec les systèmes existants de dossiers médicaux électroniques (DME)
- Ingénierie cohérente des prompts pour la terminologie médicale

**Implémentation Technique :**

```csharp
// C# MCP host application implementation in healthcare application
using Microsoft.Extensions.DependencyInjection;
using ModelContextProtocol.SDK.Client;
using ModelContextProtocol.SDK.Security;
using ModelContextProtocol.SDK.Resources;

public class DiagnosticAssistant
{
    private readonly MCPHostClient _mcpClient;
    private readonly PatientContext _patientContext;
    
    public DiagnosticAssistant(PatientContext patientContext)
    {
        _patientContext = patientContext;
        
        // Configure MCP client with healthcare-specific settings
        var clientOptions = new ClientOptions
        {
            Name = "Healthcare Diagnostic Assistant",
            Version = "1.0.0",
            Security = new SecurityOptions
            {
                Encryption = EncryptionLevel.Medical,
                AuditEnabled = true
            }
        };
        
        _mcpClient = new MCPHostClientBuilder()
            .WithOptions(clientOptions)
            .WithTransport(new HttpTransport("https://healthcare-mcp.example.org"))
            .WithAuthentication(new HIPAACompliantAuthProvider())
            .Build();
    }
    
    public async Task<DiagnosticSuggestion> GetDiagnosticAssistance(
        string symptoms, string patientHistory)
    {
        // Create request with appropriate resources and tool access
        var resourceRequest = new ResourceRequest
        {
            Name = "patient_records",
            Parameters = new Dictionary<string, object>
            {
                ["patientId"] = _patientContext.PatientId,
                ["requestingProvider"] = _patientContext.ProviderId
            }
        };
        
        // Request diagnostic assistance using appropriate prompt
        var response = await _mcpClient.SendPromptRequestAsync(
            promptName: "diagnostic_assistance",
            parameters: new Dictionary<string, object>
            {
                ["symptoms"] = symptoms,
                patientHistory = patientHistory,
                relevantGuidelines = _patientContext.GetRelevantGuidelines()
            });
            
        return DiagnosticSuggestion.FromMCPResponse(response);
    }
}
```
  
**Résultats :** Suggestions diagnostiques améliorées pour les médecins tout en maintenant une conformité totale HIPAA et une réduction significative des changements de contexte entre systèmes.

### Étude de Cas 3 : Analyse des Risques dans les Services Financiers

Une institution financière a déployé MCP pour standardiser ses processus d’analyse des risques à travers différents départements :

- Création d’une interface unifiée pour les modèles de risque de crédit, détection de fraude et risque d’investissement
- Mise en place de contrôles d’accès stricts et versionnage des modèles
- Auditabilité de toutes les recommandations IA garantie
- Formatage cohérent des données entre systèmes divers

**Implémentation Technique :**

```java
// Serveur MCP Java pour l'évaluation des risques financiers
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Créer un serveur MCP avec des fonctionnalités de conformité financière
        MCPServer server = new MCPServerBuilder()
            .withModelProviders(
                new ModelProvider("risk-assessment-primary", new AzureOpenAIProvider()),
                new ModelProvider("risk-assessment-audit", new LocalLlamaProvider())
            )
            .withPromptTemplateDirectory("./compliance/templates")
            .withAccessControls(new SOCCompliantAccessControl())
            .withDataEncryption(EncryptionStandard.FINANCIAL_GRADE)
            .withVersionControl(true)
            .withAuditLogging(new DatabaseAuditLogger())
            .build();
            
        server.addRequestValidator(new FinancialDataValidator());
        server.addResponseFilter(new PII_RedactionFilter());
        
        server.start(9000);
        
        System.out.println("Financial Risk MCP Server running on port 9000");
    }
}
```
  
**Résultats :** Conformité réglementaire renforcée, cycles de déploiement de modèles 40 % plus rapides, et cohérence améliorée des évaluations de risque entre départements.

### Étude de Cas 4 : Serveur MCP Microsoft Playwright pour l’Automatisation de Navigateur

Microsoft a développé le [serveur MCP Playwright](https://github.com/microsoft/playwright-mcp) pour permettre une automatisation sécurisée et standardisée des navigateurs via le Model Context Protocol. Ce serveur prêt pour la production permet aux agents IA et LLM d’interagir avec les navigateurs web de manière contrôlée, auditable et extensible—permettant des cas d’usage tels que les tests web automatisés, l’extraction de données et les workflows de bout en bout.

> **🎯 Outil Prêt pour la Production**  
> Cette étude de cas présente un serveur MCP réel que vous pouvez utiliser aujourd'hui ! En savoir plus sur le Serveur MCP Playwright et neuf autres serveurs MCP Microsoft prêts pour la production dans notre [**Guide des Serveurs MCP Microsoft**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Fonctionnalités Clés :**  
- Expose les capacités d’automatisation du navigateur (navigation, remplissage de formulaire, capture d’écran, etc.) en tant qu’outils MCP  
- Met en œuvre des contrôles d’accès stricts et un sandboxing pour empêcher les actions non autorisées  
- Fournit des journaux d’audit détaillés pour toutes les interactions navigateur  
- Supporte l’intégration avec Azure OpenAI et autres fournisseurs de LLM pour une automatisation pilotée par agents  
- Alimente l’Agent de Codage de GitHub Copilot avec des capacités de navigation web

**Implémentation Technique :**

```typescript
// TypeScript : Enregistrement des outils d'automatisation du navigateur Playwright dans un serveur MCP
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Enregistrer un outil pour naviguer vers une URL et capturer une capture d'écran
server.tools.register(
  new ToolDefinition({
    name: 'navigate_and_screenshot',
    description: 'Navigate to a URL and capture a screenshot',
    parameters: {
      url: { type: 'string', description: 'The URL to visit' }
    }
  }),
  async ({ url }) => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();
    return { screenshot };
  }
);

// Démarrer le serveur MCP
server.listen(8080);
```
  
**Résultats :**

- Automatisation sécurisée et programmable du navigateur pour agents IA et LLM  
- Réduction des efforts de tests manuels et amélioration de la couverture des tests d’applications web  
- Cadre réutilisable et extensible pour l’intégration d’outils basés sur navigateur en environnements d’entreprise  
- Alimente les capacités de navigation web de GitHub Copilot

**Références :**

- [Playwright MCP Server GitHub Repository](https://github.com/microsoft/playwright-mcp)  
- [Solutions IA et Automatisation Microsoft](https://azure.microsoft.com/en-us/products/ai-services/)

### Étude de Cas 5 : Azure MCP – Model Context Protocol En Tant Que Service Enterprise

Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) est l’implémentation gérée et de qualité entreprise du Model Context Protocol par Microsoft, conçue pour offrir des capacités MCP serveur évolutives, sécurisées et conformes en tant que service cloud. Azure MCP permet aux organisations de déployer, gérer et intégrer rapidement des serveurs MCP avec les services Azure AI, données et sécurité, réduisant ainsi la charge opérationnelle et accélérant l’adoption de l’IA.

> **🎯 Outil Prêt pour la Production**  
> C’est un véritable serveur MCP que vous pouvez utiliser aujourd'hui ! En savoir plus sur le Serveur Microsoft Foundry MCP dans notre [**Guide des Serveurs MCP Microsoft**](microsoft-mcp-servers.md).

- Hébergement totalement géré du serveur MCP avec mise à l’échelle, surveillance et sécurité intégrées  
- Intégration native avec Azure OpenAI, Azure AI Search et autres services Azure  
- Authentification et autorisation entreprises via Microsoft Entra ID  
- Support des outils personnalisés, des modèles de prompt et des connecteurs de ressources  
- Conformité aux exigences de sécurité et réglementaires en entreprise

**Implémentation Technique :**

```yaml
# Example: Azure MCP server deployment configuration (YAML)
apiVersion: mcp.microsoft.com/v1
kind: McpServer
metadata:
  name: enterprise-mcp-server
spec:
  modelProviders:
    - name: azure-openai
      type: AzureOpenAI
      endpoint: https://<your-openai-resource>.openai.azure.com/
      apiKeySecret: <your-azure-keyvault-secret>
  tools:
    - name: document_search
      type: AzureAISearch
      endpoint: https://<your-search-resource>.search.windows.net/
      apiKeySecret: <your-azure-keyvault-secret>
  authentication:
    type: EntraID
    tenantId: <your-tenant-id>
  monitoring:
    enabled: true
    logAnalyticsWorkspace: <your-log-analytics-id>
```
  
**Résultats :**  
- Réduction du délai de mise en œuvre pour les projets IA d’entreprise grâce à une plateforme serveur MCP prête à l’emploi et conforme  
- Intégration simplifiée des LLM, outils et sources de données d’entreprise  
- Sécurité, observabilité et efficacité opérationnelle accrues pour les charges de travail MCP  
- Qualité du code améliorée grâce aux meilleures pratiques Azure SDK et aux modèles d’authentification actuels

**Références :**  
- [Documentation Azure MCP](https://aka.ms/azmcp)  
- [Dépôt GitHub Azure MCP Server](https://github.com/Azure/azure-mcp)  
- [Services Azure AI](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Center](https://mcp.azure.com)

## Étude de Cas 6 : NLWeb

MCP (Model Context Protocol) est un protocole émergent permettant aux chatbots et assistants IA d’interagir avec des outils. Chaque instance NLWeb est également un serveur MCP, prenant en charge une méthode principale, ask, utilisée pour poser une question naturelle à un site web. La réponse retournée utilise schema.org, un vocabulaire largement utilisé pour décrire les données web. Grosso modo, MCP est à NLWeb ce que Http est à HTML. NLWeb combine protocoles, formats Schema.org et code d’exemple pour aider les sites à créer rapidement ces points d’accès, profitant à la fois aux humains via des interfaces conversationnelles et aux machines via une interaction naturelle agent à agent.

NLWeb comprend deux composants distincts.  
- Un protocole, très simple au départ, pour interagir avec un site en langage naturel et un format utilisant json et schema.org pour la réponse renvoyée. Voir la documentation sur l’API REST pour plus de détails.  
- Une implémentation simple de (1) qui exploite le balisage existant, pour les sites pouvant être abstraits en listes d’éléments (produits, recettes, attractions, avis, etc.). Avec un ensemble de widgets d’interface utilisateur, les sites peuvent facilement fournir des interfaces conversationnelles à leur contenu. Voir la documentation sur la Vie d’une requête chat pour plus de détails sur son fonctionnement.

**Références :**  
- [Documentation Azure MCP](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### Étude de Cas 7 : Microsoft Foundry MCP Server – Intégration d’Agents IA en Entreprise

Les serveurs Microsoft Foundry MCP montrent comment MCP peut être utilisé pour orchestrer et gérer des agents IA et workflows en environnement d’entreprise. En intégrant MCP avec Microsoft Foundry, les organisations peuvent standardiser les interactions des agents, exploiter la gestion des workflows de Foundry et assurer des déploiements sécurisés et évolutifs.

> **🎯 Outil Prêt pour la Production**  
> C’est un véritable serveur MCP que vous pouvez utiliser aujourd'hui ! En savoir plus sur le Serveur Microsoft Foundry MCP dans notre [**Guide des Serveurs MCP Microsoft**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Fonctionnalités Clés :**  
- Accès complet à l’écosystème IA d’Azure, incluant catalogue de modèles et gestion des déploiements  
- Indexation des connaissances avec Azure AI Search pour des applications RAG  
- Outils d’évaluation des performances des modèles IA et assurance qualité  
- Intégration avec Microsoft Foundry Catalog et Labs pour les modèles de recherche de pointe  
- Capacités de gestion et évaluation des agents pour les scénarios de production

**Résultats :**  
- Prototypage rapide et surveillance robuste des workflows d’agents IA  
- Intégration fluide avec les services Azure AI pour des scénarios avancés  
- Interface unifiée pour construire, déployer et surveiller les pipelines d’agents  
- Sécurité, conformité et efficacité opérationnelle renforcées pour les entreprises  
- Adoption accélérée de l’IA tout en gardant le contrôle sur des processus complexes pilotés par agents

**Références :**  
- [Microsoft Foundry MCP Server GitHub Repository](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Intégration des Agents Azure AI avec MCP (Blog Microsoft Foundry)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Étude de Cas 8 : Foundry MCP Playground – Expérimentation et Prototypage

Le Foundry MCP Playground offre un environnement prêt à l’emploi pour expérimenter avec les serveurs MCP et les intégrations Microsoft Foundry. Les développeurs peuvent rapidement prototyper, tester et évaluer des modèles IA et workflows d’agents en utilisant les ressources du Microsoft Foundry Catalog et Labs. Le playground simplifie la mise en place, fournit des projets exemples et supporte le développement collaboratif, facilitant l’exploration des meilleures pratiques et nouveaux scénarios avec un minimum de contraintes. Il est particulièrement utile pour les équipes souhaitant valider des idées, partager des expériences et accélérer l’apprentissage sans infrastructure complexe. En diminuant la barrière d’entrée, le playground favorise l’innovation et les contributions communautaires dans l’écosystème MCP et Microsoft Foundry.

**Références :**

- [Foundry MCP Playground GitHub Repository](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Étude de Cas 9 : Microsoft Learn Docs MCP Server – Accès à la Documentation Piloté par IA

Le Microsoft Learn Docs MCP Server est un service hébergé dans le cloud fournissant aux assistants IA un accès en temps réel à la documentation officielle Microsoft via le Model Context Protocol. Ce serveur prêt pour la production se connecte à l’écosystème complet Microsoft Learn et permet une recherche sémantique à travers toutes les sources officielles Microsoft.

> **🎯 Outil Prêt pour la Production**  
> C’est un véritable serveur MCP que vous pouvez utiliser aujourd'hui ! En savoir plus sur le Serveur Microsoft Learn Docs MCP dans notre [**Guide des Serveurs MCP Microsoft**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Fonctionnalités Clés :**  
- Accès en temps réel à la documentation officielle Microsoft, docs Azure et documentation Microsoft 365  
- Capacités avancées de recherche sémantique comprenant contexte et intention  
- Informations toujours à jour au fur et à mesure de la publication du contenu Microsoft Learn  
- Couverture complète de Microsoft Learn, documentation Azure et sources Microsoft 365  
- Retourne jusqu’à 10 fragments de contenu de haute qualité avec titres d’articles et URL

**Pourquoi c’est Critique :**  
- Résout le problème des connaissances IA obsolètes pour les technologies Microsoft  
- Garantit aux assistants IA l’accès aux dernières fonctionnalités .NET, C#, Azure et Microsoft 365  
- Fournit une information officielle, de première main, pour une génération de code précise  
- Essentiel pour les développeurs travaillant avec des technologies Microsoft en évolution rapide

**Résultats :**  
- Précision grandement améliorée du code généré par IA pour les technologies Microsoft  
- Réduction du temps passé à chercher la documentation actuelle et les meilleures pratiques  
- Productivité accrue des développeurs grâce à la récupération contextuelle de documentation  
- Intégration fluide dans les flux de travail de développement sans quitter l’IDE

**Références :**  
- [Microsoft Learn Docs MCP Server GitHub Repository](https://github.com/MicrosoftDocs/mcp)  
- [Documentation Microsoft Learn](https://learn.microsoft.com/)

## Projets Pratiques

### Projet 1 : Construire un Serveur MCP Multi-Fournisseurs

**Objectif :** Créer un serveur MCP capable de router les requêtes vers plusieurs fournisseurs de modèles IA selon des critères précis.

**Exigences :**

- Supporter au moins trois fournisseurs de modèles différents (ex. OpenAI, Anthropic, modèles locaux)  
- Implémenter un mécanisme de routage basé sur les métadonnées des requêtes  
- Créer un système de configuration pour la gestion des identifiants fournisseurs  
- Ajouter une mise en cache pour optimiser les performances et les coûts  
- Construire un tableau de bord simple pour le suivi de l’utilisation

**Étapes d’Implémentation :**

1. Mettre en place l’infrastructure de base du serveur MCP  
2. Implémenter des adaptateurs fournisseurs pour chaque service de modèle IA  
3. Créer la logique de routage basée sur les attributs des requêtes  
4. Ajouter des mécanismes de mise en cache pour les requêtes fréquentes  
5. Développer le tableau de bord de monitoring  
6. Tester avec différents types de requêtes

**Technologies :** Choisir parmi Python (.NET/Java/Python selon vos préférences), Redis pour la mise en cache, et un framework web simple pour le tableau de bord.

### Projet 2 : Système Entreprise de Gestion des Prompts

**Objectif :** Développer un système basé sur MCP pour gérer, versionner et déployer des templates de prompts à travers une organisation.

**Exigences :**


- Créer un référentiel centralisé pour les modèles de prompt
- Mettre en œuvre des workflows de versionnage et d'approbation
- Construire des capacités de test des modèles avec des entrées d'exemple
- Développer des contrôles d'accès basés sur les rôles
- Créer une API pour la récupération et le déploiement des modèles

**Étapes de mise en œuvre :**

1. Concevoir le schéma de base de données pour le stockage des modèles
2. Créer l’API principale pour les opérations CRUD sur les modèles
3. Mettre en œuvre le système de versionnage
4. Construire le workflow d'approbation
5. Développer le cadre de test
6. Créer une interface web simple pour la gestion
7. Intégrer avec un serveur MCP

**Technologies :** Votre choix de framework backend, base de données SQL ou NoSQL, et un framework frontend pour l'interface de gestion.

### Projet 3 : Plateforme de génération de contenu basée sur MCP

**Objectif :** Construire une plateforme de génération de contenu qui exploite MCP pour fournir des résultats cohérents à travers différents types de contenu.

**Exigences :**

- Supporter plusieurs formats de contenu (articles de blog, réseaux sociaux, textes marketing)
- Mettre en œuvre une génération basée sur des modèles avec options de personnalisation
- Créer un système de révision et de retour sur le contenu
- Suivre les métriques de performance du contenu
- Supporter le versionnage et l'itération du contenu

**Étapes de mise en œuvre :**

1. Mettre en place l'infrastructure client MCP
2. Créer des modèles pour différents types de contenu
3. Construire la chaîne de génération de contenu
4. Mettre en œuvre le système de révision
5. Développer le système de suivi des métriques
6. Créer une interface utilisateur pour la gestion des modèles et la génération de contenu

**Technologies :** Votre langage de programmation préféré, framework web et système de base de données.

## Orientations futures pour la technologie MCP

### Tendances émergentes

1. **MCP multimodal**
   - Extension de MCP pour standardiser les interactions avec des modèles d'image, d'audio et de vidéo
   - Développement de capacités de raisonnement intermodal
   - Formats de prompt standardisés pour différentes modalités

2. **Infrastructure MCP fédérée**
   - Réseaux MCP distribués pouvant partager des ressources entre organisations
   - Protocoles standardisés pour le partage sécurisé de modèles
   - Techniques de calcul préservant la confidentialité

3. **Marchés MCP**
   - Écosystèmes pour le partage et la monétisation de modèles MCP et de plugins
   - Processus d'assurance qualité et de certification
   - Intégration avec les places de marché de modèles

4. **MCP pour l'informatique en périphérie**
   - Adaptation des standards MCP pour les dispositifs périphériques aux ressources limitées
   - Protocoles optimisés pour les environnements à faible bande passante
   - Implémentations MCP spécialisées pour les écosystèmes IoT

5. **Cadres réglementaires**
   - Développement d'extensions MCP pour la conformité réglementaire
   - Traçabilité standardisée et interfaces d'explicabilité
   - Intégration avec les cadres émergents de gouvernance de l'IA

### Solutions MCP de Microsoft

Microsoft et Azure ont développé plusieurs référentiels open source pour aider les développeurs à implémenter MCP dans divers scénarios :

#### Organisation Microsoft

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) – Un serveur MCP Playwright pour l’automatisation et les tests de navigateur
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) – Une implémentation de serveur MCP OneDrive pour tests locaux et contribution communautaire
3. [NLWeb](https://github.com/microsoft/NlWeb) – NLWeb est une collection de protocoles ouverts et d'outils open source associés. Son principal objectif est d’établir une couche fondamentale pour le Web IA

#### Organisation Azure-Samples

1. [mcp](https://github.com/Azure-Samples/mcp) – Liens vers des exemples, outils et ressources pour construire et intégrer des serveurs MCP sur Azure avec plusieurs langages
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) – Serveurs MCP de référence démontrant l’authentification avec la spécification actuelle du Model Context Protocol
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) – Page de présentation des implémentations de serveurs MCP distants dans Azure Functions avec liens vers les dépôts spécifiques par langage
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) – Modèle de démarrage rapide pour construire et déployer des serveurs MCP distants personnalisés en Python avec Azure Functions
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) – Modèle de démarrage rapide pour construire et déployer des serveurs MCP distants personnalisés en .NET/C# avec Azure Functions
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) – Modèle de démarrage rapide pour construire et déployer des serveurs MCP distants personnalisés en TypeScript avec Azure Functions
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) – Azure API Management comme passerelle IA vers des serveurs MCP distants utilisant Python
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) – Expériences APIM ❤️ IA incluant des capacités MCP, intégrées à Azure OpenAI et AI Foundry

Ces référentiels offrent diverses implémentations, modèles et ressources pour travailler avec le Model Context Protocol dans différents langages de programmation et services Azure. Ils couvrent plusieurs cas d’usage, de l’implémentation basique de serveur à l’authentification, au déploiement cloud, et aux scénarios d’intégration en entreprise.

#### Répertoire des ressources MCP

Le [répertoire MCP Resources](https://github.com/microsoft/mcp/tree/main/Resources) dans le dépôt officiel Microsoft MCP fournit une collection organisée de ressources d’exemple, de modèles de prompt et de définitions d’outils pour une utilisation avec les serveurs Model Context Protocol. Ce répertoire est conçu pour aider les développeurs à démarrer rapidement avec MCP en proposant des blocs de construction réutilisables et des exemples de bonnes pratiques pour :

- **Modèles de prompt :** Modèles prêts à l’emploi pour tâches et scénarios courants en IA, adaptables à vos propres implémentations de serveur MCP.
- **Définitions d’outils :** Schémas d’outils exemple et métadonnées pour standardiser l’intégration et l’invocation des outils à travers différents serveurs MCP.
- **Exemples de ressources :** Définitions de ressources pour la connexion à des sources de données, API et services externes dans le cadre MCP.
- **Implémentations de référence :** Exemples pratiques démontrant comment structurer et organiser ressources, prompts et outils dans des projets MCP réels.

Ces ressources accélèrent le développement, favorisent la normalisation et aident à garantir les meilleures pratiques lors de la construction et du déploiement de solutions basées sur MCP.

#### Répertoire des ressources MCP

- [MCP Resources (modèles de prompt, outils et définitions de ressources)](https://github.com/microsoft/mcp/tree/main/Resources)

### Opportunités de recherche

- Techniques d’optimisation efficace de prompt dans les cadres MCP
- Modèles de sécurité pour déploiements MCP multi-locataires
- Évaluation des performances entre différentes implémentations MCP
- Méthodes de vérification formelle pour serveurs MCP

## Conclusion

Le Model Context Protocol (MCP) façonne rapidement l'avenir d'une intégration IA standardisée, sécurisée et interopérable dans tous les secteurs. À travers les études de cas et projets pratiques présentés dans cette leçon, vous avez vu comment les premiers utilisateurs — incluant Microsoft et Azure — exploitent MCP pour résoudre des défis concrets, accélérer l’adoption de l’IA, et assurer conformité, sécurité et scalabilité. L’approche modulaire de MCP permet aux organisations de connecter modèles de langage, outils, et données d’entreprise dans un cadre unifié et auditable. À mesure que MCP évolue, rester engagé avec la communauté, explorer les ressources open source et appliquer les meilleures pratiques seront essentiels pour construire des solutions IA robustes et prêtes pour l’avenir.

## Ressources supplémentaires

- [Dépôt GitHub MCP Foundry](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Intégration des agents Azure AI avec MCP (Microsoft Foundry Blog)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [Dépôt GitHub MCP (Microsoft)](https://github.com/microsoft/mcp)
- [Répertoire des ressources MCP (modèles, outils, définitions)](https://github.com/microsoft/mcp/tree/main/Resources)
- [Communauté & documentation MCP](https://modelcontextprotocol.io/introduction)
- [Spécification MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Documentation Azure MCP](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Bonnes pratiques en sécurité
- [Référentiel Playwright MCP Server GitHub](https://github.com/microsoft/playwright-mcp)
- [Serveur MCP Files (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [Serveurs MCP Auth (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Fonctions MCP distantes (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Fonctions MCP distantes Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Fonctions MCP distantes .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Fonctions MCP distantes TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Fonctions MCP APIM distantes Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [Solutions IA et automatisation Microsoft](https://azure.microsoft.com/en-us/products/ai-services/)

## Exercices

1. Analysez une des études de cas et proposez une approche d’implémentation alternative.
2. Choisissez une des idées de projet et créez une spécification technique détaillée.
3. Recherchez un secteur non couvert par les études de cas et décrivez comment MCP pourrait répondre à ses défis spécifiques.
4. Explorez une des orientations futures et concevez une extension MCP pour la supporter.

## Suite

Explorez plus : [Microsoft MCP Servers](./microsoft-mcp-servers.md)

Continuez avec : [Module 8 : Bonnes pratiques](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->