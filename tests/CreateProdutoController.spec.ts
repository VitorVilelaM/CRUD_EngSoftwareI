import { AtualizaNoBanco, DeletaNoBanco, InsereNoBanco } from '../DAO/ProdutoDAO';
import { Produto } from '../models/Produto';
var produto: Produto, produto2: Produto;
var result: boolean;

describe('Integration Tests - Produto Controller', ()=>{
    produto2 = new Produto(100, 500, 'Teclado Mecanico E-Yoozo z686', 'Redragon - Aliexpress');
    
    it('should create a Produto 1', async ()=>{
        result = await InsereNoBanco(produto2);
        expect(result).toBe(true);
    });

    it('should create a Produto 2', async ()=>{
        result = await InsereNoBanco(produto2);
        expect(result).toBe(true);
    });

    it('should edit a Produto 1', async ()=>{        
        produto = new Produto(120, 500, 'Teclado Mecanico E-Yoozo z686', 'Redragon - Aliexpress');
        result = await AtualizaNoBanco(produto);
        expect(result).toBe(true);
    });

    it('should delete a Produto 2', async ()=>{        
        result = await DeletaNoBanco(201);
        expect(result).toBe(true);
    });
});