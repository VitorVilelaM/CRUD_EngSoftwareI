export class Produto {

    ID : number = 0;
    Price: number = 0;
    Estoque: number = 0;
    Name!: string;
    Vendedor!: string;

    constructor(price: number, estoque: number, name: string, vendedor: string) {
        this.Price = price;
        this.Estoque = estoque;
        this.Name = name; 
        this.Vendedor = vendedor;
    }

    getID(){return this.ID;}
    getPrice(){return this.Price;}
    getEstoque(){return this.Estoque;}
    getName(){return this.Name;}
    getVendedor(){return this.Vendedor}

    setID(id:number){this.ID = id;}
    setPrice(price:number){this.Price = price;}
    setEstoque(estoque:number){this.Estoque = estoque;}
    setName(name:string){this.Name = name;}
    setVendedor(vendedor: string){this.Vendedor = vendedor;}
}