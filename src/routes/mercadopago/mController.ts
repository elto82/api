import { Request, Response, Router } from "express";
import mercadopago from "mercadopago";
import type {
  CreatePreferencePayload,
  PreferenceBackUrl,
} from "mercadopago/models/preferences/create-payload.model";
import config from "../../../lib/config";
import { sequelize } from "../../db";
const { Form } = sequelize.models;

export const createOrder = async (req: Request, res: Response) => {
  const form = req.body;

  // Verificar campos obligatorios
  if (!form.dni || !form.title || !form.description || !form.unit_price) {
    res
      .status(400)
      .json({ message: "Faltan campos obligatorios en el formulario" });
    return;
  }

  const findForm = await Form.findOne({ where: { dni: form.dni } });

  console.log(findForm.dataValues); // Imprimir los valores de findForm en la consola

  mercadopago.configure({ access_token: config.accessToken });

  const preference: CreatePreferencePayload = {
    binary_mode: true,
    items: [
      {
        id: form.dni,
        title: form.title,
        description: form.description,
        picture_url:
          "https://utan.edu.mx/blog/wp-content/uploads/2016/06/administracion.jpg",
        quantity: 1 as number,
        currency_id: "ARS",
        unit_price: form.unit_price as number,
      },
    ],
    back_urls: {
      success: "https://proptech.bio/",
      failure: "https://proptech.bio/",
      pending: "",
    } as PreferenceBackUrl,
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(async function (response) {
      await Form.update(
        {
          preferenceIdMP: response.body.id,
        },
        {
          where: { id: findForm.dataValues.id },
        }
      );

      res.status(200).json({ global: response.body.id });
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        res
          .status(400)
          .json({ message: "Error en los campos de la solicitud" });
      } else {
        res
          .status(500)
          .json({ message: "Error al crear la preferencia de pago" });
      }
    });
};

// Verificar pago y modificar tabla de form
export const getPayment = async (req: Request, res: Response) => {
  await Form.update(
    {
      payed: req.body.status,
    },
    {
      where: { preferenceIdMP: req.body.preference_id },
    }
  );
};
