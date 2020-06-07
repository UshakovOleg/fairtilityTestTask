import {Controller, Get, HttpException, HttpStatus, Inject} from '@nestjs/common';
import {LogsService} from "./logs.service";
import {getHostCountItem} from "./dto/getHostCountItem";
@Controller('logs')
export class LogsController {
    constructor (
        private readonly logsService: LogsService,
    ) {}
    @Get()
    async getStatistics(): Promise<getHostCountItem[]> {
        // getting parsed data
        let stats = await this.logsService.getLogData('log_example.log');
        let res: { [key: string]: getHostCountItem } = {};

        // pass data to object to count host entries
        for (let i = 0; i < stats.length; ++i) {
            const host = stats[i]['cs-host'];
            if(!host) {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if(!res[host]) {
                res[host] = {
                    Host: host,
                    Count: 1
                }
            } else {
                res[host].Count += 1
            }
        }
        stats = [];
        // get an array of each host
        let resArr = Object.keys(res).map(k => res[k]);
        res = {};
        // return sorted data
        // TODO: use another sort algorithm if dataset size grows or is planned to be bigger, e.g. quick sort
        const sorted = resArr.sort((a, b) => {
            return b.Count - a.Count;
        });
        console.log(sorted);
        return sorted;

    }
}
