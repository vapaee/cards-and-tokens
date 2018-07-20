-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 20-07-2018 a las 01:29:05
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
-- Estructura de tabla para la tabla `album`
--

CREATE TABLE `album` (
  `id` int(11) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `publisher` int(32) DEFAULT '0',
  `creator` int(32) DEFAULT '0',
  `numbered` tinyint(1) DEFAULT '0',
  `preview` text NOT NULL,
  `deploy` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `album`
--

INSERT INTO `album` (`id`, `slug`, `publisher`, `creator`, `numbered`, `preview`, `deploy`) VALUES
(1, 'openmic-100-weeks', 0, 0, 0, '{\n    "images": {\n        "opengraph": "./assets/albums/openmic/preview-opengraph.png",\n        "fullsize": "./assets/albums/openmic/preview-fullsize.png",\n        "thumbnail": "./assets/albums/openmic/preview-thumbnail.png"\n    },\n    "colors": {\n        "bg": "#898F41"\n    }\n}', '{\n    "comp": "root",\n    "children": [\n        {\n            "comp": "row-three",\n            "data": {\n                "header": {\n                    "min-height": "10vh"\n                },\n                "footer": {\n                    "min-height": "6vh"\n                }\n            },\n            "children": [\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "#2A247B",\n                        "fgcolor": "white"\n                    },\n                    "children": [\n                        {\n                            "comp": "menu",\n                            "data": {\n                                "menu": [\n                                    { "text": "<<", "section": "album", "move": -1 },\n                                    { "text": "Page 1", "section": "album", "value": "page-0"},\n                                    { "text": "Page 2", "section": "album", "value": "page-1"},\n                                    { "text": "Page 3", "section": "album", "value": "page-2" },\n                                    { "text": ">>", "section": "album", "move": 1 }\n                                ]\n                            }\n                        }\n                    ]\n                },\n                {\n                    "comp": "album",\n                    "data": {\n                        "pages": [\n                            {\n                                "background": {\n                                    "color": "green"\n                                },\n                                "slots": [\n                                    { "position": { "top": "10%", "left": "20%" } },\n                                    { "position": { "top": "20%", "left": "40%" } },\n                                    { "position": { "top": "30%", "left": "60%" } }\n                                ]\n                            },\n                            {\n                                "background": {\n                                    "color": "blue"\n                                },\n                                "slots": [\n                                    { "position": { "top": "10%", "right": "20%" } },\n                                    { "position": { "top": "20%", "right": "40%" } },\n                                    { "position": { "top": "30%", "right": "60%" } }\n                                ]\n                            },\n                            {\n                                "background": {\n                                    "color": "brown"\n                                },\n                                "slots": [\n                                    { "position": { "bottom": "10%", "left": "20%" } },\n                                    { "position": { "bottom": "20%", "left": "40%" } },\n                                    { "position": { "bottom": "30%", "left": "60%" } }\n                                ]\n                            }\n                        ]\n                    }\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "darkblue"\n                    }\n                }\n            ]\n        }\n    ]\n}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `app`
--

CREATE TABLE `app` (
  `id` int(11) NOT NULL,
  `creator` int(32) DEFAULT '0',
  `client_id` varchar(80) DEFAULT '',
  `client_secret` varchar(80) DEFAULT '',
  `redirect_uri` varchar(400) DEFAULT '',
  `url` varchar(400) DEFAULT '',
  `brief` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `inventory` text,
  `_super` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `card`
--

CREATE TABLE `card` (
  `id` int(11) NOT NULL,
  `slug` varchar(150) DEFAULT '',
  `text` text,
  `preview` text,
  `deploy` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `card`
--

INSERT INTO `card` (`id`, `slug`, `text`, `preview`, `deploy`) VALUES
(1, 'landing-drumpf', '{\r\n        "title": "Last Week Tonight",\r\n        "subtitle": "Make Donald Drumpf Again"\r\n    }', '{\n    "images": {\n        "opengraph": "./assets/cards/landing/images/opengraph/drumpf.png",\n        "fullsize": "./assets/cards/landing/images/fullsize/drumpf.png",\n        "thumbnail": "./assets/cards/landing/images/thumbnail/drumpf.png"\n    },\n    "colors": {\n        "bg": "#131313"\n    }\n}', '{\r\n        "comp":"root",\r\n        "children": [{\r\n            "comp":"row-three",\r\n            "data": {\r\n                "header": { "min-height": "12vh" },\r\n                "footer": { "min-height": "5vh" }\r\n            },\r\n            "children": [\r\n                {\r\n                    "comp": "background",\r\n                    "data": {\r\n                        "color":"#BFBAB4",\r\n                        "image": {\r\n                            "url": "http://imagenes.subadictos.net/afiche/36744.jpg",\r\n                            "position": "left",    "positions": "center | left | right | top | bottom",\r\n                            "repeat": "no-repeat",   "repeats": "round | repeat | no-repeat",\r\n                            "size": "contain",         "sizes": "contain | cover"\r\n                        }\r\n                    }\r\n                },\r\n                {\r\n                    "comp": "background",\r\n                    "data": {\r\n                        "color":"#141414"\r\n                    },\r\n                    "children": [{\r\n                        "comp": "video",\r\n                        "data": {\r\n                            "youtube": {\r\n                                "videoId": "DnpO_RTSNmQ",\r\n                                "autoplay": false\r\n                            }\r\n                        }\r\n                    }]\r\n                },\r\n                {\r\n                    "comp": "background",\r\n                    "data": { "color": "#BFBAB4" }\r\n                }\r\n            ]\r\n        }]\r\n    }'),
(2, 'openmic-w89-darrenclaxton-resolve', '{\r\n        "title": "Steemit Open Mic-week 89",\r\n        "subtitle": "darrenclaxton - Resolve"\r\n    }', '{\n    "images": {\n        "opengraph": "./assets/cards/openmic/images/opengraph/openmic-w89-darrenclaxton-resolve.png",\n        "fullsize": "./assets/cards/openmic/images/fullsize/openmic-w89-darrenclaxton-resolve.png",\n        "thumbnail": "./assets/cards/openmic/images/thumbnail/openmic-w89-darrenclaxton-resolve.png"\n    },\n    "colors": {\n        "bg": "#898F41"\n    }\n}', '{\n    "comp": "root",\n    "children": [\n        {\n            "comp": "row-three",\n            "data": {\n                "header": {\n                    "min-height": "12vh"\n                },\n                "footer": {\n                    "min-height": "5vh"\n                }\n            },\n            "children": [\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "white",\n                        "image": {\n                            "url": "/assets/cards/openmic/images/steemit.svg",\n                            "position": "left",\n                            "positions": "center | left | right | top | bottom",\n                            "repeat": "no-repeat",\n                            "repeats": "round | repeat | no-repeat",\n                            "size": "contain",\n                            "sizes": "contain | cover"\n                        }\n                    }\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "rgba(72, 72, 72, 0.0)",\n                        "gradient": {\n                            "dir": "top",\n                            "points": [\n                                {\n                                    "color": "rgba(0,0,0,0.6)",\n                                    "percent": 0\n                                },\n                                {\n                                    "color": "rgba(0,0,0,0.0)",\n                                    "percent": 30\n                                },\n                                {\n                                    "color": "rgba(0,0,0,0.0)",\n                                    "percent": 70\n                                },\n                                {\n                                    "color": "rgba(0,0,0,0.6)",\n                                    "percent": 100\n                                }\n                            ]\n                        },\n                        "image": {\n                            "url": "https://i.ytimg.com/vi/V80EzF--UNk/maxresdefault.jpg",\n                            "repeat": "no-repeat",\n                            "size": "cover",\n                            "blend-mode": "multiply"\n                        }\n                    },\n                    "children": [\n                        {\n                            "comp": "video",\n                            "data": {\n                                "youtube": {\n                                    "videoId": "5xmIg6P1gb4",\n                                    "autoplay": false\n                                }\n                            }\n                        }\n                    ]\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "#FFF"\n                    }\n                }\n            ]\n        }\n    ]\n}'),
(3, 'openmic-w91-juanhobos-atomos', '{\r\n        "title": "Steemit Open Mic-week 91",\r\n        "subtitle": "juanhobos - Atomos"\r\n    }', '{\r\n    "images": {\r\n        "opengraph": "./assets/cards/openmic/images/opengraph/openmic-w91-juanhobos-atomos.png",\r\n        "fullsize": "./assets/cards/openmic/images/fullsize/openmic-w91-juanhobos-atomos.png",\r\n        "thumbnail": "./assets/cards/openmic/images/thumbnail/openmic-w91-juanhobos-atomos.png"\r\n    },\r\n    "colors": {\r\n        "bg": "#898F41"\r\n    }\r\n}', '{\r\n    "comp": "root",\r\n    "children": [\r\n        {\r\n            "comp": "row-three",\r\n            "data": {\r\n                "header": {\r\n                    "min-height": "12vh"\r\n                },\r\n                "footer": {\r\n                    "min-height": "5vh"\r\n                }\r\n            },\r\n            "children": [\r\n                {\r\n                    "comp": "background",\r\n                    "data": {\r\n                        "color": "white",\r\n                        "image": {\r\n                            "url": "/assets/cards/openmic/images/steemit.svg",\r\n                            "position": "left",\r\n                            "positions": "center | left | right | top | bottom",\r\n                            "repeat": "no-repeat",\r\n                            "repeats": "round | repeat | no-repeat",\r\n                            "size": "contain",\r\n                            "sizes": "contain | cover"\r\n                        }\r\n                    }\r\n                },\r\n                {\r\n                    "comp": "background",\r\n                    "data": {\r\n                        "color": "rgba(72, 72, 72, 0.0)",\r\n                        "gradient": {\r\n                            "dir": "top",\r\n                            "points": [\r\n                                {\r\n                                    "color": "rgba(0,0,0,0.6)",\r\n                                    "percent": 0\r\n                                },\r\n                                {\r\n                                    "color": "rgba(0,0,0,0.0)",\r\n                                    "percent": 30\r\n                                },\r\n                                {\r\n                                    "color": "rgba(0,0,0,0.0)",\r\n                                    "percent": 70\r\n                                },\r\n                                {\r\n                                    "color": "rgba(0,0,0,0.6)",\r\n                                    "percent": 100\r\n                                }\r\n                            ]\r\n                        },\r\n                        "image": {\r\n                            "url": "http://www.grup-pumsa.cat/uploadwallimgs/b/55/555634_music-production-wallpaper.jpg",\r\n                            "repeat": "no-repeat",\r\n                            "size": "cover",\r\n                            "blend-mode": "multiply"\r\n                        }\r\n                    },\r\n                    "children": [\r\n                        {\r\n                            "comp": "video",\r\n                            "data": {\r\n                                "youtube": {\r\n                                    "videoId": "cEUCN9-A5aw",\r\n                                    "autoplay": false\r\n                                }\r\n                            }\r\n                        }\r\n                    ]\r\n                },\r\n                {\r\n                    "comp": "background",\r\n                    "data": {\r\n                        "color": "#FFF"\r\n                    }\r\n                }\r\n            ]\r\n        }\r\n    ]\r\n}'),
(4, 'openmic-w92-drewsmusic-on-my-mind', '{\r\n        "title": "Steemit Open Mic-week 92",\r\n        "subtitle": "drewsmusic - On my mind"\r\n    }', '{\r\n    "images": {\r\n        "opengraph": "./assets/cards/openmic/images/opengraph/openmic-w92-drewsmusic-on-my-mind.png",\r\n        "fullsize": "./assets/cards/openmic/images/fullsize/openmic-w92-drewsmusic-on-my-mind.png",\r\n        "thumbnail": "./assets/cards/openmic/images/thumbnail/openmic-w92-drewsmusic-on-my-mind.png"\r\n    },\r\n    "colors": {\r\n        "bg": "#898F41"\r\n    }\r\n}', '{\r\n    "comp": "root",\r\n    "children": [\r\n        {\r\n            "comp": "row-three",\r\n            "data": {\r\n                "header": {\r\n                    "min-height": "12vh"\r\n                },\r\n                "footer": {\r\n                    "min-height": "5vh"\r\n                }\r\n            },\r\n            "children": [\r\n                {\r\n                    "comp": "background",\r\n                    "data": {\r\n                        "color": "white",\r\n                        "image": {\r\n                            "url": "/assets/cards/openmic/images/steemit.svg",\r\n                            "position": "left",\r\n                            "positions": "center | left | right | top | bottom",\r\n                            "repeat": "no-repeat",\r\n                            "repeats": "round | repeat | no-repeat",\r\n                            "size": "contain",\r\n                            "sizes": "contain | cover"\r\n                        }\r\n                    }\r\n                },\r\n                {\r\n                    "comp": "background",\r\n                    "data": {\r\n                        "color": "rgba(72, 72, 72, 0.0)",\r\n                        "gradient": {\r\n                            "dir": "top",\r\n                            "points": [\r\n                                {\r\n                                    "color": "rgba(0,0,0,0.6)",\r\n                                    "percent": 0\r\n                                },\r\n                                {\r\n                                    "color": "rgba(0,0,0,0.0)",\r\n                                    "percent": 30\r\n                                },\r\n                                {\r\n                                    "color": "rgba(0,0,0,0.0)",\r\n                                    "percent": 70\r\n                                },\r\n                                {\r\n                                    "color": "rgba(0,0,0,0.6)",\r\n                                    "percent": 100\r\n                                }\r\n                            ]\r\n                        },\r\n                        "image": {\r\n                            "url": "https://99px.ru/sstorage/53/2012/03/tmb_38184_1852.jpg",\r\n                            "repeat": "no-repeat",\r\n                            "size": "cover",\r\n                            "blend-mode": "multiply"\r\n                        }\r\n                    },\r\n                    "children": [\r\n                        {\r\n                            "comp": "video",\r\n                            "data": {\r\n                                "youtube": {\r\n                                    "videoId": "iSlRSKXGWx4",\r\n                                    "autoplay": false\r\n                                }\r\n                            }\r\n                        }\r\n                    ]\r\n                },\r\n                {\r\n                    "comp": "background",\r\n                    "data": {\r\n                        "color": "#FFF"\r\n                    }\r\n                }\r\n            ]\r\n        }\r\n    ]\r\n}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `collection`
--

CREATE TABLE `collection` (
  `id` int(11) NOT NULL,
  `album` int(32) DEFAULT '0',
  `owner` int(32) DEFAULT '0',
  `_super` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `container`
--

CREATE TABLE `container` (
  `id` int(11) NOT NULL,
  `owner` int(32) DEFAULT '0',
  `capacity` int(32) DEFAULT '0',
  `structure` text,
  `structure_def` text,
  `_sub_id` int(32) DEFAULT '0',
  `_sub_table` varchar(40) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `copy`
--

CREATE TABLE `copy` (
  `id` int(11) NOT NULL,
  `multiplicity` int(32) DEFAULT '0',
  `collectible` int(32) DEFAULT '0',
  `_super` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deck`
--

CREATE TABLE `deck` (
  `id` int(11) NOT NULL,
  `prueba` varchar(128) DEFAULT '',
  `_super` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envelop`
--

CREATE TABLE `envelop` (
  `id` int(11) NOT NULL,
  `deck` int(32) DEFAULT '0',
  `opened` tinyint(1) DEFAULT '0',
  `_super` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `owner` int(32) DEFAULT '0',
  `_super` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `owner` int(32) DEFAULT '0',
  `cols` int(8) DEFAULT '0',
  `rows` int(8) DEFAULT '0',
  `container` int(32) DEFAULT '0',
  `_sub_id` int(32) DEFAULT '0',
  `_sub_table` varchar(40) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oauth_cache`
--

CREATE TABLE `oauth_cache` (
  `id` int(11) NOT NULL,
  `access_token` varchar(50) DEFAULT '',
  `client_id` varchar(128) DEFAULT '',
  `vapaee_id` int(32) DEFAULT '0',
  `user` int(32) DEFAULT '0',
  `expires` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `scope` varchar(80) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `name` varchar(150) DEFAULT '',
  `owner` int(32) DEFAULT '0',
  `_super` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publisher`
--

CREATE TABLE `publisher` (
  `id` int(11) NOT NULL,
  `namespace` varchar(128) DEFAULT '',
  `name` varchar(150) DEFAULT '',
  `img` text,
  `owner` int(32) DEFAULT '0',
  `_sub_id` int(32) DEFAULT '0',
  `_sub_table` varchar(40) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `vapaee_id` int(32) DEFAULT '0',
  `name` varchar(150) DEFAULT '',
  `profile` int(32) DEFAULT '0',
  `cache` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indices de la tabla `app`
--
ALTER TABLE `app`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`),
  ADD KEY `slug` (`slug`);

--
-- Indices de la tabla `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `container`
--
ALTER TABLE `container`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `copy`
--
ALTER TABLE `copy`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `deck`
--
ALTER TABLE `deck`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `envelop`
--
ALTER TABLE `envelop`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `oauth_cache`
--
ALTER TABLE `oauth_cache`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `publisher`
--
ALTER TABLE `publisher`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `album`
--
ALTER TABLE `album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `app`
--
ALTER TABLE `app`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `card`
--
ALTER TABLE `card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `collection`
--
ALTER TABLE `collection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `container`
--
ALTER TABLE `container`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `copy`
--
ALTER TABLE `copy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `deck`
--
ALTER TABLE `deck`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `envelop`
--
ALTER TABLE `envelop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `oauth_cache`
--
ALTER TABLE `oauth_cache`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `publisher`
--
ALTER TABLE `publisher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
