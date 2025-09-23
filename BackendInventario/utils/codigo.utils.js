const {Op} = require ("sequelize");
const db = require ('../models')
const Componente = db.componente



async function generarCodigo(nombre) {

    const palabras = nombre.split('').slice(0, 2);
    const codigoPalabras = palabras.map (p => p.slice(0, 3).toUpperCase()). join('-');

    const count = await Componente.count({where:{codigo:{[Op.startsWith]: codigoPalabras}}});

    const numero = String(count + 1).padStart(3,'0');
    return `${codigoPalabras}-${numero}`;
}
module.exports = {generarCodigo};



//async function generarCodigo(nombre) {
//    try {
//        const palabras = nombre.trim().split('');
//        const codigoPalabras = palabras
//            .slice(0,2)
//            .map(p => p.slice(0,3).toUpperCase())
//            .join('-');

//        const count = await Componente.count8({
//            where:{
//                codigo: {[Op.startsWith]: codigoPalabras}
//            }
 //       });

//        const numero = String(count + 1).padStart(3, '0');
//        return `${codigoPalabras}-${numero}`;

//    } catch (error) {
//        throw new Error("error en generar codigo.");

//    }  
//}
//module.exports = {generarCodigo};