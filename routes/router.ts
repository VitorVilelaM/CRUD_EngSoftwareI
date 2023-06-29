import { CompradorController } from '../controllers/CompradorController';
import { ProdutoController } from '../controllers/ProdutoController';
import { fastify } from 'fastify'
const app = fastify();

app.register(ProdutoController)
app.register(CompradorController)

app.listen({ port: 3000 }).then(() => { console.log('listening on port 3000') });
