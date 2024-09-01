# Proyecto de Microservicios

Este proyecto implementa una arquitectura de microservicios utilizando Node.js y Docker. Servicios para manejar ventas, inventario y clientes interconectados a través de Consul.


## Requisitos Previos

- Node.js (v14 o superior)
- Docker
- Docker Compose

## Configuración del Entorno

Cada microservicio utiliza un archivo `.env` para la configuración de las variables de entorno. Asegúrate de que estos archivos estén configurados correctamente en cada microservicio.

### Ejemplo de `.env`

#### Archivo `.env` en la raíz del proyecto (`microservicios/.env`)

```bash
PUERTO_VENTAS=3001
PUERTO_CLIENTES=3002
PUERTO_INVENTARIO=3003
PUERTO_CONSUL=8500
SUBNET=172.25.0.0/24
IP_VENTAS=172.25.0.5
IP_CLIENTES=172.25.0.10
IP_INVENTARIO=172.25.0.15
```

#### Microservicio de Clientes (`clientes/.env`)

```bash
DB_URL=postgres://usuario:contraseña@host:puerto/dbname?sslmode=require
CONSUL_HOST=consul
NOMBRE_SERVICIO=clientes
PUERTO_SERVICIO=3002
IP_SERVICIO=172.25.0.10
```

#### Microservicio de Ventas (`ventas/.env`)

```bash
DB_URL=postgres://usuario:contraseña@host:puerto/dbname?sslmode=require
CONSUL_HOST=consul
NOMBRE_SERVICIO=clientes
PUERTO_SERVICIO=3002
IP_SERVICIO=172.25.0.10
```

#### Microservicio de Clientes (`clientes/.env`)

```bash
DB_URL=postgres://usuario:contraseña@host:puerto/dbname?sslmode=require
CONSUL_HOST=consul
NOMBRE_SERVICIO=ventas
PUERTO_SERVICIO=3001
IP_SERVICIO=172.25.0.5
```

#### Microservicio de Inventario (`inventario/.env`)

```bash
DB_URL=postgres://usuario:contraseña@host:puerto/dbname?sslmode=require
CONSUL_HOST=consul
NOMBRE_SERVICIO=inventario
PUERTO_SERVICIO=3003
IP_SERVICIO=172.25.0.15
```


## Uso

### 1. Clonar el Repositorio

```bash
git clone https://github.com/AvilesDanie/examenWeb.git
cd tu-repositorio
docker-compose up --build -d
```

### 2. Crear y Configurar los Archivos `.env`

Configura los archivos `.env` en la raíz del proyecto y en cada microservicio (ventas, clientes, inventario) utilizando los ejemplos proporcionados en la sección anterior.

### 3. Construir y Ejecutar los Microservicios

Entrar en la raíz del proyecto y ejecuta:

```bash
docker-compose up --build -d
```


