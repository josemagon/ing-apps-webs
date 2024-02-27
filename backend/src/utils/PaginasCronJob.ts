import { CronJob, cronJob } from "@loopback/cron";
import { repository } from "@loopback/repository";
import { CapturaRepository, EjecucionRepository, PaginaRepository } from "../repositories";
import { processPagina } from "./cheerioHelper";
import { Ejecucion } from "../models";

@cronJob()
export class PaginasCronJob extends CronJob {

    constructor(@repository(PaginaRepository) public paginarepo: PaginaRepository,
    @repository(CapturaRepository) public capturaRepository: CapturaRepository,
    @repository(EjecucionRepository) public ejecucionRepository: EjecucionRepository) {

        super({
            name: 'paginas-cron-jon', onTick: async () => {
                let paginas = await paginarepo.find()
                paginas.forEach(async p => {

                    if(p.running)
                        console.log("Pagina " + p.id + " ya tiene un cronjob en ejecucion y no se creará otro")

                    if(!p.running){
                        p.running = true
                        paginarepo.save(p)
    
                        const result = await processPagina(p)
                        const newEjececucionData = {
                            status : "COMPLETA",
                            fecha : '2023-11-13'
                        }
                        let newEjecucion = await paginarepo.ejecuciones(p.id).create(newEjececucionData)
    
                        for (let index = 0; index < result.length; index++) {
                            const element = result[index];
                            const newCapturaData = {
                                nombre : "Captura de página " + p.titulo,
                                url : element.url,
                                contenido : JSON.parse(JSON.stringify(element.contenido))
                            }
                            await ejecucionRepository.capturas(newEjecucion.id).create(newCapturaData)
                        }
    
                        console.log(`Info extraida de ${p.titulo}: ` , result)
    
                        p.running = false
                        paginarepo.save(p)
                    }
                })
            },
            cronTime: '*/20 * * * * *',
            start: true
        })

    }
}