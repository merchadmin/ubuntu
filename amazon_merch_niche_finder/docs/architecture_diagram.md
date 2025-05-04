```mermaid
graph TD
    subgraph "User Device"
        Client[Web Browser]
    end

    subgraph "Google Cloud Platform (GCP)"
        subgraph "Cloud Run Services"
            Frontend[React Frontend]
            Backend[Flask Backend API]
        end
        Database[(Cloud SQL MySQL)]
        Secrets[Secret Manager]
        Auth[Identity Platform / Firebase Auth]
        Build[Cloud Build]
    end

    subgraph "External Services"
        RapidAPI[Real-time Amazon API via RapidAPI]
    end

    Client -->|HTTPS| Frontend
    Frontend -->|API Calls (HTTPS)| Backend
    Backend -->|Fetches Data| RapidAPI
    Backend -->|Reads/Writes User Data| Database
    Backend -->|Reads API Key| Secrets
    Backend -->|Delegates Auth| Auth
    Build -->|Deploys| Frontend
    Build -->|Deploys| Backend

    style Frontend fill:#lightblue,stroke:#333,stroke-width:2px
    style Backend fill:#lightgreen,stroke:#333,stroke-width:2px
    style Database fill:#orange,stroke:#333,stroke-width:2px
    style RapidAPI fill:#yellow,stroke:#333,stroke-width:2px
    style Secrets fill:#grey,stroke:#333,stroke-width:1px
    style Auth fill:#grey,stroke:#333,stroke-width:1px
    style Build fill:#grey,stroke:#333,stroke-width:1px
```
