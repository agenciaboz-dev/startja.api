# Introdução

Esta é a documentação da API para a versão mais recente (v1)

A Start Já é uma empresa focada no desenvolvimento de Sistemas para o Agronegócio trazendo tecnologia, integração e crescimento para o empreendedor do campo. A Start Já busca trazer de forma facilitada e ágil a Emissão de notas fiscais integrada a uma administração eficiente baseada em números e redução da carga tributária.

A API da Start Já permite que você emita ou consulte documentos fiscais a partir do seu sistema. Através desta documentação será possivel fazer a integração com a API da Start Já.

## "on" Events:

Lista de todos os "on" events presentes nesta API

```
user:login
user:list

product:list
product:create

customer:list
customer:signup

company:create
company:list
```

_Abaixo, temos uma explicação mais detalhada de cada evento_

### Event Name: [user:login]

**Description:** [Este evento é acionado quando um usuário tenta fazer login. Ele faz a autenticação do usuário checkando o email, e senha fornecidos]

#### Parametros:

```
{Object} data:
`{string} email` // (required): The login of the user.
`{string} password` // (required): The password of the user.
```

#### Message:

Exemplo da mensagem esperada pelo evento:

```
{
    "email": "teste@teste.teste",
    "password": "teste"
}
```

#### Triggers

Lista de todos os emits no evento [user:login]

```
login:admin
login:customer
login:error
```

##### Trigger #1 - [login:admin]

Se o usuário fizer login com conta de Admin com sucesso:

```
{
    "id": 1,
    "name": "teste",
    "email": "teste@teste.teste",
    "password": "teste"
}
```

##### Trigger #2 - [login:customer]

Se o usuário fizer login com conta de Cliente com sucesso:

```
{
    "id": 1,
    "name": "John Teste",
    "email": "john@teste.com",
    "password": "123456789",
    "register_date": "1697811716038",
    "phone": "41999999999",
    "cpf": "00000000000",
    "city": "Curitiba",
    "state": "Parana",
    "certificateId": 1

}
```

##### Trigger #3 - [login:error]

```
{
    "error": "Usuário ou senha incorretos"
}
```

### Event Name: [user:list]

**Description:** [Este evento é acionado quando um cliente requisita uma lista de TODOS os USUARIOS. Ele retorna uma lista de todos os Admins e Clientes presentes no banco de dados para o cliente]

#### Parametros:

```
`{Socket} socket`: O socket do Socket.IO socket repreentando o client que acionou o evento.
```

#### Triggers

Lista de todos os emits no evento [user:list]

```
user:list
```

##### Trigger #1 - [user:list]

Formato da lista de usuarios:

```
{
    "admins": [
        {
            "id": 1,
            "name": "teste",
            "email": "teste@teste.teste",
            "password": "teste"
        }
    ],
    "customers": [
        {
            "id": 1,
            "name": "teste",
            "email": "teste@clienteteste.com",
            "password": "teste",
            "register_date": "1697725469382",
            "phone": "41988888888",
            "cpf": "12345678901",
            "city": "curitiba",
            "state": "pr",
            "certificateId": 1
        },
    ]
}
```

### Event Name: [product:create]

**Description:** [Este evento é acionado quando um usuário deseja criar um novo produto no banco de dados]

#### Parametros:

```
{Object} data:
`{Socket} socket`: O socket representando o client iniciando a criação do produto.

`{Product} data`: Um objeto contendo as informações do produto a serem adcionadas ao banco de dados.
```

#### Message:

Este evento espera as seguintes propriedades na mensagem:

```
{
    "name": "Produto Da Empresa", // (string): O nome do produto
    "ncm": "12345678" // (string): O código NCM de 8 números (Nomenclatura Comum do Mercosul) do produto.
}
```

#### Triggers

Lista de todos os emits no evento [product:create]

```
product:success
product:failure
product:error
```

##### Trigger #1 - [product:success]

Se a criação do produto for um sucesso:

```
{
    "id": 11,
    "name": "Produto de Teste",
    "ncm": "9999.99.99"
}
```

##### Trigger #2 - [product:NCMfailure]

Se o NCM inserido pelo cliente não for numerico, exceder, ou tiver menos do que 8 números:

```
"NCM Inválido"
```

##### Trigger #3 - [product:error]

Para demais erros:

```
{
    "name": "PrismaClientValidationError",
    "clientVersion": "X.X.X"
}
```

### Event Name: [product:list]

**Description:** [Este evento é acionado quando um cliente requisita uma lista de PRODUTOS. Ele retorna uma lista de todos os PRODUTOS no banco de dados para o cliente]

#### Parametros:

```
`{Socket} socket`: O socket do Socket.IO socket repreentando o client que acionou o evento.
```

#### Triggers

Lista de todos os emits no evento [product:list]

```
product:list
```

##### Trigger #1 - [product:list]

Retorna um array com a lista de todos os produtos no banco de dados

```
[
    {
        "id": 11,
        "name": "Produto de Teste",
        "ncm": "9999.99.99"
    },
    {
        "id": 12,
        "name": "Produto Doze",
        "ncm": "5555.55.55"
    },
    {
        "id": 13,
        "name": "Produto X",
        "ncm": "0070.07.77"
    }
]
```

### Event Name: [customer:list]

**Description:** [Este evento é acionado quando um cliente requisita uma lista de CLIENTES. Ele retorna uma lista de todos os CLIENTES no banco de dados para o cliente]

#### Parametros:

```
`{Socket} socket`: O socket do Socket.IO socket repreentando o client que acionou o evento.
```

#### Triggers

Lista de todos os emits no evento [customer:list]

```
customer:list
```

##### Trigger #1 - [customer:list]

Retorna um array com a lista de todos os CLIENTES no banco de dados

```
[
    {
        "id": 1,
        "name": "teste",
        "email": "teste@clienteteste.com",
        "password": "teste",
        "register_date": "1697725469382",
        "phone": "41988888888",
        "cpf": "12345678901",
        "city": "curitiba",
        "state": "pr",
        "certificateId": 1
    },
    {
        "id": 20,
        "name": "BOZ",
        "email": "boz@bozteste.com",
        "password": "teste",
        "register_date": "1698339896450",
        "phone": "41988888888",
        "cpf": "99999999",
        "city": "curitiba",
        "state": "pr",
        "certificateId": 23
    },
    {
        "id": 21,
        "name": "fernando",
        "email": "fernando@agenciaboz.com.br",
        "password": "123",
        "register_date": "1698341957513",
        "phone": "41984556795",
        "cpf": "02576698506",
        "city": "curitiba",
        "state": "pr",
        "certificateId": 24
    }
]
```

### Event Name: [customer:signup]

**Description:** [Este evento é acionado quando um usuário deseja cadastrar uma nova conta de Cliente]

#### Parametros:

```
{Object} data:
`{Socket} socket`: O socket utilizado para fazer comunicação.

`{Customer} data`: Um objeto contendo as informações do novo usuário a tal como nome, email, senha, etc...
```

#### Message:

Este evento espera as seguintes propriedades na mensagem:

```
{
    "name": "John Peter",
    "email": "john@peter.com.br",
    "password": "123456789",
    "phone": "41999999999",
    "cpf": "00000000000",
    "city": "Curitiba",
    "state": "PR"
}
```

#### Triggers

Lista de todos os emits no evento [customer:signup]

```
signup:success
signup:invalid
signup:error
```

##### Trigger #1 - [signup:success]

Se a criação da nova conta de usuario for um sucesso:

```
{
    "id": 22,
    "name": "John Peter",
    "email": "john@peter.com.br",
    "password": "123456789",
    "register_date": "1698415824594",
    "phone": "41999999999",
    "cpf": "00000000000",
    "city": "Curitiba",
    "state": "PR",
    "certificateId": 25,
    "certificate": {
        "id": 25,
        "expiry": "",
        "certificate": ""
    },
    "companies": []
}
```

##### Trigger #2 - [signup:error]

Se algum dos dados inseridos pelo usuário forem inválidos, retorna uma mensagem especificando qual campo continha informações inválidas

**==OBERSVAÇÃO: A lógica deste gatilho áinda está incompleta==**

```
"XXX INVÁLIDO"
```

### Event Name: [company:list]

**==OBSERVAÇÃO: ESSE EVENTO AINDA ESTÁ SENDO CONSTRUIDO
==**
**Description:** [Este evento é acionado quando um usuário requisita uma lista de EMPRESAS. Ele retorna uma lista de todos as empresas no banco de dados]

#### Parametros:

```
`{Socket} socket`: O socket do Socket.IO socket repreentando o client que acionou o evento.
```

#### Triggers

Lista de todos os emits no evento [company:list]

```
company:list
```

##### Trigger #1 - [company:list]

Retorna um array com a lista de todas as EMPRESAS no banco de dados, e os clientes relacionados á aquela determinada empresa.

]

```
[
    {
        "id": 1,
        "name": "mc donalds",
        "cnpj": "1234567890123",
        "city": "mcdonalds",
        "state": "pr",
        "customerId": 21,
        "customer": {
            "id": 21,
            "name": "fernando",
            "email": "fernando@agenciaboz.com.br",
            "password": "123",
            "register_date": "1698341957513",
            "phone": "41984556795",
            "cpf": "02576698506",
            "city": "curitiba",
            "state": "pr",
            "certificateId": 24
        }
    }
```

### Event Name: [company:create]

\*\*==OBERSVAÇÃO: A lógica deste EVENTO áinda está incompleta

**Description:** [Este evento é acionado quando um usuário deseja cadastrar uma nova empresa]

#### Parametros:

```
{Object} data:
`{Socket} socket`: O socket utilizado para fazer comunicação.

`{Company} data`: Um objeto contendo as informações da nova companhia a tal como nome, cnpj, cidade, etc...
```

#### Message:

Este evento espera as seguintes propriedades na mensagem:

```
{
    "type": "Nacional",
    "name": "mc donalds",
    "cnpj": "1234567890123",
    "iine": "Contibuinte de ICMS"
    "city": "mcdonalds",
    "state": "pr",
    "district": "Agua Verde",
    "street": "Rua das carmelindas",
    "adjunct": "Ap 303",
    "number": "1050",
    "cep": "81050460",
    "email": "ronaldo@mcdonaldo.com",
    "phone": "41999815114",
    "customerId": 21
}
```

#### Triggers

Lista de todos os emits no evento [company:create]

```
creation:success
creation:invalid
creation:error
```

##### Trigger #1 - [creation:success]

Se a criação da nova empresa for um sucesso:

```
{
    "id": 2,
    "name": "Bosch",
    "cnpj": "1234567890123",
    "city": "Bosch Town",
    "state": "BT",
    "customerId": 20
}
```

##### Trigger #2 - [creation:invalid]

Se algum dos dados inseridos pelo usuário forem inválidos:

**==OBERSVAÇÃO: A lógica deste gatilho áinda está incompleta==**

```
Input valid user data
```

##### Trigger #3 - [creation:error]

Para demais erros:

```
{
    "name": "PrismaClientValidationError",
    "clientVersion": "X.X.X"
}
```

### Event Name: [nature:list]

**==OBSERVAÇÃO: ESSE EVENTO AINDA ESTÁ SENDO CONSTRUIDO
==**
**Description:** [Este evento é acionado quando um usuário requisita uma lista de NATUREZAS DE OPERAÇÃO. Retornando uma lista de todas as naturezas no banco de dados]

#### Parametros:

```
`{Socket} socket`: O socket do Socket.IO socket repreentando o client que acionou o evento.
```

#### Triggers

Lista de todos os emits no evento [company:list]

```
nature:list
```

##### Trigger #1 - [nature:list]

Retorna um array com a lista de todas as naturezas de operação, e as regras atreladas á essa natureza no banco de dados.

==Dentro das regras, é possivel ver as naturezas atreladas á regra, e os produtos atrelados á regra.==

```
{
    "naturezas": [
        {
            "id": 10,
            "operation": "00000009",
            "type": "00000059",
            "finality": "00000059",
            "motive": "00000059",
            "rules": [
                {
                    "id": 1,
                    "uf": "RS",
                    "icms": "00000009",
                    "cfop": "00000059",
                    "percentage": "00000059",
                    "motive": "00000059",
                    "rate": "dddddd",
                    "deferral": "ddddd",
                    "cst": "fff",
                    "cofins": "ssss",
                    "natures": [
                        {
                            "id": 10,
                            "operation": "00000009",
                            "type": "00000059",
                            "finality": "00000059",
                            "motive": "00000059"
                        }
                    ]
                }
            ]
        },
    ],
    "regras": [
        {
            "id": 1,
            "uf": "RS",
            "icms": "00000009",
            "cfop": "00000059",
            "percentage": "00000059",
            "motive": "00000059",
            "rate": "dddddd",
            "deferral": "ddddd",
            "cst": "fff",
            "cofins": "ssss",
            "natures": [
                {
                    "id": 10,
                    "operation": "00000009",
                    "type": "00000059",
                    "finality": "00000059",
                    "motive": "00000059"
                }
            ],
            "products": []
        },
        {
            "id": 4,
            "uf": "RS",
            "icms": "00000009",
            "cfop": "00000059",
            "percentage": "00000059",
            "motive": "00000059",
            "rate": "dddddd",
            "deferral": "ddddd",
            "cst": "fff",
            "cofins": "ssss",
            "natures": [],
            "products": []
        }
    ]
}
```

### Event Name: [nature:create]

**Description:** [Este evento é acionado quando um usuário deseja criar uma nova natureza de operação]

#### Parametros:

```
{Object} data:
`{Socket} socket`: O socket utilizado para fazer comunicação.

`{Natureza} data`: Um objeto contendo as informações da nova companhia a tal como nome, cnpj, cidade, etc...
```

#### Message:

Este evento espera as seguintes propriedades na mensagem:

```
{
    "name": "Natureza Teste 10",
    "operation": "88888888",
    "type": "88888888",
    "finality": "88888888",
    "motive": "88888888",
    "rules": [
        {
            "id": 1
        }
    ]
}
```

#### Triggers

Lista de todos os emits no evento [nature:create]

```
nature:success
nature:error
```

##### Trigger #1 - [nature:success]

Se a criação da nova natureza de operação for um sucesso:

```
{
    "id": 12,
    "operation": "88888888",
    "type": "88888888",
    "finality": "88888888",
    "motive": "88888888",
    "rules": [
        {
            "id": 1,
            "uf": "RS",
            "icms": "00000009",
            "cfop": "00000059",
            "percentage": "00000059",
            "motive": "00000059",
            "rate": "dddddd",
            "deferral": "ddddd",
            "cst": "fff",
            "cofins": "ssss"
        }
    ]
}
```

##### Trigger #2 - [nature:error]

Para demais erros:

```
{
    "name": "PrismaClientValidationError",
    "clientVersion": "X.X.X"
}
```

### Event Name: [rule:create]

**Description:** [Este evento é acionado quando um usuário deseja criar uma regra de tributação]

#### Parametros:

```
{Object} data:
`{Socket} socket`: O socket utilizado para fazer comunicação.

`{regraTributacao} data`: Um objeto contendo as informações da nova companhia a tal como nome, cnpj, cidade, etc...
```

#### Message:

Este evento espera as seguintes propriedades na mensagem:
==natures e products são arrays, que podem conter mais de uma regra ou produto atrelados á mesma regra.==

**==EXEMPLO COM 1 ID:==**

```
{
    "uf": "RS",
    "icms": "11118111",
    "cfop": "11111711",
    "percentage": "13111111",
    "motive": "11111121",
    "rate": "11111115",
    "deferral": "11311111",
    "cst": "XXY",
    "cofins": "XXY",
    "natures": [
        {
            "id": 2
        }
    ],
    "products": [
        {
            "id": 2
        }
    ]
}
```

**==EXEMPLO COM 2 ID:==**

```
{
  "uf": "RS",
  "icms": "11118111",
  "cfop": "11111711",
  "percentage": "13111111",
  "motive": "11111121",
  "rate": "11111115",
  "deferral": "11311111",
  "cst": "XXY",
  "cofins": "XXY",
  "natures": [
    { "id": 2 },
    { "id": 3 }
  ],
  "products": [
    { "id": 4 },
    { "id": 5 }
  ]
}

```

#### Triggers

Lista de todos os emits no evento [rule:create]

```
rule:success
rule:error
```

##### Trigger #1 - [rule:success]

Se a criação da nova natureza de operação for um sucesso:

```
{
    "id": 7,
    "uf": "RS",
    "icms": "11118111",
    "cfop": "11111711",
    "percentage": "13111111",
    "motive": "11111121",
    "rate": "11111115",
    "deferral": "11311111",
    "cst": "XXY",
    "cofins": "XXY",
    "natures": [
        {
        "id": 2,
        "operation": "00000009",
        "type": "00000059",
        "finality": "00000059",
        "motive": "00000059"
        }
    ],
    "products": [
        {
        "id": 2,
        "name": "Trigo",
        "ncm": "00000002"
        }
    ]
},
```

##### Trigger #2 - [rule:error]

Para demais erros:

```
{
    "name": "PrismaClientValidationError",
    "clientVersion": "X.X.X"
}
```
