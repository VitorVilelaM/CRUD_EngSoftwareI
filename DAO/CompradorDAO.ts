import { Comprador } from "../models/Comprador";
import pool from "./conection";

var a: boolean = true;

export function InsereNoBanco(newComprador: Comprador): boolean {
    pool.getConnection((err: any, conn: any) => {
        if (err) {
            return false;
        }

        conn.query('INSERT INTO comprador (Nome, CPF, Endereco) values (?, ?, ?)', [newComprador.Name, newComprador.CPF, newComprador.Endereco], (err: any, rows: any) => {
            if (err) {
                return false;
            }
            //Close the connection
            conn.release()
        });
    });

    return true;
}

export function AtualizaNoBanco(newComprador: Comprador): boolean {

    pool.getConnection((err: any, conn: any) => {
        if (!err) {
            conn.query('UPDATE comprador SET Nome = ?, CPF = ?, Estoque = ? where ID = ?', [newComprador.Name, newComprador.CPF, newComprador.Endereco, newComprador.ID], (err: any, rows: any) => {
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
            conn.query('delete from comprador where ID = ?', ID, (err: any, rows: any) => {
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

