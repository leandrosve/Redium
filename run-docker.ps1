# Variables
$IMAGE_NAME = "redium-ui"
$CONTAINER_NAME = "redium"
$HOST_PORT = 4173
$UI_PATH = "./ui"  # Ruta relativa a la carpeta UI desde la ubicación del script

# Paso 1: Construir la imagen Docker
Write-Host "Construyendo la imagen Docker..." -ForegroundColor Cyan
docker build -t $IMAGE_NAME $UI_PATH

# Paso 2: Detener y eliminar el contenedor si ya existe
if (docker ps -a --format '{{.Names}}' | Select-String -Pattern "^${CONTAINER_NAME}$" -Quiet) {
    Write-Host "Deteniendo y eliminando el contenedor existente..." -ForegroundColor Yellow
    docker stop $CONTAINER_NAME 2>&1 | Out-Null
    docker rm $CONTAINER_NAME 2>&1 | Out-Null
}

# Paso 3: Ejecutar el contenedor
Write-Host "Iniciando el contenedor..." -ForegroundColor Green
docker run -d `
    --name $CONTAINER_NAME `
    -p ${HOST_PORT}:80 `
    $IMAGE_NAME

# Paso 4: Mostrar información
Write-Host "¡Contenedor iniciado correctamente!" -ForegroundColor White -BackgroundColor Green
Write-Host "Accede a la app en: http://localhost:${HOST_PORT}" -ForegroundColor White -BackgroundColor DarkBlue
Write-Host "Para ver logs ejecuta: docker logs ${CONTAINER_NAME}" -ForegroundColor White -BackgroundColor DarkBlue