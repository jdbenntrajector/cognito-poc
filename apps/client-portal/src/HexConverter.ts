
const { decode } = require('hex-encode-decode')

export const hexToString = (encodedHex:string) => {
    return decode(encodedHex)
}