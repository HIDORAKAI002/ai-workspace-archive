# Sujets Avancés en MCP

[![MCP Avancé : Agents IA Sécurisés, Scalables et Multimodaux](../../../translated_images/fr/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Cliquez sur l’image ci-dessus pour voir la vidéo de cette leçon)_

Ce chapitre couvre une série de sujets avancés dans l'implémentation du Model Context Protocol (MCP), notamment l'intégration multimodale, la scalabilité, les meilleures pratiques de sécurité et l'intégration en entreprise. Ces sujets sont cruciaux pour construire des applications MCP robustes et prêtes pour la production capables de répondre aux exigences des systèmes IA modernes.

## Vue d'ensemble

Cette leçon explore des concepts avancés dans l'implémentation du Model Context Protocol, en mettant l’accent sur l'intégration multimodale, la scalabilité, les meilleures pratiques de sécurité et l'intégration en entreprise. Ces sujets sont essentiels pour construire des applications MCP de niveau production capables de gérer des exigences complexes dans les environnements d'entreprise.

> **À venir :** plusieurs des sujets ci-dessous sont affectés par la version candidate de la spécification MCP du `2026-07-28` — Les Contextes Racine (5.4) et l'Échantillonnage (5.6) reposent sur des primitives que la version candidate marque comme obsolètes, et la fonctionnalité expérimentale des Tâches référencée dans les Fonctionnalités du Protocole (5.16) passe à une extension dédiée aux Tâches. Voir [Quoi de neuf dans MCP : La version candidate du 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) pour plus de détails.

## Objectifs d’apprentissage

À la fin de cette leçon, vous serez capable de :

- Implémenter des capacités multimodales au sein des frameworks MCP
- Concevoir des architectures MCP scalables pour des scénarios à forte demande
- Appliquer les meilleures pratiques de sécurité alignées avec les principes de sécurité de MCP
- Intégrer MCP avec des systèmes et frameworks IA d’entreprise
- Optimiser la performance et la fiabilité dans les environnements de production

## Leçons et projets d’exemple

| Lien | Titre | Description |
|------|-------|-------------|
| [5.1 Intégration avec Azure](./mcp-integration/README.md) | Intégration avec Azure | Apprenez à intégrer votre MCP Server sur Azure |
| [5.2 Exemple multi modal](./mcp-multi-modality/README.md) | Exemples multimodaux MCP | Exemples pour audio, image et réponses multimodales |
| [5.3 Exemple MCP OAuth2](../../../05-AdvancedTopics/mcp-oauth2-demo) | Démo MCP OAuth2 | Application Spring Boot minimale montrant OAuth2 avec MCP, à la fois comme serveur d’autorisation et serveur de ressources. Démonstration de l’émission sécurisée de jetons, des points d’accès protégés, du déploiement Azure Container Apps et de l’intégration API Management. |
| [5.4 Contextes racine](./mcp-root-contexts/README.md) | Contextes racine | En savoir plus sur les contextes racines et comment les implémenter (obsolète dans la version candidate `2026-07-28`; toujours valide pour `2025-11-25`) |
| [5.5 Routage](./mcp-routing/README.md) | Routage | Apprenez différents types de routage |
| [5.6 Échantillonnage](./mcp-sampling/README.md) | Échantillonnage | Apprenez à travailler avec l’échantillonnage (obsolète dans la version candidate `2026-07-28`; toujours valide pour `2025-11-25`) |
| [5.7 Mise à l’échelle](./mcp-scaling/README.md) | Mise à l’échelle | Apprenez la mise à l’échelle |
| [5.8 Sécurité](./mcp-security/README.md) | Sécurité | Sécurisez votre MCP Server |
| [5.9 Exemple Recherche Web](./web-search-mcp/README.md) | Recherche Web MCP | Serveur et client MCP Python intégrant SerpAPI pour la recherche web, d’actualités, produits et questions/réponses en temps réel. Démontre l’orchestration multi-outils, l’intégration d’API externes, et la gestion robuste des erreurs. |
| [5.10 Streaming en temps réel](./mcp-realtimestreaming/README.md) | Streaming | Le streaming de données en temps réel est devenu essentiel dans le monde axé sur les données d’aujourd’hui, où les entreprises et applications ont besoin d’un accès immédiat à l’information pour prendre des décisions rapides. |
| [5.11 Recherche web en temps réel](./mcp-realtimesearch/README.md) | Recherche web | Comment MCP transforme la recherche web en temps réel en fournissant une approche standardisée de gestion de contexte entre modèles IA, moteurs de recherche et applications. |
| [5.12 Authentification Entra ID pour serveurs Model Context Protocol](./mcp-security-entra/README.md) | Authentification Entra ID | Microsoft Entra ID fournit une solution robuste de gestion des identités et accès basée sur le cloud, aidant à garantir que seuls les utilisateurs et applications autorisés interagissent avec votre serveur MCP. |
| [5.13 Intégration Agent Microsoft Foundry](./mcp-foundry-agent-integration/README.md) | Intégration Microsoft Foundry | Apprenez à intégrer les serveurs Model Context Protocol avec les agents Microsoft Foundry, permettant une orchestration puissante d'outils et des capacités IA d’entreprise avec des connexions standardisées aux sources de données externes. |
| [5.14 Ingénierie du contexte](./mcp-contextengineering/README.md) | Ingénierie du contexte | L’opportunité future des techniques d’ingénierie du contexte pour les serveurs MCP, incluant l’optimisation du contexte, la gestion dynamique du contexte, et les stratégies pour l’ingénierie des prompts efficace dans les frameworks MCP. |
| [5.15 Transport personnalisé MCP](./mcp-transport/README.md) | Transport personnalisé | Apprenez à implémenter des mécanismes de transport personnalisés pour des scénarios de communication MCP spécialisés. |
| [5.16 Exploration approfondie des fonctionnalités du protocole](./mcp-protocol-features/README.md) | Fonctionnalités du protocole | Maîtrisez les fonctionnalités avancées du protocole incluant les notifications de progression, l’annulation des requêtes, les templates de ressources, et les schémas de gestion des erreurs. |
| [5.17 Raisonnement multi-agents adversaires](./mcp-adversarial-agents/README.md) | Agents adversaires | Utilisez deux agents aux positions opposées, partageant un seul ensemble d’outils MCP, pour détecter les hallucinations, mettre en lumière les cas limites, et produire des sorties mieux calibrées via un débat structuré. |

> **Nouveautés dans la spécification MCP 2025-11-25** : la spécification inclut désormais un support expérimental pour les **Tâches** (opérations longues avec suivi de progression), les **Annotations d’outils** (métadonnées concernant le comportement des outils pour la sécurité), l’**Élicitation en mode URL** (demande de contenu URL spécifique aux clients), et l’amélioration des **Racines** (pour la gestion du contexte d’espace de travail). Voir le [changelog de la spécification MCP](https://spec.modelcontextprotocol.io/) pour tous les détails.

## Références supplémentaires

Pour les informations les plus récentes sur les sujets avancés du MCP, consultez :
- [Documentation MCP](https://modelcontextprotocol.io/)
- [Spécification MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Répertoire GitHub](https://github.com/modelcontextprotocol)
- [Top 10 MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Risques de sécurité et mesures d'atténuation
- [Atelier Sommet Sécurité MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Formation pratique sur la sécurité

## Points clés

- Les implémentations MCP multimodales étendent les capacités IA au-delà du traitement de texte
- La scalabilité est essentielle pour les déploiements en entreprise et peut être abordée par la mise à l’échelle horizontale et verticale
- Des mesures de sécurité complètes protègent les données et assurent un contrôle d’accès approprié
- L’intégration d’entreprise avec des plateformes comme Azure OpenAI et Microsoft AI Foundry améliore les capacités MCP
- Les implémentations avancées MCP bénéficient d’architectures optimisées et d’une gestion rigoureuse des ressources

## Exercice

Concevez une implémentation MCP de grade entreprise pour un cas d’usage spécifique :

1. Identifiez les exigences multimodales pour votre cas d’usage
2. Décrivez les contrôles de sécurité nécessaires pour protéger les données sensibles
3. Conceptionnez une architecture scalable capable de gérer des charges variables
4. Planifiez les points d’intégration avec les systèmes IA d’entreprise
5. Documentez les goulets d’étranglement potentiels de performance et les stratégies d’atténuation

## Ressources supplémentaires

- [Documentation Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentation Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Et ensuite

Explorez les leçons de ce module en commençant par : [5.1 Intégration MCP](./mcp-integration/README.md)

Une fois ce module terminé, poursuivez avec : [Module 6 : Contributions de la communauté](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->