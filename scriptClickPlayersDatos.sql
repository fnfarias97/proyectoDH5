INSERT INTO users (id, first_name, second_name, email, password, privileges)
VALUE (1, 'admin', 'admin', 'admin@gmail.com', '$2a$10$.RFl.e1nBE6E.x28i3llQ.9rT9zL81nUJrQrHUyqrkuDL11.FGiYO', 'admin'),
(2, 'Juan', 'Perez', 'perez@gmail.com', '$2a$10$.RFl.e1nBE6E.x28i3llQ.9rT9zL81nUJrQrHUyqrkuDL11.FGiYO', 'client');
INSERT INTO brands (id, name)
VALUE (1, 'AMD'), (2, 'Intel'),(3, 'Nvidia'),(4, 'Asus'),(5, 'Msi'),(6, 'Lenovo'),(7, 'Acer'),(8, 'hp'),(9, 'Dell'),(10, 'Apple'),
(11, 'Samsung'), (12, 'Toshiba'), (13, 'Kingston'), (14, 'Adata'), (15, 'Alienware'), (16, 'Seagate'), (17, 'HyperX'),
(18, 'G. Skill'), (19, 'Corsair'), (20, 'Xpg'), (21, 'Cooler Master'), (22, 'Evga'), (23, 'Thermaltake'),
(24, 'Gigabyte'), (25, 'ASRock'), (26, 'Biostar'), (27, 'Aorus');

INSERT INTO productCategories (id, name)
VALUE (1, 'Procesadores'), (2, 'Placas de video'),(3, 'Memorias Ram'),(4, 'Discos de almacenamiento'),
(5, 'Fuentes de alimentación'), (6, 'Placas madre'),(7, 'Gabinetes'),(8, 'Notebooks'),(9, 'Pcs armadas'),(10, 'Periféricos'),
(11, 'Mouses'), (12, 'Teclados'), (13, 'Monitores'), (14, 'Auriculares'), (15, 'Combos');

INSERT INTO payMethods (id, type)
VALUE (1, 'Efectivo'), (2, 'Débito'),(3, 'Crédito'),(4, 'MercadoPago');

INSERT INTO products (id, name, price, avatar, description, productCategories_id, brand_id, stock)
VALUE (1, 'Procesador AMD Ryzen 5 1600 Af', 14500, 'ryzen-5.png', 'Procesador AMD de gama media, socket AM4, de 6 núcleos y 12 hilos a 3.2 Ghz. Excelente para complementar con una placa de video y jugar todo tipo de  videojuegos o utilizar aplicaciones de diseño gráfico profesionales.', 1, 1, 10),
(2, 'Procesador AMD Ryzen 7 2700x', 35700, 'ryzen-7.png', 'Procesador AMD de gama alta, socket AM4, de 8 núcleos y 16 hilos, a 3.2 Ghz. Excelente para complementar con una placa de video y jugar todo tipo de videojuegos o utilizar aplicaciones de diseño gráfico profesionales.', 1, 1, 10),
(3, 'Procesador Intel Core i3-9100f', 10500, 'core-i3-9100f.png', 'Procesador intel de gama media, socket 1151, de 4 núcleos y 4 hilos, a 3.6 Ghz base o 4.2 Ghz en modo turbo. Excelente para complementar con una placa de video y jugar todo tipo de videojuegos.', 1, 2, 10),
(4, 'Procesador Intel Core i7-10700', 45000, 'core-i7-10700.png', 'Procesador intel de gama alta, socket 1200, de 8 núcleos y 16 hilos, a 2.9 Ghz de base o 4.8 Ghz en modo turbo. Excelente para complementar con una placa de video y jugar todo topi de videojuegos o utilizar aplicaciones de diseño gráfico profesionales.', 1, 2, 10),
(5, 'Combo procesador AMD Ryzen 5 + SSD 240Gb', 20250, 'promo-ryzen5-disco.png', 'Esta promoción te ofrece un procesador AMD y un disco sólido SSD de 240 Gb de espacio, para sacarle el mayor provecho a este ryzen 5. Excelente para comenzar a armarte una pc, que complementando con una placa de video y las demás partes podría correr todo tipo de videojuegos o utilizar aplicaciones de diseño gráfico profesionales.', 15, 1, 10),
(6, 'PC gamer Diamond', 72500, 'pc-gamer.png', 'Computadora con componentes de gama media, excelente para introducirse en el mundo de los videojuegos. Cuenta con un procesador core i3-9100F de 4 núcleo y cuatro hilos a 3.6 Ghz de base y 4.2 Ghz turbo. Con 8 Gb de memoria ram DDR4 a 2666 Ghz en 2 módulos de 4 Gb. Un disco sólido SSD adata de 240 Gb, una fuente certificada de 550 watt y Una placa de video Geforce GTX-1650 super de 4 Gb. Todos estos magníficos componentes dentro de un Gabinete Deepcool MATREXX 55 V3 ADD-RGB 3F Black, con una refrigeración de primer nivel para mantener los componentes funcionando a tope sin altas temperaturas.', 9, 2, 10),
(7, 'Placa de Video Geforce RTX-2080', 140000, 'rtx-2080.png', 'Placa de video de nvidia de la familia RTX, con 11 Gb DDR6 de memoria ram dedicada, con la tecnología Ray Tracing y DLSS 2.0. Complementándolo con cualquier procesador de gama media o alta de última generación corre cualquier videojuegos AAA, con Ray Tracing y hasta en 4K. Además, si el tiempo te parece realmente valioso, entonces podrías ahorrar horas en renderizado de imágenes y videos profesionales.', 2, 3, 10),
(8, 'Placa de Video Geforce RTX-3090', 310000, 'rtx-3090.png', 'Placa de video de nvidia de la familia RTX, la más poderosa de la última generación de RTX (3000), con 24 Gb DDR6X de memoria ram dedicada, con la tecnología Ray Tracing y DLSS 2.0. Complementándolo con cualquier procesador de gama media o alta de última generación corre cualquier videojuegos AAA, con Ray Tracing y hasta en 4K. Además, si el tiempo te parece realmente valioso, entonces podrías ahorrar horas en renderizado de imágenes y videos profesionales.', 2, 3, 10),
(9, 'Placa de Video AMD Rx-570', 20000, 'radeon-rx-570.png', 'Placa de video de amd de entrada a la familia RX, con 8 Gb GDDR5 de memoria ram dedicada. Complementándolo con cualquier procesador de gama media o alta se puede jugar cualquier tipo de videojuego actual. Además, es una buena opción si ocasionalmente necesitas hacer renderizados de imágenes y videos.', 2, 1, 10),
(10, 'Placa de Video AMD Rx-5500-xt', 36000, 'rx-5500-xt.png', 'Placa de video de amd de antrada a la familia RX, con 8 Gb GDDR6 de memoria ram dedicada. Complementándolo con cualquier procesador de gama media o alta se puede jugar cualquier tipo de videojuego actual con calidad ultra a altos FPS. Además, sirve para el renderizado de imágenes y videos profesionales.', 2, 1, 10)
; 