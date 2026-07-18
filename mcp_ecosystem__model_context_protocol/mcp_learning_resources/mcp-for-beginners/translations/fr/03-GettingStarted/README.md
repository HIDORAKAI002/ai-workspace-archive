## Pour bien commencer  

[![Construisez votre premier serveur MCP](../../../translated_images/fr/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Cliquez sur l'image ci-dessus pour voir la vidéo de cette leçon)_

Cette section comprend plusieurs leçons :

- **1 Votre premier serveur**, dans cette première leçon, vous apprendrez comment créer votre premier serveur et l’inspecter avec l’outil d’inspection, une méthode précieuse pour tester et déboguer votre serveur, [vers la leçon](01-first-server/README.md)

- **2 Client**, dans cette leçon, vous apprendrez comment écrire un client qui peut se connecter à votre serveur, [vers la leçon](02-client/README.md)

- **3 Client avec LLM**, une meilleure façon d’écrire un client est d’y ajouter un LLM afin qu’il puisse « négocier » avec votre serveur ce qu’il doit faire, [vers la leçon](03-llm-client/README.md)

- **4 Consommation d’un serveur en mode GitHub Copilot Agent dans Visual Studio Code**. Ici, nous examinons l’exécution de notre serveur MCP depuis Visual Studio Code, [vers la leçon](04-vscode/README.md)

- **5 Serveur de transport stdio** le transport stdio est la norme recommandée pour la communication locale client-serveur MCP, offrant une communication sécurisée basée sur un sous-processus avec isolation de processus intégrée [vers la leçon](05-stdio-server/README.md)

- **6 Streaming HTTP avec MCP (HTTP diffusible)**. Découvrez le transport HTTP en streaming moderne (approche recommandée pour les serveurs MCP distants selon la [Spécification MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), les notifications de progression, et comment implémenter des serveurs et clients MCP évolutifs en temps réel utilisant HTTP diffusible. [vers la leçon](06-http-streaming/README.md)

- **7 Utilisation de la boîte à outils AI pour VSCode** pour consommer et tester vos clients et serveurs MCP [vers la leçon](07-aitk/README.md)

- **8 Tests**. Ici, nous nous concentrerons particulièrement sur les différentes façons de tester notre serveur et client, [vers la leçon](08-testing/README.md)

- **9 Déploiement**. Ce chapitre abordera différentes façons de déployer vos solutions MCP, [vers la leçon](09-deployment/README.md)

- **10 Utilisation avancée du serveur**. Ce chapitre couvre l’utilisation avancée du serveur, [vers la leçon](./10-advanced/README.md)

- **11 Authentification**. Ce chapitre aborde comment ajouter une authentification simple, de l’authentification basique à l’utilisation de JWT et RBAC. Il est conseillé de commencer ici puis de consulter les sujets avancés du chapitre 5 et de renforcer la sécurité grâce aux recommandations du chapitre 2, [vers la leçon](./11-simple-auth/README.md)

- **12 Hôtes MCP**. Configurez et utilisez les clients hôtes MCP populaires tels que Claude Desktop, Cursor, Cline et Windsurf. Apprenez les types de transport et la résolution des problèmes, [vers la leçon](./12-mcp-hosts/README.md)

- **13 Inspecteur MCP**. Déboguez et testez vos serveurs MCP de façon interactive en utilisant l’outil MCP Inspector. Apprenez à dépanner les outils, ressources et messages de protocole, [vers la leçon](./13-mcp-inspector/README.md)

- **14 Échantillonnage**. Créez des serveurs MCP qui collaborent avec des clients MCP sur des tâches liées aux LLM (obsolète dans la version candidate `2026-07-28` ; toujours valide pour la version `2025-11-25`). [vers la leçon](./14-sampling/README.md)

- **15 Applications MCP**. Construisez des serveurs MCP qui répondent également avec des instructions UI, [vers la leçon](./15-mcp-apps/README.md)

Le Model Context Protocol (MCP) est un protocole ouvert qui standardise la façon dont les applications fournissent un contexte aux LLM. Pensez à MCP comme un port USB-C pour les applications d’IA - il fournit un moyen standardisé de connecter les modèles d’IA à différentes sources de données et outils.

## Objectifs d’apprentissage

À la fin de cette leçon, vous serez capable de :

- Configurer des environnements de développement pour MCP en C#, Java, Python, TypeScript et JavaScript
- Construire et déployer des serveurs MCP basiques avec des fonctionnalités personnalisées (ressources, invites, et outils)
- Créer des applications hôtes qui se connectent aux serveurs MCP
- Tester et déboguer les implémentations MCP
- Comprendre les défis courants d’installation et leurs solutions
- Connecter vos implémentations MCP aux services LLM populaires

## Configuration de votre environnement MCP

Avant de commencer à travailler avec MCP, il est important de préparer votre environnement de développement et de comprendre le flux de travail de base. Cette section vous guidera à travers les étapes initiales pour assurer un démarrage fluide avec MCP.

### Prérequis

Avant de plonger dans le développement MCP, assurez-vous d’avoir :

- **Environnement de développement** : pour le langage que vous avez choisi (C#, Java, Python, TypeScript ou JavaScript)
- **IDE/Éditeur** : Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm ou tout éditeur de code moderne
- **Gestionnaires de paquets** : NuGet, Maven/Gradle, pip, ou npm/yarn
- **Clés API** : pour tous les services IA que vous prévoyez d’utiliser dans vos applications hôtes


### SDK officiels

Dans les chapitres à venir, vous verrez des solutions construites en Python, TypeScript, Java et .NET. Voici tous les SDK officiellement supportés.

MCP fournit des SDK officiels pour plusieurs langages (alignés avec la [Spécification MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [SDK C#](https://github.com/modelcontextprotocol/csharp-sdk) - Maintenu en collaboration avec Microsoft
- [SDK Java](https://github.com/modelcontextprotocol/java-sdk) - Maintenu en collaboration avec Spring AI
- [SDK TypeScript](https://github.com/modelcontextprotocol/typescript-sdk) - Implémentation officielle TypeScript
- [SDK Python](https://github.com/modelcontextprotocol/python-sdk) - Implémentation officielle Python (FastMCP)
- [SDK Kotlin](https://github.com/modelcontextprotocol/kotlin-sdk) - Implémentation officielle Kotlin
- [SDK Swift](https://github.com/modelcontextprotocol/swift-sdk) - Maintenu en collaboration avec Loopwork AI
- [SDK Rust](https://github.com/modelcontextprotocol/rust-sdk) - Implémentation officielle Rust
- [SDK Go](https://github.com/modelcontextprotocol/go-sdk) - Implémentation officielle Go

## Points clés à retenir

- Configurer un environnement de développement MCP est simple avec les SDK spécifiques au langage
- Construire des serveurs MCP implique de créer et enregistrer des outils avec des schémas clairs
- Les clients MCP se connectent aux serveurs et modèles pour exploiter des capacités étendues
- Tester et déboguer sont essentiels pour des implémentations MCP fiables
- Les options de déploiement vont du développement local aux solutions cloud

## Exercices pratiques

Nous avons un ensemble d’exemples qui complètent les exercices que vous verrez dans tous les chapitres de cette section. De plus, chaque chapitre comporte ses propres exercices et devoirs.

- [Calculatrice Java](./samples/java/calculator/README.md)
- [Calculatrice .Net](../../../03-GettingStarted/samples/csharp)
- [Calculatrice JavaScript](./samples/javascript/README.md)
- [Calculatrice TypeScript](./samples/typescript/README.md)
- [Calculatrice Python](../../../03-GettingStarted/samples/python)

## Ressources supplémentaires

- [Créer des agents avec Model Context Protocol sur Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [MCP distant avec Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [Agent OpenAI MCP .NET](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Et ensuite

Commencez par la première leçon : [Créer votre premier serveur MCP](01-first-server/README.md)

Une fois ce module terminé, continuez vers : [Module 4 : Mise en œuvre pratique](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->