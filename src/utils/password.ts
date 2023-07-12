import bcrypt from 'bcryptjs'

export const hashPassword = async(password: string) =>{
    return await bcrypt.hash(password, 10);
}
 
// compare password
export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}