# RELATÓRIO TÉCNICO - Nova Funcionalidade com Testes Unitários e de Integração

## 1. Descrição da Nova Funcionalidade

A nova funcionalidade implementada no projeto `art-gallery-tdd` é o **Gerenciamento de Obras de Arte (Artwork Management)**. Esta funcionalidade permite a manipulação completa de obras de arte, incluindo as seguintes operações:

*   **Criação de Obra de Arte:** Permite registrar novas obras com informações como título, descrição, ID do usuário (artista), ID da categoria, URL do arquivo, tipo e tamanho do arquivo. Inclui validações essenciais para garantir a integridade dos dados.
*   **Listagem de Obras de Arte:** Permite recuperar uma lista de todas as obras de arte cadastradas.
*   **Busca de Obra de Arte por ID:** Permite recuperar os detalhes de uma obra de arte específica utilizando seu identificador único.
*   **Atualização de Obra de Arte:** Permite modificar as informações de uma obra de arte existente.
*   **Exclusão de Obra de Arte:** Permite remover uma obra de arte do sistema.

Esta funcionalidade é crucial para a plataforma, pois estabelece a base para o catálogo de arte, permitindo que artistas adicionem e gerenciem suas criações, e que os usuários as visualizem.

## 2. Aplicação do TDD (Test-Driven Development)

O desenvolvimento da funcionalidade de Gerenciamento de Obras de Arte seguiu o ciclo **Red-Green-Refactor** do TDD. Este processo garantiu que o código fosse robusto, testável e atendesse aos requisitos desde o início.

### Ciclo Red-Green-Refactor:

1.  **Red (Escrever um teste que falha):** Inicialmente, foram escritos testes unitários para o `artwork.service.js` antes mesmo de qualquer lógica de serviço ser implementada. Por exemplo, o teste para `createArtwork` que verifica se uma obra é criada com sucesso foi escrito primeiro. Como o serviço ainda não existia, ou não tinha a lógica correta, este teste falhou, indicando a necessidade de implementação.

    ```javascript
    // Exemplo de teste Red para createArtwork (inicialmente falhando)
    it("Deve criar uma obra de arte com sucesso", async () => {
        const data = { /* ... dados válidos ... */ };
        mockArtworkModel.create.mockResolvedValue({ id: "obra-1", ...data });

        const result = await artworkService.createArtwork(data, mockArtworkModel);
        expect(result.titulo).toBe("Mona Lisa");
        expect(mockArtworkModel.create).toHaveBeenCalled();
    });
    ```

2.  **Green (Escrever o código mínimo para o teste passar):** Em seguida, a lógica mínima necessária foi adicionada ao `artwork.service.js` para que o teste recém-escrito passasse. Isso incluiu a implementação da função `createArtwork` que chama o método `create` do modelo.

    ```javascript
    // Exemplo de código Green para createArtwork
    export const createArtwork = async (data, ArtworkModel) => {
        // ... validações ...
        return await ArtworkModel.create(data);
    };
    ```

3.  **Refactor (Refatorar o código):** Após o teste passar, o código foi refatorado para melhorar sua estrutura, legibilidade e desempenho, sem alterar seu comportamento externo. Isso pode incluir a extração de validações para funções separadas, melhoria de nomes de variáveis, etc. Este ciclo foi repetido para cada aspecto da funcionalidade (listagem, busca, atualização, exclusão e suas respectivas validações).

Este processo iterativo garantiu que cada parte da funcionalidade fosse coberta por testes e que o código fosse desenvolvido de forma incremental e controlada.

## 3. Explicação de Testes

### Testes Unitários (Local: `src/modules/artwork/__tests__/artwork.service.test.js`)

Os testes unitários focam em verificar a lógica de negócios isoladamente, utilizando *mocks* para simular dependências externas (como o banco de dados).

1.  **Teste Unitário: `Deve criar uma obra de arte com sucesso`**
    *   **Verifica:** Se a função `createArtwork` do serviço consegue criar uma obra de arte quando dados válidos são fornecidos.
    *   **Mock Utilizado:** `mockArtworkModel.create` é mockado para simular o comportamento do método `create` do modelo Sequelize, retornando um objeto de obra de arte simulado. Isso evita a necessidade de uma conexão real com o banco de dados.
    *   **Asserção Aplicada:** `expect(result.titulo).toBe('Mona Lisa');` e `expect(mockArtworkModel.create).toHaveBeenCalled();`. Verifica se o título da obra retornada é o esperado e se o método `create` do mock foi chamado.

2.  **Teste Unitário: `Deve lançar erro se o título estiver vazio`**
    *   **Verifica:** Se a função `createArtwork` lança um erro quando o campo `titulo` está vazio ou contém apenas espaços em branco.
    *   **Mock Utilizado:** Não há necessidade de mockar o modelo, pois a validação ocorre antes da interação com o banco de dados.
    *   **Asserção Aplicada:** `await expect(artworkService.createArtwork(data, mockArtworkModel)).rejects.toThrow('O título é obrigatório.');`. Verifica se a promessa é rejeitada com a mensagem de erro esperada.

3.  **Teste Unitário: `Deve lançar erro ao buscar obra inexistente`**
    *   **Verifica:** Se a função `getArtworkById` lança um erro quando tenta buscar uma obra de arte que não existe no banco de dados.
    *   **Mock Utilizado:** `mockArtworkModel.findByPk` é mockado para retornar `null`, simulando que nenhuma obra foi encontrada.
    *   **Asserção Aplicada:** `await expect(artworkService.getArtworkById('999', mockArtworkModel)).rejects.toThrow('Obra não encontrada.');`. Verifica se a promessa é rejeitada com a mensagem de erro apropriada.

### Testes de Integração (Local: `src/modules/artwork/__tests__/artwork.integration.test.js`)

Os testes de integração verificam a interação entre diferentes componentes do sistema (rotas, controllers, services e modelos), simulando requisições HTTP reais.

1.  **Teste de Integração: `POST /artworks - Deve retornar 201 e criar obra`**
    *   **Verifica:** Se a rota `POST /artworks` funciona corretamente, criando uma nova obra de arte e retornando o status HTTP 201 (Created).
    *   **Componentes Envolvidos:** Rota (`artwork.routes.js`), Controller (`artwork.controller.js`), Service (`artwork.service.js`) e o Modelo (`artwork.Model.js`). O modelo é mockado para evitar a persistência real no banco de dados durante o teste.
    *   **Asserção Aplicada:** `expect(res.status).toBe(201);` e `expect(res.body.titulo).toBe('Mona Lisa');`. Verifica o status da resposta e o conteúdo do corpo da resposta.

2.  **Teste de Integração: `GET /artworks/:id - Deve retornar 404 se não existir`**
    *   **Verifica:** Se a rota `GET /artworks/:id` retorna o status HTTP 404 (Not Found) quando uma obra de arte com o ID especificado não é encontrada.
    *   **Componentes Envolvidos:** Rota, Controller, Service e Modelo. O método `findByPk` do modelo é mockado para retornar `null`.
    *   **Asserção Aplicada:** `expect(res.status).toBe(404);` e `expect(res.body.error).toBe('Obra não encontrada.');`. Verifica o status da resposta e a mensagem de erro no corpo da resposta.

## 4. Instruções para Rodar o Projeto e os Testes

Para configurar e executar o projeto e seus testes, siga os passos abaixo:

1.  **Clonar o Repositório:**
    ```bash
    git clone https://github.com/felipekockmendonca/art-gallery-tdd.git
    cd art-gallery-tdd
    ```

2.  **Instalar Dependências:**
    ```bash
    npm install
    ```

3.  **Rodar Todos os Testes (Unitários e de Integração):**
    ```bash
    npm test
    ```
    ou
    ```bash
    npm run test:run
    ```

4.  **Rodar Testes Unitários Específicos (ex: Artwork Service):**
    ```bash
    npm run test:run -- src/modules/artwork/__tests__/artwork.service.test.js
    ```

5.  **Rodar Testes de Integração Específicos (ex: Artwork):**
    ```bash
    npm run test:run -- src/modules/artwork/__tests__/artwork.integration.test.js
    ```
    *Nota: o `app.js` carrega o `dotenv/config` e possui um valor de fallback para `SESSION_SECRET`, então não é mais necessário definir a variável manualmente para rodar os testes.*

6.  **Iniciar o Servidor (para testar manualmente as rotas via browser/Postman):**
    ```bash
    npm start
    ```
    O servidor estará disponível em `http://localhost:3000` (ou a porta configurada).

---
