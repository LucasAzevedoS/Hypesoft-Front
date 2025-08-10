# Hypesoft-Front

## 📜 Sobre o Projeto

Este é o repositório do front-end da Hypesoft, uma aplicação web moderna construída com Next.js e TypeScript. A aplicação parece ser um painel de administração (dashboard) para gerenciamento de produtos, visualização de métricas e outras operações de negócio. A interface é reativa e projetada para ser intuitiva e eficiente.

## ✨ Tecnologias Utilizadas

O projeto utiliza um conjunto de tecnologias modernas para garantir uma base de código robusta, escalável e de fácil manutenção:

- **Framework Principal:** [Next.js](https://nextjs.org/) (com Turbopack)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [Radix UI](https://www.radix-ui.com/) e componentes customizados (`shadcn/ui` style)
- **Gerenciamento de Estado:** [Zustand](https://github.com/pmndrs/zustand)
- **Requisições HTTP:** [Axios](https://axios-http.com/)
- **Linting:** [ESLint](https://eslint.org/)

## 🏗️ Estrutura do Código e Metodologia

A arquitetura do projeto é organizada de forma modular e segue as melhores práticas do ecossistema React/Next.js, promovendo a separação de responsabilidades.

-   `src/app/`: Contém as rotas e páginas da aplicação, seguindo o padrão do App Router do Next.js. Cada pasta corresponde a uma rota pública.
-   `src/Components/`: Abriga os componentes React reutilizáveis. Eles são organizados por funcionalidade (ex: `forms`, `products`, `dashboard`) para facilitar a localização e manutenção.
-   `src/services/`: Camada responsável pela comunicação com a API externa. Isola a lógica de requisições HTTP (usando Axios) do resto da aplicação.
-   `src/stores/`: Onde ficam os stores do Zustand. Centraliza o estado global da aplicação, como informações de produtos e categorias, tornando-o acessível de forma reativa por toda a UI.
-   `src/hooks/`: Contém hooks customizados que encapsulam lógicas de negócio ou de UI, como o `useProducts` para buscar e manipular dados de produtos.
-   `src/types/`: Define as interfaces e tipos TypeScript utilizados no projeto, garantindo a segurança de tipos e auxiliando na documentação do código.
-   `src/lib/`: Funções utilitárias genéricas, como o `cn` para mesclar classes do Tailwind CSS.

A metodologia se baseia em uma **arquitetura orientada a componentes**, onde a UI é dividida em pequenas partes independentes e reutilizáveis. O estado é gerenciado de forma centralizada e a lógica de acesso a dados é abstraída em serviços, o que torna o código mais limpo, testável e escalável.

## ⭐ Diferenciais Implementados

A estrutura atual do projeto já implementa diversas práticas que o diferenciam e garantem uma base sólida para o futuro:

-   **Arquitetura Modular e Escalável:** A separação clara entre **rotas** (`app`), **componentes** (`Components`), **serviços de dados** (`services`) e **gerenciamento de estado** (`stores`) cria um sistema desacoplado. Isso significa que cada parte pode ser desenvolvida, testada e mantida de forma independente, facilitando a escalabilidade.

-   **Gerenciamento de Estado Centralizado e Reativo:** Com o **Zustand**, o estado da aplicação (como a lista de produtos ou o status do usuário) é global e reativo, mas sem o *boilerplate* de outras soluções. Os componentes se inscrevem apenas nas informações que precisam, otimizando a performance e evitando re-renderizações desnecessárias.

-   **Segurança de Tipos de Ponta a Ponta:** O uso de **TypeScript** em todo o projeto, desde os componentes até as chamadas de API, elimina uma classe inteira de bugs em tempo de execução. As interfaces em `src/types` servem como um "contrato", garantindo que os dados que fluem pela aplicação tenham o formato esperado.

-   **Componentes de UI Reutilizáveis e Consistentes:** A adoção de uma biblioteca de componentes base (Radix UI) e a criação de componentes de UI customizados em `src/Components/ui` permitem construir interfaces de forma rápida e consistente, garantindo uma experiência de usuário coesa em toda a aplicação.

-   **Camada de Serviço Abstraída:** Isolar as chamadas `axios` na pasta `src/services` é uma decisão arquitetural estratégica. Os componentes não sabem *como* os dados são buscados; eles apenas solicitam os dados. Se a API mudar ou se for necessário adicionar caching, as alterações ficam concentradas em um único lugar.

## 🚀 Como Começar

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento.

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd Hypesoft-front
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.
