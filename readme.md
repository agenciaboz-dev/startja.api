# DOCUMENTAÇÃO

## on events
user:login
user:list
product:list
product:create
customer:list
customer:signup

# user
### on 
user:login
### message
{
    "email": "teste@teste.teste",
    "password": "teste"
}

## triggers
login:admin
login:customer
login:error

### emit
login:admin
### message
{
    "id": 1,
    "name": "teste",
    "email": "teste@teste.teste",
    "password": "teste"
}

### emit
login:customer
### message
{
    "id": 5,
    "name": "b",
    "email": "b",
    "password": "b",
    "register_date": "1697811716038",
    "phone": "b",
    "cpf": "b",
    "city": "b",
    "state": "b",
    "certificateId": 5
}

### emit
login:error
### message
{
    "error": "Usuário ou senha incorretos"
}

# product

# customer