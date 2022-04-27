import bcrypt from 'bcryptjs'

let userData = [
    {
        // _id: 1,
        name: "Raihan",
        email: "raihanbiswas.dev@gmail.com",
        password: bcrypt.hashSync("123456789"),
        isAdmin:true
    },
    {
        // _id: 1,
        name: "Rashed",
        email: "tareq.editor@gmail.com",
        password: bcrypt.hashSync("123456789"),
        isAdmin:false
    },

]

export default userData

