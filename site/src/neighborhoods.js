import unidecode from 'unidecode';

class Neighborhoods {
  constructor() {
    this.list = Object.keys(neighborhoods).map(n => ({
      name: n,
      asciiName: unidecode(n).toLowerCase(),
    }));
    this.list.sort((a, b) => a.name.localeCompare(b.name));
  }

  filter(query, limit) {
    if (limit === undefined) {
      limit = 10;
    }
    query = unidecode(query).toLowerCase();
    return this.list.filter(n => n.asciiName.includes(query)).slice(0, limit);
  }

  region(name) {
    return neighborhoods[name];
  }
}

const neighborhoods = {
  'Cidade Nova': 0,
  'Vila Guilhermina': 0,
  'Augusta Mota': 1,
  'Canelas I e II': 1,
  'Clarice Ataíde': 1,
  'Delfino Magalhães': 1,
  'Guarujá': 1,
  'Jardim Alegre': 1,
  'Jardim Liberdade': 1,
  'Jardim Palmeiras': 1,
  'Jardim Primavera': 1,
  'Jardim São Geraldo': 1,
  'JK': 1,
  'Major Prates': 1,
  'Morada da Serra': 1,
  'Morada do Parque': 1,
  'Nova América': 1,
  'Parque Jardim Morada do Sol': 1,
  'Planalto': 1,
  'Planalto Prolongamento': 1,
  'Raul Lourenço': 1,
  'Recanto das Águas': 1,
  'Regina Perez': 1,
  'Residencial Minas Gerais': 1,
  'Residencial Monte Cristal': 1,
  'Residencial Monte Fiore': 1,
  'Santa Lucia I e II': 1,
  'Santo Antônio I': 1,
  'São Lucas': 1,
  'Universitário': 1,
  'Vargem Grande II': 1,
  'Vilage do Lago I e II': 1,
  'Acácia': 2,
  'Alterosa': 2,
  'Amazonas': 2,
  'Barcelona Park': 2,
  'Bela Vista': 2,
  'Chiquinho Guimarães': 2,
  'Cidade Industrial': 2,
  'Cintra': 2,
  'Ciro dos Anjos': 2,
  'Condomínio Moradas Montes Claros': 2,
  'Conjunto Habitacional Joaquim Costa': 2,
  'Cristo Rei': 2,
  'Dona Gregória': 2,
  'Edgar Pereira': 2,
  'Independência e Adjacentes': 2,
  'Jardim Brasil': 2,
  'Jardim Europa': 2,
  'José Corrêa Machado': 2,
  'Mangues': 2,
  'Maracanã': 2,
  'Nossa Senhora das Graças': 2,
  'Nova Morada': 2,
  'Nova Suíça': 2,
  'Novo Jaraguá': 2,
  'Panorama I': 2,
  'Residencial Vitória I e II': 2,
  'Roxo Verde': 2,
  'Santa Rafaela': 2,
  'Santo Inácio': 2,
  'Santos Dumont': 2,
  'São Bento': 2,
  'São Judas I': 2,
  'Vila Campos': 2,
  'Vila Castelo Branco': 2,
  'Vila Greicy': 2,
  'Vila João Gordo': 2,
  'Vila Mauricéia': 2,
  'Vila Nossa Senhora Aparecida': 2,
  'Vila Oliveira': 2,
  'Vila Real': 2,
  'Vila Santa Cruz': 2,
  'Vila Brasília': 2,
  'Belvedere': 3,
  'Camilo Prates': 3,
  'Cândida Câmara': 3,
  'Conjunto Habitacional Bandeirantes': 3,
  'Eldorado': 3,
  'Fazendas': 3,
  'Funcionários': 3,
  'Gran Royalle Pirâmide': 3,
  'Ibituruna (parte alta)': 3,
  'Ibituruna (parte baixa)': 3,
  'Jardim Alvorada': 3,
  'Jardim Olímpico': 3,
  'Jardim São Luiz': 3,
  'Lurdes': 3,
  'Morada do Sol': 3,
  'Nossa Senhora de Fátima': 3,
  'Novo Delfino': 3,
  'Olga Benário': 3,
  'Panorama II': 3,
  'Parque jardim Olímpico': 3,
  'Ponta do Morro': 3,
  'Residencial Montes Claros': 3,
  'Residencial Sul e Sul Ipês': 3,
  'Sul Ipês': 3,
  'Residencial Vila do Cedro': 3,
  'Sagrada Família': 3,
  'Santa Eugênia': 3,
  'Santo Amaro': 3,
  'Santo Antônio II': 3,
  'Santo Expedito': 3,
  'São Geraldo II': 3,
  'São Judas II': 3,
  'Sumaré': 3,
  'Todos os Santos II': 3,
  'Vila Anália': 3,
  'Vila Atlântida': 3,
  'Vila Ipiranga': 3,
  'Vila Nova': 3,
  'Vila Santa Maria': 3,
  'Alcides Rabelo': 4,
  'Alice Maia': 4,
  'Alto da Boa Vista': 4,
  'Alto São João': 4,
  'Bela Paisagem': 4,
  'Carmelo': 4,
  'Centro': 4,
  'Clarindo Lopes': 4,
  'Conjunto Floresta': 4,
  'Conjunto Havaí': 4,
  'Conjunto José Carlos de Lima': 4,
  'Dr. Antônio Pimenta': 4,
  'Dr. João Alves': 4,
  'Esplanada': 4,
  'Interlagos': 4,
  'Jaraguá I e II': 4,
  'João Botelho': 4,
  'Maria Cândida': 4,
  'Melo': 4,
  'Monte Alegre': 4,
  'Monte Carmelo': 4,
  'Renascença': 4,
  'Residencial dos Ypês': 4,
  'Santa Cecília': 4,
  'Santa Laura': 4,
  'Santa Rita I e II': 4,
  'Santos Reis': 4,
  'São José': 4,
  'Tancredo Neves': 4,
  'Todos os Santos': 4,
  'Vera Cruz': 4,
  'Vila Antônio Narciso': 4,
  'Vila Áurea': 4,
  'Vila Exposição': 4,
  'Vila Regina': 4,
  'Vila São Francisco de Assis': 4,
  'Vila Sion': 4,
  'Vila Telma': 4,
  'Vila Tiradentes': 4,
  'Distrito Industrial': 5,
};

export default Neighborhoods;
