import Fastify from "fastify";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import multer from "fastify-multer";
import { connectDb } from "./database.js";
import { userRoutes } from "./routes/user.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { productRoutes } from "./routes/product.routes.js";
import { facturaRoutes } from "./routes/factura.routes.js";

// Conexión con la base de datos
connectDb();

// Inicializar servidor de Fastify
const fastify = Fastify({
  logger: true
})

// Utilizar y modificar los pluggins
fastify.register(cors, {origin: "*"})
fastify.register(formBody)
fastify.register(multer.contentParser)

// Rutas
fastify.register(userRoutes, {prefix: "/user"});
fastify.register(categoryRoutes, {prefix: "/category"});
fastify.register(productRoutes, {prefix: "/product"});
fastify.register(facturaRoutes, {prefix: "/factura"})

// Iniciar
const start = async () => {
  try {
    await fastify.listen({port: 4000, host: "0.0.0.0"})
    console.log("El servidor está escuchando por el puerto 4000")
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start();
