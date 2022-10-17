import autores from "../models/Autor.js"

class autoresController {

    static listarAutores = (req, res) =>{
        autores.find((err, autores) => {
            res.status(200).json(autores)
          })
    }

    static listarAutoresPorId = (req, res) =>{
        const id = req.params.id;

        autores.findById(id, (err, autores) => {
            if(err){
                res.status(400).send({message: `${err.message} - Id não localizado`});
            }
            else{
                res.status(200).send(autores);
            }


        })


    }

    static cadastrarAutores = (req, res) => {
        let autor = new autores(req.body);
        autor.save((err) => {
            if (err)
            {
                res.status(500).send({message: `${err.message} - falha ao cadastrar autor.`});
            }else
            {
                res.status(201).send(autor.toJSON())
            }

        })

    }

    static atualizarAutor = (req, res) => {
        let id = req.params.id;
        autores.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
                        if(!err) {
                            res.status(200).send({message: "autor atualizado com sucesso."})
                         }
                         else{
                            res.status(500).send({message: `${err.message} - Erro ao atualizar autor`})
                         }   
            }
        )
    }

static deletarAutor = (req, res) => {
    let id  = req.params.id;
    autores.findByIdAndDelete(id, (err) => {
        if(!err){
            res.status(200).send({message: "autor removido com sucesso."})
        }
        else{
            res.status(500).send({message: `${err.message} - Erro ao remover autor`})
        }
    })


}
 
}

export default autoresController;