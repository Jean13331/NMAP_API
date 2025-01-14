import readline from 'readline';
import { startScan } from './nmapApi.js'; // Importando a função para interagir com a API do Nmap

// Configurando o readline para entrada de dados no console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função principal para gerenciar a escolha do tipo de scan
function main() {
  rl.question('Escolha o tipo de scan (1 para local com libnmap, 2 para usar a API externa): ', async (choice) => {
    if (choice === '2') {
      rl.question('Digite o site ou IP que deseja escanear: ', async (target) => {
        await startScan(target); // Iniciar o scan usando a API externa
        rl.close();
      });
    } else {
      console.log('Opção inválida ou não implementada no momento.');
      rl.close();
    }
  });
}

// Iniciar o programa
main();
