# NMAP_API
Este projeto implementa uma integração com a API do Nmap para realizar varreduras em hosts ou IPs e obter informações detalhadas sobre portas abertas e serviços. Este README contém as instruções de instalação, configuração e uso do projeto.

## Pré-requisitos

- Node.js (versão 14 ou superior).
* npm ou yarn para gerenciamento de pacotes.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Jean13331/NMAP_API.git
   cd NMAP_API

2. Instale as dependências:
   ```bash
   npm install
   # ou, se preferir usar yarn
   yarn install

3. Gerar uma chave de api no nmap:
   ```bash
   https://nmap.online/en/api-key

4. Alterar o arquivo nmapApi.js para conter sua chave de api.
   ```bash
   Linhas 23 - 'NMAP-API-KEY': 'SUA CHAVE DE API'
   Linha  64 - 'NMAP-API-KEY': 'SUA CHAVE DE API'

## Como usar

1. **No terminal digite o seguinte comando:**

   ```bash
   node scanner.js
  
2. **Digite 1 para aplicação local:**   \
   **Digite 2 para aplicações externas**
   

4. **Digite o ip ou link do site que desejar:**
  

5. **Será exibido:**
  - Status do scan
  * Datatime do scan
  + scan_id
    
    
6. **Em seguida será exibido uma tabela com as portas detectadas do site desejado:**
```bash
┌─────────┬───────┬───────────┬──────────┐
│ (index) │ Porta │ Protocolo │ Estado   │
├─────────┼───────┼───────────┼──────────┤
│ 0       │ '443' │ 'tcp'     │ 'Aberto' │
│ 1       │ '22'  │ 'tcp'     │ 'Aberto' │
│ 2       │ '443' │ 'tcp'     │ 'Aberto' │
└─────────┴───────┴───────────┴──────────┘

