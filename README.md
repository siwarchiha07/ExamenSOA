# 🛍️ E-commerce Microservices Architecture

Ce projet est une application e-commerce construite avec une architecture **microservices**, combinant plusieurs protocoles de communication : REST, gRPC, GraphQL et Kafka.

## 📐 Architecture Globale

                    ┌─────────────┐
                    │   Client    │
                    └────┬────────┘
          ┌─────────────┼──────────────┐
          │             │              │
       REST         GraphQL         REST
          ▼             ▼              ▼
              ┌────────────────────┐
              │    API Gateway     │
              └─────┬─────┬────────┘
                    │     │
              ┌─────▼─┐ ┌─▼────────────────┐
              │REST   │ │ GraphQL          │
              │Call   │ │ Call             │
              ▼       ▼ ▼                  ▼
       ┌────────────┐   ┌────────────────────────┐
       │Product     │   │Recommendation Service  │
       │Service     │   └────────────────────────┘
       └────────────┘
                    │
                 gRPC
                    ▼
           ┌────────────────┐
           │ Order Service  │
           └──────┬─────────┘
                  │
                Kafka
                  ▼
     ┌────────────────────────┐
     │ Notification Service   │
     └────────────────────────┘

## 🧩 Description des Microservices

- **User Service (REST)** : Authentification, inscription, gestion des utilisateurs.
- **Product Service (REST)** : Consultation de catalogue produit, recherche, filtrage.
- **Order Service (gRPC)** : Enregistrement et gestion des commandes avec performance.
- **Recommendation Service (GraphQL)** : Recommandations personnalisées de produits.
- **Notification Service (Kafka)** : Envoi d’emails ou SMS lors d’actions utilisateur (commande, inscription).

## ⚙️ Technologies Utilisées

- **Langage principal** : Node.js
- **Frameworks** :
  - REST : Express.js
  - GraphQL : Apollo Server
  - gRPC : `@grpc/grpc-js`
- **Kafka** : `kafkajs`, Apache Kafka & Zookeeper
- **API Gateway** : Express.js ou Apollo Gateway
- **Orchestration** : Docker, Docker Compose
- **Frontend** : HTML/CSS/JS ou client GraphQL (ApolloClient)

## 🔄 Communication entre Services

| Interaction                          | Protocole |
|-------------------------------------|-----------|
| Client → API Gateway                | REST / GraphQL |
| API Gateway → User/Product Service  | REST      |
| API Gateway → Order Service         | gRPC      |
| API Gateway → Recommendation        | GraphQL   |
| User/Order Service → Notification   | Kafka     |

## 🔐 API Gateway - Rôles

- Point d’entrée unique pour le client
- Redirection intelligente selon le protocole
- Authentification avec JWT
- Gestion centralisée des erreurs

## 🚀 Lancement du Projet

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/ecommerce-microservices.git
   cd ecommerce-microservices
