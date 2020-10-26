import CryptoJs from 'crypto-js';
const Encrypt = (inputText) => {
    const ciphertext = CryptoJs.AES.encrypt(inputText,
        CryptoJs.enc.Utf8.parse('wwwwwwwwwwwwwww1wwwwwwwwwwwwwww1'),
        {
            iv: CryptoJs.enc.Utf8.parse('1234567890123456'),
            mode: CryptoJs.mode.CBC,
            padding: CryptoJs.pad.Pkcs7
        });
    return CryptoJs.enc.Base64.stringify(ciphertext.ciphertext)
}
export default Encrypt