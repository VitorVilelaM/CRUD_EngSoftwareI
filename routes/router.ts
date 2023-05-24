import { fastify } from 'fastify'
import { ProdutoController } from '../controllers/ProdutoController';

const app = fastify();

app.register(ProdutoController)

app.listen({ port: 3000 }).then(() => { console.log('listening on port 3000') });
