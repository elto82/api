import { Response, Request } from "express";
import {
  findUser,
  findUserRol,
  findUserByRolPersonType,
  findUserPerson_type,
  findUserName,
  getUserSoloByEmail,
  updatePasswordUser,
  findUserByEmail,
} from "./uHelper";
import { sequelize } from "../../db";
import exp from "constants";
import { MailService } from "../../services/mailerService";
import clientUserTemplate from "../../templates/clientUserTemplate";

//Traemos la tabla de nuestra DB.
const { User } = sequelize.models;

//  GET USERS  //
export const getUser = async (req: Request, res: Response) => {
  //Tratamos errores por buenas practicas.
  try {
    const { rol, person_type, name, email } = req.query;
    //Si no hay rol, trae todos los usuarios.
    if (!rol && !person_type && !name && !email) {
      const users = await findUser(); //helper trae todas las props.
      return res.status(200).json(users);
    }

    //Si hay rol y hay person_type, trae todos los usuarios con ese rol y person_type.
    if (rol && person_type && !name && !email) {
      const userByRolPersonType = await findUserByRolPersonType(
        rol as string,
        person_type as string
      );
      return res.status(200).json(userByRolPersonType);
    }

    //Si hay rol y no hay person_type, trae todos los usuarios con ese rol.
    if (rol && !person_type && !name && !email) {
      const userRole = await findUserRol(rol as string);
      return res.status(200).json(userRole);
    }

    //Si no hay rol y hay person_type, trae todos los usuarios con ese person_type.
    if (!rol && person_type && !name && !email) {
      const userPerson_type = await findUserPerson_type(person_type as string);
      return res.status(200).json(userPerson_type);
    }

    //Si hay un name me traigo ese usuario
    if (!rol && !person_type && !email && name) {
      const userName = await findUserName(name as string);
      return res.status(200).json(userName);
    }

    //si hay un email me traigo ese usuario
    if (!rol && !person_type && !name && email) {
      const findEmail = await findUserByEmail(email as string);
      return res.status(200).json(findEmail);
    }
  } catch (error) {
    return res.status(404).send({ error: error }); //enviar tipo de error
  }
};

//  POST USER  //
export const postUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const findEmail = await findUserByEmail(user.email);
    //console.log("esto es findEmail ==>", findEmail);
    if (findEmail) {
      throw new Error("Este email ya esta registrado.");
    }

    //validamos si los campos son nulos.
    if (!user.email || !user.name) {
      throw new Error("Campos incompletos, completar correctamente datos.");
    } else {
      //si los campos son correctos, creamos el usuario.
      await User.create(req.body);

      //ENVIAR EMAIL A USUARIO
      const emailTemplate = clientUserTemplate(user.name);
      let sendmail = await MailService(
        user.email,
        "Bienvenido - PropTech",
        emailTemplate.html
      );

      res.send({ msj: "Usuario creado correctamente", user: req.body });
    }
  } catch (error: any) {
    console.log("esto es error ==>", error);
    res.status(404).send({ error: error.message });
  }
};

//  PUT USER  //
export const putUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const updateUser = await updatePasswordUser(email);

    res.send({ msj: updateUser });
  } catch (error) {
    res.status(404).send(error);
  }
};

////////////////////////////////////////////////////

//GOOGLE!

export const googleAcces = async (req: Request, res: Response) => {
  const comparing = req.body;
  try {
    const response = await getUserSoloByEmail(comparing);
    //console.log("esto es comparing ==>", response);
    if (!response) return res.status(400).send("Error: password wrong");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};
