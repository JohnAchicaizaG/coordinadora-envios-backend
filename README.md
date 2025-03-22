docker run --name task-manager-db \
  -e MYSQL_ROOT_PASSWORD=rootPass123 \
  -e MYSQL_DATABASE=task_manager \
  -e MYSQL_USER=task_user \
  -e MYSQL_PASSWORD=taskPass456 \
  -p 3306:3306 \
  -d mysql:8.0



////


-- 1. Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user', 'logistics') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de rutas
CREATE TABLE routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de transportistas
CREATE TABLE transporters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla de órdenes
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    weight DECIMAL(10, 2) NOT NULL,
    dimensions VARCHAR(255) NOT NULL,
    product_type VARCHAR(100) NOT NULL,
    destination_address VARCHAR(255) NOT NULL,
    route_id INT DEFAULT NULL,
    transporter_id INT DEFAULT NULL,
    status ENUM('pending', 'in_transit', 'delivered') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (route_id) REFERENCES routes(id),
    FOREIGN KEY (transporter_id) REFERENCES transporters(id)
);

-- 5. Historial de estados de las órdenes
CREATE TABLE order_status_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    status ENUM('pending', 'in_transit', 'delivered') NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
