import dbKnex from "../data/db_config.js"

export const GamesIndex = async (req, res) => {
    try {
        const jogos = await dbKnex.select("*").from("games")
        res.status(200).json(jogos)
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}

export const GamesStore = async (req, res) => {
    const { titulo, ano, genero, nota, preco } = req.body
    if (!titulo || !ano || !genero || !preco) {
        res.status(400).json({
            id: 0,
            msg: "Erro, informe os dados corretamente",
        })
        return
    }

    try {
        const novo = await dbKnex("games").insert({
            titulo,
            ano,
            genero,
            nota,
            preco,
        })
        res.status(201).json({ id: novo[0], msg: "Inserido com sucesso" })
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}

export const GamesUpdate = async (req, res) => {
    const { id } = req.params
    const { titulo, ano, genero, nota, preco } = req.body
    if (!titulo || !ano || !genero || !preco) {
        res.status(400).json({
            id: 0,
            msg: "Erro, informe os dados corretamente",
        })
        return
    }
    try {
        await dbKnex("games")
            .where({ id })
            .update({ titulo, ano, genero, nota, preco })
        res.status(200).json({ msg: "Atualizado com sucesso" })
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}

export const GamesDelete = async (req, res) => {
    const { id } = req.params
    try {
        await dbKnex("games").where({ id }).del()
        res.status(200).json({ msg: "Deletado com sucesso" })
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}

export const GamesPesq = async (req, res) => {
    const { titulo } = req.params
    try {
        const games = await dbKnex("games").whereLike("titulo", titulo)
        res.status(200).json(games)
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}

export const GamesAno = async (req, res) => {
    const { genero } = req.params
    try {
        const games = await dbKnex("games")
            .whereLike("genero", genero)
            .orderBy("genero")
        res.status(200).json(games)
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}

export const GamesNota = async (req, res) => {
    const {nota} = req.params
    try {
        const games = await dbKnex("games").whereLike("nota", nota).orderBy("nota")
        res.status(200).json(games)
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}
