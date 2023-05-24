import { FastifyInstance } from "fastify";
import { Produto } from "../models/Produto";

export async function ProdutoController(app: FastifyInstance) {
    app.register(Produto)
}
