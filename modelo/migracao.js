const mongoose = require("mongoose");
const esquema = mongoose.Schema;


const migracao = new esquema({
    nomeCompleto:{type:String},
    dataNascimento:{type:String},
    estadoCivil:{type:String},
    Nacionalidade:{type:String},
    tipoDocumento:{type:String},
    Documento:{type:String,index:{unique:true}},  
    situacaoMigratoria:{type:String},
    dataRegistro:{type:Date,default:Date.now} 
})

module.exports = mongoose.model("registro",migracao)