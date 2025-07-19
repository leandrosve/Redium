#!/bin/bash

# Colorcitos
# Uso: printLog "color" "texto"
printLog() {
    local color_code
    case "$1" in
        red)    color_code='\033[0;31m' ;;
        green)  color_code='\033[0;32m' ;;
        yellow) color_code='\033[0;33m' ;;
        blue)   color_code='\033[0;34m' ;;
        cyan)   color_code='\033[0;36m' ;;
        *)      color_code='\033[0m' ;; # Sin color por defecto
    esac
    echo -e "${color_code}$2\033[0m"
}

# Variables
IMAGE_NAME="redium"
CONTAINER_NAME="redium"
HOST_PORT=4173
UI_PATH="./ui"

# Limpiar container viejo
cleanup() {
    printLog yellow "Deteniendo y eliminando el contenedor existente..."
    docker stop $CONTAINER_NAME >/dev/null 2>&1
    docker rm $CONTAINER_NAME >/dev/null 2>&1
    exit 1
}
trap cleanup ERR

# Paso 1: Construir la imagen Docker
printLog cyan "==> Construyendo imagen Docker..."
docker build -t $IMAGE_NAME $UI_PATH || {
    printLog red "Error al construir la imagen"
    exit 1
}

# Paso 2: Detener y eliminar el contenedor si ya existe
if [ "$(docker ps -aq -f name=^${CONTAINER_NAME}$)" ]; then
    printLog yellow "==> Eliminando contenedor existente..."
    docker stop $CONTAINER_NAME >/dev/null 2>&1
    docker rm $CONTAINER_NAME >/dev/null 2>&1
fi

# Paso 3: Ejecutar el contenedor
printLog cyan "Iniciando el contenedor..."
docker run -d \
    --name $CONTAINER_NAME \
    -p ${HOST_PORT}:80 \
    $IMAGE_NAME || {
    printLog red "Error al iniciar el contenedor"
    exit 1
}

# Paso 4: Mostrar información
printLog green "¡Contenedor iniciado correctamente!"
printLog blue "   Accede a la app en: http://localhost:${HOST_PORT}"
printLog yellow "   Para ver logs ejecuta: docker logs ${CONTAINER_NAME}"