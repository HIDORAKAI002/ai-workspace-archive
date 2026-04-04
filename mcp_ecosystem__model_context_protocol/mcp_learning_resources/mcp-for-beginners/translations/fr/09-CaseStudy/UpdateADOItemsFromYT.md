# Étude de cas : Mise à jour des éléments Azure DevOps à partir des données YouTube avec MCP

> **Avis de non-responsabilité :** Il existe des outils et rapports en ligne capables d’automatiser le processus de mise à jour des éléments Azure DevOps avec des données provenant de plateformes comme YouTube. Le scénario suivant est fourni uniquement à titre d’exemple pour illustrer comment les outils MCP peuvent être appliqués pour des tâches d’automatisation et d’intégration.

## Présentation

Cette étude de cas démontre un exemple de la façon dont le Model Context Protocol (MCP) et ses outils peuvent être utilisés pour automatiser le processus de mise à jour des éléments de travail Azure DevOps (ADO) avec des informations provenant de plateformes en ligne, telles que YouTube. Le scénario décrit n’est qu’une illustration des capacités plus larges de ces outils, qui peuvent être adaptés à de nombreux besoins similaires d’automatisation.

Dans cet exemple, un Advocate suit des sessions en ligne utilisant des éléments ADO, où chaque élément comprend une URL de vidéo YouTube. En tirant parti des outils MCP, l’Advocate peut maintenir à jour les éléments ADO avec les dernières métriques vidéo, comme le nombre de vues, de manière répétable et automatisée. Cette approche peut être généralisée à d’autres cas où des informations issues de sources en ligne doivent être intégrées dans ADO ou d’autres systèmes.

## Scénario

Un Advocate est responsable du suivi de l’impact des sessions en ligne et des engagements communautaires. Chaque session est enregistrée en tant qu’élément de travail ADO dans le projet 'DevRel', et l’élément de travail contient un champ pour l’URL de la vidéo YouTube. Pour un rapport précis de la portée de la session, l’Advocate doit mettre à jour l’élément ADO avec le nombre actuel de vues de la vidéo et la date à laquelle cette information a été récupérée.

## Outils utilisés

- [Azure DevOps MCP](https://github.com/microsoft/azure-devops-mcp) : Permet l’accès programmatique et la mise à jour des éléments de travail ADO via MCP.
- [Playwright MCP](https://github.com/microsoft/playwright-mcp) : Automatise les actions du navigateur pour extraire des données en direct depuis des pages Web, telles que les statistiques des vidéos YouTube.

## Flux de travail étape par étape

1. **Identifier l’élément ADO** : Commencer avec l’ID de l’élément de travail ADO (par exemple, 1234) dans le projet 'DevRel'.
2. **Récupérer l’URL YouTube** : Utiliser l’outil Azure DevOps MCP pour obtenir l’URL YouTube depuis l’élément de travail.
3. **Extraire le nombre de vues vidéo** : Utiliser l’outil Playwright MCP pour naviguer vers l’URL YouTube et extraire le nombre actuel de vues.
4. **Mettre à jour l’élément ADO** : Écrire le nombre de vues le plus récent et la date de récupération dans la section 'Impact et enseignements' de l’élément de travail ADO en utilisant l’outil Azure DevOps MCP.

## Extrait d’exemple

```bash
- Work with the ADO Item ID: 1234
- The project is '2025-Awesome'
- Get the YouTube URL for the ADO item
- Use Playwright to get the current views from the YouTube video
- Update the ADO item with the current video views and the updated date of the information
```

## Diagramme Mermaid

```mermaid
flowchart TD
    A[Début : L'avocat identifie l'ID de l'élément ADO] --> B[Obtenir l'URL YouTube depuis l'élément ADO en utilisant Azure DevOps MCP]
    B --> C[Extraire les vues actuelles de la vidéo en utilisant Playwright MCP]
    C --> D[Mettre à jour la section Impact et Apprentissages de l'élément ADO avec le nombre de vues et la date]
    D --> E[Fin]
```
## Mise en œuvre technique

- **Orchestration MCP** : Le flux de travail est orchestré par un serveur MCP, qui coordonne l’usage des outils Azure DevOps MCP et Playwright MCP.
- **Automatisation** : Le processus peut être déclenché manuellement ou programmé pour s’exécuter à intervalles réguliers afin de maintenir les éléments ADO à jour.
- **Extensibilité** : Le même modèle peut être étendu pour mettre à jour les éléments ADO avec d’autres métriques en ligne (par exemple, likes, commentaires) ou depuis d’autres plateformes.

## Résultats et impact

- **Efficacité** : Réduit l’effort manuel des Advocates en automatisant la récupération et la mise à jour des métriques vidéo.
- **Précision** : Garantit que les éléments ADO reflètent les données les plus récentes disponibles depuis les sources en ligne.
- **Répétabilité** : Fournit un flux de travail réutilisable pour des scénarios similaires impliquant d’autres sources de données ou métriques.

## Références

- [Azure DevOps MCP](https://github.com/microsoft/azure-devops-mcp)
- [Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Et après ?

- Retour à : [Aperçu des études de cas](./README.md)
- Suivant : [Récupération documentaire en temps réel avec MCP](./docs-mcp/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l’aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous fassions tout notre possible pour garantir l’exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des imprécisions. Le document original dans sa langue natale doit être considéré comme la source faisant foi. Pour les informations critiques, une traduction professionnelle humaine est recommandée. Nous déclinons toute responsabilité en cas de malentendus ou d’interprétations erronées résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->