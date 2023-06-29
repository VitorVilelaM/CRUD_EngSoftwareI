import { FastifyInstance } from "fastify";
import {AtualizaNoBanco, DeletaNoBanco, InsereNoBanco, buscaNoBanco } from "../DAO/ProdutoDAO";
import { z } from "zod";
import { Produto } from "../models/Produto";

let app: FastifyInstance;

export async function ProdutoController(app: FastifyInstance) {

    app.get('/produtos/listarProdutos', async (request, reply) => {
        buscaNoBanco();

        reply.send({
            sucess: true,
            statusCode: 200
        });
    })

    app.post('/produtos/cadastrarProduto', (request, reply) => {
        const bodySchema = z.object({
            Price: z.number(),
            Estoque: z.number(),
            Name: z.string(),
            Vendedor: z.string(),
        });

        const {Price, Estoque, Name, Vendedor } = bodySchema.parse(request.body);
        let newProduto = new Produto(Price, Estoque, Name, Vendedor);
        
        InsereNoBanco(newProduto);
        
        reply.send({
            sucess: true,
            statusCode: 200
        });
    });

    app.put('/produtos/atualizarProduto/:params', (request, reply) => {
        const bodySchema = z.object({
            ID: z.number(),
            Price: z.number(),
            Estoque: z.number(),
            Name: z.string(),
            Vendedor: z.string(),
        });

        const {ID, Price, Estoque, Name, Vendedor } = bodySchema.parse(request.body);
        let newProduto = new Produto(Price, Estoque, Name, Vendedor);
        newProduto.setID(ID);

        AtualizaNoBanco(newProduto);
        
        reply.send({
            sucess: true,
            statusCode: 200
        });
    });
    
    app.delete('/produtos/deletarProduto', async (request, reply) => {
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

