-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 03-07-2018 a las 02:20:59
-- Versión del servidor: 5.7.22-0ubuntu0.16.04.1
-- Versión de PHP: 7.1.18-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cardsandtokens`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `card`
--

CREATE TABLE `card` (
  `id` int(11) NOT NULL,
  `slug` varchar(150) DEFAULT '',
  `text` text,
  `images` text,
  `deploy` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `card`
--

INSERT INTO `card` (`id`, `slug`, `text`, `images`, `deploy`) VALUES
(1, 'landing-drumpf', '{\r\n        "title": "Last Week Tonight",\r\n        "subtitle": "Make Donald Drumpf Again"\r\n    }', '{\r\n        "opengraph": "./assets/cards/landing/images/opengraph/drumpf.png",\r\n        "fullsize": "./assets/cards/landing/images/fullsize/drumpf.png",\r\n        "thumbnail": "./assets/cards/landing/images/thumbnail/drumpf.png"\r\n    }', '{\r\n        "comp":"root",\r\n        "children": [{\r\n            "comp":"row-three",\r\n            "data": {\r\n                "header": { "min-height": "12vh" },\r\n                "footer": { "min-height": "5vh" }\r\n            },\r\n            "children": [\r\n                {\r\n                    "comp": "background",\r\n                    "data": {\r\n                        "color":"#BFBAB4",\r\n                        "image": {\r\n                            "url": "http://imagenes.subadictos.net/afiche/36744.jpg",\r\n                            "position": "left",    "positions": "center | left | right | top | bottom",\r\n                            "repeat": "no-repeat",   "repeats": "round | repeat | no-repeat",\r\n                            "size": "contain",         "sizes": "contain | cover"\r\n                        }\r\n                    }\r\n                },\r\n                {\r\n                    "comp": "background",\r\n                    "data": {\r\n                        "color":"#141414"\r\n                    },\r\n                    "children": [{\r\n                        "comp": "video",\r\n                        "data": {\r\n                            "youtube": {\r\n                                "videoId": "DnpO_RTSNmQ",\r\n                                "autoplay": false\r\n                            }\r\n                        }\r\n                    }]\r\n                },\r\n                {\r\n                    "comp": "background",\r\n                    "data": { "color": "#BFBAB4" }\r\n                }\r\n            ]\r\n        }]\r\n    }');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `card`
--
ALTER TABLE `card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
