import { HttpResponse, http } from 'msw';

const allPosts = new Map()

const clients = [
    {
      id: '1',
      name: 'Alexandre',
      email: 'alexandre@gmail.com',
      about: 'cliente premium'
    },
    {
      id: '2',
      name: 'Bruno',
      email: 'bruno@gmail.com',
      about: 'cliente gold'
    },
    {
      id: '3',
      name: 'Carlos',
      email: 'carlos@gmail.com',
      about: 'cliente silver'
    },
    {
      id: '4',
      name: 'Duda',
      email: 'duda@gmail.com',
      about: 'cliente premium'
    },
    {
      id: '5',
      name: 'Edu',
      email: 'edu@gmail.com',
      about: 'cliente silver'
    }
];

export const handlers = [

    http.get('/api/clients', async () => 
        await HttpResponse.json(clients)
    ),
    http.get('/api/client/:id', async ({ params }) => {
        const { id } = params;
        const client = clients.find(client => client.id === id);
        if (!client) {
          return await new HttpResponse(null, { status: 404})
        }
        return await HttpResponse.json(client)
    }),
    http.delete('/client/:id', async ({ params }) => {
        const { id } = params;

        const deletedClientIndex = clients.findIndex(client => client.id === id);

        if (deletedClientIndex === -1) {
            return await new HttpResponse(null, { status: 404 });
        }

        const deletedClient = clients[deletedClientIndex];
        clients.splice(deletedClientIndex, 1); 

        return await HttpResponse.json(deletedClient);
    }),
    http.post('/api/clients', async ({ request }) => {
        try {
            const newPost = await request.json();

            if (!newPost || typeof newPost !== 'object' || !('id' in newPost)) {
                throw new Error('Invalid post data received');
            }

            allPosts.set(newPost.id, newPost);

            return await HttpResponse.json(newPost, { status: 201 });
        } catch (error) {

            return await HttpResponse.json(`Erro ao processar requisição POST ${error}`);
        }
    }),
    http.put('/api/client/:id', async ({ request }) => {
        try {
            const nextPost = await request.json()

            if (!nextPost || typeof nextPost !== 'object' || !('id' in nextPost)) {
                throw new Error('Invalid post data received');
            }

            allPosts.set(nextPost.id, nextPost);

            return await HttpResponse.json(nextPost, { status: 200 });
        
        } catch (error) {
            return await HttpResponse.json(`Erro ao processar requisição POST ${error}`);
        }
    }),

];