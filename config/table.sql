/* 테이블 생성 */

-- 작가 정보
CREATE TABLE `author` (
    `id` varchar(11) NOT NULL,
    `password` int(9) NOT NULL,
    PRIMARY KEY (`id`) 
);

-- 메인 카테고리
CREATE TABLE `main_category` (
    `main_id` int primary key auto_increment,
    `main_title` varchar(100) not null
);

-- 서브 카테고리
CREATE TABLE `sub_category` (
    `sub_id` int primary key auto_increment,
    `sub_title` varchar(100) not null,
    `main_id` int not null,
    constraint `fk_main_id` foreign key(`main_id`) references `main_category`(`main_id`)
);


-- 작가 생성
INSERT INTO `author` (id, password) VALUES ('admin', '123456');

-- 메인 카테고리 생성
INSERT INTO `main_category` (main_title) VALUES ('project');
INSERT INTO `main_category` (main_title) VALUES ('artwork');

