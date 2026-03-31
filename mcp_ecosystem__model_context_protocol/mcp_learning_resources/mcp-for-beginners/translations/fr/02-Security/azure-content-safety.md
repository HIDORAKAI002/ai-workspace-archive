# Sécurité MCP Avancée avec Azure Content Safety

> **Risque MCP OWASP Pris en Compte** : [MCP06 - Injection de Prompt via Payloads Contextuels](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety offre plusieurs outils puissants qui peuvent améliorer la sécurité de vos implémentations MCP. Pour une expérience pratique d’implémentation, consultez le [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3 : Sécurité des E/S.

## Boucliers de Prompt

Les boucliers de prompt IA de Microsoft fournissent une protection robuste contre les attaques d'injection de prompt directes et indirectes grâce à :

1. **Détection Avancée** : Utilise l’apprentissage automatique pour identifier les instructions malveillantes intégrées dans le contenu.
2. **Mise en Lumière** : Transforme le texte d’entrée pour aider les systèmes IA à distinguer les instructions valides des entrées externes.
3. **Délimiteurs et Marquage des Données** : Marque les limites entre données fiables et non fiables.
4. **Intégration avec Content Safety** : Travaille avec Azure AI Content Safety pour détecter les tentatives de jailbreak et le contenu nuisible.
5. **Mises à Jour Continues** : Microsoft met régulièrement à jour les mécanismes de protection contre les menaces émergentes.

## Mise en œuvre d’Azure Content Safety avec MCP

Cette approche fournit une protection à plusieurs niveaux :
- Analyse des entrées avant traitement
- Validation des sorties avant restitution
- Utilisation de listes noires pour les motifs nuisibles connus
- Exploitation des modèles de sécurité de contenu continuellement mis à jour d’Azure

## Ressources Azure Content Safety

Pour en savoir plus sur la mise en œuvre d’Azure Content Safety avec vos serveurs MCP, consultez ces ressources officielles :

1. [Documentation Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Documentation officielle pour Azure Content Safety.
2. [Documentation Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Apprenez comment prévenir les attaques d’injection de prompt.
3. [Référence API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Référence détaillée de l’API pour implémenter Content Safety.
4. [Démarrage rapide : Azure Content Safety avec C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Guide rapide d’implémentation utilisant C#.
5. [Bibliothèques clientes Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Bibliothèques clientes pour différents langages de programmation.
6. [Détection des tentatives de jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Conseils spécifiques pour détecter et prévenir les tentatives de jailbreak.
7. [Bonnes pratiques pour Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Bonnes pratiques pour implémenter efficacement la sécurité du contenu.

Pour une implémentation plus approfondie, consultez notre [guide d’implémentation Azure Content Safety](./azure-content-safety-implementation.md).

## Quelles sont les prochaines étapes

- Lire : [Implémentation Azure Content Safety](./azure-content-safety-implementation.md)
- Retour à : [Aperçu du module de sécurité](./README.md)
- Continuer vers : [Module 3 : Prise en main](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforcions d'assurer la précision, veuillez noter que les traductions automatiques peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant foi. Pour des informations cruciales, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables de tout malentendu ou mauvaise interprétation résultant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->