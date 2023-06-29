import { FastifyInstance } from "fastify";
import { UsuarioModel } from "../models/Usuario";

export async function UsuarioController(app: FastifyInstance) {
    app.register(UsuarioModel);
}
