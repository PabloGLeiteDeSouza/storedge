import fs from "fs"
import SMTPTransport from "nodemailer/lib/smtp-transport";

async function awaitEventsInDirectory(Directory: string, ...Events: string[]) {
    
    if (!fs.existsSync(Directory)) {
        fs.mkdir(Directory, (err) => { throw err })
    }
    const watcher = fs.watch(Directory);
    watcher.addListener("change", (event, file) => {

    })
}