import { FastifyInstance } from "fastify";
import {AtualizaNoBanco, DeletaNoBanco, InsereNoBanco } from "../DAO/CompradorDAO";
import { z } from "zod";
import { Comprador } from "../models/Comprador";

let app: FastifyInstance;

export async function CompradorController(app: FastifyInstance) {

    app.post('/login', (request, reply) => {
        const bodySchema = z.object({
            Nome: z.string(),
            CPF: z.string(),
            Endereco: z.string(),
        });

        const {Nome, CPF, Endereco} = bodySchema.parse(request.body);
        let newComprador = new Comprador(Nome, CPF, Endereco);
        
        InsereNoBanco(newComprador);
        
        reply.send({
            sucess: true,
            statusCode: 200
        });
    });

    app.put('/atualizaCadastro/', (request, reply) => {
        const bodySchema = z.object({
            ID: z.number(),
            Nome: z.string(),
            CPF: z.string(),
            Endereco: z.string(),
        });

        const {ID, Nome, CPF, Endereco} = bodySchema.parse(request.body);
        let newComprador = new Comprador(Nome, CPF, Endereco);
        newComprador.setID(ID);

        AtualizaNoBanco(newComprador);
        
        reply.send({
            sucess: true,
            statusCode: 200
        });
    });
    
    app.delete('/excluirCadastro', async (request, reply) => {
        const bodySchema = z.object({
            ID: z.number(),
        });

        const { ID } = bodySchema.parse(request.body);
        var a = await DeletaNoBanco(ID);

        reply.send({
            sucess: a,
            statusCode: 200
        });
    });

}
export{app};

