# 🌍 Sitio Web Oficial de Totuxlandia

Bienvenido al repositorio del sitio web de **Totuxlandia**, el país ficticio más extraordinario del mundo virtual.

## 📋 Contenido

Este sitio web incluye:

- ✅ **Página de Inicio (Hero)** - Presentación impactante del país
- ✅ **Sección Acerca de** - Historia y estadísticas de Totuxlandia
- ✅ **Regiones** - Descripción de las 6 regiones principales
- ✅ **Cultura** - Festival, gastronomía, música, arte, deportes y literatura
- ✅ **Formulario de Contacto** - Para que los visitantes se comuniquen
- ✅ **Diseño Responsivo** - Compatible con móviles, tablets y desktop
- ✅ **Animaciones Smooth** - Transiciones y efectos visuales modernos

## 🎨 Estructura del Proyecto

```
totuxlandia-website/
├── index.html          # Archivo principal HTML
├── css/
│   ├── styles.css      # Estilos principales
│   └── responsive.css  # Estilos para dispositivos móviles
├── js/
│   ├── data.js         # Datos del sitio (FÁCIL DE MODIFICAR)
│   └── script.js       # Lógica de la aplicación
└── README.md           # Este archivo
```

## 🚀 Cómo Usar

### 1. Clonar el repositorio
```bash
git clone https://github.com/manugiraudo10-commits/totuxlandia-website.git
cd totuxlandia-website
```

### 2. Abrir el sitio
Simplementemente abre el archivo `index.html` en tu navegador.

## ✏️ Cómo Modificar el Contenido

### Cambiar datos (Regiones, Cultura, Contacto)

Todo el contenido del sitio está en el archivo **`js/data.js`**. Es muy fácil modificarlo:

#### Para cambiar regiones:
```javascript
const REGIONES = [
    {
        id: 1,
        nombre: "Tu región aquí",
        descripcion: "Descripción de tu región",
        poblacion: "Número de habitantes",
        simbolo: "Emoji aquí"
    },
    // Agrega más regiones...
];
```

#### Para cambiar cultura:
```javascript
const CULTURA = [
    {
        id: 1,
        titulo: "Tu elemento cultural",
        descripcion: "Descripción detallada"
    },
    // Agrega más elementos...
];
```

#### Para cambiar información de contacto:
```javascript
const INFORMACION_CONTACTO = [
    {
        titulo: "Email",
        valor: "tu@email.com",
        icono: "📧"
    },
    // Más información...
];
```

### Cambiar colores

Abre `css/styles.css` y modifica las variables de color:

```css
:root {
    --primary-color: #2c3e50;      /* Color principal */
    --secondary-color: #3498db;    /* Color secundario */
    --accent-color: #e74c3c;       /* Color de acentos */
    --light-bg: #ecf0f1;           /* Fondo claro */
    --text-color: #2c3e50;         /* Color de texto */
}
```

### Cambiar texto del navegador y secciones

Edita `index.html` directamente:

```html
<!-- Cambiar título del sitio -->
<title>Totuxlandia - El País de las Maravillas</title>

<!-- Cambiar texto de secciones -->
<h1>Tu nuevo título aquí</h1>
<p>Tu descripción aquí</p>
```

## 🎯 Características

✨ **Diseño Moderno**
- Interfaz limpia y profesional
- Gradientes y sombras atractivas
- Animaciones suaves

📱 **Responsive Design**
- Adaptable a todos los tamaños de pantalla
- Menú hamburguesa para móviles
- Grid layouts flexibles

⚡ **Rendimiento**
- Carga rápida
- Sin dependencias externas
- JavaScript vanilla puro

♿ **Accesibilidad**
- Estructura HTML semántica
- Contraste de colores adecuado
- Navegación por teclado

## 🔧 Personalización Avanzada

### Agregar nuevas secciones

1. Agrega el HTML en `index.html`:
```html
<section id="nueva-seccion" class="nueva-seccion">
    <div class="container">
        <h2>Mi Nueva Sección</h2>
        <!-- Tu contenido aquí -->
    </div>
</section>
```

2. Agrega estilos en `css/styles.css`:
```css
.nueva-seccion {
    padding: 60px 20px;
    background-color: white;
}
```

3. Agrega lógica en `js/script.js` si es necesario

### Cambiar fuentes

En `css/styles.css`, modifica:
```css
body {
    font-family: 'Tu Fuente Aquí', sans-serif;
}
```

## 📞 Contacto

¿Preguntas sobre cómo modificar el sitio? 
- Revisa el código comentado
- Todo está diseñado para ser fácil de entender y modificar

## 📄 Licencia

Este proyecto está disponible bajo la Licencia MIT.

---

**¡Gracias por visitar Totuxlandia! 🌍✨**