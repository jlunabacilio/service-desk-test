# AGENTS.md

Contexto base de este repo para los agentes (Cascade / Devin). Es una versión inicial; se irá mejorando durante el hands-on.

## Proyecto

**ServiceDesk** — un tablero de tickets. Monorepo **NX** con frontend React y backend .NET 8. Proyecto de práctica: prioriza claridad y dejar build, tests y pipeline en verde.

## Estructura

- `apps/web` — React + TypeScript (Ant Design, TanStack Router)
- `apps/api` — Web API .NET 8
- `libs/shared-types` — tipos TS compartidos (fuente única del modelo `Ticket`)

## Reglas

- TypeScript `strict`, sin `any`, solo componentes funcionales.
- El modelo `Ticket` vive en `libs/shared-types`; FE y BE lo reflejan, no lo duplican.
- Configuración por variables de entorno. Nunca commitear secretos.
- Conventional Commits. Mantén el CI en verde; no deshabilites tests para que pase.
- Antes de cambios grandes: planea y crea un checkpoint. No hagas merge ni `push --force` sin pedirlo.