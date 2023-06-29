import pool from "./conection";
import { Produto } from "../models/Produto";

var a: boolean = true;

export async function buscaNoBanco(){
    var result;
    const data = await pool.getConnection((err: any, conn: any) => {
        if (!err) {

            conn.query('SELECT * from produto', (err: any, rows: any) => {
                if (err) {
                    conn.release()
                    return err
                }

                result = JSON.parse(JSON.stringify(rows));
                console.log(result)
                conn.release()
                return result;

                //Close the connection
            })
        } else {
            conn.release()
        }
    })

    return data;
}

export function InsereNoBanco(newProduto: Produto): boolean {
    pool.getConnection((err: any, conn: any) => {
        if (err) {
            return false;
        }

        conn.query('INSERT INTO produto (Price, Estoque, Nome, Vendedor) values (?, ?, ?, ?)', [newProduto.Price, newProduto.Estoque, newProduto.Name, newProduto.Vendedor], (err: any, rows: any) => {
            if (err) {
                return false;
            }
            //Close the connection
            conn.release()
        });
    });

    return true;
}

export function AtualizaNoBanco(newProduto: Produto): boolean {

    pool.getConnection((err: any, conn: any) => {
        if (!err) {
            conn.query('UPDATE produto SET Price = ?, Estoque = ?, Nome = ?, Vendedor = ? where ID = ?', [newProduto.Price, newProduto.Estoque, newProduto.Name, newProduto.Vendedor, newProduto.ID], (err: any, rows: any) => {
                if (err) {
                    conn.release()
                    return false;
                }
                //Close the connection
                conn.release()
            })
        } else {
            conn.release()
            return false;
        }
    })
    return true;
}

export function DeletaNoBanco(ID: number): boolean{
    a = true;
    pool.getConnection((err: any, conn: any) => {
        if (!err) {
            conn.query('delete from produto where ID = ?', ID, (err: any, rows: any) => {
                if (rows.changedRows == 0) {
                    a = false;
                    conn.release()
                }
            })
        } else {
            conn.release()
            a = false;
        }
    })
    return a;
}

