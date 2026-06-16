# Implémentation de la sécurité du contenu Azure avec MCP

> **Risque OWASP MCP traité** : [MCP06 - Subversion du flux d’intention](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Pour renforcer la sécurité MCP contre les injections d’invite, l'empoisonnement d’outil et autres vulnérabilités spécifiques à l’IA, l’intégration d’Azure Content Safety est fortement recommandée. Ce guide d’implémentation est aligné avec le [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3 : Sécurité E/S.

## Intégration avec le serveur MCP

Pour intégrer Azure Content Safety avec votre serveur MCP, ajoutez le filtre de sécurité du contenu en tant que middleware dans votre pipeline de traitement des requêtes :

1. Initialisez le filtre lors du démarrage du serveur  
2. Validez toutes les requêtes d’outil entrantes avant leur traitement  
3. Vérifiez toutes les réponses sortantes avant de les retourner aux clients  
4. Enregistrez et signalez les violations de sécurité  
5. Implémentez une gestion appropriée des erreurs pour les contrôles de sécurité du contenu échoués  

Cela offre une défense robuste contre :  
- Les attaques d’injection d’invite  
- Les tentatives d’empoisonnement d’outil  
- L’exfiltration de données via des entrées malveillantes  
- La génération de contenu nuisible  

## Bonnes pratiques pour l’intégration d’Azure Content Safety

1. **Listes de blocage personnalisées** : Créez des listes de blocage personnalisées spécifiquement pour les schémas d’injection MCP  
2. **Réglage de la gravité** : Ajustez les seuils de gravité en fonction de votre cas d’utilisation spécifique et de votre tolérance au risque  
3. **Couverture complète** : Appliquez les contrôles de sécurité du contenu à toutes les entrées et sorties  
4. **Optimisation des performances** : Envisagez de mettre en œuvre un cache pour les contrôles de sécurité du contenu répétés  
5. **Mécanismes de secours** : Définissez des comportements de secours clairs lorsque les services de sécurité du contenu sont indisponibles  
6. **Retour utilisateur** : Fournissez un retour clair aux utilisateurs lorsque le contenu est bloqué pour des raisons de sécurité  
7. **Amélioration continue** : Mettez régulièrement à jour les listes de blocage et les schémas en fonction des menaces émergentes  

## Ressources supplémentaires

### Guide de sécurité OWASP MCP
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 complet avec implémentation Azure  
- [MCP06 - Injection d’invite](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Schémas détaillés de mitigation d’injection d’invite  
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Camp pratique 3 : Sécurité E/S couvre la sécurité du contenu  

### Documentation Azure
- [Présentation d’Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Documentation Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Démarrage rapide Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## Et ensuite

- Retour à : [Présentation du module Sécurité](./README.md)  
- Continuer vers : [Module 3 : Premiers pas](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->