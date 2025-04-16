import crypto from 'crypto';
const apiEncodeKey = 'dc3d7e0eca5060752c0d5dbf94a46275';
const apiIvKey = '89751c14a210caa6';


// Function to decrypt data matching the provided code
export function aesDecrypt(encryptedData: string, isBase64 = true) {
    try {
        if (!encryptedData) throw new Error('Encrypted data is required');
        // If data is base64 encoded, decode it first
        const data = isBase64 ? Buffer.from(encryptedData, 'base64').toString() : encryptedData;

        // Convert key and IV from hex to Buffer objects
        // IMPORTANT CHANGE: The reference code uses UTF-8 parsing, not hex
        const keyBuffer = Buffer.from(apiEncodeKey);
        const ivBuffer = Buffer.from(apiIvKey);

        // Create decipher
        const decipher = crypto.createDecipheriv(
            'aes-256-cbc',
            keyBuffer,
            ivBuffer
        );

        // Set padding to match PKCS#7 (which is the same as PKCS#5 in Node.js)
        decipher.setAutoPadding(true);

        // Decrypt the data
        let decrypted = decipher.update(data, 'base64', 'utf8');
        decrypted += decipher.final('utf8');

        // Parse the result as JSON if it looks like JSON
        try {
            return JSON.parse(decrypted);
        } catch {
            return decrypted;
        }
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
}