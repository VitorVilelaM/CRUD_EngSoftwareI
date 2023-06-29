import { Produto } from "../models/Produto";

var result: boolean;
var produto: Produto;

describe('Unit Tests - Produto Controller', ()=>{
    
    it('should create a object Produto', async ()=>{
        produto = new Produto(150, 500, 'Teclado Mecanico E-Yoozo z686', 'Redragon - Aliexpress');
        if(produto != null){
            result = true;
        }else{
            result = false;
        }
        expect(result).toBe(true);
    });

    it('should get datas a object Produto', async ()=>{
        const var1 = produto.getEstoque(), var2 = produto.getID(), var3 = produto.getName(),
        var4 = produto.getPrice(), var5 = produto.getVendedor();

        if(var1 != null && var2 != null && var3 != null && var4 != null && var5 != null){
            result = true;
        }else{
            result = false;
        }
        expect(result).toBe(true);
    });
});

