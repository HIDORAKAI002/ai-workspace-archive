# MCP Démo OAuth2

## Introduction

OAuth2 est le protocole standard de l'industrie pour l'autorisation, permettant un accès sécurisé aux ressources sans partager les identifiants. Dans les implémentations MCP (Model Context Protocol), OAuth2 fournit un moyen robuste d’authentifier et d’autoriser les clients (tels que les agents IA) à accéder aux serveurs MCP et à leurs outils.

Cette leçon montre comment mettre en œuvre l’authentification OAuth2 pour les serveurs MCP en utilisant Spring Boot, un modèle courant pour les déploiements en entreprise et en production.

## Objectifs d’apprentissage

À la fin de cette leçon, vous serez capable de :
- Comprendre comment OAuth2 s’intègre avec les serveurs MCP
- Implémenter un serveur d’autorisation Spring pour l’émission de tokens
- Protéger les points d’extrémité MCP avec une authentification basée sur JWT
- Configurer le flux client credentials pour la communication machine à machine

## Prérequis

- Connaissances de base en Java et Spring Boot
- Familiarité avec les concepts MCP des modules précédents
- Maven ou Gradle installés

---

## Présentation du projet

Ce projet est une **application Spring Boot minimale** qui joue à la fois le rôle de :

* **Serveur d’autorisation Spring** (émission de tokens d’accès JWT via le flux `client_credentials`), et  
* **Serveur de ressources** (protégeant son propre point d’accès `/hello`).

Il reflète la configuration présentée dans le [article de blog Spring (2 avr. 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Démarrage rapide (local)

```bash
# construire et exécuter
./mvnw spring-boot:run

# obtenir un jeton
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# appeler le point de terminaison protégé
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Tester la configuration OAuth2

Vous pouvez tester la configuration de sécurité OAuth2 en suivant les étapes suivantes :

### 1. Vérifier que le serveur fonctionne et est sécurisé

```bash
# Cela devrait renvoyer 401 Non autorisé, confirmant que la sécurité OAuth2 est active
curl -v http://localhost:8081/
```

### 2. Obtenir un token d’accès via client credentials

```bash
# Obtenir et extraire la réponse complète du jeton
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Ou extraire uniquement le jeton (nécessite jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Note : L’en-tête d’authentification Basic (`bWNwLWNsaWVudDpzZWNyZXQ=`) est l’encodage Base64 de `mcp-client:secret`.

### 3. Accéder au point d’extrémité protégé avec le token

```bash
# Utilisation du jeton enregistré
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Ou directement avec la valeur du jeton
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Une réponse réussie avec "Hello from MCP OAuth2 Demo !" confirme que la configuration OAuth2 fonctionne correctement.

---

## Construction du conteneur

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Déployer sur **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Le FQDN d’ingress devient votre **issuer** (`https://<fqdn>`).  
Azure fournit automatiquement un certificat TLS fiable pour `*.azurecontainerapps.io`.

---

## Intégrer dans **Azure API Management**

Ajoutez cette politique inbound à votre API :

```xml
<inbound>
  <validate-jwt header-name="Authorization">
    <openid-config url="https://<fqdn>/.well-known/openid-configuration"/>
    <audiences>
      <audience>mcp-client</audience>
    </audiences>
  </validate-jwt>
  <base/>
</inbound>
```

APIM récupérera le JWKS et validera chaque requête.

---

## Que faire ensuite

- [5.4 Contextes racines](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l’aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforcions d’assurer l’exactitude, veuillez noter que les traductions automatiques peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue d’origine doit être considéré comme la source faisant foi. Pour toute information critique, une traduction professionnelle réalisée par un humain est recommandée. Nous ne saurions être tenus responsables des malentendus ou interprétations erronées résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->