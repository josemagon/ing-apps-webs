import cheerio, { Cheerio, CheerioAPI, Element } from 'cheerio';
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
        let resultadosFinales = await crawlAnchors(pagina.url, fn, resultados, pagina.profundidad, 0, pagina.url)
        console.log("\n\nResultado completo " , resultadosFinales)
        return resultadosFinales
    } catch (error) {
        console.log("ERROR : " + error)
    }

    return []
}

async function crawlAnchors(anchor: string | undefined, extractorFunction: Function, resultadoActual: Array<{url:string, contenido :string}>, profundidad: number, profundidadActual: number, urlPaginaPadre:string){
    console.log("Extrayendo " + anchor)
    
    if(!anchor || anchor == undefined || !anchor.includes("http"))
        return []

    let res = null
    
    // agregar manejo de excepciones para requests
    // con problemas de certificado por ejemplo
    try {
        res = await fetch(anchor)
    } catch (error) {
        console.log("Error al intentar extraer datos de " + anchor + ", " + error)
        resultadoActual.push({
            url : anchor,
            contenido : "Error al intentar extraer datos de " + anchor + ", " + error
        })
    }

    if(!res)
        return []

    const body = await res.text()

    const $ = cheerio.load(body)
    
    // guardo una captura
    resultadoActual.push({
        url : anchor,
        contenido : extractorFunction($)
    })
    console.log("\nCaptura guardada\n\n")


    if(profundidad == profundidadActual){
        console.log("\nProfundidad max alcanzada. No busco en mis anchors\n")
        return resultadoActual
    }

    //y cargo a mis anchors
    let myAnchors = $("a").toArray()

    //chequeo que sean validos
    myAnchors = myAnchors.filter(a => $(a).attr("href") && $(a).attr("href") !== undefined && $(a).attr("href")?.includes("http"))

    let myAnchorsFiltered = await limpiarAnchors(myAnchors, $, resultadoActual, urlPaginaPadre)

    console.log("\n\nSe detectaron " + myAnchorsFiltered.length + " enlaces en " + anchor + ". Recorriendo... Bajando un nivel en profundidad...\n\n")

    for (let index = 0; index < myAnchorsFiltered.length; index++) {
        const myAnchor = myAnchorsFiltered[index];
        const myAnchorHref = $(myAnchor).attr("href")
        console.log("\nYendo a sub pagina ("+index+"/"+myAnchorsFiltered.length+"): " + myAnchorHref + "\n")
        resultadoActual.concat(await crawlAnchors(myAnchorHref, extractorFunction, resultadoActual, profundidad, profundidadActual+1, urlPaginaPadre))
    }

    return resultadoActual
}

async function limpiarAnchors(anchors: Element[], $:CheerioAPI, resultadoActual: Array<{url:string, contenido :string}>, urlPaginaPadre:string){
    let anchorsUnicos:Array<Element> = []

    // remover anchors repetidos en la misma pagina
    anchors.forEach(anchor => {
        if(anchorsUnicos.filter(au => $(au).attr("href") === $(anchor).attr("href")).length == 0)
            anchorsUnicos.push(anchor)
    })

    // remover anchors ya visitados
    anchorsUnicos = anchorsUnicos.filter(au =>
        resultadoActual.filter(res => res.url === $(au).attr("href")).length == 0
    )

    // remover anchors que no sean del dominio
    anchorsUnicos = anchorsUnicos.filter(au => 
            $(au).attr("href")?.includes(new URL(urlPaginaPadre).hostname)
        )

    return anchorsUnicos
}