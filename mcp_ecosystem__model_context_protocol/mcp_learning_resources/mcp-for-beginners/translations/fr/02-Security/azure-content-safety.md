# Sécurité MCP Avancée avec Azure Content Safety

> **Risque MCP OWASP adressé** : [MCP06 - Subversion du flux d’intention](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety fournit plusieurs outils puissants qui peuvent renforcer la sécurité de vos implémentations MCP. Pour une expérience pratique d’implémentation, consultez [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3 : Sécurité E/S.

## Shields de Prompt

Les AI Prompt Shields de Microsoft offrent une protection robuste contre les attaques par injection de prompt directes et indirectes grâce à :

1. **Détection avancée** : Utilise le machine learning pour identifier les instructions malveillantes intégrées dans le contenu.
2. **Mise en lumière** : Transforme le texte d’entrée pour aider les systèmes d’IA à distinguer entre instructions valides et entrées externes.
3. **Délimiteurs et marquage des données** : Marque les limites entre les données de confiance et non fiables.
4. **Intégration Content Safety** : Fonctionne avec Azure AI Content Safety pour détecter les tentatives de jailbreak et les contenus nuisibles.
5. **Mises à jour continues** : Microsoft met régulièrement à jour les mécanismes de protection contre les menaces émergentes.

## Implémentation d’Azure Content Safety avec MCP

Cette approche fournit une protection multi-couches :
- Analyse des entrées avant traitement
- Validation des sorties avant retour
- Utilisation de listes de blocage pour les schémas nuisibles connus
- Exploitation des modèles de sécurité de contenu continuellement mis à jour d’Azure

## Ressources Azure Content Safety

Pour en savoir plus sur l’implémentation d’Azure Content Safety avec vos serveurs MCP, consultez ces ressources officielles :

1. [Documentation Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Documentation officielle pour Azure Content Safety.
2. [Documentation Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Apprenez à prévenir les attaques par injection de prompt.
3. [Référence API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Référence API détaillée pour implémenter Content Safety.
4. [Démarrage rapide : Azure Content Safety avec C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Guide rapide d’implémentation en C#.
5. [Bibliothèques clientes Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Bibliothèques clientes pour divers langages de programmation.
6. [Détection des tentatives de jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Conseils spécifiques pour détecter et prévenir les tentatives de jailbreak.
7. [Bonnes pratiques pour la sécurité du contenu](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Bonnes pratiques pour implémenter efficacement la sécurité du contenu.

Pour une implémentation plus approfondie, consultez notre [guide d’implémentation Azure Content Safety](./azure-content-safety-implementation.md).

## Et ensuite

- Lire : [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Retourner à : [Aperçu du module de sécurité](./README.md)
- Continuer vers : [Module 3 : Premiers pas](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->