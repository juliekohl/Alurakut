import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests( request, response) {

  if(request.method === 'POST') {
    const TOKEN = '9d391c9e84fa16603ffc1229e2bc4a';
    const client = new SiteClient(TOKEN);
  
    const resgistroCriado = await client.items.create({
      itemType: "967819",
      ...request.body,
      // title: "Comunidade de Teste",
      // imageUrl: "https://github.com/juliekohl.png",
      // creatorSlug: "juliekohl"
    })
  
    response.json({
      dados: 'Algum dado qualquer',
      resgistroCriado: resgistroCriado,
    })
    return;
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET'
  })
}