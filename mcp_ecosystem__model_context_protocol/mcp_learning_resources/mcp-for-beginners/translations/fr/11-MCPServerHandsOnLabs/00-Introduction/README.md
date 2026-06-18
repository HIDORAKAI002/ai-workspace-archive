# Introduction à l'Intégration de Base de Données MCP

## 🎯 Ce que ce Lab Couvre

Ce laboratoire d’introduction offre un aperçu complet de la construction de serveurs Model Context Protocol (MCP) avec intégration de base de données. Vous comprendrez le cas d’usage métier, l’architecture technique et des applications réelles à travers le cas d’usage analytique Zava Retail disponible sur https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Aperçu

**Model Context Protocol (MCP)** permet aux assistants IA d’accéder de manière sécurisée et d’interagir en temps réel avec des sources de données externes. Combiné à l’intégration de bases de données, MCP ouvre des capacités puissantes pour les applications IA basées sur les données.

Ce parcours d’apprentissage vous enseigne à construire des serveurs MCP prêts pour la production qui connectent des assistants IA aux données de ventes retail via PostgreSQL, en mettant en œuvre des modèles d’entreprise tels que la Sécurité au Niveau des Lignes (Row Level Security), la recherche sémantique, et l’accès multi-locataire aux données.

## Objectifs d’Apprentissage

À la fin de ce laboratoire, vous serez capable de :

- **Définir** le Model Context Protocol et ses avantages clés pour l’intégration de bases de données
- **Identifier** les composants clés d’une architecture de serveur MCP avec bases de données
- **Comprendre** le cas d’usage Zava Retail et ses exigences métier
- **Reconnaître** les modèles d’entreprise pour un accès base de données sécurisé et évolutif
- **Lister** les outils et technologies utilisés tout au long de ce parcours

## 🧭 Le Défi : L'IA rencontre les Données du Monde Réel

### Limites de l’IA Traditionnelle

Les assistants IA modernes sont extrêmement puissants mais rencontrent des limitations majeures lorsqu’ils travaillent avec des données métier réelles :

| **Défi** | **Description** | **Impact Métier** |
|----------|-----------------|-------------------|
| **Connaissances Statique** | Les modèles IA entraînés sur des jeux de données fixes ne peuvent pas accéder aux données métier actuelles | Informations obsolètes, opportunités manquées |
| **Silos de Données** | Informations enfermées dans bases, API, et systèmes inaccessibles à l’IA | Analyse incomplète, workflows fragmentés |
| **Contraintes de Sécurité** | Accès direct aux bases pose des risques de sécurité et conformité | Déploiement restreint, préparation manuelle des données |
| **Requêtes Complexes** | Les utilisateurs métier doivent posséder des connaissances techniques pour extraire des informations | Adoption limitée, processus inefficaces |

### La Solution MCP

Le Model Context Protocol répond à ces défis en fournissant :

- **Accès Données en Temps Réel** : Les assistants IA interrogent bases et APIs vivantes
- **Intégration Sécurisée** : Accès contrôlé avec authentification et permissions
- **Interface en Langage Naturel** : Les utilisateurs métier posent leurs questions en langage clair
- **Protocole Standardisé** : Fonctionne avec différentes plateformes et outils IA

## 🏪 Découvrez Zava Retail : Notre Cas d’Usage d’Apprentissage https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Tout au long de ce parcours, nous construirons un serveur MCP pour **Zava Retail**, une chaîne fictive de magasins de bricolage avec plusieurs sites. Ce scénario réaliste illustre une mise en œuvre MCP de niveau entreprise.

### Contexte Métier

**Zava Retail** exploite :  
- **8 magasins physiques** dans l’État de Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 boutique en ligne** pour les ventes e-commerce  
- **Catalogue produit diversifié** incluant outils, quincaillerie, fournitures de jardin, matériaux de construction  
- **Gestion multi-niveaux** avec responsables magasins, responsables régionaux et cadres  

### Exigences Métier

Les gestionnaires de magasins et cadres ont besoin d’analyses alimentées par IA pour :

1. **Analyser les performances commerciales** par magasin et période  
2. **Suivre les niveaux de stock** et identifier les besoins de réapprovisionnement  
3. **Comprendre le comportement client** et les habitudes d’achat  
4. **Découvrir des insights produits** via recherche sémantique  
5. **Générer des rapports** avec des requêtes en langage naturel  
6. **Maintenir la sécurité des données** grâce à un contrôle d’accès basé sur les rôles  

### Exigences Techniques

Le serveur MCP doit fournir :

- **Accès multi-locataire aux données** où les gestionnaires n’accèdent qu’aux données de leur magasin  
- **Requêtage flexible** supportant des opérations SQL complexes  
- **Recherche sémantique** pour la découverte et recommandation produits  
- **Données en temps réel** reflétant l’état actuel du business  
- **Authentification sécurisée** avec sécurité au niveau des lignes  
- **Architecture évolutive** supportant plusieurs utilisateurs simultanés  

## 🏗️ Aperçu de l’Architecture du Serveur MCP

Notre serveur MCP met en œuvre une architecture en couches optimisée pour l’intégration base de données :

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```


### Composants Clés

#### **1. Couche Serveur MCP**
- **FastMCP Framework** : Implémentation moderne Python du serveur MCP  
- **Enregistrement d’Outils** : Définitions déclaratives d’outils avec sécurité de type  
- **Contexte de Requête** : Gestion d’identité utilisateur et session  
- **Gestion d’Erreurs** : Gestion robuste d’erreurs et journalisation  

#### **2. Couche Intégration Base de Données**
- **Pool de Connexions** : Gestion efficace des connexions asyncpg  
- **Fournisseur de Schéma** : Découverte dynamique des schémas de tables  
- **Exécuteur de Requêtes** : Exécution SQL sécurisée avec contexte RLS  
- **Gestion des Transactions** : Conformité ACID et gestion des rollback  

#### **3. Couche Sécurité**
- **Sécurité au Niveau des Lignes (RLS)** : Isolation multi-locataire avec PostgreSQL RLS  
- **Identité Utilisateur** : Authentification et autorisation des gestionnaires  
- **Contrôle d’Accès** : Permissions fines et pistes d’audit  
- **Validation d’Entrée** : Prévention des injections SQL et validation des requêtes  

#### **4. Couche Amélioration IA**
- **Recherche Sémantique** : Embeddings vectoriels pour découverte produit  
- **Intégration Azure OpenAI** : Génération d’embedings textes  
- **Algorithmes de Similarité** : Recherche par similarité cosinus pgvector  
- **Optimisation de Recherche** : Indexation et tuning performance  

## 🔧 Stack Technologique

### Technologies de Base

| **Composant** | **Technologie** | **Objectif** |
|---------------|-----------------|--------------|
| **Framework MCP** | FastMCP (Python) | Implémentation serveur MCP moderne |
| **Base de Données** | PostgreSQL 17 + pgvector | Données relationnelles avec recherche vectorielle |
| **Services IA** | Azure OpenAI | Embeddings textuels et modèles linguistiques |
| **Conteneurisation** | Docker + Docker Compose | Environnement de développement |
| **Plateforme Cloud** | Microsoft Azure | Déploiement en production |
| **Intégration IDE** | VS Code | Chat IA et workflow de développement |

### Outils de Développement

| **Outil** | **Objectif** |
|-----------|--------------|
| **asyncpg** | Driver PostgreSQL haute performance |
| **Pydantic** | Validation et sérialisation des données |
| **Azure SDK** | Intégration services cloud |
| **pytest** | Framework de test |
| **Docker** | Conteneurisation et déploiement |

### Stack de Production

| **Service** | **Ressource Azure** | **Objectif** |
|-------------|---------------------|--------------|
| **Base de Données** | Azure Database for PostgreSQL | Service base de données managé |
| **Conteneur** | Azure Container Apps | Hébergement conteneur serverless |
| **Services IA** | Microsoft Foundry | Modèles et endpoints OpenAI |
| **Monitoring** | Application Insights | Observabilité et diagnostics |
| **Sécurité** | Azure Key Vault | Gestion des secrets et configuration |

## 🎬 Scénarios d’Utilisation Réels

Explorons comment différents utilisateurs interagissent avec notre serveur MCP :

### Scénario 1 : Revue de Performance pour Gestionnaire de Magasin

**Utilisateur** : Sarah, responsable du magasin de Seattle  
**Objectif** : Analyser les performances des ventes du dernier trimestre

**Requête en Langage Naturel** :  
> « Montre-moi les 10 produits principaux par chiffre d’affaires pour mon magasin au T4 2024 »

**Ce qui se Passe** :  
1. VS Code AI Chat envoie la requête au serveur MCP  
2. Le serveur MCP identifie le contexte de magasin de Sarah (Seattle)  
3. Les politiques RLS filtrent les données pour le magasin Seattle uniquement  
4. Requête SQL générée et exécutée  
5. Résultats formatés et renvoyés à AI Chat  
6. L’IA fournit une analyse et des insights  

### Scénario 2 : Découverte de Produits avec Recherche Sémantique

**Utilisateur** : Mike, gestionnaire des stocks  
**Objectif** : Trouver des produits similaires à une demande client

**Requête en Langage Naturel** :  
> « Quels produits vendons-nous qui sont similaires aux ‘connecteurs électriques étanches pour usage extérieur’ ? »

**Ce qui se Passe** :  
1. Requête traitée par l’outil de recherche sémantique  
2. Azure OpenAI génère un vecteur embedding  
3. pgvector exécute une recherche par similarité  
4. Produits apparentés classés par pertinence  
5. Résultats incluent détails et disponibilité produits  
6. L’IA suggère alternatives et opportunités de regroupement  

### Scénario 3 : Analyses Multi-Magasins

**Utilisateur** : Jennifer, directrice régionale  
**Objectif** : Comparer les performances sur tous les magasins

**Requête en Langage Naturel** :  
> « Compare les ventes par catégorie pour tous les magasins au cours des 6 derniers mois »

**Ce qui se Passe** :  
1. Contexte RLS défini pour accès directrice régionale  
2. Requête complexe multi-magasins générée  
3. Données agrégées sur tous les sites  
4. Résultats incluent tendances et comparaisons  
5. L’IA identifie insights et recommandations  

## 🔒 Sécurité et Multi-Tenancy Approfondissement

Notre implémentation met la sécurité de niveau entreprise en priorité :

### Sécurité au Niveau des Lignes (RLS)

PostgreSQL RLS garantit l’isolation des données :

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```


### Gestion de l’Identité Utilisateur

Chaque connexion MCP inclut :  
- **ID du gestionnaire de magasin** : Identifiant unique pour contexte RLS  
- **Attribution de rôle** : Permissions et niveaux d’accès  
- **Gestion de session** : Tokens d’authentification sécurisés  
- **Journalisation d’audit** : Historique complet des accès  

### Protection des Données

Multiples couches de sécurité :  
- **Chiffrement des connexions** : TLS pour toutes les connexions base  
- **Prévention injection SQL** : Requêtes paramétrées uniquement  
- **Validation d’entrée** : Validation complète des requêtes  
- **Gestion d’erreurs** : Aucune donnée sensible dans les messages d’erreur  

## 🎯 Points Clés à Retenir

Après cette introduction, vous devriez comprendre :

✅ **Proposition de valeur MCP** : Comment MCP connecte assistants IA et données réelles  
✅ **Contexte Métier** : Exigences et défis de Zava Retail  
✅ **Aperçu de l’Architecture** : Composants clés et interactions  
✅ **Stack Technologique** : Outils et frameworks utilisés  
✅ **Modèle de Sécurité** : Accès multi-locataire et protection des données  
✅ **Modèles d’Utilisation** : Scénarios réels de requêtes et workflows  

## 🚀 Et Après ?

Prêt pour aller plus loin ? Continuez avec :

**[Lab 01 : Concepts d’Architecture de Base](../01-Architecture/README.md)**

Découvrez les modèles d’architecture serveur MCP, les principes de conception de bases de données, et la mise en œuvre technique détaillée qui alimente notre solution d’analyses retail.

## 📚 Ressources Complémentaires

### Documentation MCP
- [Spécification MCP](https://modelcontextprotocol.io/docs/) - Documentation officielle du protocole  
- [MCP pour Débutants](https://aka.ms/mcp-for-beginners) - Guide complet d’apprentissage MCP  
- [Documentation FastMCP](https://github.com/modelcontextprotocol/python-sdk) - Documentation SDK Python  

### Intégration Base de Données
- [Documentation PostgreSQL](https://www.postgresql.org/docs/) - Référence complète PostgreSQL  
- [Guide pgvector](https://github.com/pgvector/pgvector) - Documentation extension vectorielle  
- [Sécurité au Niveau des Lignes](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Guide PostgreSQL RLS  

### Services Azure
- [Documentation Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Intégration service IA  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Service base de données managé  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Conteneurs serverless  

---

**Avertissement** : Ceci est un exercice d’apprentissage utilisant des données retail fictives. Suivez toujours les politiques internes de gouvernance et sécurité des données lors de l’implémentation de solutions similaires en production.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->