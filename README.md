# Dashboard Estrategia (EAS)

Instrucciones rápidas (español):

- Instalar dependencias:

```bash
npm ci
```

- Build producción:

```bash
npm run build
```

- Servir build localmente (preview):

```bash
npm run preview
# abre http://localhost:4173/
```

- Docker (construir y ejecutar):

```bash
docker build -t dashboard-estrategia .
docker run -p 8080:80 dashboard-estrategia
# abre http://localhost:8080/
```

- Despliegue con GitHub Actions:

El workflow `.github/workflows/deploy-gh-pages.yml` construye y publica `./dist` a la rama `gh-pages` usando el token `GITHUB_TOKEN`.
