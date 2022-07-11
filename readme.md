# Bem vindo projeto base de anomalias

Esta aplicação faz parte do conjunto de aplicações para meu trabalho de conclusão de curso para o curso de Sistemas de informação no campus CERES/RN.

## Objetivo

Esta aplicação fornece alguns endpoints que serão utilizados por outra aplicação para gerar anomalias em um ambiente controlado.
Esta aplicação fornce um laboratório para criação de anomalias em containeres docker em um ambiente controlado, gerando anomalias, monitorando e gerenciando todo o fluxo.

Os endpoints dessa aplicação incluem.

| Metodo | Endpoint                | função                                                                            |
| ------ | ----------------------- | --------------------------------------------------------------------------------- |
| GET    | `/`                     | identifica se a aplicação está executando com sucesso                             |
| POST   | `/experiment`           | inclue um experimento que será executado                                          |
| GET    | `/experiment`           | faz uma listagem de experimentos, podendo ser adicionados filtros no query params |
| GET    | `/experiment/:id`       | retorna um experimento por id                                                     |
| GET    | `/experiment/:id/stats` | retorna os valores dos status calculados do experimento repassado                 |


## Execução
Para executar essa aplicação é nescessário que você tenha na sua máquina o docker e o docker-compose, o docker-compose na raiz do projeto faz
as configurações dos containeres e suas dependencias. Você pode alterar qualquer valor e ver o resultado.
Essa aplicação depende de uma network e de uma imagem para se conseguir executar suas funções, existe uma aplicação que é responsável por gerar
os comportamentos anomalos, este projeto se encontra disponível no meu [github](https://github.com/hitallow/anomaly-app).
Você pode clonar a aplicação e gerar o build da imagem para que a presente aplicação possa usar a imagem especificada lá.
Outro passo inclue criar uma network para que a aplicação atual converse com a aplicação de anomalias. Ela está definida no docker-compose na linha 64, se trata 
de uma network externa que deve ser criada manualmente. Para cria-la basta executar:

```shell
  docker network create anomaly-network
```
Caso tenha preferencia, pode alterar a network. No entanto lembre-se de configurar o docker-compose e a conexão entre eles.
Crie um arquivo chamado `.env` no root do projeto considerando as informações do `.env.exemple`, lá são setados as informações de conexão ao banco de dados.

Depois essas configurações a aplicação já deve funcionar. agora basta buildar as imagens e executar junto com o docker-compose. Para isso execute

```shell
  docker-compose up --b
```

Neste momento sua aplicação deve funcionar perfeitamente e é possivel cadastrar um experimento.

## Criação de experimento
Para criar um experimento basta registar no endpoint mencionado acima, a execução dos passos acontece de maneira assincrona através de filas.

Segue exemplo de criação de um experimento:

```shell	
curl --request POST \
  --url http://localhost:3000/experiment \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "Verificando caso de experimento",
  "description": "Esse teste tem o objetivo de testar se a aplicação funciona",
  "frequency": 1000,
  "imageName: "hitallow/anomaly-app",
  "stages": [
    {
      "type": "NETWORK_ANOMALY",
      "setting": {
        "mode": "input",
        "kbPerRate": 2100,
        "rate": 300,
        "duration": 20,
        "frequency": 1
      }
    },
    {
      "type": "NORMAL",
      "setting": {
        "frequency": 1,
        "requestType": "fibonacci",
        "value": 14,
        "duration": 10,
        "rate": 400
      }
    },
    {
      "type": "CPU_ANOMALY",
      "setting": {
        "duration": 10
      }
    },
    {
      "type": "MEMORY_ANOMALY",
      "setting": {
        "increaseMode": "fast",
        "durationOfAlocation": 10,
        "targetAlocation": 1073741824,
        "increaseRate": 65536
      }
    },
    {
      "type": "NETWORK_ANOMALY",
      "setting": {
        "mode": "output",
        "kbPerRate": 2100,
        "rate": 200,
        "duration": 10,
        "frequency": 1
      }
    }
  ]
}
'
```

Os possíveis estágios do experimento incluem as seguintes configurações:

| TIPO            | função                                                                            |
| --------------- | --------------------------------------------------------------------------------- |
| NORMAL          | executa o que seria uma carga de trabalho normal                                  |
| CPU_ANOMALY     | executa um aumento do uso de cpu do container                                     |
| NETWORK_ANOMALY | executa um aumento do uso de network do container, podendo ser um input ou output |
| MEMORY_ANOMALY  | executa um aumento do uso de memória do container                                 |

Para testar se a aplicação está ouvindo, basta executar o seguinte curl:

```shell
curl --request GET \
  --url http://localhost:3000/
```