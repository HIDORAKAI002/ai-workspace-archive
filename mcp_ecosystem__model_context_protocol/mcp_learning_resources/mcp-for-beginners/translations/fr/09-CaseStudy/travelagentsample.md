# Étude de cas : Agents de voyage Azure AI – Implémentation de référence

## Vue d'ensemble

[Azure AI Travel Agents](https://github.com/Azure-Samples/azure-ai-travel-agents) est une solution de référence complète développée par Microsoft qui démontre comment créer une application de planification de voyage multi-agents, alimentée par l'IA, en utilisant le Model Context Protocol (MCP), Azure OpenAI et Azure AI Search. Ce projet présente les meilleures pratiques pour orchestrer plusieurs agents IA, intégrer des données d’entreprise et offrir une plateforme sécurisée et extensible pour des scénarios réels.

## Fonctionnalités principales
- **Orchestration multi-agents :** Utilise MCP pour coordonner des agents spécialisés (par exemple, agents vol, hôtel et itinéraire) qui collaborent pour réaliser des tâches complexes de planification de voyage.
- **Intégration des données d’entreprise :** Se connecte à Azure AI Search et à d’autres sources de données d’entreprise pour fournir des informations pertinentes et à jour pour les recommandations de voyage.
- **Architecture sécurisée et évolutive :** Exploite les services Azure pour l’authentification, l’autorisation et le déploiement évolutif, en suivant les meilleures pratiques de sécurité en entreprise.
- **Outils extensibles :** Implémente des outils MCP réutilisables et des modèles de prompts, permettant une adaptation rapide à de nouveaux domaines ou besoins métier.
- **Expérience utilisateur :** Offre une interface conversationnelle permettant aux utilisateurs d’interagir avec les agents de voyage, alimentée par Azure OpenAI et MCP.

## Architecture
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Description du diagramme d’architecture

La solution Azure AI Travel Agents est conçue pour la modularité, l’évolutivité et une intégration sécurisée de multiples agents IA et sources de données d’entreprise. Les principaux composants et le flux de données sont les suivants :

- **Interface utilisateur :** Les utilisateurs interagissent avec le système via une interface conversationnelle (comme un chat web ou un bot Teams), qui envoie les requêtes utilisateur et reçoit les recommandations de voyage.
- **Serveur MCP :** Sert d’orchestrateur central, recevant les entrées des utilisateurs, gérant le contexte et coordonnant les actions des agents spécialisés (par ex. FlightAgent, HotelAgent, ItineraryAgent) via le Model Context Protocol.
- **Agents IA :** Chaque agent est responsable d’un domaine spécifique (vols, hôtels, itinéraires) et est implémenté en tant qu’outil MCP. Les agents utilisent des modèles de prompts et une logique pour traiter les demandes et générer des réponses.
- **Service Azure OpenAI :** Fournit une compréhension avancée du langage naturel et la génération de texte, permettant aux agents d’interpréter l’intention des utilisateurs et de générer des réponses conversationnelles.
- **Azure AI Search & données d’entreprise :** Les agents interrogent Azure AI Search et d’autres sources de données d’entreprise pour récupérer des informations à jour sur les vols, hôtels et options de voyage.
- **Authentification & sécurité :** S’intègre à Microsoft Entra ID pour une authentification sécurisée et applique un contrôle d’accès au moindre privilège sur toutes les ressources.
- **Déploiement :** Conçue pour un déploiement sur Azure Container Apps, assurant évolutivité, supervision et efficacité opérationnelle.

Cette architecture permet une orchestration fluide de plusieurs agents IA, une intégration sécurisée avec les données d’entreprise et une plateforme robuste et extensible pour construire des solutions IA spécifiques à un domaine.

## Explication étape par étape du diagramme d’architecture
Imaginez planifier un grand voyage et avoir une équipe d’assistants experts pour vous aider à chaque détail. Le système Azure AI Travel Agents fonctionne de manière similaire, utilisant différentes parties (comme des membres d’équipe) qui ont chacune un rôle spécial. Voici comment tout cela s’assemble :

### Interface utilisateur (IU) :
Pensez à cela comme la réception de votre agent de voyage. C’est là que vous (l’utilisateur) posez des questions ou faites des demandes, comme « Trouve-moi un vol pour Paris. » Cela peut être une fenêtre de chat sur un site web ou une application de messagerie.

### Serveur MCP (Le coordinateur) :
Le serveur MCP est comme le manager qui écoute votre demande à la réception et décide quel spécialiste doit gérer chaque partie. Il suit votre conversation et s’assure que tout fonctionne sans accroc.

### Agents IA (assistants spécialisés) :
Chaque agent est un expert dans un domaine spécifique — l’un connaît tout des vols, un autre des hôtels, et un autre de la planification d’itinéraire. Quand vous demandez un voyage, le serveur MCP envoie votre demande au(x) bon(s) agent(s). Ces agents utilisent leur savoir et leurs outils pour trouver les meilleures options pour vous.

### Service Azure OpenAI (expert linguistique) :
C’est comme avoir un expert en langue qui comprend exactement ce que vous demandez, peu importe comment vous le formulez. Il aide les agents à comprendre vos requêtes et à répondre en langage naturel et conversationnel.

### Azure AI Search & données d’entreprise (bibliothèque d’informations) :
Imaginez une immense bibliothèque à jour avec toutes les dernières informations de voyage — horaires de vol, disponibilités hôtelières, et plus. Les agents cherchent dans cette bibliothèque pour obtenir les réponses les plus précises pour vous.

### Authentification & sécurité (agent de sécurité) :
Tout comme un agent de sécurité vérifie qui peut entrer dans certaines zones, cette partie s’assure que seules les personnes et agents autorisés peuvent accéder aux informations sensibles. Elle garde vos données sûres et privées.

### Déploiement sur Azure Container Apps (le bâtiment) :
Tous ces assistants et outils travaillent ensemble à l’intérieur d’un bâtiment sécurisé et évolutif (le cloud). Cela signifie que le système peut gérer de nombreux utilisateurs en même temps et est toujours disponible lorsque vous en avez besoin.

## Comment tout fonctionne ensemble :

Vous commencez par poser une question à la réception (IU).
Le manager (serveur MCP) détermine quel spécialiste (agent) doit vous aider.
Le spécialiste utilise l’expert linguistique (OpenAI) pour comprendre votre demande et la bibliothèque (AI Search) pour trouver la meilleure réponse.
L’agent de sécurité (authentification) veille à ce que tout soit sécurisé.
Tout cela se passe à l’intérieur d’un bâtiment fiable et évolutif (Azure Container Apps), pour que votre expérience soit fluide et sécurisée.
Cette collaboration permet au système de vous aider rapidement et en toute sécurité à planifier votre voyage, comme une équipe d’agents de voyage experts travaillant ensemble dans un bureau moderne !

## Implémentation technique
- **Serveur MCP :** Héberge la logique centrale d’orchestration, expose les outils des agents, et gère le contexte pour les flux de travail de planification de voyage en plusieurs étapes.
- **Agents :** Chaque agent (par ex. FlightAgent, HotelAgent) est implémenté comme un outil MCP avec ses propres modèles de prompts et sa logique.
- **Intégration Azure :** Utilise Azure OpenAI pour la compréhension du langage naturel et Azure AI Search pour la récupération de données.
- **Sécurité :** S’intègre à Microsoft Entra ID pour l’authentification et applique un contrôle d’accès au moindre privilège sur toutes les ressources.
- **Déploiement :** Supporte le déploiement sur Azure Container Apps pour l’évolutivité et l’efficacité opérationnelle.

## Résultats et impact
- Démontre comment MCP peut être utilisé pour orchestrer plusieurs agents IA dans un scénario réel et prêt pour la production.
- Accélère le développement de solutions en fournissant des modèles réutilisables pour la coordination des agents, l’intégration des données et le déploiement sécurisé.
- Sert de modèle pour construire des applications alimentées par IA, spécifiques à un domaine, en utilisant MCP et les services Azure.

## Références
- [Azure AI Travel Agents GitHub Repository](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Et ensuite

- Retour à : [Aperçu des études de cas](./README.md)
- Suivant : [Mise à jour des éléments ADO depuis YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l’aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforcions d’assurer l’exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant foi. Pour les informations critiques, une traduction professionnelle humaine est recommandée. Nous déclinons toute responsabilité en cas de malentendus ou d’interprétations erronées résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->