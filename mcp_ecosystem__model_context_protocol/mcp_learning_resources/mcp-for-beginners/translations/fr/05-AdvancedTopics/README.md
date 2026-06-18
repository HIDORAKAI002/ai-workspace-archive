# Sujets Avancés en MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/fr/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Cliquez sur l'image ci-dessus pour visionner la vidéo de cette leçon)_

Ce chapitre couvre une série de sujets avancés dans l’implémentation du Model Context Protocol (MCP), incluant l'intégration multimodale, l’évolutivité, les meilleures pratiques de sécurité et l’intégration en entreprise. Ces sujets sont cruciaux pour construire des applications MCP robustes et prêtes pour la production, capables de répondre aux exigences des systèmes d'IA modernes.

## Vue d'ensemble

Cette leçon explore des concepts avancés dans l’implémentation du Model Context Protocol, en se concentrant sur l'intégration multimodale, l’évolutivité, les meilleures pratiques de sécurité et l’intégration en entreprise. Ces sujets sont essentiels pour développer des applications MCP de niveau production capables de gérer des exigences complexes dans les environnements d’entreprise.

## Objectifs d’apprentissage

À la fin de cette leçon, vous serez capable de :

- Implémenter des capacités multimodales au sein des frameworks MCP
- Concevoir des architectures MCP évolutives pour des scénarios à forte demande
- Appliquer les meilleures pratiques de sécurité alignées avec les principes de sécurité du MCP
- Intégrer MCP avec des systèmes et frameworks d’IA en entreprise
- Optimiser la performance et la fiabilité dans des environnements de production

## Leçons et projets exemples

| Lien | Titre | Description |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Intégration avec Azure | Apprenez à intégrer votre serveur MCP sur Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Exemples MCP multimodaux  | Exemples pour audio, image et réponse multimodale |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Démo MCP OAuth2 | Application Spring Boot minimaliste montrant OAuth2 avec MCP, à la fois en tant que serveur d’autorisation et serveur de ressources. Démontre l’émission sécurisée de jetons, les points de terminaison protégés, le déploiement sur Azure Container Apps et l’intégration de la gestion des API. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Contextes racines  | En savoir plus sur le contexte racine et comment les implémenter |
| [5.5 Routing](./mcp-routing/README.md) | Routage | Apprenez les différents types de routage |
| [5.6 Sampling](./mcp-sampling/README.md) | Échantillonnage | Apprenez à travailler avec l’échantillonnage |
| [5.7 Scaling](./mcp-scaling/README.md) | Mise à l’échelle  | Découvrez la mise à l’échelle |
| [5.8 Security](./mcp-security/README.md) | Sécurité  | Sécurisez votre serveur MCP |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Recherche Web MCP | Serveur et client MCP Python intégrant SerpAPI pour la recherche web, d’actualités, de produits et Q&A en temps réel. Démontre l’orchestration multi-outils, l’intégration d’API externes et une gestion robuste des erreurs. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming  | Le streaming de données en temps réel est devenu essentiel dans le monde orienté données d’aujourd’hui, où les entreprises et applications nécessitent un accès immédiat à l’information pour prendre des décisions rapides.|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Recherche Web | Recherche web en temps réel : comment MCP transforme la recherche web en temps réel en offrant une approche standardisée de la gestion du contexte entre modèles d’IA, moteurs de recherche et applications.| 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Authentification Entra ID | Microsoft Entra ID fournit une solution robuste de gestion d’identité et d’accès basée sur le cloud, garantissant que seuls les utilisateurs et applications autorisés peuvent interagir avec votre serveur MCP.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Intégration Microsoft Foundry | Apprenez à intégrer les serveurs Model Context Protocol avec les agents Microsoft Foundry, permettant une orchestration puissante d’outils et des capacités AI d’entreprise avec des connexions standardisées aux sources de données externes.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Ingénierie du contexte | Opportunités futures des techniques d’ingénierie du contexte pour les serveurs MCP, incluant l’optimisation du contexte, la gestion dynamique du contexte et les stratégies pour une ingénierie efficace des prompts dans les frameworks MCP.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Transport personnalisé | Apprenez à implémenter des mécanismes de transport personnalisés pour des scénarios de communication MCP spécialisés.|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Fonctionnalités du protocole | Maîtrisez les fonctionnalités avancées du protocole, incluant les notifications de progression, l’annulation de requêtes, les modèles de ressources et la gestion des erreurs.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Agents adverses | Utilisez deux agents aux positions opposées, partageant un seul jeu d’outils MCP, pour détecter les hallucinations, révéler des cas limites et produire des sorties mieux calibrées à travers un débat structuré.|

> **Nouveau dans la spécification MCP 2025-11-25** : La spécification inclut désormais le support expérimental pour les **Tâches** (opérations longues avec suivi de progression), les **Annotations d’outil** (métadonnées sur le comportement d’un outil pour la sécurité), l’**Élicitation de mode URL** (demande de contenus spécifiques via URL aux clients), et des **Racines** améliorées (pour la gestion du contexte dans les espaces de travail). Voir le [journal des modifications de la spécification MCP](https://spec.modelcontextprotocol.io/) pour tous les détails.

## Références supplémentaires

Pour des informations à jour sur les sujets avancés MCP, consultez :
- [Documentation MCP](https://modelcontextprotocol.io/)
- [Spécification MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Dépôt GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Risques de sécurité et mesures d’atténuation
- [Atelier Sommet Sécurité MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Formation pratique sur la sécurité

## Points clés

- Les implémentations MCP multimodales étendent les capacités d’IA au-delà du traitement du texte
- L’évolutivité est essentielle pour les déploiements en entreprise et peut être abordée par la montée en charge horizontale et verticale
- Des mesures de sécurité complètes protègent les données et assurent un contrôle d’accès adéquat
- L’intégration entreprise avec des plateformes telles que Azure OpenAI et Microsoft AI Foundry améliore les capacités MCP
- Les implémentations MCP avancées bénéficient d’architectures optimisées et d’une gestion soignée des ressources

## Exercice

Concevez une implémentation MCP de niveau entreprise pour un cas d’utilisation spécifique :

1. Identifiez les exigences multimodales pour votre cas d’utilisation
2. Définissez les contrôles de sécurité nécessaires pour protéger les données sensibles
3. Concevez une architecture évolutive capable de gérer des charges variables
4. Planifiez les points d’intégration avec les systèmes d’IA d’entreprise
5. Documentez les goulets d’étranglement potentiels en performance et les stratégies d’atténuation

## Ressources supplémentaires

- [Documentation Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentation Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Quelle suite ?

Explorez les leçons de ce module en commençant par : [5.1 MCP Integration](./mcp-integration/README.md)

Une fois ce module terminé, poursuivez avec : [Module 6 : Contributions de la communauté](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->