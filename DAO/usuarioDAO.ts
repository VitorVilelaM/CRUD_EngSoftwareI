import { FastifyInstance, fastify } from "fastify";
import pool from "./conection";
import { z } from "zod";

export async function UsuarioDAO(app: FastifyInstance) {

    app.get('/usuarios/listarUsuarios', (request, reply) => {
        pool.getConnection((err: any, conn: any) => {
            if (!err) {
                conn.query('SELECT * from usuario', (err: any, rows: any) => {
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

    app.post('/usuarios/cadastrarUsuario', (request, reply) => {
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
                CPF: z.number(),
                Name: z.string(),
                Endereco: z.string(),
            });
            const { CPF, Name, Endereco } = bodySchema.parse(request.body);

            conn.query('INSERT INTO usuario (CPF, Nome, Endereco) values (?, ?, ?)', [CPF, Name, Endereco], (err: any, rows: any) => {
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

    app.put('/usuarios/atualizarUsuario/:cpf', (request, reply) => {

        const bodySchema = z.object({
            CPF: z.number(),
            Name: z.string(),
            Endereco: z.string(),
        });

        const { CPF, Name, Endereco } = bodySchema.parse(request.body);

        pool.getConnection((err: any, conn: any) => {

            if (!err) {
                conn.query('UPDATE usuario SET Nome = ?, Endereco = ? where CPF = ?', [Name, Endereco, CPF], (err: any, rows: any) => {
                    console.log('estou aqui')   
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

    app.delete('/usuarios/deletarUsuario', (request, reply) => {
        const bodySchema = z.object({
            CPF: z.number(),
        });

        const { CPF } = bodySchema.parse(request.body);

        pool.getConnection((err: any, conn: any) => {

            if (!err) {
                conn.query('delete from usuario where CPF = ?', CPF, (err: any, rows: any) => {
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

