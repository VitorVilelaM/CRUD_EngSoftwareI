import { FastifyInstance } from "fastify";
import { UsuarioDAO } from "../DAO/usuarioDAO";

export async function UsuarioModel(app: FastifyInstance) {
    app.register(UsuarioDAO)
}