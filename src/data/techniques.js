const blockDefinitions = [
  {
    id: 'bandejas', name: 'Bandejas, equilíbrio e transporte', icon: 'tray', objective: 'equilíbrio', environment: 'qualquer ambiente',
    titles: [
      'Centralização do peso antes da saída','Base da palma sob o centro da bandeja','Punho neutro para trajetos longos','Leitura rápida do centro de gravidade','Retirada progressiva sem perder o equilíbrio','Pesados no centro, leves na borda segura','Copos agrupados sem contato entre bordas','Pratos distribuídos por massa e sequência','Curva aberta com bandeja estabilizada','Passagem segura em corredor estreito','Elevação da bandeja em dois tempos','Descida controlada até a estação de apoio','Parada suave sem efeito de onda','Mão de apoio apenas quando necessária','Separação silenciosa entre taças','Alturas diferentes sem bloquear a visão','Reequilíbrio de bandeja parcialmente vazia','Passos curtos para reduzir oscilações','Caminhada com olhar na rota','Conferência de carga antes de sair','Rota livre antes do primeiro passo','Treino progressivo com itens inquebráveis','Limite de carga baseado no controle','Presença segura sem malabarismo'
    ]
  },
  {
    id: 'pratos', name: 'Pratos, travessas e entrega', icon: 'plates', objective: 'serviço', environment: 'restaurante',
    titles: [
      'Dois pratos com pegada estável','Terceiro prato somente com domínio','Dedos fora da área de alimento','Antebraço alinhado sem pressão excessiva','Deslocamento com pratos nivelados','Proteção térmica conforme protocolo da casa','Travessa apoiada em base firme','Molhos transportados sem inclinação','Decoração delicada preservada até a mesa','Bordas limpas durante toda a entrega','Pratos ordenados pela posição da mesa','Marcadores visuais para identificar pedidos','Aproximação lateral com rota livre','Apresentação breve antes de apoiar','Corpo alinhado diante do lugar correto','Entrega compacta em mesa apertada','Divisão coordenada de mesa grande','Entrega sem cruzar sobre o cliente','Giro do quadril em vez de torção lombar','Retorno limpo após a última entrega','Conferência visual de todos os lugares','Fechamento da entrega sem movimentos extras'
    ]
  },
  {
    id: 'bebidas', name: 'Copos, taças, garrafas e bebidas', icon: 'glass', objective: 'segurança', environment: 'bar',
    titles: [
      'Taças seguradas pela haste ou base','Copos separados por formato e peso','Círculo estável de copos na bandeja','Garrafas centralizadas entre copos','Retirada alternada de bebidas','Copos posicionados pela base','Reposição percebida sem interromper','Abertura de garrafa em zona segura','Rótulo apresentado com discrição','Água servida com fluxo controlado','Refrigerante servido evitando excesso de espuma','Bebida quente transportada com área livre','Interrupção imediata antes do transbordo','Gotas removidas fora do campo do cliente','Bordas de contato sempre preservadas','Sequência de entrega por estabilidade','Copos vazios recolhidos pela base','Mesa conferida após o serviço de bebidas'
    ]
  },
  {
    id: 'mesa', name: 'Serviço à mesa com mais elegância', icon: 'table', objective: 'elegância', environment: 'restaurante',
    titles: [
      'Aproximação pelo ponto de menor interferência','Distância que preserva o espaço do cliente','Pausa breve antes de interromper uma conversa','Corpo em diagonal para ocupar menos espaço','Pedido de licença em tom baixo','Entrega contínua sem ajustes repetidos','Pratos alinhados ao lugar da mesa','Copos organizados sem bloquear o prato','Talheres ajustados pelo cabo','Guardanapo reposto sem tocar na área de uso','Acompanhamentos entregues em conjunto lógico','Condimentos conferidos antes de serem pedidos','Sobremesa preparada com mesa visualmente limpa','Café servido com alça acessível','Rota protegida em mesas com crianças','Ponto de apoio definido para grupos','Ritmo discreto no atendimento de casais','Serviço compacto em espaços apertados','Retorno oportuno após a entrega','Leitura silenciosa de itens faltantes','Finalização elegante com conferência curta','Saída da mesa pelo caminho já planejado'
    ]
  },
  {
    id: 'fluxo', name: 'Agilidade e fluxo no salão', icon: 'route', objective: 'agilidade', environment: 'salão movimentado',
    titles: [
      'Saída da cozinha organizada por destino','Conferência de três pontos antes de caminhar','Rota definida antes de carregar','Retorno produtivo sem viagens vazias','Entrega e recolhimento no mesmo circuito seguro','Prioridade por tempo e impacto','Pedidos agrupados por setor do salão','Gargalos identificados antes do pico','Um movimento para cada finalidade','Velocidade constante sem correr','Corredor de circulação preservado no pico','Entrada e saída alternadas em passagem estreita','Sinalização discreta entre colegas','Mesa grande dividida por zonas','Retornos agrupados por urgência','Necessidades previstas na primeira leitura','Reposição aproveitada no trajeto','Ritmo sustentável durante todo o turno','Cruzamentos evitados por sentido de fluxo','Materiais reposicionados perto do uso','Praça reorganizada em pausas curtas','Retomada pela última ação confirmada'
    ]
  },
  {
    id: 'recolhimento', name: 'Recolhimento e reorganização', icon: 'collect', objective: 'recolhimento', environment: 'qualquer ambiente',
    titles: [
      'Momento de retirada confirmado pelos sinais da mesa','Autorização discreta antes de recolher','Alcance curto sem invadir o cliente','Pratos usados organizados longe da mesa','Talheres contidos para evitar queda e ruído','Copos recolhidos sem tocar nas bordas','Louças separadas para reduzir impacto','Restos mantidos longe de superfícies limpas','Carga limitada sem empilhamento inseguro','Recolhimento progressivo por áreas livres','Mesa grande recolhida por setores','Retirada da entrada sem apressar a mesa','Transição limpa após o prato principal','Preparação silenciosa para sobremesa','Pequenos resíduos removidos com utensílio adequado','Utensílios reorganizados por próxima etapa','Guardanapos repostos sem excesso','Limpeza visual entre etapas','Retorno imediato com itens faltantes','Mesa finalizada sem aparência vazia','Preparação completa para o próximo cliente','Conferência final sob diferentes ângulos'
    ]
  },
  {
    id: 'postura', name: 'Postura, deslocamento e presença', icon: 'posture', objective: 'postura', environment: 'qualquer ambiente',
    titles: [
      'Espera ativa em postura neutra','Ombros alinhados e relaxados','Mãos visíveis em posição profissional','Disponibilidade sem rondar a mesa','Atenção distribuída pelo salão','Caminhada controlada pelo eixo do corpo','Curvas feitas com passos menores','Aproximação com desaceleração gradual','Saída da mesa sem giro brusco','Contato visual breve e funcional','Expressão serena durante o serviço','Ponto de espera sem apoio em móveis','Postura estável em salão cheio','Respiração curta para transmitir calma','Urgência resolvida sem aparência de pressa','Presença próxima sem pressionar','Movimentos silenciosos de braços e mãos','Segurança construída pela sequência de ações'
    ]
  },
  {
    id: 'comunicacao', name: 'Comunicação discreta e leitura da mesa', icon: 'eye', objective: 'comunicação', environment: 'qualquer ambiente',
    titles: [
      'Sinais de necessidade lidos à distância','Chamado diferenciado de conversa casual','Nível dos copos acompanhado discretamente','Itens faltantes percebidos pelo padrão da mesa','Momento de conversa respeitado','Confirmação objetiva sem repetição excessiva','Aviso de temperatura antes do contato','Atraso comunicado com informação útil','Dúvida encaminhada sem improvisar resposta','Auxílio solicitado antes de virar urgência','Tom de voz ajustado ao ambiente','Mensagem curta com começo e fechamento','Indecisão acompanhada sem pressão','Retorno combinado no momento adequado','Insatisfação percebida por mudança de comportamento','Contato encerrado com naturalidade'
    ]
  },
  {
    id: 'refinamento', name: 'Refinamento visual e serviço de alto padrão', icon: 'spark', objective: 'refinamento', environment: 'hotel', featured: true,
    titles: [
      'Detalhes conferidos antes de cada aproximação','Linhas visuais alinhadas sobre a mesa','Movimentos iniciados e finalizados com controle','Ruídos eliminados na origem','Apresentação preservada até o último centímetro','Uniformidade visual entre mesas do setor','Discrição como parte do acabamento','Louças delicadas manuseadas pela área segura','Entrega precedida por varredura visual','Mesa finalizada com composição equilibrada','Elegância mantida sem reduzir o ritmo','Agilidade sem sinais corporais de pressa','Gestos compactos em vez de movimentos amplos','Entrega fluida em uma sequência contínua','Recolhimento visualmente limpo','Experiência demonstrada pela antecipação','Atenção aos detalhes que o cliente percebe','Presença profissional com comunicação essencial'
    ]
  },
  {
    id: 'imprevistos', name: 'Situações reais, pressão e imprevistos', icon: 'alert', objective: 'segurança', environment: 'salão movimentado',
    titles: [
      'Área isolada após bebida derramada','Caco de vidro contido sem improviso','Prato errado corrigido antes de nova movimentação','Item esquecido incluído na prioridade correta','Atraso acompanhado com atualização objetiva','Mudança de lugar registrada sem perder posições','Salão lotado dividido em ciclos curtos','Criança no corredor tratada como rota variável','Chamado recebido enquanto as mãos estão ocupadas','Alteração de pedido confirmada com a equipe','Falta de utensílio resolvida por alternativa aprovada','Bandeja instável apoiada antes de corrigir','Prato quente demais devolvido à área segura','Conflito de rota resolvido com cessão clara','Ajuda ao colega sem abandonar a própria sequência','Reclamação acolhida e encaminhada com calma','Sequência recuperada pela última confirmação','Erro encerrado com correção e nova conferência'
    ]
  }
];

const blockGuides = {
  bandejas: ['Organize a carga do centro para fora.', 'Teste a estabilidade antes de caminhar.', 'Mantenha o punho neutro e os passos controlados.', 'Reavalie o peso depois de cada retirada.'],
  pratos: ['Confirme a ordem e a temperatura.', 'Apoie apenas nas áreas externas e seguras.', 'Caminhe mantendo os pratos nivelados.', 'Entregue conforme o protocolo do estabelecimento.'],
  bebidas: ['Confira copos, bases e recipientes.', 'Separe itens que possam se tocar.', 'Transporte com fluxo e rota livres.', 'Sirva sem tocar em bordas de contato.'],
  mesa: ['Leia o espaço e o momento da mesa.', 'Escolha o ponto de menor interferência.', 'Execute o serviço em uma sequência curta.', 'Confira o resultado antes de se retirar.'],
  fluxo: ['Liste mentalmente destino e prioridade.', 'Escolha a rota com menor cruzamento.', 'Agrupe ações compatíveis com segurança.', 'Retome o circuito pelo próximo ponto confirmado.'],
  recolhimento: ['Observe se a etapa da refeição terminou.', 'Confirme a retirada quando houver dúvida.', 'Recolha por uma área livre e estável.', 'Reorganize a mesa para a próxima etapa.'],
  postura: ['Alinhe pés, quadril, ombros e cabeça.', 'Relaxe braços e mantenha as mãos neutras.', 'Mova-se com passos regulares.', 'Finalize cada aproximação sem gestos bruscos.'],
  comunicacao: ['Observe antes de se aproximar.', 'Escolha o momento de menor interrupção.', 'Comunique apenas a informação necessária.', 'Confirme entendimento e siga a ação.'],
  refinamento: ['Faça uma varredura visual do conjunto.', 'Corrija um detalhe por vez.', 'Use movimentos curtos e silenciosos.', 'Compare o acabamento com o padrão da casa.'],
  imprevistos: ['Pare a ação que pode ampliar o problema.', 'Proteja clientes, equipe e área de circulação.', 'Comunique a pessoa responsável de forma objetiva.', 'Corrija, confira e retome pela última etapa segura.']
};

const levels = ['intermediário', 'aprimoramento'];
const environments = ['restaurante','bar','hotel','buffet','evento','cafeteria','churrascaria','salão movimentado','qualquer ambiente'];

export const techniques = blockDefinitions.flatMap((block, blockIndex) => block.titles.map((title, titleIndex) => {
  const number = blockDefinitions.slice(0, blockIndex).reduce((sum, item) => sum + item.titles.length, 0) + titleIndex + 1;
  const guide = blockGuides[block.id];
  return {
    id: `tech-${String(number).padStart(3, '0')}`,
    number,
    title,
    blockId: block.id,
    block: block.name,
    objective: block.objective,
    when: `Use durante ${block.name.toLowerCase()}, sempre que a situação exigir mais ${block.objective}.`,
    level: levels[(number + blockIndex) % levels.length],
    environment: number % 3 === 0 ? environments[number % environments.length] : block.environment,
    explanation: `${title} reduz correções desnecessárias e torna a execução mais previsível, limpa e profissional.`,
    steps: guide.map((step, index) => index === 1 ? `${step} Considere especificamente: ${title.toLowerCase()}.` : step),
    doThis: `Antecipe a ação e execute “${title.toLowerCase()}” com movimentos curtos e controlados.`,
    avoid: `Improvisar velocidade ou carga acima da sua capacidade e do padrão seguro da casa.`,
    commonError: `Começar a ação sem conferir espaço, sequência e estabilidade.`,
    result: `Mais ${block.objective}, menos retrabalho e uma apresentação profissional consistente.`,
    quickTip: `Antes de agir, faça uma conferência visual de dois segundos.`,
    safety: ['bandejas','pratos','bebidas','recolhimento','imprevistos'].includes(block.id) ? 'Priorize higiene, ergonomia e capacidade individual. Confirme e siga o protocolo adotado pelo estabelecimento.' : 'Confirme e siga o protocolo adotado pelo estabelecimento.',
    visualType: block.icon,
    featured: Boolean(block.featured)
  };
}));

export const techniqueBlocks = blockDefinitions.map(({ titles, ...block }) => ({ ...block, count: titles.length }));

