import * as fs from "fs";

export async function writeFile(path: string, data: Buffer, options: fs.WriteFileOptions): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, options, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}