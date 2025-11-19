# Zenter Backend

Backend do **Zenter**, uma plataforma moderna para gestão de condomínios, imóveis e relações entre síndicos, administradores e inquilinos. Este backend é construído em **Node.js (TypeScript)**, utilizando **arquitetura modular**, **Fastify**, **Prisma**, **AWS**, **S3 privado**, **CloudFront**, **Cognito**, e integrações com **Stripe** e **serviços de assinatura digital**.

---

# 🚀 Visão Geral

O Zenter é um sistema completo de gestão condominial e imobiliária, oferecendo:

- Onboarding digital de inquilinos
- Upload e validação segura de documentos
- Gestão de contratos com assinatura digital
- Comunicação entre inquilinos e administradores
- Painel administrativo completo
- Geração e controle de boletos/faturas
- Chat em tempo real para chamados
- Multi-tenant
- Infraestrutura segura em AWS

O backend foi projetado como um **monolito modular**, preparado para escalar e ser fatiado futuramente em microserviços.

---

# 🧱 Arquitetura

A arquitetura segue um estilo **modular + hexagonal**, com boundaries claros entre `domain`, `application`, `infra` e `http`.

```
src/
 ├── core/
 ├── modules/
 ├── server/
 └── index.ts
```

Cada módulo possui:

- `domain`: entidades, VOs, regras de negócio
- `application`: use-cases, DTOs, commands/queries
- `infra`: adapters externos, repositórios, mapeadores
- `http`: controllers + rotas

Módulos principais:

- **auth**
- **onboarding**
- **documents**
- **payments**
- **tickets** (chat)
- **contracts**
- **notifications**
- **admin**

---

# 👑 Logo do Projeto

![alt text](https://i.ibb.co/wNtG7CnG/zenter-logo.jpg)

---

# 🧪 Tecnologias Utilizadas

### **Linguagem & Runtime**

- Node.js 22 LTS
- TypeScript
- PNPM

### **Framework**

- Fastify 5

### **Arquitetura**

- Clean/Hexagonal Architecture
- Monolito Modular
- Domain‑Driven Design (DDD)

### **Banco de Dados**

- PostgreSQL
- Prisma ORM

### **Autenticação**

- AWS Cognito
- JWT interno
- 2FA opcional

### **Armazenamento**

- AWS S3 (bucket privado)
- CloudFront (URLs assinadas)

### **Infraestrutura**

- AWS Lambda (presigned URLs, workers)
- AWS ECS ou Lambda (API)
- IAM Roles
- Secrets Manager

### **Pagamentos**

- Stripe (checkout, faturas, webhook)

### **Assinatura Digital**

- DocuSign (ou outro provider compatível)

---

# ⚙️ Como rodar o projeto

### Instalar dependências

```
pnpm install
```

### Rodar em modo dev

```
pnpm dev
```

Servidor estará disponível em:

```
http://localhost:3333
```

---

# 🧩 Processos Principais

## 🔐 Autenticação

- Login via Cognito
- Refresh Token
- JWT interno para autorização
- Controle de roles & permissions

## 📝 Onboarding de Inquilino

1. Pré-cadastro pelo admin
2. Primeiro acesso via link/CPF/email
3. Preenchimento de dados
4. Upload de documentos (RG, CPF/CNH, comprovante de renda)
5. Análise pelo admin
6. Aprovação ou recusa

## 📄 Documentos (S3 + CloudFront)

- Upload com presigned URL
- Armazenamento seguro (private)
- URLs assinadas entregues ao client
- Validade curta (5 min)

## 💳 Pagamentos (Stripe)

- Faturas mensais
- QR Code
- Webhooks para atualização do status do pagamento

## 💬 Tickets (Chat)

- WebSocket
- Canal por chamado
- Envio de mensagens
- Read receipts
- Upload de anexos

---

# 📌 Checklist do Projeto

## ✔️ Estrutura

- [x] Criar arquitetura modular
- [x] Configurar ESM + TSX
- [x] ESLint + Prettier funcionando
- [x] Config inicial Fastify
- [x] Módulo AUTH inicial

## 🔜 Em desenvolvimento

- [ ] Implementar módulo Onboarding
- [ ] Configurar Prisma + migrations
- [ ] Criar módulo Documents
- [ ] Criar módulo Payments (Stripe)
- [ ] Criar módulo Tickets (WebSocket)
- [ ] Criar módulo Notifications
- [ ] Criar módulo Admin Panel API
- [ ] Integração com DocuSign
- [ ] Deploy AWS

## 🚀 Futuro

- [ ] Fatiar módulos em microserviços (conforme demanda)
- [ ] Implementar fila (SQS/EventBridge)
- [ ] Feature Flags
- [ ] Observabilidade (OTEL)
- [ ] CDN para assets públicos

---

# 🧑‍💻 Desenvolvedor

**Joseilton Junior** — Full Stack Software Engineer

---

# 📜 Licença

MIT (a definir)

---

Caso queira enriquecer com badges, diagramas ou fluxo visual, só pedir!
