const scriptGroups = [
  ['Restaurante movimentado', ['Mesa de quatro no início do pico','Entrega coordenada de seis pratos','Reposição de bebidas em setor cheio','Recolhimento e preparação para sobremesa','Recuperação após pedido incorreto','Circuito de três mesas com prioridades diferentes']],
  ['Buffets e eventos', ['Reposição contínua de buffet','Recolhimento discreto em evento corporativo','Serviço volante com bandeja leve','Virada rápida entre momentos do evento','Apoio coordenado em mesa de autoridades']],
  ['Bares e cafeterias', ['Rodada de bebidas com copos variados','Cafés e acompanhamentos em sequência','Troca segura entre balcão e mesas','Fechamento de comanda com recolhimento final']],
  ['Hotéis e café da manhã', ['Abertura do salão de café da manhã','Reposição de mesa durante alta ocupação','Serviço de bebidas quentes no hotel','Reorganização após saída de hóspedes','Encerramento do buffet matinal']],
  ['Mesas grandes e grupos', ['Mapeamento de posições em mesa de oito','Entrega por zonas em mesa de doze','Rodada de bebidas sem perder lugares','Recolhimento por etapas em confraternização','Divisão de serviço entre dois garçons']],
  ['Abertura, pico e encerramento', ['Preparação da praça antes da abertura','Primeiros quinze minutos do turno','Entrada controlada no horário de pico','Retomada após interrupções consecutivas','Encerramento do setor sem viagens vazias']]
];

export const serviceScripts = scriptGroups.flatMap(([category, titles]) => titles.map((title, index) => {
  const id = scriptGroups.slice(0, scriptGroups.findIndex(group => group[0] === category)).reduce((sum, group) => sum + group[1].length, 0) + index + 1;
  return {
    id: `script-${String(id).padStart(2, '0')}`,
    title,
    category,
    situation: `${title} em contexto de ${category.toLowerCase()}, com fluxo real de clientes e equipe.`,
    objective: 'Executar a sequência com previsibilidade, segurança e o mínimo de deslocamentos desnecessários.',
    preparation: ['Confirme materiais e área de apoio','Observe a ocupação e os caminhos livres','Defina a prioridade e o ponto de retorno'],
    actions: ['Faça uma leitura completa antes de sair','Agrupe somente ações compatíveis e seguras','Siga a rota de menor interferência','Conclua uma etapa antes de abrir outra','Confira mesa e estação no retorno'],
    related: [`tech-${String(((id * 5) % 200) + 1).padStart(3, '0')}`, `tech-${String(((id * 5 + 17) % 200) + 1).padStart(3, '0')}`],
    attention: 'Ajuste o roteiro ao protocolo, ao espaço e à capacidade da equipe.',
    avoid: 'Correr, sobrecarregar bandejas ou iniciar novas tarefas sem registrar a anterior.',
    checklist: ['Itens entregues','Mesa conferida','Área de passagem livre','Próximo retorno definido'],
    duration: `${6 + (id % 7)}–${10 + (id % 8)} min`,
    environment: category
  };
}));

export const memoryLessons = [
  ['Mapa mental das mesas','Transforme o salão em zonas simples e associe cada mesa a um ponto visual fixo.'],
  ['Associação entre posição e pedido','Relacione cada item à posição do cliente, não apenas ao número da mesa.'],
  ['Agrupamento de itens semelhantes','Agrupe mentalmente bebidas, pratos e retornos sem misturar prioridades.'],
  ['Hierarquia de prioridades','Ordene segurança, itens quentes, atrasos e reposições por impacto imediato.'],
  ['Retomada após interrupções','Volte à última ação confirmada e refaça a leitura das próximas duas etapas.'],
  ['Viagens produtivas','Observe o caminho de volta antes de sair e identifique uma ação compatível.'],
  ['Retornos à cozinha','Use pontos de checagem para juntar solicitações sem atrasar itens urgentes.'],
  ['Memória de mesas grandes','Divida a mesa em zonas e mantenha uma direção constante de leitura.'],
  ['Conferência com discrição','Compare posições, itens e sinais visuais antes de pedir nova confirmação.'],
  ['Memória visual em 20 segundos','Observe um mapa de mesa, oculte-o e reconstrua as posições dos itens.'],
  ['Simulação de salão cheio','Reordene tarefas quando surgirem duas novas prioridades e uma interrupção.'],
  ['Plano de sete turnos','Pratique uma habilidade por turno e registre o que ficou mais automático.']
].map(([title, description], index) => ({ id: `memory-${index + 1}`, title, description, exercise: index % 3 === 0 ? 'Observe por 20 segundos e reconstrua a ordem sem consultar.' : index % 3 === 1 ? 'Ordene as ações do maior para o menor impacto.' : 'Escolha a rota com menos retornos e explique o critério.' }));

const checklistDefinitions = [
  ['Apresentação pessoal',['Cabelos e barba alinhados','Mãos e unhas limpas','Acessórios discretos','Aparência compatível com a casa']],
  ['Uniforme e higiene',['Uniforme limpo e passado','Calçado fechado e seguro','Pano e utensílios separados','Higienização das mãos realizada']],
  ['Preparação da praça',['Estação abastecida','Louças conferidas','Materiais nos locais definidos','Rotas de passagem livres']],
  ['Preparação das mesas',['Superfície limpa','Itens alinhados','Cadeiras posicionadas','Cardápios em boas condições']],
  ['Organização da bandeja',['Bandeja limpa e seca','Peso centralizado','Itens separados','Carga dentro da capacidade']],
  ['Conferência antes de sair da cozinha',['Mesa confirmada','Itens completos','Bordas limpas','Rota livre']],
  ['Serviço de bebidas',['Copos corretos','Bordas preservadas','Garrafas conferidas','Reposição observada']],
  ['Entrega de pratos',['Posições confirmadas','Temperatura sinalizada','Pratos nivelados','Conferência final feita']],
  ['Atendimento de mesa grande',['Mesa dividida em zonas','Posições registradas','Sequência de entrega definida','Apoio combinado com a equipe']],
  ['Recolhimento',['Autorização percebida ou solicitada','Carga limitada','Ruídos controlados','Itens limpos separados']],
  ['Preparação para sobremesa',['Louças anteriores retiradas','Resíduos removidos','Talheres adequados','Mesa recomposta']],
  ['Salão em horário de pico',['Prioridades atualizadas','Corredores livres','Equipe sincronizada','Estação mínima abastecida']],
  ['Troca de turno',['Mesas em andamento informadas','Pendências registradas','Materiais repostos','Responsabilidades transferidas']],
  ['Encerramento do salão',['Mesas finalizadas','Louças encaminhadas','Estação higienizada','Materiais guardados']],
  ['Conferência final',['Nenhum item esquecido','Área segura e limpa','Pendências comunicadas','Próximo turno preparado']]
];

export const checklists = checklistDefinitions.map(([title, items], index) => ({ id: `checklist-${index + 1}`, title, items }));

export const postureLessons = [
  'Postura neutra no salão','Posição correta das mãos','Ombros, coluna e cabeça','Caminhar com controle','Aproximação de uma mesa','Retirada de uma mesa','Contato visual sem pressão','Expressão e serenidade','Presença durante horários de pico','Erros visuais que entregam insegurança'
].map((title, index) => ({
  id: `posture-${index + 1}`, title,
  awkward: 'Eixo desalinhado, braços abertos e correções bruscas durante o movimento.',
  professional: 'Corpo alinhado, gestos compactos, olhar funcional e ritmo constante.',
  corrections: ['Relaxe os ombros','Mantenha as mãos neutras','Finalize o movimento antes do próximo'],
  exercise: 'Pratique por dois minutos diante de um reflexo ou grave um trajeto curto para autoavaliação.',
  result: 'Presença mais serena, disponível e profissional.'
}));

export const postureAssessment = ['Mantenho os ombros alinhados','Evito cruzar os braços','Não fico apoiado em paredes ou móveis','Caminho sem pressa excessiva','Mantenho as mãos em posição neutra','Observo a mesa sem encarar','Aproximo-me com segurança','Retiro-me sem movimentos bruscos'];

