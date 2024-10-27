import { copy } from "fs-extra"

async function copyFiles() {
  try {
    await copy("src/assets", "public/assets")
    console.log("Archivos copiados correctamente.")
  } catch (err) {
    console.error("Error al copiar archivos:", err)
  }
}

copyFiles()
