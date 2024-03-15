import fs from 'fs';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import LoadConfig from './config';

export type CallbackType = (event: string, file: string | Buffer) => Promise<void> | void;

async function CreateEventReadDirectoryAndSendEmail(Directory: string, Destination: string, Callback: CallbackType, ...Events: string[]): Promise<void> {
    if (!fs.existsSync(Directory)) {
        fs.mkdirSync(Directory);
    }
    const watcher = fs.watch(Directory);
    watcher.on("change", async (event, file) => {
        if (Events.includes(event)) {
            await Callback(event, file);
            const config = LoadConfig();
            const html = `
                <!DOCTYPE html>
                <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Alterações realizadas em: ${Directory}</title>
                </head>
                <body>
                    <p>Aconteceram modificações no diretório: ${Directory}</p>
                    <p>As mudanças foram ${event} e o arquivo modificado foi o ${file}</p>
                </body>
                </html>
            `
            const transport: SMTPTransport.Options = {
                auth: {
                    user: config.Email,
                    pass: config.Password,
                },
                host: config.Host,
                port: Number(config.Port),
            }
            const mailer: Transporter = nodemailer.createTransport(transport);
            await mailer.sendMail({ from: config.Email, to: Destination, html: html, subject: `Alterações realizadas em: ${Directory}` })
        }
    })
}

function removeListener(Directory: string, callback: CallbackType): void {
    fs.watch(Directory).removeListener("change", callback);
}

function removeAllListeners(Directory: string){
    fs.watch(Directory).removeAllListeners("change")
}

export { CreateEventReadDirectoryAndSendEmail, removeListener, removeAllListeners };
