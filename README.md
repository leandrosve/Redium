# [Re]dium - Challenge técnico - SSR Frontend Developer - Leandro Svetlich


🌐 **Aplicación desplegada**: [https://redium.vercel.app](https://redium.vercel.app)

🌐 **Github Pages**: [https://leandrosve.github.io/redium](https://leandrosve.github.io/redium)

---
### ⚙️ Levantar el proyecto localmente


### 1. Clonar el repositorio
```bash
git clone https://github.com/leandrosve/redium.git
cd redium
```
### 2.1 🐋 Con docker
En la raíz del proyecto hay dos scripts (para Linux y Windows) que construyen la imagen y levantan el contenedor, usando el `Dockerfile` ubicado en la carpeta `ui`.
```bash 
# En linux
bash ./run-docker.sh
# En Windows
.\run-docker.ps1
```
### 2.1 Manualmente (Requisitos: Node v22.17.0 y npm >= 10.9.2)
```bash
cd ui
npm i
npm run build
npm run preview
```

La aplicación debería estar disponible en: http://localhost:4173

---
## 🛠️ Tecnologías que utilicé

- **React** – Versión 19.1.0 con `Typescript`
- **Vite** – Como bundler y servidor de desarrollo.
- **React Router DOM** – Para el manejo de rutas en la SPA.
- **Tailwind CSS** – Para estilos utilitarios rápidos y personalizables.
- **React Hook Form** – Para manejo de formularios.
- **Zod** – Para la validación de formularios con tipado seguro.
- **i18next** – Para internacionalización (i18n).
---

## 🧩 Decisiones de diseño y arquitectura

- **🔀 Estructura por funcionalidades** – Organicé el proyecto siguiendo una arquitectura por features, agrupando el código por dominio funcional para facilitar el mantenimiento y la escalabilidad.

- **🧠 Context API para manejo de estado** – Centralicé estados globales como `comments` y `user` usando Context API, evitando *prop drilling* y manteniendo un flujo de datos simple.

- **❌ Sin Redux ni TanStack Query** – Decidí no incorporar soluciones más complejas para el manejo de estado o datos remotos, priorizando la simplicidad por el tamaño del proyecto.

- **🔎 Filtros y navegación vía query params** – Implementé el manejo de filtros y modales usando parámetros en la URL, lo que permite navegación directa, persistencia del estado y una experiencia más coherente.

- **🧩 Componentes reutilizables** – Desarrollé inputs, dropdowns y modales genéricos para mantener una interfaz consistente y facilitar su reutilización.

- **✅ Sistema de confirmación y toasts** – Implementé un sistema centralizado de confirmación y notificaciones utilizando Context API, mejorando la interacción y simplificando el código.

- **🎨Diseño simple y responsive** – Busqué mantener un diseño simple pero prolijo, manteniendo responsividad para dispositivos móviles. Implementado en su mayoria con Tailwind haciendo uso de variables CSS Tailwind.

- **♿ Accesibilidad** – Apliqué atributos `aria-*`, `role` e hice foco ensoportar navegación por teclado en toda la aplicación.

- **🧪 Testing** – Implementé casos de prueba para funcionalidades clave como la generación del árbol de comentarios, hooks que interactúan con la API, y componentes reutilizables como `ConfirmationDialog`, asegurando su comportamiento esperado.

- **🌐 Deployment** – La aplicación está desplegada tanto en **Vercel** como en **GitHub Pages**. Recomiendo utilizar la versión en Vercel, ya que GitHub Pages presenta algunas limitaciones con el enrutamiento en aplicaciones SPA.

## ⚡ Resultados del análisis con Lighthouse
Realicé un análisis con Lighthouse y resolví los ítems señalados para optimizar la velocidad de carga y mejorar la accesibilidad.

![Lighthouse Performance](https://i.postimg.cc/RhX1jptz/lighthouse.png)
