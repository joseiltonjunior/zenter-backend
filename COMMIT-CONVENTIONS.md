# 🎯 Convenção de Commits — Zenter Backend

Este documento define o padrão oficial de commits do projeto **Zenter**.  
Usamos **Conventional Commits** para manter histórico limpo, padronizado e compatível com automações (CI/CD, changelog automático, versionamento semântico).

---

## 📌 Formato do commit

feat(auth): implementation auth login.

### Regras:

- **type** → obrigatório
- **scope** → opcional, porém recomendado
- **subject** → obrigatório, curto, direto, sem ponto final
- Escrever em voz imperativa: “adiciona”, “remove”, “corrige”
- Máx. recomendado: 72 caracteres no subject

---

## 🧩 Tipos permitidos (type)

- `feat` → nova feature
- `fix` → correção de bug
- `docs` → documentação
- `style` → formatação, sem mudar lógica (prettier, eslint)
- `refactor` → refatoração interna
- `perf` → melhoria de performance
- `test` → testes
- `build` → dependências, build system
- `chore` → manutenção geral (sem mudar comportamento)
- `ci` → pipelines, workflows, github actions

---

## 🎯 Scopes recomendados (módulos)

Use quando fizer sentido:

- `auth`
- `onboarding`
- `documents`
- `payments`
- `tickets`
- `contracts`
- `notifications`
- `admin`
- `environment`
- `core`
- `server`
- `deps`
- `ci`

---

## 📝 Exemplos válidos

feat(auth): add refresh token endpoint
fix(environment): correct database url variable
style(core): apply eslint and prettier fixes
refactor(auth): reorganize jwt provider
docs(readme): document setup instructions
build(deps): bump fastify to v5
test(tickets): add unit tests for message model
ci: enable github action for lint and tests

---

## ❌ Exemplos inválidos (e o motivo)

feat add login # falta parênteses e formato
fix: corrected bug. # subject com ponto final
docs: readme # mensagem vaga
update stuff # type inválido
Teste # completamente fora do padrão

---

## 📦 Exemplo COMPLETO de commit correto

### Commit:

feat(onboarding): add document verification workflow

### Body:

Implements the verification process for tenant documents.
Statuses added:

pending_review
approved
rejected

Background worker added for OCR validation.

### Footer:

Closes #231

### Resultado final:

feat(onboarding): add document verification workflow

Implements the verification process for tenant documents.
Statuses added:

pending_review
approved
rejected

Background worker added for OCR validation.

Closes #231

---

## ⚠️ Exemplo com BREAKING CHANGE

eat(core): migrate tenant_id from int to uuid

BREAKING CHANGE: tenant_id is now UUID. Database migration required.

---

## 📌 Checklist antes de commitar

- [ ] Mensagem no formato `<type>(<scope>): <subject>`
- [ ] Subject claro, curto e sem ponto final
- [ ] Se necessário, adicionar body explicativo
- [ ] Se quebrar compatibilidade → usar `BREAKING CHANGE`
- [ ] Husky executou ESLint/Prettier automaticamente
- [ ] Nenhum erro de lint nos arquivos staged

---

## 🛠 Ferramentas de validação já configuradas no projeto

- **Husky** → hooks de pre-commit e commit-msg
- **lint-staged** → executa ESLint/Prettier nos arquivos staged
- **commitlint** → valida Conventional Commits

Se a mensagem estiver inválida → o commit será BLOQUEADO.

---

## 📚 Documentação oficial

- Conventional Commits → https://www.conventionalcommits.org/
- Commitlint → https://commitlint.js.org/
- cz-cli (commitizen) → https://github.com/commitizen/cz-cli

---

# ✔️ Fim do documento
