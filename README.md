# Documentação Técnica: Cadastro de Usuários - Art-Gallery

## 1. Sobre o Projeto: Art-Gallery

O **Art-Gallery** é um sistema focado na gestão de obras de arte, onde o módulo de **Cadastro de Usuários** serve como porta de entrada para diferentes perfis (Visitante, Artista e Admin). O objetivo é garantir que cada usuário tenha uma identidade única e segura dentro da plataforma.

---
### Tecnologias Utilizadas

[![My Skills](https://skillicons.dev/icons?i=express,nodejs,md,mysql,npm,javascript)](https://skillicons.dev)

## 2. Regras de Negócio (RN)

A implementação do cadastro segue rigorosamente as regras abaixo, garantindo a integridade dos dados antes de qualquer persistência:

 ID | Regra de Negócio | Descrição Técnica 
----|:-----------------:|:---------------:
 RN01 | Unicidade de Credenciais | O sistema impede o cadastro se o username ou email já existirem no banco de dados 
 RN02 | Integridade de Senha | A senha deve ter no mínimo 8 caracteres e não pode ser composta apenas por espaços
 RN03 | Validação de Perfil | O usuário deve pertencer a um dos perfis permitidos: visitante, artista ou admin.
 RN04 | Formato de E-mail | O e-mail deve seguir um padrão válido (ex: usuario@dominio.com).

 ## 3. Aplicação do TDD no Projeto

Neste projeto, utilizamos o **TDD (Test-Driven Development)** para guiar o desenvolvimento do **user.service.js.**
- **Red:** Primeiro, escrevemos os testes no arquivo **user.service.test.js** esperando que eles falhassem, pois a lógica ainda não existia.
- **Green:** Implementamos o código mínimo necessário no **userService.register** para fazer os testes passarem.
- **Refactor:** Melhoramos a estrutura das validações e o uso do mock do Sequelize.

## 4. Explicação dos 3 Testes Unitários

Se quiserem acessar o código completo dos testes [Clique Aqui](https://github.com/felipekockmendonca/art-gallery-tdd/blob/main/src/modules/user/__tests__/user.service.test.js).

### Teste 1: Validação de Senhas Diferentes

~~~javascript
it('Red - Deve retornar erro se as senhas não coincidirem', async () => {
        const data = {
            username: 'felipe',
            email: 'felipe@test.com',
            password: '12345678',
            confirmPassword: '87654321', // ← diferentes
            fullName: 'Felipe Teste'
        };
        // Esperamos que lance um erro específico
        await expect(userService.register(data, mockUserModel))
            .rejects
            .toThrow('As senhas não coincidem.');
    });
~~~

- **O que faz:** Verifica se o campo `password` é idêntico ao `confirmPassword`.
- **O que valida:** Garante que o usuário não cometa erros de digitação ao definir sua senha, lançando o erro: *"As senhas não coincidem"*

### Teste 2: Validação de E-mail Duplicado (RN01)
```javascript
it('Red - Deve retornar erro se o username ou e-mail já estiverem cadastrados', async () => {
        const data = {
            username: 'felipe',
            email: 'felipe@test.com',
            password: '12345678',
            confirmPassword: '12345678'
        };
        mockUserModel.findOne.mockResolvedValueOnce({ id: 1 });
        await expect(userService.register(data, mockUserModel))
            .rejects
            .toThrow('Este e-mail ou usuário já está cadastrado.');
    });
```

- **O que faz:** Simula uma busca no banco de dados `(mockUserModel.findOne)` que retorna um usuário já existente.
- **O que valida:** Bloqueia a criação de contas duplicadas, disparando a exceção: *"Este e-mail ou usuário já está cadastrado."*

- ### Teste 3: Sucesso no Cadastro (Caminho Feliz)
```javascript
it('Green - Deve criar o usuário com sucesso quando os dados são válidos e não existem no banco', async () => {
        const data = {
            username: 'rogerio',
            email: 'rogerio@test.com',
            password: '12345678',
            confirmPassword: '12345678'
        };
        mockUserModel.findOne.mockResolvedValueOnce(null);
        await expect(userService.register(data, mockUserModel))
            .resolves
            .toEqual({ message: 'Usuário criado com sucesso (ainda sem salvar no banco)' });
    });
```

- **O que faz:** Fornece dados válidos e configura o mock para não encontrar nenhum usuário existente `(mockResolvedValueOnce(null))`.
- **O que valida:** Confirma que, quando todas as regras são atendidas, o sistema retorna a mensagem: *"Usuário criado com sucesso".*
