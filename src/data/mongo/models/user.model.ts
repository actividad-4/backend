import mongoose from "mongoose";


const userSchema = new mongoose.Schema( {


  name:{
    type: String,
    required: [ true, 'Name is required ' ]
  },
  email :{
    type: String,
    required: [ true, 'Email is required ' ],
    unique: true, //Significaria que no tendriamos ningun correo duplicado en la base de datos.
  },
  password: {
    type: String,
    required: [ true, 'Password is required ' ]
  }
 
} );

//Definimos el esquema y creamo el modelo basado en el esquema.
export const UserModel = mongoose.model('User', userSchema);
