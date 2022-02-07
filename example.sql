CREATE TABLE `author` (
    `id` varchar(11) NOT NULL,
    `password` int(9) NOT NULL,
    PRIMARY KEY (`id`) 
);

INSERT INTO `author` (id, password) VALUES ('admin', '123456');
