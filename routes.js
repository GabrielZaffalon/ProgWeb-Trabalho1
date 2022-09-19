import { Router, json } from "express"
import {
    GamesDelete,
    GamesIndex,
    GamesAno,
    GamesNota,
    GamesPesq,
    GamesStore,
    GamesUpdate,
} from "./controllers/GamesController.js"
import { clienteIndex, clienteStore, clienteUpdate, clientesDelete } from "./controllers/ClienteController.js"
const router = Router()

router.use(json())

router
    .get("/games", GamesIndex)
    .post("/games", GamesStore)
    .put("/games/:id", GamesUpdate)
    .delete("/games/:id", GamesDelete)
    .get("/games/pesqjogo/:titulo", GamesPesq)
    .get("/games/pesqgenero/:genero", GamesAno)
    .get("/games/pesqnota/:nota", GamesNota)

router.get("/clientes", clienteIndex).post("/clientes", clienteStore).put("/clientes/:id", clienteUpdate).delete("/clientes/:id", clientesDelete)

export default router
