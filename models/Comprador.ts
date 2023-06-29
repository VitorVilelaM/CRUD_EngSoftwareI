export class Comprador {

    ID!: number;
    Name!: string;
    CPF!: string;
    Endereco!: string;

    constructor(name: string, cpf: string, endereco: string) {
        this.Name = name; 
        this.CPF = cpf;
        this.Endereco = endereco;
    }

    getName(){return this.Name;}
    getCPF(){return this.CPF}
    getEndereco(){return this.Endereco}
    getID(){return this.ID}

    setName(name:string){this.Name = name;}
    setCPF(cpf: string){this.CPF = cpf;}
    setEndereco(endereco: string){this.Endereco = endereco}
    setID(id: number){this.ID = id}
}