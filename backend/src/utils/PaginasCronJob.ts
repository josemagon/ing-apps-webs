import { CronJob, cronJob } from "@loopback/cron";
import { repository } from "@loopback/repository";
import { PaginaRepository } from "../repositories";
import { processPagina } from "./cheerioHelper";

@cronJob()
export class PaginasCronJob extends CronJob {

    constructor(@repository(PaginaRepository) public paginarepo: PaginaRepository) {

        super({
            name: 'paginas-cron-jon', onTick: async () => {
                let paginas = await paginarepo.find()
                paginas.forEach(async p => {
                    const result = await processPagina(p)
                    console.log(`Info extraida de ${p.titulo}: ` , result)
                })
            },
            cronTime: '*/10 * * * * *',
            start: true
        })

    }
}