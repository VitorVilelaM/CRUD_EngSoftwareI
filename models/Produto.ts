import { FastifyInstance } from "fastify";
import { z } from "zod";
import pool from "../DAO/conection";

export async function Produto(app: FastifyInstance) {

    app.get('/produtos/listarProdutos', (request, reply) => {
        pool.getConnection((err: any, conn: any) => {
            if (!err) {
                conn.query('SELECT * from produto', (err: any, rows: any) => {
                    if (err) {
                        conn.release()
                        return reply.send({
                            sucess: false,
                            statusCode: 400
                        });
                    }

                    reply.send({
                        data: rows
                    });

                    //Close the connection
                    conn.release()
                })
            } else {
                conn.release()
                return reply.send({
                    sucess: false,
                    statusCode: 400
                });
            }
        })
    })

    app.post('/produtos/cadastrarProduto', (request, reply) => {
        pool.getConnection((err: any, conn: any) => {
            if (err) {
                reply.send({
                    sucess: false,
                    statusCode: 500,
                    message: 'Getting error during the connection'
                })

                return;
            }

            const bodySchema = z.object({
                ID: z.number(),
                Price: z.number(),
                Estoque: z.number(),
                Name: z.string(),
                Vendedor: z.string(),
            });
            const { ID, Price, Estoque, Name, Vendedor } = bodySchema.parse(request.body);

            conn.query('INSERT INTO produto (ID, Price, Estoque, Nome, Vendedor) values (?, ?, ?, ?, ?)', [ID, Price, Estoque, Name, Vendedor], (err: any, rows: any) => {
                if (!err) {
                    reply.send({
                        message: 'Sucess',
                        statusCode: 200,
                        data: request.body
                    });
                }

                //Close the connection
                conn.release()
            })

            reply.send({
                sucess: true,
                statusCode: 200,
                message: 'Getting error during the connection'
            })

        });
    })

    app.put('/produtos/atualizarProduto/:id', (request, reply) => {

        const bodySchema = z.object({
            ID: z.number(),
            Price: z.number(),
            Estoque: z.number(),
            Name: z.string(),
            Vendedor: z.string(),
        });

        const { ID, Price, Estoque, Name, Vendedor } = bodySchema.parse(request.body);

        pool.getConnection((err: any, conn: any) => {

            if (!err) {
                conn.query('UPDATE produto SET Price = ?, Estoque = ?, Nome = ?, Vendedor = ? where ID = ?', [Price, Estoque, Name, Vendedor, ID], (err: any, rows: any) => {
                    if (err) {
                        conn.release()
                        return reply.send({
                            sucess: false,
                            statusCode: 400
                        });
                    }

                    reply.send({
                        sucess: true,
                        statusCode: 200
                    });

                    //Close the connection
                    conn.release()
                })
            } else {
                conn.release()
                return reply.send({
                    sucess: false,
                    statusCode: 400
                });
            }
        })
    })

    app.delete('/produtos/deletarProduto', (request, reply) => {
        const bodySchema = z.object({
            ID: z.number(),
        });

        const { ID } = bodySchema.parse(request.body);

        pool.getConnection((err: any, conn: any) => {

            if (!err) {
                conn.query('delete from produto where ID = ?', ID, (err: any, rows: any) => {
                    if (err) {
                        conn.release()
                        return reply.send({
                            sucess: false,
                            statusCode: 400
                        });
                    }

                    reply.send({
                        sucess: true,
                        statusCode: 200
                    });

                    //Close the connection
                    conn.release()
                })
            } else {
                conn.release()
                return reply.send({
                    sucess: false,
                    statusCode: 400
                });
            }
        })

    })
}

