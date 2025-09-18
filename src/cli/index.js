import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import startServer from '../server/index.js';
import  connect  from '../client/index.js';

yargs(hideBin(process.argv))
    .command('start', `Inicia o servidor WebSocket na porta configurada.
    Esse comando coloca o servidor online, pronto para aceitar conexões de clientes e gerenciar mensagens em tempo real.`, () => { }, () => {
        startServer();
    })
    .command('connect','Connectar ao servidor', (yargs)=>{
        return yargs.option('username',{
            alias: 'name',
            type: 'string',
            description: 'Nome do usuário',
            demandOption: false
        })
    }, (argv)=>{
        connect(argv.username)
    })
    .demandCommand(1)
    .parse()