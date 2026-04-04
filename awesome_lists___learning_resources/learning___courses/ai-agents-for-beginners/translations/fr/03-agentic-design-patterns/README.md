[![How to Design Good AI Agents](../../../translated_images/fr/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Cliquez sur l'image ci-dessus pour voir la vidéo de cette leçon)_
# Principes de conception agentique en IA

## Introduction

Il existe de nombreuses façons de penser la construction de systèmes IA agentiques. Étant donné que l'ambiguïté est une caractéristique et non un défaut dans la conception de l'IA générative, il est parfois difficile pour les ingénieurs de savoir par où commencer. Nous avons créé un ensemble de principes de conception UX centrés sur l'humain pour permettre aux développeurs de construire des systèmes agentiques centrés sur le client afin de répondre à leurs besoins métier. Ces principes de conception ne sont pas une architecture prescriptive mais plutôt un point de départ pour les équipes qui définissent et construisent des expériences agents.

En général, les agents devraient :

- Élargir et augmenter les capacités humaines (brainstorming, résolution de problèmes, automatisation, etc.)
- Combler les lacunes de connaissances (me mettre à jour sur des domaines de connaissances, traduction, etc.)
- Faciliter et soutenir la collaboration selon les modes de travail que nous préférons en tant qu'individus
- Nous rendre de meilleures versions de nous-mêmes (par ex., coach de vie/gestionnaire de tâches, nous aidant à apprendre la régulation émotionnelle et la pleine conscience, développer la résilience, etc.)

## Ce que couvrira cette leçon

- Quels sont les principes de conception agentique
- Quelles sont quelques lignes directrices à suivre lors de la mise en œuvre de ces principes
- Quelques exemples d'utilisation des principes de conception

## Objectifs d'apprentissage

Après avoir terminé cette leçon, vous serez capable de :

1. Expliquer ce que sont les principes de conception agentique
2. Expliquer les lignes directrices pour utiliser les principes de conception agentique
3. Comprendre comment construire un agent en utilisant les principes de conception agentique

## Les principes de conception agentique

![Agentic Design Principles](../../../translated_images/fr/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agent (Espace)

C'est l'environnement dans lequel l'agent opère. Ces principes guident comment nous concevons les agents pour qu'ils s'engagent dans les mondes physique et numérique.

- **Connecter, ne pas écraser** – aider à connecter les personnes à d'autres personnes, événements et connaissances exploitables pour permettre la collaboration et la connexion.
- Les agents aident à connecter événements, connaissances et personnes.
- Les agents rapprochent les gens. Ils ne sont pas conçus pour remplacer ni diminuer les personnes.
- **Facilement accessible mais parfois invisible** – l'agent opère largement en arrière-plan et ne nous sollicite que lorsqu'il est pertinent et approprié.
  - L'agent est facilement découvrable et accessible aux utilisateurs autorisés sur tout appareil ou plateforme.
  - L'agent supporte des entrées et sorties multimodales (son, voix, texte, etc.).
  - L'agent peut passer sans à-coup du premier plan à l'arrière-plan ; entre proactif et réactif, selon la perception des besoins de l'utilisateur.
  - L'agent peut fonctionner de manière invisible, mais son processus en arrière-plan et sa collaboration avec d'autres agents sont transparents et contrôlables par l'utilisateur.

### Agent (Temps)

C'est la manière dont l'agent opère dans le temps. Ces principes guident comment nous concevons les agents interagissant à travers passé, présent et futur.

- **Passé** : Réfléchir à l'histoire qui inclut à la fois état et contexte.
  - L'agent fournit des résultats plus pertinents basés sur l'analyse de données historiques riches au-delà de l'événement, des personnes ou des états seuls.
  - L'agent crée des connexions à partir d'événements passés et réfléchit activement à la mémoire pour s'engager avec les situations actuelles.
- **Présent** : Inciter plus que notifier.
  - L'agent incarne une approche globale d'interaction avec les personnes. Quand un événement survient, l'agent dépasse la simple notification statique ou autre formalité statique. L'agent peut simplifier les flux ou générer dynamiquement des indices pour diriger l'attention de l'utilisateur au bon moment.
  - L'agent délivre l'information basée sur le contexte environnemental, les changements sociaux et culturels, et adapté à l'intention de l'utilisateur.
  - L'interaction avec l'agent peut être graduelle, évolutive/croissante en complexité pour autonomiser les utilisateurs sur le long terme.
- **Futur** : S'adapter et évoluer.
  - L'agent s'adapte à différents appareils, plateformes et modalités.
  - L'agent s'adapte au comportement de l'utilisateur, aux besoins d'accessibilité, et est librement personnalisable.
  - L'agent est façonné et évolue grâce à l'interaction continue avec l'utilisateur.

### Agent (Noyau)

Ce sont les éléments clés au cœur de la conception d'un agent.

- **Accepter l'incertitude mais établir la confiance**.
  - Un certain niveau d'incertitude chez l'agent est attendu. L'incertitude est un élément clé de la conception agentique.
  - La confiance et la transparence sont les fondations de la conception de l'agent.
  - Les humains contrôlent quand l'agent est activé/désactivé et le statut de l'agent est clairement visible à tout moment.

## Lignes directrices pour mettre en œuvre ces principes

Lorsque vous utilisez les principes de conception précédents, appliquez les lignes directrices suivantes :

1. **Transparence** : Informer l'utilisateur que l'IA est impliquée, comment elle fonctionne (y compris les actions passées), et comment donner des retours et modifier le système.
2. **Contrôle** : Permettre à l'utilisateur de personnaliser, spécifier ses préférences, et avoir le contrôle sur le système et ses attributs (y compris la possibilité d'oublier).
3. **Cohérence** : Viser des expériences cohérentes et multimodales sur appareils et points d'accès. Utiliser des éléments UI/UX familiers lorsque c'est possible (par ex., icône micro pour interaction vocale) et réduire autant que possible la charge cognitive de l'utilisateur (par ex., viser des réponses concises, aides visuelles, contenu « En savoir plus »).

## Comment concevoir un agent de voyage en utilisant ces principes et lignes directrices

Imaginez que vous concevez un agent de voyage, voici comment vous pourriez envisager utiliser ces principes et lignes directrices :

1. **Transparence** – Informez l'utilisateur que l'agent de voyage est un agent IA. Fournissez quelques instructions de base pour commencer (par ex., un message « Bonjour », exemples de commandes). Documentez cela clairement sur la page produit. Montrez la liste des commandes que l'utilisateur a demandées auparavant. Expliquez clairement comment donner des retours (pouce en haut/bas, bouton Envoyer un retour, etc.). Précisez clairement si l'agent a des restrictions d'usage ou de sujets.
2. **Contrôle** – Assurez-vous que l'utilisateur sache comment modifier l'agent après sa création avec des éléments comme la commande système. Permettez à l'utilisateur de choisir le niveau de verbosité de l'agent, son style d'écriture, et toute mise en garde sur ce dont l'agent ne doit pas parler. Autorisez l'utilisateur à voir et supprimer tout fichier ou données associées, commandes et conversations passées.
3. **Cohérence** – Assurez-vous que les icônes pour partager une commande, ajouter un fichier ou une photo, et taguer quelqu’un ou quelque chose sont standard et reconnaissables. Utilisez l'icône trombone pour indiquer l’envoi/partage de fichiers avec l'agent, et une icône image pour indiquer l'envoi de graphiques.

## Exemples de code

- Python : [Agent Framework](./code_samples/03-python-agent-framework.ipynb)
- .NET : [Agent Framework](./code_samples/03-dotnet-agent-framework.md)


## Vous avez d'autres questions sur les modèles de conception agentique IA ?

Rejoignez le [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) pour rencontrer d'autres apprenants, assister à des heures de bureau et obtenir des réponses à vos questions sur les agents IA.

## Ressources supplémentaires

- <a href="https://openai.com" target="_blank">Practices for Governing Agentic AI Systems | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">The HAX Toolkit Project - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Responsible AI Toolbox</a>

## Leçon précédente

[Exploring Agentic Frameworks](../02-explore-agentic-frameworks/README.md)

## Leçon suivante

[Tool Use Design Pattern](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçons d’assurer l’exactitude, veuillez noter que les traductions automatiques peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue d’origine doit être considéré comme la source faisant foi. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous déclinons toute responsabilité en cas de malentendus ou de mauvaises interprétations résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->