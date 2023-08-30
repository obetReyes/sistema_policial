import { z } from "zod";
const callTimeContraint = z
  .string()
  .min(7, {
    message:
      "la descripcion del tiempo de llamada de no puede tener menos de 7 caracteres",
  })
  .max(120, {
    message:
      "la descripcion del tiempo de llamada no puede exceder los 120 caracteres",
  });

const incidentContraint = z
  .string()
  .min(20, {
    message: "la descripcion del incidente no puede ser menor a 20 caracteres",
  })
  .max(400, {
    message: "la descripcion del incidente no puede exceder los 400 caracteres",
  })
  .trim();

const requestorContraint = z
  .string()
  .min(7, {
    message:
      "el nombre de la persona o las personas que llamaron no puede ser menor a 7 caracteres",
  })
  .max(100, {
    message:
      "el nombre de la persona o personas que llamaron no puede exceder los 100 caracteres",
  })
  .trim();

const notesContraint = z
  .string()
  .min(20, {
    message: "las notas de la llamada no pueden ser menores a 30 caracteres",
  })
  .max(400, {
    message: "las notas de llamada no pueden exceder los 400 caracteres",
  })
  .trim();

const locationContraint = z
  .string()
  .min(10, {
    message: "la ubicacion del incidente no puede ser menor a 10 caracteres",
  })
  .max(250, {
    message: "la ubicacion de la incidente no puede ser mayor a 250 caracteres",
  })
  .trim();

const phoneContraint = z
  .string()
  .min(10, {
    message: "el numero de telefono no puede ser inferior a 10 numeros",
  })
  .max(20, { message: "el numero de telefono no puede ser mayor a 20 numeros" })
  .regex(new RegExp("^[0-9]+$"), {
    message: "el numero no puede incluir letras o caracteres especiales",
  });

export const summaryValidator = z.object({
  body: z
    .object({
      callTime: callTimeContraint,
      incident: incidentContraint,
      requestor: requestorContraint,
      notes: notesContraint,
      location: locationContraint,
      phone: phoneContraint,
    })
    .strict(
      "los unicos campos disponibles son: callTime, incident, requestor, notes,location y phone"
    ),
});

export const summaryParamsValidator = z.object({
  params: z
    .object({
      // eslint-disable-next-line no-useless-escape
      summaryId: z
        .string()
        .min(1, { message: "el numero no puede ser negativo" })
        .regex(/^(0|[1-9]\d*)$/, {
          message:
            "el numero no puede incluir letras,caracteres especiales ni tampoco puede incluir numeros negativos",
        }),
    })
    .strict("el unico parametro disponible es: el id del sumario"),
});

export const summaryQueryValidator = z.object({
  query: z
    .object({
      dispatcher: z
        .string()
        .min(6, {
          message:
            "el nombre del emisario no puede tener menos de 6 caracteres",
        })
        .max(60, {
          message: "el nombre del emisario no puede exceder los 60 caracteres",
        })
        .optional(),
        incident:z
        .string()
        .min(5, {
          message: "la descripcion del incidente no puede ser menor a 5 caracteres",
        })
        .max(300, {
          message: "la descripcion del incidente no puede exceder los 300 caracteres",
        })
        .trim().optional(),
        limit:z.coerce.number().min(1,{message:"el numero no puede ser negativo"}).nonnegative({message:"el numero no puede ser negativo"}).max(100, {message:"el limite de datos requerido excede el limite de peticios de datos, se pueden obtener un maximo de 100 datos por llamada"}).optional().transform(String),
        starting_after:z.coerce.number().nonnegative({message:"no existen datos con un id negativo"}).optional()
    })
    .strict(
      "los unicos parametros query disponibles son: dispatcher, limit y starting_after"
    ),
});

export const summaryUpdateValidator = z.object({
  body: z
    .object({
      id: z
        .number()
        .nonnegative({ message: "los ids negativos no son validos" }),
      callTime: callTimeContraint,
      incident: incidentContraint,
      requestor: requestorContraint,
      notes: notesContraint,
      location: locationContraint,
      phone: phoneContraint,
    })
    .strict(
      "los unicos campos disponibles son: id, callTime, incident, requestor, notes, location y phone"
    ),
});
