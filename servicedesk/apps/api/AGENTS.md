# AGENTS.md — apps/api

Backend de ServiceDesk: Web API en .NET 8.

- Implementa exactamente: `GET /tickets`, `GET /tickets/{id}`, `POST /tickets`, `GET /health`.
- La forma de `Ticket` refleja `libs/shared-types`.
- Store en memoria por ahora; CORS habilitado para el origen de dev del frontend.
- Tests con xUnit cubriendo endpoints y edge cases (404, 400).