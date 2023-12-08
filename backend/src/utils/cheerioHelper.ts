import cheerio, { Element } from 'cheerio';
import { Captura, Ejecucion, Pagina } from "../models";
import { CapturaRepository } from '../repositories';
import { repository } from '@loopback/repository';
const fetch = require('node-fetch');

export async function processPagina(pagina:Pagina){
    if(!pagina.url){
        console.log(`La página ${pagina.id} no tiene URL definida`)
        return []
    }

    if(!pagina.document_extractor){
        console.log(`La página ${pagina.id} no tiene document extractor definido`)
        return []
    }

    try {
        const fn = eval(pagina.document_extractor)
        let resultados: Array<{url:string, contenido :string}> = []
        let resultadoCompleto = await crawlAnchors(pagina.url, fn, resultados, pagina.profundidad, 0)
        console.log("\n\nResultado completo " , resultadoCompleto)
        return resultadoCompleto
    } catch (error) {
        console.log("Error al intentar parsear el document extractor")
    }

    return []
}

async function crawlAnchors(anchor: string | undefined, extractorFunction: Function, resultadoActual: Array<{url:string, contenido :string}>, profundidad: number, profundidadActual: number){
    if(!anchor || anchor == undefined || !anchor.includes("http"))
        return resultadoActual

    // me agrego a mi mismo
    const res = await fetch(anchor)

    const body = await res.text()

    const $ = cheerio.load(body)
    
    // guardo una captura
    resultadoActual.push({
        url : anchor,
        contenido : extractorFunction($)
    })

    if(profundidad == profundidadActual)
        return resultadoActual

    //y cargo a mis anchors
    let myAnchors = $("a").toArray()

    // filtro por las paginas ya visitadas
    let myAnchorsFiltered = myAnchors.filter(myAnchor =>
        resultadoActual.filter(res => res.url == myAnchor.attributes.find(a => a.name == "href")?.value)
    )

    for (let index = 0; index < myAnchorsFiltered.length; index++) {
        const myAnchor = myAnchorsFiltered[index];
        const myAnchorHref = (myAnchor.attributes.find(a => a.name == "href"))?.value
        console.log("\nYendo a sub pagina: " + myAnchorHref + "\n")
        await crawlAnchors(myAnchorHref, extractorFunction, resultadoActual, profundidad, profundidad+1)
    }

    return resultadoActual
}