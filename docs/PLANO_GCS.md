# PLANO DE GERENCIAMENTO DE CONFIGURAÇÃO (PGC)
**Enfoque DevOps — Integração e Entrega Contínuas (CI/CD)**  
**Versão:** 1.0

| Campo | Descrição |
| :--- | :--- |
| **Projeto** | Art Gallery TDD (`art-gallery-tdd`) |
| **Gerente de Projeto / Product Owner** | Felipe Kock Mendonça (`@felipekockmendonca`) |
| **Gerente / Responsável de GCS-DevOps** | Felipe Kock Mendonça (`@felipekockmendonca`) |
| **Fábrica de Software / Squad** | 1 Desenvolvedor Líder (`@felipekockmendonca`) + 1 Desenvolvedor / Par de Revisão (`@Gguip05`) |
| **Repositório Principal** | https://github.com/felipekockmendonca/art-gallery-tdd (GitHub) |
| **Regime de Trabalho** | Remoto, colaborativo e assíncrono |

---

## Histórico de Revisões

| Data | Versão | Descrição | Autor |
| :--- | :---: | :--- | :--- |
| 13/11/2026 | 1.0 | Elaboração inicial do Plano de Gerenciamento de Configuração (PGC) com enfoque em práticas DevOps (CI/CD) e TDD, adaptado para o projeto Art Gallery TDD. | `@felipekockmendonca` |

---

## 1. Introdução
Este Plano de Gerenciamento de Configuração (PGC) descreve as atividades de Gestão de Configuração de Software (GCS) executadas ao longo do ciclo de vida do projeto **Art Gallery TDD**, com ênfase em práticas DevOps — Integração Contínua (CI), Entrega/Implantação Contínua (CD), Desenvolvimento Orientado a Testes (TDD) e automação via GitHub.

### 1.1 Finalidade
Estabelecer um padrão simples, rastreável e sustentável para os integrantes da equipe, garantindo versionamento, controle de mudanças e validação automatizada de build e testes antes de qualquer integração na branch principal (`main`).

### 1.2 Escopo
Este PGC aplica-se a todos os itens de configuração versionados no repositório `art-gallery-tdd`, abrangendo:
* Código-fonte da aplicação;
* Suíte de testes automatizados (TDD);
* Definições de pipelines como código (`.github/workflows`);
* Configurações de ambientes (`staging` e `production`) e documentação técnica (`/docs`).

### 1.3 Definições, Acrônimos e Abreviações

| Termo | Significado |
| :--- | :--- |
| **GCS** | Gestão de Configuração de Software |
| **CI** | Integração Contínua (*Continuous Integration*) |
| **CD** | Entrega/Implantação Contínua (*Continuous Delivery / Deployment*) |
| **TDD** | Desenvolvimento Orientado a Testes (*Test-Driven Development*) |
| **CCM** | Comitê de Controle de Mudanças (exercido pelo Desenvolvedor Líder + Par de Revisão) |
| **Baseline** | Conjunto de itens de configuração que atingiram um estado comprovado de estabilidade |
| **Pipeline** | Sequência automatizada de etapas de build, teste, análise e implantação |
| **GitHub Flow** | Estratégia de branching simplificada, com branch `main` sempre implantável e branches de feature de vida curta |
| **SemVer** | Versionamento Semântico (`MAJOR.MINOR.PATCH`) |
| **DORA Metrics** | Métricas de desempenho DevOps (*Deployment Frequency* e *Change Failure Rate*) |

### 1.4 Referências
* Modelo de Plano de Gerenciamento de Configuração — Enfoque DevOps (ONGConecta, v1.0).
* Documentação oficial do GitHub (Branch Protection Rules, Environments e GitHub Actions).
* Especificação de Conventional Commits (`https://www.conventionalcommits.org/`).

### 1.5 Visão Geral
A GCS no projeto **Art Gallery TDD** atua de forma contínua e automatizada dentro do fluxo de entrega: cada Pull Request revisado pelo par, validado pela suíte de testes no CI e promovido entre os ambientes gera evidências formais de rastreabilidade (logs de execução do GitHub Actions, histórico de revisões e tags de versão).

---

## 2. Cultura DevOps e Papéis na Gerência de Configuração
Dado o porte reduzido da equipe (2 integrantes), os papéis tradicionais de GCS e DevOps são consolidados:

| Papel | Quem exerce no projeto | Responsabilidades |
| :--- | :--- | :--- |
| **Gerente de Projeto / Product Owner** | `@felipekockmendonca` | Prioriza o backlog, define o escopo das entregas e acompanha o cronograma do projeto. |
| **Gerente de GCS / Release Engineer** | `@felipekockmendonca` | Mantém os pipelines de CI/CD, configura as regras de proteção da `main` e atua como **revisor obrigatório para promoção ao ambiente `production`**. |
| **Desenvolvedor / Par de Revisão** | `@Gguip05` | Possui acesso de escrita (`Write`) no repositório; implementa funcionalidades seguindo TDD, abre Pull Requests e realiza **revisão cruzada obrigatória** dos PRs. |
| **QA / Automação de Testes** | Ambos (`@felipekockmendonca` e `@Gguip05`) | Mantêm a suíte de testes automatizados (ciclo Red-Green-Refactor) executada automaticamente no pipeline de CI. |
| **Segurança (DevSecOps)** | `@felipekockmendonca` | Revisa alertas de dependências e garante que nenhuma credencial sensível seja exposta no repositório público. |
| **Comitê de Controle de Mudanças (CCM)** | `@felipekockmendonca` + `@Gguip05` | Atua em mudanças estruturais ou exceções críticas; mudanças rotineiras seguem o fluxo automatizado de Pull Request. |

### 2.1 Comunicação Assíncrona
* Descrições de Pull Request devem conter contexto claro, resumo das alterações e evidências dos testes executados.
* Revisões de código e aprovações de deploy são registradas diretamente nas threads dos Pull Requests e nos logs de Environments do GitHub.

---

## 3. Ferramentas, Ambientes e Infraestrutura

### 3.1 Ferramentas do Pipeline

| Categoria | Ferramenta Adotada | Finalidade |
| :--- | :--- | :--- |
| **Controle de Versão** | Git + GitHub | Versionamento de código-fonte, pipelines como código e documentação. |
| **Orquestração de CI/CD** | GitHub Actions | Automação de build, execução da suíte de testes TDD e fluxos de deploy. |
| **Gestão de Ambientes e Segredos** | GitHub Environments & Secrets | Controle de promoção entre `staging` e `production` com gate de aprovação manual. |
| **Gestão de Dependências** | Dependabot (GitHub) | Monitoramento de vulnerabilidades em bibliotecas de terceiros. |
| **Rastreamento de Tarefas** | GitHub Issues + Pull Requests | Vinculação direta de commits e PRs às tarefas do projeto. |

### 3.2 Ambientes e Infraestrutura
O repositório utiliza dois ambientes configurados formalmente no **GitHub Environments**:

| Ambiente | Finalidade | Gatilho de Promoção |
| :--- | :--- | :--- |
| **`staging`** (Homologação) | Validação integrada das funcionalidades após merge na branch principal. | Deploy automático disparado após merge do PR aprovado na branch `main`. |
| **`production`** (Produção) | Ambiente final de entrega estável da aplicação. | Exige **aprovação manual obrigatória (*Required Reviewer*)** de `@felipekockmendonca` após conclusão em `staging`. |

### 3.3 Estratégia de Branching e Versionamento
Adota-se o **GitHub Flow**:
* **`main`:** Branch principal sempre implantável e **protegida**; `push` direto recusado para todos os usuários. Alterações entram somente via Pull Request com CI verde e mínimo de 1 aprovação.
* **`feature/<descricao-curta>`:** Branch de vida curta criada para cada nova funcionalidade ou ciclo TDD.
* **`fix/<descricao-curta>` / `hotfix/<descricao-curta>`:** Branch destinada à correção de defeitos.
* **Versionamento:** Adoção de **Versionamento Semântico (`vMAJOR.MINOR.PATCH`)** e **Conventional Commits** (`feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`).

---

## 4. Identificação da Configuração

### 4.1 Itens de Configuração (ICs)
São considerados itens de configuração formais versionados no repositório:
* Código-fonte da aplicação (`src/`);
* Suíte de testes automatizados (`tests/`);
* Definições de pipeline como código (`.github/workflows/ci-cd.yml`);
* Plano de Gerenciamento de Configuração (`docs/PLANO_GCS.md`) e documentação (`README.md`);
* Arquivos de controle de ambiente e dependências (`.gitignore`, manifestos e lockfiles).

### 4.2 Convenção de Nomenclatura

| Item | Convenção | Exemplo |
| :--- | :--- | :--- |
| **Branch de Feature** | `feature/<descricao-curta>` | `feature/cadastro-obras-arte` |
| **Branch de Correção** | `fix/<descricao-curta>` | `fix/validacao-preco-obra` |
| **Commit** | `<tipo>(<escopo>): <descrição>` | `test(gallery): adiciona teste unitario de listagem` |
| **Tag de Release** | `vX.Y.Z` | `v1.0.0` |

### 4.3 Estrutura do Repositório
* `/.github/workflows/ci-cd.yml` — Pipeline automatizado de CI e CD (`staging` e `production`);
* `/docs/PLANO_GCS.md` — Plano de Gerenciamento de Configuração;
* `/docs/evidencia-push-main.png` — Evidência de governança e bloqueio de push direto na `main`;
* `/src` — Código-fonte da aplicação;
* `/tests` — Suíte de testes automatizados (TDD);
* `/.gitignore` — Exclusão de arquivos temporários e sensíveis;
* `/README.md` — Documentação principal e evidências do projeto.

---

## 5. Integração Contínua (CI)

### 5.1 Etapas do Pipeline de CI
Todo Pull Request aberto ou atualizado contra a branch `main` dispara automaticamente o job de CI contendo:
1. Checkout do código-fonte;
2. Validação da integridade dos itens de configuração (`docs/PLANO_GCS.md`);
3. Instalação de dependências e execução da suíte de testes automatizados (TDD);
4. Verificação de build e análise estática.

### 5.2 Política de Pull Request e Revisão de Código
* Push direto na `main` é tecnicamente bloqueado via regra de proteção de branch.
* Todo Pull Request exige **no mínimo 1 aprovação** do par de revisão (`@Gguip05` ou `@felipekockmendonca`) antes do merge.

### 5.3 Critérios de Qualidade (Quality Gate)
O merge na `main` somente é liberado quando:
1. Todos os checks do pipeline de CI concluem com sucesso (status verde);
2. Existe aprovação formal registrada por um revisor com acesso de escrita.

---

## 6. Entrega e Implantação Contínua (CD)

### 6.1 Etapas do Pipeline de CD
1. **Implantação em `staging`:** Executada automaticamente após a integração (merge) do código na branch `main`.
2. **Gate de Aprovação de Release:** O workflow pausa antes da etapa de produção aguardando aprovação manual de `@felipekockmendonca`.
3. **Implantação em `production`:** Executada somente após a aprovação no GitHub Environment `production`.

### 6.2 Rollback e Recuperação
Em caso de falha identificada após promoção para `production`, executa-se o *revert* do Pull Request na `main` (passando novamente pelo fluxo protegido) ou o redeploy da tag de baseline anterior.

---

## 7. Infraestrutura como Código (IaC)
Toda a definição de automação de build, testes, gates de aprovação e promoção entre ambientes é mantida de forma declarativa como código dentro do diretório `.github/workflows/`, garantindo versionamento e auditabilidade das regras de entrega.

---

## 8. Controle de Configuração e Mudança

### 8.1 Processo de Solicitação de Mudança
1. Criação de branch dedicada (`feature/*` ou `fix/*`) a partir da `main`;
2. Desenvolvimento orientado a testes (TDD) com commits seguindo Conventional Commits;
3. Abertura de Pull Request descrevendo a mudança;
4. Revisão cruzada pelo par (`@Gguip05`) e validação automática pelo CI;
5. Merge na `main` e promoção controlada pelos ambientes.

### 8.2 Comitê de Controle de Mudança (CCM)
Formado por `@felipekockmendonca` e `@Gguip05`, responsável por aprovar alterações nas regras de proteção do repositório, estrutura de ambientes ou mudanças arquiteturais críticas.

---

## 9. Baselines e Releases

### 9.1 Geração de Baseline
Cada entrega consolidada e aprovada em `production` estabelece uma baseline formal identificada por tag SemVer (`vX.Y.Z`) associada ao commit estável na `main`.

### 9.2 Notas de Versão (Release Notes)
As notas de versão são geradas a partir do histórico de Pull Requests integrados e commits semânticos desde a última baseline.

---

## 10. Estimativa do Status de Configuração

### 10.1 Monitoramento e Auditoria
O histórico de execuções do GitHub Actions, os registros de aprovação nos Environments (`staging` e `production`) e o log de Pull Requests constituem a trilha oficial de auditoria de GCS do repositório.

### 10.2 Métricas Acompanhadas
* **Deployment Frequency:** Frequência de entregas integradas na `main` e promovidas aos ambientes.
* **Change Failure Rate:** Percentual de alterações que exigem correção imediata (*hotfix* ou *revert*) após integração.

---

## 11. Marcos
* **Marco 1:** Configuração do repositório público, adição do par de revisão (`@Gguip05`) e publicação do `docs/PLANO_GCS.md`.
* **Marco 2:** Configuração dos environments `staging` e `production` (com revisor obrigatório) e ativação do pipeline `.github/workflows/ci-cd.yml`.
* **Marco 3:** Ativação da proteção da branch `main` com bloqueio de push direto e registro da evidência de recusa.
* **Marco 4:** Execução completa do fluxo de Pull Request revisado pelo par e promovido até `production`.

---

## 12. Treinamento e Recursos
* A documentação no `README.md` e neste `docs/PLANO_GCS.md` serve como guia de referência rápida para padronização de commits, branches e revisão de Pull Requests entre os membros da equipe.

---

## 13. Controle de Dependências de Terceiros
* Bibliotecas e pacotes externos são controlados por meio dos arquivos de manifesto e lockfile versionados no repositório.
* Nenhuma credencial, token ou chave privada é armazenada no código-fonte; segredos são gerenciados exclusivamente via **GitHub Secrets**.

---

## 14. Quadro-Resumo do Pipeline CI/CD

| Etapa | Descrição | Gatilho |
| :--- | :--- | :--- |
| **CI (Validação e TDD)** | Checkout, validação do Plano de GCS, build e testes automatizados. | Abertura ou atualização de PR para `main` |
| **Merge na `main`** | Integração na branch principal protegida (push direto bloqueado). | Mínimo 1 aprovação de revisão + CI verde |
| **CD — `staging`** | Implantação automática no ambiente de homologação. | Merge na branch `main` |
| **Gate de Produção** | Revisão e aprovação manual obrigatória de `@felipekockmendonca`. | Conclusão do deploy em `staging` |
| **CD — `production`** | Promoção oficial para o ambiente de produção e baseline. | Aprovação manual no Environment `production` |