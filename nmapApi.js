import axios from 'axios';
import FormData from 'form-data';
import https from 'https';

// Função para iniciar o scan usando a API externa
export async function startScan(target) {
  try {
    const form = new FormData();
    form.append("scan_type", "single");
    form.append("command", "normal");
    form.append("options", "pn,v,p 1-65535");
    form.append("schedule", "now");
    form.append("target", target);
    form.append("output", "normal");

    const agent = new https.Agent({ rejectUnauthorized: false });

    const response = await axios.post(
      'https://api.nmap.online/v01/start_scan',
      form,
      {
        headers: {
          'NMAP-API-KEY': 'SUA CHAVE DE API',
          ...form.getHeaders(),
        },
        httpsAgent: agent,
      }
    );

    console.log("Scan iniciado. Resultado da API:", response.data);

    if (response.data.status_code === 201) {
      const scanId = response.data.scan_id;
      console.log("Scan foi iniciado com sucesso. Scan ID:", scanId);

      // Consultar o status após 10 segundos
      setTimeout(async () => {
        await checkScanStatus(scanId);
      }, 10000);
    } else {
      console.error("Erro ao iniciar o scan. Detalhes:", response.data);
    }
  } catch (error) {
    console.error("Erro ao iniciar o scan:", error.message || error);
    if (error.response) {
      console.error("Resposta de erro da API:", error.response.data);
    }
  }
}

// Função para verificar o status e obter o resultado do scan
export async function checkScanStatus(scanId) {
  try {
    const form = new FormData();
    form.append("scan_id", scanId);

    const agent = new https.Agent({ rejectUnauthorized: false });

    const response = await axios.post(
      'https://api.nmap.online/v01/scan_result',
      form,
      {
        headers: {
          'NMAP-API-KEY': 'SUA CHAVE DE API',
          ...form.getHeaders(),
        },
        httpsAgent: agent,
      }
    );

    if (response.data.status_code === 200) {
      console.log("Resultado do Scan obtido com sucesso:", response.data);

      const resultText = response.data.result;

      // Usar expressão regular para encontrar portas abertas
      const openPorts = [];
      const regex = /Discovered open port (\d+)\/(\w+)/g;
      let match;

      while ((match = regex.exec(resultText)) !== null) {
        openPorts.push({
          port: match[1],
          protocol: match[2],
        });
      }

      if (openPorts.length > 0) {
        console.log("Portas abertas encontradas:");

        // Exibir como tabela
        console.table(
          openPorts.map((port) => ({
            "Porta": port.port,
            "Protocolo": port.protocol,
            "Estado": "Aberto",
          }))
        );
      } else {
        console.log("Nenhuma porta aberta encontrada.");
      }
    } else if (response.data.status_code === 202) {
      console.log("Scan ainda em andamento. Tentando novamente em 30 segundos...");
      setTimeout(async () => {
        await checkScanStatus(scanId);
      }, 30000);
    } else {
      console.error("Erro ao consultar o status do scan. Detalhes:", response.data);
    }
  } catch (error) {
    console.error("Erro ao consultar o status do scan:", error.message || error);
    if (error.response) {
      console.error("Resposta de erro da API:", error.response.data);
    }
  }
}
