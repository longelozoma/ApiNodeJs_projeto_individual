// requisicaouerindo express
const express = require('express'); 
// variavel app/express 
const app = express();
// criando porta 
const porta = 3000;
// requisicaouerindo mongoose 
const mongoose = require('mongoose');

const registro = require("./modelo/migracao");

app.use(express.json())

app.post("/registro",function(requisicao,resposta){
    let cadastrar = new registro(requisicao.body)

    cadastrar.save(function(erro,certo){
        if(erro){
            resposta.send({erro:"Usuario ja existe"})
        }else{
            resposta.status(201).json({certo})
        }
    })
})






app.get("/registro",async function(requisicao,resposta){
    try{
        const todosRegistros = await registro.find();
    
        return resposta.status(200).send({todosRegistros})
        }
    catch(erro){
            return resposta.status(404).send({erro})
        }
})



// Atualizar 

app.put("/registro/:id",function(requisicao,resposta){
    registro.findOneAndUpdate({_id:requisicao.params.id}, requisicao.body, {new:true}, function(erro,trilha){
        if(erro){
            resposta.json({erro:"Não foi possivel atualizar"})
        }else{
            resposta.json({message: "Registro atualizado"})
        }
    })
})



// Deletar 

app.delete("/registro/:id",function(requisicao,resposta){
    registro.deleteOne({_id:requisicao.params.id}, function(erro,trilha){
        if(erro){
            resposta.json({erro:"Registro não encontrada"})

        }else{
            resposta.json({message:"Registro deletada com sucesso"})
        }
    })
})

// conectando com banco de dados 
mongoose.connect('mongodb://localhost:27017/imigracao').then(function(){
    app.listen(porta,function(){
        console.log("App rodando no url http://localhost:3000/registro")
    })
    console.log("conectado com sucesso...")
}).catch(function(erro){
    console.log(`Falha ao conectar o banco de dados: ${erro}`)
})