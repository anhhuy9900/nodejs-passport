import bcrypt from 'bcryptjs'
import crypto from 'crypto';

export const hashPassword = async(password: string) =>{
    return await bcrypt.hash(password, 10);
}
 
// compare password
export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}

export const validPassword = (password: string, hash: string, salt: string) => {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

/**
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security, it using crypto to encrypt password
 * @param password 
 * @returns 
 */
export const genPassword = (password: string) => {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}
  