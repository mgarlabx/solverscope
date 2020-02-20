![](http://www.solvertank.com/solvertank/solverscope_logo_s.png)

 

Solverscope CMS v0 - 19/02/2020
===============================

(esse é um documento em evolução)

Para contribuições, dúvidas e mais informações: mauricio\@solvertank.com

 

**AVISO: ESSA AINDA É UMA VERSÃO INSTÁVEL E COM ATUALIZAÇÕES CONSTANTES SEM
AVISO PRÉVIO**

 

Uma versão ativa de demonstração pode ser vista em
<https://mgar2.websiteseguro.com/solverscope/login/>

 

Apresentação
------------

 

O **Solverscope CMS** é um programa para que organizações educacionais possam
fazer a transformação digital de seus processos acadêmicos, fazendo a gestão de
seus produtos educacionais, incluindo:

 

-   repositório de objetos instrucionais

-   ferramenta de autoria para objetos HTML responsivos

-   etiquetagem (tags) em vários níveis

-   controle do fluxo de revisão e aprovação

-   modelos de articulação (matérias, disciplinas, cursos, capítulos, livros,
    etc.)

-   ferramentas para ensino adaptativo

 

O **Solverscope CMS** destina-se a gestores pedagógicos, autores e revisores de
conteúdos instrucionais. O seu objetivo é ser uma ferramenta para que outras
aplicação, tipicamente um LMS (Learning Management System), possam fazer a
entrega do processo educacional diretamente ao aluno.

No futuro, a Solvertank pretende desenvolver o **Solverscope LMS**, todavia o
**Solverscope CMS** continuará sendo agnóstico, podendo ser integrado a qualquer
LMS existente.

 

Licença de uso
--------------

 

O **Solverscope CMS** é uma inicitativa da [Solvertank Digital
Science](http://www.solvertank.com/) no formato de código-livre (open source).
Ou seja, qualquer pessoa poderá baixar e utilizar livremente os códigos
desenvolvidos, da forma que achar conveniente, sem qualquer ônus, de acordo com
os [critérios BY da Creative
Commons](https://creativecommons.org/licenses/by/4.0/).

![](https://licensebuttons.net/l/by/3.0/88x31.png)

Dessa forma, a Solvertank não assume responsabilidades por qualquer
instabilidade, perda de dados ou qualquer outro dano que eventualmente possa
ocorrer durante sua utilização. Também não há compromisso de suporte técnico ou
garantia de funcionalidade.

**Use ao seu próprio risco.**

A Solvertank reserva-se ainda o direito de descontinuar esse projeto e/ou tornar
fechado o código a qualquer momento, sem qualquer aviso prévio. Os códigos
eventualmente já baixados poderão continuar a serem usados, mas não há
compromisso de qualquer atualização, correção ou manutenção.

 

Estrutura geral da aplicação
----------------------------

 

Para seu propósito de código aberto (open source), foi escolhida a estrutura
mais simples e genérica possível:

-   Banco de dados: MySQL (versão 5.7 ou posterior)

-   Back-end: PhP (versão 7.3 ou posterior)

-   Front-end: JQuery e Bootstrap

 

Foram previstas, todavia, facilidades na conversão dos códigos para a utilização
de outros tipos de banco de dados (desde que sejam relacionais SQL) e de outras
linguagens de back-end. Consulte para mais informações.

Esta aplicação não contém códigos específicos para aplicações móveis (mobile),
todavia todo front-end é responsivo e se adapta a qualquer tipo de dispositivo
(smartphones, tablets, laptops e desktops).

A aplicação suporta a criação de vários domínios, o que permite rodar ambientes
isolados para cada domínio (multi-empresa).

A interface da aplicação está preparada para rodar em 3 idiomas: português,
inglês e espanhol. Cada domínio é vinculado a um idioma. O dicionário dos termos
está na tabela SYS_LANGSTR e para cada nova funcionalidade é preciso criar um
novo registro com a expressão nos 3 idiomas.

A modelagem de dados está disponível no arquivo
**../extra/solverscope_dataschema.pdf**.

 

Back-end e API
--------------

 

O back-end foi construído com a lógica REST e pode ser acessado usando
aplicativos como o [Postman](https://www.getpostman.com/). Os endpoints podem
ser acessados informando o respectivo nome no header da solicitação. Todavia,
será necessário obter um token (ver abaixo em "Autenticação"). Essa arquitetura
permite construir distintos front-ends, acessando o mesmo back-end. O back-end
roda na pasta **..main/app/** da aplicação.

Além desse back-end, na pasta **..main/api/** da aplicação existem uma série de
endpoints que permitem o acesso de outras aplicações (por exemplo, LMS) no
sentido de consumir o que tiver sido produzido dentro do **Solverscope CMS**.

Dessa forma, os endpoints de **..main/app/** são para consumo da própria
aplicação, enquanto que os endpoints de **..main/api/** são para consumo de
aplicações externas.

 

Instalação
----------

 

-   Criar um ambiente para PhP e MySQL (sugestão
    [XAMPP](https://www.apachefriends.org/pt_br/index.html)).

-   Criar um banco de dados no MySQL e importar o conteúdo dos arquivos da pasta
    **../extra/datadump**.

-   Criar uma pasta no ambiente PhP onde irá rodar a aplicação.

-   Copiar o conteúdo da pasta **../source** para a pasta raiz onde irá rodar a
    aplicação.

-   Alterar a permissão da pasta **../main/files** para permitir gravação.

-   Alterar o conteúdo do arquivo **../svc_settings.php** informando os dados
    solicitados:

    \- \$cryp_app_key: um valor numérico com 10 dígitos, usado na criptografia
    da aplicação

    \- \$cryp_api_key: um valor numérico com 10 dígitos, usado na criptografia
    da API para acesso externo (não usar o mesmo número da \$cryp_app_key)

    \- dados do banco MySQL: \$host, \$login, \$password e \$database

     

 

Autenticação
------------

 

O **Solverscope CMS** não possui uma estrutura de autenticação. Será necessário
criar uma forma de autenticação própria, dependendo do contexto em que irá rodar
a aplicação.

O processo de autenticação consiste basicamente em se obter um token, o que pode
ser feito pelo endpoint **login** da API do **Solverscope CMS** (pasta
**..main/api/**). Ao rodar esse endpoint, se for informada uma chave válida, a
aplicação irá devolver o token e, caso não exista o usuário, irá criá-lo no
banco de dados e devolver seu token.

As chaves ficam gravadas no campo DOMAIN_SECRET da tabela SYS_DOMAIN, ou seja, é
uma chave por domínio.

Um exemplo de como gerar esse token pode ser visto no arquivo
**../extra/login.php** (ao usar esse arquivo é importante alterar a variável
\$base_url para a pasta raiz onde irá rodar a aplicação).

 

Autorização
-----------

 

O **Solverscope CMS** controla o acesso de suas várias funcionalidades por seus
usuários a partir de rotinas de autorização, tanto no front-end quanto no
back-end. Esse controle é feito através de **perfis** (tabela SYS_PROFIL), sendo
que cada **usuário** (tabela SYS_PERSON) deve estar associado a um perfil,
através da tabela SYS_PERPRO. Só é permitido um perfil por usuário por domínio.

A parte do front-end sob controle de autorização são os itens que são exibidos
na barra lateral da aplicação (sidebar). A tabela SYS_PROFM0 registra os itens
da barra lateral e a tabela SYS_PROFM1 faz a associação deles com os perfis da
tabela SYS_PROFIL. Para cada perfil criado é necessário informar quais itens da
barra lateral ele terá acesso.

A parte do back-end sob controle de autorização são os endpoints (procedures)
que são acessadas na pasta **..main/app/** da aplicação. A tabela SYS_PROFP0
registra os endpoints (procedures) e a tabela SYS_PROFP1 faz a associação deles
com os perfis da tabela SYS_PROFIL. Para cada perfil criado é necessário
informar quais endpoints (procedures) da aplicação ele terá acesso. Na tabela
SYS_PROFP0 devem ser registrados os nomes dos endpoints (procedures), mas também
é possível usar a notação %% da sintaxe LIKE. Por exemplo, se for o registro
**rep%** permite acessar qualquer procedure que comece por **rep**. O registro
**%%** permite acessar qualquer procedure, usar com cautela.

 

Estilo para desenvolvimento
---------------------------

 

### Comentários

 

É muito importante fazer comentários no código, porém sem exageros. Eles devem
ser feitos apenas quando necessários. Não devem ser feitos, por exemplo, quando
o nome da função for autoexplicativa ou quando uma rápida leitura do código
permita identificar.

Deve-se evitar também o uso de linhas completas, tal como
\*\*\*\*\*\*\*\*\*\*\*\* ou ------------- ao menos quando for realmente
importante.

 

### Redação do código

 

-   Todo código deve ser escrito em inglês (variáveis, funções, tabelas, campos,
    comentários, etc.)

-   Sempre acrescentar um **espaço** depois de símbolos como (, { ou [

-   Sempre acrescentar um **espaço** antes de símbolos como ), } ou ]

-   Não usar **tabs**, exceto para identação

 

### Banco de dados (MySQL)

 

-   Tabelas devem sempre ter nomes com 10 caracteres

-   Os 4 primeiros caracteres são a "família" seguida de underscore (exemplo
    REP_)

-   Os 6 últimos caracteres são o nome da tabela propriamente dita

-   Todos os campos de uma tabela devem começar pelos 6 últimos caracteres do
    nome da tabela, seguido de underscore

-   Todos nomes (tabelas e campos) devem ser escritos em letra maiúscula

 

### Back-end (php)

 

-   Os nomes das procedures devem ser escritos em letra minúscula, mas os nomes
    das variáveis e a sintaxe SQL devem ser escritos em letra maiúscula

-   Os nomes das procedures devem sempre começar por 3 letras, iguais ao nome da
    "família" do banco de dados, seguido de underscore (exemplo rep_)

-   Procedures que gravam no banco de dados (INSERT, DELETE, UPDATE), porém,
    devem acrescentar a letra w (write) (exemplo repw_)

-   Após esse prefixo, o nome das procedure deve receber as 6 letras do nome da
    tabela do banco de dados que estivere relacionada, seguidas de underscore.
    Se estiver relacionada com mais de uma tabela, deve-se escolher a mais
    importante para a procedure (exemplo rep_folder_).

-   Por fim, os nomes das procedures devem terminar por um sufixo, a saber:

    -   **list**: devolve várias linhas

    -   **get**: devolve apenas uma linha

    -   **insert**: insere no banco de dados

    -   **delete**: exclui no banco de dados

    -   **update**: atualiza no banco de dados

    ou outro nome personalizado conforme o caso

 

### Front-end (javascript)

 

-   Deve ser escrito todo em letras minúsculas

-   O nome dos objetos DOM devem ser separados por hífens (exemplo:
    svc-domain-name)

-   O nome das funções e variáveis devem dever ser separados por underscore
    (exemplo: rep_folder_list)

 

 

WORK_IN_PROGRESS
----------------

 

\- Há várias necessidades de desenvolvimento, assinaladas no código com a
expressão "WORK_IN_PROGRESS". Uma busca pode facilmente localizar todas elas.

 

 

\* \* \*
--------

 

Esse projeto é uma contribuição para a comunidade acadêmica brasileira e
internacional, concebido a partir da experiência acumulada em quase 40 anos de
atividade em educação e tecnologia.

 

**Solvertank Digital Science**

![](http://www.solvertank.com/solvertank/cube.png)

 
