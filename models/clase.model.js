module.exports = (sequelize, Sequelize) => {
    const Clase = sequelize.define("clase", {
        nombre: {
            type: Sequelize.STRING,   //tipo tiene que tener la clase que lo va a llamar                                                     
        }
                            //la foranea debe estar dentro de la tabla que va a ser llamada pero
            //con el ID del que lo va a llamar 
        
    });
    return Clase;
}