

const controlSectionElDeber = async (req, res, next) => {
    const str = req.params.section;
    const sections = ['santa-cruz', 'pais', 'economia', 'mundo']
    var permtido = false;

    sections.map((d, i) => { if (str === d) { permtido = true } })

    console.log(permtido)
    if (permtido) {
        res.send({message:`Los datos seran cargados en un par de minutos: ${str}`})
        next()
    } else {
        res.status(404).send({ status: 'error', err: 'error seccion no valido', message: 'seccion no valida en la pagina del deber vuelva a intentarlo' })
        return null;
    }

}



const controlSectionCorreoDelSur = async (req, res, next) => {
    const str = req.params.section;

    const sections = ['local', 'sociedad', 'politica', 'seguridad', 'economia', 'mundo']
    
    var permtido = false;

    sections.map((d, i) => { if (str === d) { permtido = true } })

    console.log(permtido)
    if (permtido) {
        next()
    } else {
        res.status(404).send({ status: 'error', err: 'error seccion no valido', message: 'seccion no valida en la pagina del deber vuelva a intentarlo' })
        return null;
    }

}





module.exports = {
    controlSectionElDeber,
    controlSectionCorreoDelSur
}