import cheerio from 'cheerio';
import { Pagina } from "../models";
const fetch = require('node-fetch');

export async function processPagina(pagina:Pagina){
    if(!pagina.url){
        console.log(`La página ${pagina.id} no tiene URL definida`)
        return {
            "error" : `La página ${pagina.id} no tiene URL definida`
        }
    }

    if(!pagina.document_extractor){
        console.log(`La página ${pagina.id} no tiene document extractor definido`)
        return {
            "error" : `La página ${pagina.id} no tiene document extractor definido`
        }
    }

    const res = await fetch(pagina.url)

    const body = await res.text()

    const $ = cheerio.load(body)

    try {
        const fn = eval(pagina.document_extractor)
        return fn($)
    } catch (error) {
        console.log("Error al intentar parsear el document extractor")
    }

    return {}
}