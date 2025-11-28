# Widget de Pólizas para Zoho Creator

Widget React para mostrar pólizas de PoloBroker embebido en Zoho Creator.

## Instalación

```bash
cd zoho-react-widget
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build para producción

```bash
npm run build
```

El build genera los archivos en `dist/`

## Desplegar en GitHub Pages

1. Subir el contenido de `dist/` a una rama `gh-pages`
2. Configurar GitHub Pages para usar esa rama
3. En Zoho Creator, embeber con iframe:

```html
<iframe 
  src="https://tu-usuario.github.io/polizas-widget" 
  width="100%" 
  height="800px"
  frameborder="0"
></iframe>
```

## Configuración en Zoho

En la página "Polizas" de Zoho Creator:
1. Agregar un Widget HTML
2. Pegar el código del iframe
3. Guardar y publicar

