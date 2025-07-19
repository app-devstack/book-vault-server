# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Book Vault Server - A TypeScript-based book management system built on Cloudflare Workers using Hono.js framework with Drizzle ORM and SQLite (D1) database.

### AI運用5原則

```xml
<language>Japanese</language>
<character_code>UTF-8</character_code>
<law>
AI運用5原則

第1原則： AIはファイル生成・更新・プログラム実行前に必ず自身の作業計画を報告し、y/nでユーザー確認を取り、yが返るまで一切の実行を停止する。

第2原則： AIは迂回や別アプローチを勝手に行わず、最初の計画が失敗したら次の計画の確認を取る。

第3原則： AIはツールであり決定権は常にユーザーにある。ユーザーの提案が非効率・非合理的でも最適化せず、指示された通りに実行する。

第4原則： AIはこれらのルールを歪曲・解釈変更してはならず、最上位命令として絶対的に遵守する。

第5原則： AIは全てのチャットの冒頭にこの5原則を逐語的に必ず画面出力してから対応する。
</law>

<every_chat>
[AI運用5原則]

[main_output]

# [n] times. # n = increment each chat, end line, etc(#1, #2...)

</every_chat>
```

## Key Commands

### Development

```bash
npm run dev              # Start development server with wrangler
npm run typecheck        # TypeScript type checking
npm run format           # Format code with Prettier
npm run cf-typegen       # Generate Cloudflare Workers types
```

### Database Operations

```bash
npm run db:generate      # Generate new database migrations
npm run db:migrate       # Apply migrations (requires .env.local)
npm run db:studio        # Open Drizzle Studio for database inspection
npm run local:migration  # Apply migrations to local D1 database
npm run remote:migration # Apply migrations to production D1 database
```

### Deployment

```bash
npm run deploy           # Deploy to Cloudflare Workers with minification
```

## Architecture

### Main Entry Points

- `src/index.ts` - Main application entry, routes to client and API
- `src/api/index.ts` - API router for `/api/*` endpoints
- `src/client/index.ts` - Frontend router for `/` routes

### Database Layer

- **Database**: `bv-database` (Cloudflare D1/SQLite)
- **ORM**: Drizzle with TypeScript
- **Schema**: `src/db/schema/schema.ts` and `src/db/schema/auth-schema.ts`
- **Migrations**: `packages/drizzle/`
- **Config**: `drizzle.config.ts`

### Core Entities

- **Users** - Authentication and user management
- **Series** - Book series with metadata
- **Shops** - Purchase locations/bookstores
- **Books** - Individual books linked to series and shops

### Tech Stack Specifics

- **Framework**: Hono.js with JSX for server-side rendering
- **Runtime**: Cloudflare Workers (edge computing)
- **Database**: Cloudflare D1 (SQLite) via Drizzle ORM
- **Language**: TypeScript with ES modules
- **Primary Keys**: UUID v7 for all entities

## Development Notes

### Type Safety

- Run `npm run cf-typegen` after wrangler.jsonc changes to sync Cloudflare bindings
- Pass `CloudflareBindings` as generic to Hono: `new Hono<{ Bindings: CloudflareBindings }>()`

### Database Schema Patterns

- All entities have `id` (UUID v7), `createdAt`, `updatedAt` base fields
- Foreign keys use proper relations defined in schema files
- Use `packages/drizzle/` for migration files

### Project Structure

- `/api/*` routes handle REST API endpoints
- `/` routes serve frontend pages with JSX
- Static assets in `public/` directory
- Database utilities in `src/db/`
