import { gzipSync, unzipSync } from "zlib"
import { Buffer } from "buffer"

export const objectToString = (object: any): string => {
    return JSON.stringify(object)
}
export const stringToObject = (object: any): string => {
    return JSON.parse(object)
}

export const saveObject = (object: any): string => {
    return gzip(objectToString(object))
}
export const loadObject = (object: string): any => {
    return stringToObject(unzip(object))
}

export const gzip = (data: string) => {
    return gzipSync(
        encodeURIComponent(data)
    ).toString("base64")
    .replaceAll("/","_")
    .replaceAll("+","-")
}
export const unzip = (data: string) => {
    return decodeURIComponent(
        unzipSync(
            Buffer.from(
                data
                    .replaceAll("-","+")
                    .replaceAll("_","/")
                , "base64"
            )
        ).toString("utf8")
    )
}