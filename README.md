### Instrucciones para ejecutar el proyecto

#### Requisitos previos
1. Tener instalado:
   - Node.js (versión 18 recomendada).
   - MongoDB (en ejecución en `localhost:27017`).
   - Git (para clonar el repositorio).

-------------------------------------------------------------------

#### Pasos para configurar y ejecutar

1. **Clonar el repositorio**  
   -bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   

2. **Configurar el Backend**  
   -bash
   cd backend
   npm install
   node server.js
   
   Asegúrate de que MongoDB esté corriendo localmente (`mongodb://localhost:27017`).

3. **Configurar el Frontend** 
   -bash
   cd ../frontend
   npm install
   npm start
   

4. **Acceder a la aplicación**  
   Abre el navegador en:  
   
   http://localhost:3000
   ```

---

#### **Configuraciones adicionales**
- El backend está preparado para almacenar puntajes en MongoDB, pero debido al tiempo, su implementación completa es opcional.
- Si ocurre algún error relacionado con dependencias, limpia el caché:
   -bash
   npm cache clean --force
   npm install
 

---

Con estos pasos, la aplicación estará lista para ejecutarse localmente.