# Mise en œuvre de la sécurité du contenu Azure avec MCP

> **Risque OWASP MCP traité** : [MCP06 - Injection de prompt via des charges contextuelles](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Pour renforcer la sécurité MCP contre l'injection de prompt, l’empoisonnement d’outils et d'autres vulnérabilités spécifiques à l'IA, l’intégration d’Azure Content Safety est fortement recommandée. Ce guide de mise en œuvre s’aligne avec l’[atelier MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3 : Sécurité des Entrées/Sorties.

## Intégration avec le serveur MCP

Pour intégrer Azure Content Safety à votre serveur MCP, ajoutez le filtre de sécurité du contenu comme middleware dans votre pipeline de traitement des requêtes :

1. Initialisez le filtre au démarrage du serveur  
2. Validez toutes les requêtes d'outils entrantes avant traitement  
3. Vérifiez toutes les réponses sortantes avant de les renvoyer aux clients  
4. Enregistrez et alertez en cas de violations de sécurité  
5. Mettez en œuvre une gestion d’erreur appropriée pour les vérifications de sécurité de contenu échouées

Cela fournit une défense robuste contre :  
- Les attaques d'injection de prompts  
- Les tentatives d’empoisonnement d’outils  
- L’exfiltration de données via des entrées malveillantes  
- La génération de contenu nuisible

## Bonnes pratiques pour l’intégration d’Azure Content Safety

1. **Listes de blocage personnalisées** : Créez des listes de blocage spécifiques aux modèles d’injection MCP  
2. **Réglage de la gravité** : Ajustez les seuils de gravité selon votre cas d’usage et votre tolérance au risque  
3. **Couverture complète** : Appliquez les contrôles de sécurité du contenu à toutes les entrées et sorties  
4. **Optimisation des performances** : Envisagez la mise en cache des vérifications récurrentes de sécurité du contenu  
5. **Mécanismes de secours** : Définissez des comportements de repli clairs lorsque les services de sécurité du contenu sont indisponibles  
6. **Retour utilisateur** : Fournissez des retours clairs aux utilisateurs lorsque du contenu est bloqué pour raisons de sécurité  
7. **Amélioration continue** : Mettez régulièrement à jour les listes de blocage et les modèles en fonction des menaces émergentes

## Ressources supplémentaires

### Guide de sécurité OWASP MCP  
- [Guide de sécurité Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 OWASP MCP complet avec mise en œuvre Azure  
- [MCP06 - Injection de prompt](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Patterns détaillés de mitigation d’injection de prompt  
- [Atelier MCP Security Summit](https://azure-samples.github.io/sherpa/) - Camp 3 pratique : Sécurité des Entrées/Sorties couvre la sécurité du contenu

### Documentation Azure  
- [Présentation d’Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Documentation Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Démarrage rapide Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Et après

- Retour à : [Présentation du module sécurité](./README.md)  
- Continuer vers : [Module 3 : Premiers pas](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l’aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçons d’assurer l’exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant foi. Pour les informations critiques, une traduction professionnelle réalisée par un humain est recommandée. Nous déclinons toute responsabilité en cas de malentendus ou d’interprétations erronées résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->