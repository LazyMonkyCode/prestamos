import bcrypt from "bcryptjs"


import jwt from "jsonwebtoken"




export async function generateToken(payload,secret="chango12",expire="1h"){

    try {
        var token = await jwt.sign({
            chango:"asdasd"
        }, secret,{ expiresIn: '1h' });

        console.log(token)
    } catch (error) {
        console.log(error)
    }
   

    return token

}

export const passwordHash=async (password)=>{
    try {
       

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)


        return hash
    } catch (error) {


        console.error("Error in passwordHash:", error);
        return { success: false, message: "Error hashing password" };
    }
   
}



export const compareHash=async (password,hash)=>{
    try {
    
        return await bcrypt.compare(password,hash)
    } catch (error) {
        console.error("Error in passwordHash:", error);
        return { success: false, message: "Error hashing password" };
    }
   
}

    
