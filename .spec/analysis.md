# Análise atual do projeto

## Estado

A landing está alinhada ao conteúdo institucional atual. A estrutura interna,
os IDs das seções, a header, o footer e as nomenclaturas dos componentes seguem
a mesma sequência editorial apresentada ao visitante.

## Estrutura ativa

1. hero;
2. áreas de atuação;
3. compromisso do escritório;
4. funcionamento do atendimento;
5. profissional responsável;
6. perguntas frequentes;
7. contato.

Recursos da versão anterior — calculadora, regras de prazo, glossário, contexto
compartilhado, calendário e dados jurídicos não exibidos — foram removidos junto
com suas dependências.

## Validações executadas

- ESLint sem erros ou avisos;
- TypeScript estrito sem erros;
- três testes unitários de contato aprovados;
- build de produção aprovado em sete rotas estáticas;
- auditoria npm sem vulnerabilidades conhecidas;
- navegador sem erros ou avisos no console;
- todas as âncoras da header e do footer apontam para IDs existentes;
- menu móvel, Escape, retorno de foco, Select e validação do formulário testados;
- larguras de 320, 390, 520, 768, 959, 1219 e 1440 px verificadas sem conteúdo
  cortado ou rolagem horizontal utilizável.

## Decisões conscientes

- O formulário compõe a mensagem apenas no dispositivo e abre o WhatsApp; não
  há API intermediária nem persistência de dados.
- Componentes cliente ficam restritos às interações que dependem do navegador.
- A navegação por fragmentos usa deslocamento global para não posicionar títulos
  atrás da header sticky.
- O CTA fixo permanece abaixo de 1220 px e o conteúdo recebe espaço inferior
  equivalente para evitar sobreposição permanente.

## Pendências de negócio antes da publicação

1. confirmar URL, telefone, e-mail, OAB e localização reais;
2. validar a redação jurídica com a pessoa profissionalmente responsável;
3. definir a política de privacidade do atendimento posterior no WhatsApp;
4. testar o canal real após configurar as variáveis na Vercel;
5. decidir se analytics será necessário — ele não foi incluído por privacidade.
