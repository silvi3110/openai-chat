require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();

app.use(express.json());


// Endpoint POST /chat
app.post("/chat", async (req, res) => {

  const message = req.body.message;


  // Validación si no existe mensaje
  if (!message) {
    return res.status(400).json({
      error: "El campo message es obligatorio"
    });
  }


  // Validación si no es texto
  if (typeof message !== "string") {
    return res.status(400).json({
      error: "El campo message debe ser texto"
    });
  }


  try {

    const response = await client.responses.create({

      model: "gpt-4.1-mini",

      input: message

    });


    res.json({

      response: response.output_text

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({

      error: "Error al comunicarse con OpenAI"

    });

  }

});


// Encender servidor
app.listen(3000, () => {

  console.log("Servidor funcionando en puerto 3000");

});