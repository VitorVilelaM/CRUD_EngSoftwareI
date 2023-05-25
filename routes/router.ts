import { fastify } from 'fastify'
import { ProdutoController } from '../controllers/ProdutoController';
import { UsuarioController } from '../controllers/UsuarioController';

const app = fastify();

app.register(ProdutoController)
app.register(UsuarioController)
app.listen({ port: 3000 }).then(() => { console.log('listening on port 3000') });
