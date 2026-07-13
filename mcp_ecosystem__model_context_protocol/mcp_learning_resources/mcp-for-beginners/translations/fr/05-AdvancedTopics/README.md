# Sujets Avancés en MCP

[![MCP Avancé : Agents d'IA Sécurisés, Scalables et Multi-modaux](../../../translated_images/fr/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Cliquez sur l'image ci-dessus pour voir la vidéo de cette leçon)_

Ce chapitre couvre une série de sujets avancés dans la mise en œuvre du Model Context Protocol (MCP), incluant l’intégration multi-modale, la scalabilité, les meilleures pratiques de sécurité et l’intégration en entreprise. Ces sujets sont cruciaux pour construire des applications MCP robustes et prêtes pour la production capables de répondre aux exigences des systèmes d’IA modernes.

## Aperçu

Cette leçon explore des concepts avancés dans la mise en œuvre du Model Context Protocol, en mettant l’accent sur l’intégration multi-modale, la scalabilité, les meilleures pratiques de sécurité et l’intégration en entreprise. Ces sujets sont essentiels pour construire des applications MCP de qualité production pouvant gérer des exigences complexes dans des environnements d’entreprise.

> **À venir :** plusieurs sujets ci-dessous sont affectés par le candidat à la spécification MCP du `2026-07-28` — Les Contextes Racines (5.4) et l’Échantillonnage (5.6) reposent sur des primitives que le candidat à la spécification marque comme obsolètes, et la fonctionnalité expérimentale Tâches mentionnée dans Fonctionnalités du Protocole (5.16) passe à une extension dédiée aux Tâches. Voir [Quoi de neuf dans MCP : Le candidat à la spécification du 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) pour les détails.

## Objectifs d'Apprentissage

À la fin de cette leçon, vous serez capable de :

- Implémenter des capacités multi-modales dans les frameworks MCP
- Concevoir des architectures MCP scalables pour des scénarios à forte demande
- Appliquer les meilleures pratiques de sécurité conformes aux principes de sécurité de MCP
- Intégrer MCP aux systèmes et frameworks d’IA d’entreprise
- Optimiser la performance et la fiabilité en environnement de production

## Leçons et Projets d'exemple

| Lien | Titre | Description |
|------|-------|-------------|
| [5.1 Intégration avec Azure](./mcp-integration/README.md) | Intégration avec Azure | Apprenez comment intégrer votre serveur MCP sur Azure |
| [5.2 Exemple multi-modal](./mcp-multi-modality/README.md) | Exemples multi-modal MCP | Exemples pour réponses audio, image et multi-modales |
| [5.3 Démo MCP OAuth2](../../../05-AdvancedTopics/mcp-oauth2-demo) | Démo MCP OAuth2 | Application minimale Spring Boot montrant OAuth2 avec MCP, à la fois comme serveur d’autorisation et serveur de ressources. Démonstration de l’émission sécurisée des tokens, des points de terminaison protégés, déploiement Azure Container Apps, et intégration API Management. |
| [5.4 Contextes Racines](./mcp-root-contexts/README.md) | Contextes racines | En savoir plus sur le contexte racine et comment les implémenter |
| [5.5 Routage](./mcp-routing/README.md) | Routage | Apprenez différents types de routage |
| [5.6 Échantillonnage](./mcp-sampling/README.md) | Échantillonnage | Apprenez à travailler avec l’échantillonnage |
| [5.7 Mise à l'échelle](./mcp-scaling/README.md) | Mise à l’échelle | Apprenez la mise à l’échelle |
| [5.8 Sécurité](./mcp-security/README.md) | Sécurité | Sécurisez votre serveur MCP |
| [5.9 Exemple Recherche Web](./web-search-mcp/README.md) | MCP Recherche Web | Serveur et client MCP Python intégrant SerpAPI pour recherche en temps réel sur le web, actualités, produits et Q&R. Démonstration d’orchestration multi-outils, intégration d’API externes et gestion robuste des erreurs. |
| [5.10 Streaming en temps réel](./mcp-realtimestreaming/README.md) | Streaming | Le streaming de données en temps réel est devenu essentiel dans un monde axé sur les données où entreprises et applications nécessitent un accès immédiat à l’information pour prendre des décisions rapides. |
| [5.11 Recherche Web en temps réel](./mcp-realtimesearch/README.md) | Recherche Web | Recherche web en temps réel: comment MCP transforme la recherche web en temps réel en fournissant une approche standardisée de gestion du contexte entre modèles d’IA, moteurs de recherche et applications. | 
| [5.12 Authentification Entra ID pour serveurs MCP](./mcp-security-entra/README.md) | Authentification Entra ID | Microsoft Entra ID offre une solution robuste d'identité et de gestion des accès basée sur le cloud, aidant à garantir que seuls les utilisateurs et applications autorisés peuvent interagir avec votre serveur MCP. |
| [5.13 Intégration Agent Microsoft Foundry](./mcp-foundry-agent-integration/README.md) | Intégration Microsoft Foundry | Apprenez comment intégrer les serveurs MCP avec les agents Microsoft Foundry, permettant une orchestration puissante d’outils et des capacités IA d’entreprise avec connexions standardisées aux sources de données externes. |
| [5.14 Ingénierie du Contexte](./mcp-contextengineering/README.md) | Ingénierie du Contexte | Opportunités futures des techniques d’ingénierie du contexte pour serveurs MCP, comprenant optimisation du contexte, gestion dynamique du contexte, et stratégies pour une ingénierie de prompt efficace dans les frameworks MCP. |
| [5.15 Transport Personnalisé MCP](./mcp-transport/README.md) | Transport Personnalisé | Apprenez à implémenter des mécanismes de transport personnalisés pour des scénarios de communication MCP spécialisés. |
| [5.16 Analyse Approfondie des Fonctionnalités du Protocole](./mcp-protocol-features/README.md) | Fonctionnalités du Protocole | Maîtrisez les fonctionnalités avancées du protocole incluant notifications de progression, annulation de requête, modèles de ressources et modèles de gestion des erreurs. |
| [5.17 Raisonnement Multi-Agents Adversarial](./mcp-adversarial-agents/README.md) | Agents Adversaires | Utilisez deux agents avec des positions opposées partageant un ensemble unique d’outils MCP pour détecter hallucinations, mettre en lumière des cas limites et produire des résultats mieux calibrés grâce à un débat structuré. |

> **Nouveau dans la Spécification MCP 2025-11-25** : La spécification inclut désormais un support expérimental pour **Tâches** (opérations longues avec suivi de progression), **Annotations d’Outils** (métadonnées sur le comportement des outils pour la sécurité), **Élicitation Mode URL** (demande de contenu URL spécifique aux clients), et des **Racines** améliorées (pour la gestion du contexte de l’espace de travail). Voir le [journal des changements de la spécification MCP](https://spec.modelcontextprotocol.io/) pour les détails complets.

## Références Supplémentaires

Pour les informations les plus à jour sur les sujets avancés MCP, consultez :
- [Documentation MCP](https://modelcontextprotocol.io/)
- [Spécification MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Dépôt GitHub](https://github.com/modelcontextprotocol)
- [Top 10 MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Risques de sécurité et mitigations
- [Atelier MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formation pratique à la sécurité

## Points Clés à Retenir

- Les implémentations MCP multi-modales étendent les capacités d’IA au-delà du traitement du texte
- La scalabilité est essentielle pour les déploiements en entreprise et peut être abordée par mise à l’échelle horizontale et verticale
- Des mesures de sécurité complètes protègent les données et garantissent un contrôle d’accès approprié
- L’intégration en entreprise avec des plateformes comme Azure OpenAI et Microsoft AI Foundry améliore les capacités MCP
- Les implémentations avancées MCP bénéficient d’architectures optimisées et d’une gestion attentive des ressources

## Exercice

Concevez une implémentation MCP de niveau entreprise pour un cas d’usage spécifique :

1. Identifiez les exigences multi-modales pour votre cas d’usage
2. Décrivez les contrôles de sécurité nécessaires pour protéger les données sensibles
3. Concevez une architecture scalable capable de gérer des charges variables
4. Planifiez les points d’intégration avec les systèmes d’IA d’entreprise
5. Documentez les goulets d’étranglement potentiels en performance et les stratégies de mitigation

## Ressources Supplémentaires

- [Documentation Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentation Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Et ensuite

Explorez les leçons de ce module en commençant par : [5.1 Intégration MCP](./mcp-integration/README.md)

Une fois ce module terminé, continuez avec : [Module 6 : Contributions Communautaires](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->