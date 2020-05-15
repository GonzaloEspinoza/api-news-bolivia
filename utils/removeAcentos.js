
// quita los acentos de un string de datos
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 


module.exports ={
    removeAccents
} 
    
