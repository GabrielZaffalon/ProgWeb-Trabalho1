import dbKnex from '../data/db_config.js'

export const clienteIndex = async (req, res) => {
  try {
    const clientes = await dbKnex.select("*").from("clientes").orderBy("nome")
    res.status(200).json(clientes)
  } catch (error) {res.status(400).json({ id: 0, msg: "Erro: " + error.message })}
}

export const clienteStore = async (req, res) => {
  const { nome, email, idade } = req.body
  if (!nome || !email || !idade) {
    res.status(400).json({ id: 0, msg: "Erro... informe nome, email e senha do cliente" })
    return}
  try {
    const novo = await dbKnex('clientes')
      .insert({ nome, email, idade })
    res.status(201).json({ id: novo[0], msg: "Ok! Inserido com sucesso" })
  } catch (error) {res.status(400).json({ id: 0, msg: "Erro: " + error.message })}
}

export const clienteUpdate = async (req, res) => {
  const { id } = req.params
  const { nome, email, idade } = req.body
  if (!nome || !email || !idade) {
      res.status(400).json({
          id: 0,
          msg: "Erro, informe os dados corretamente",
      })
      return
  }
  try {
      await dbKnex("clientes")
          .where({ id })
          .update({ nome, email, idade })
      res.status(200).json({ msg: "Atualizado com sucesso" })
  } catch (error) {
      res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}
