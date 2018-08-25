-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 24-08-2018 a las 18:19:21
-- Versión del servidor: 5.7.23-0ubuntu0.16.04.1
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
  `publisher` int(32) DEFAULT '0',
  `slug` varchar(150) DEFAULT '',
  `creator` int(32) DEFAULT '0',
  `numbered` tinyint(1) DEFAULT '0',
  `preload` text,
  `preview` text,
  `deploy` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `album`
--

INSERT INTO `album` (`id`, `publisher`, `slug`, `creator`, `numbered`, `preload`, `preview`, `deploy`) VALUES
(1, 1, 'openmic-100-weeks', 1, 0, '["/assets/backgrounds/maxresdefault.jpg"]', '{\n    "images": {\n        "opengraph": "./assets/albums/openmic/preview-opengraph.png",\n        "fullsize": "./assets/albums/openmic/preview-fullsize.png",\n        "thumbnail": "./assets/albums/openmic/preview-thumbnail.png"\n    },\n    "colors": {\n        "bg": "#898F41"\n    }\n}', '{\n    "comp": "root",\n    "children": [\n        {\n            "comp": "row-three",\n            "data": {\n                "header": {\n                    "min-height": "10vh"\n                },\n                "footer": {\n                    "min-height": "6vh"\n                }\n            },\n            "children": [\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "darkgreen",\n                        "fgcolor": "white"\n                    },\n                    "children": [\n                        {\n                            "comp": "float",\n                            "data": {\n                                "style": {\n                                    "_width": "500px",\n                                    "_height": "500px",\n                                    "bottom": "20px",\n                                    "left": "20%"\n                                }\n                            },\n                            "children": [\n                                {\n                                    "comp": "menu",\n                                    "data": {\n                                        "menu": [\n                                            { "text": "<<", "section": "openmic-100-weeks", "move": -1 },\n                                            { "text": "Page 1", "section": "openmic-100-weeks", "value": "page-0"},\n                                            { "text": "Page 2", "section": "openmic-100-weeks", "value": "page-1"},\n                                            { "text": "Page 3", "section": "openmic-100-weeks", "value": "page-2" },\n                                            { "text": ">>", "section": "openmic-100-weeks", "move": 1 }\n                                        ]\n                                    }\n                                }\n                            ]\n                        }\n                    ]\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "#9a9"\n                    },\n                    "children": [\n                        {\n                            "comp": "album",\n                            "data": {\n                                "name":"openmic-100-weeks",\n                                "pages": [\n                                    {\n                                        "background": {\n                                            "image": {\n                                                "url": "/assets/backgrounds/maxresdefault.jpg",\n                                                "repeat": "no-repeat",\n                                                "size": "cover"\n                                            }\n                                        },\n                                        "slots": [\n                                            { "position": { "top": "10%", "left": "22%" } },\n                                            { "position": { "top": "30%", "left": "44%" } },\n                                            { "position": { "top": "50%", "left": "66%" } }\n                                        ]\n                                    },\n                                    {\n                                        "background": {\n                                            "image": {\n                                                "url": "/assets/backgrounds/bg_pic1.jpg",\n                                                "repeat": "no-repeat",\n                                                "size": "cover"\n                                            }\n                                        },\n                                        "slots": [\n                                            { "position": { "top": "20%", "left": "10%" } },\n                                            { "position": { "top": "20%", "left": "30%" } },\n                                            { "position": { "top": "20%", "left": "50%" } }\n                                        ]\n                                    },\n                                    {\n                                        "background": {\n                                            "image": {\n                                                "url": "/assets/backgrounds/tmb_38184_1852.jpg",\n                                                "repeat": "no-repeat",\n                                                "size": "cover"\n                                            }\n                                        },\n                                        "slots": [\n                                            { "position": { "top": "20%", "right": "10%" } },\n                                            { "position": { "top": "20%", "right": "30%" } },\n                                            { "position": { "top": "20%", "right": "50%" } }\n                                        ]\n                                    }\n                                ]\n                            }\n                        }\n                    ]\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "darkgreen"\n                    },\n                    "children": [\n                        {\n                            "comp": "inventory",\n                            "data": {\n                                "horizontal": true,\n                                "horizontal": true\n                            }\n                        }\n                    ]\n                }\n            ]\n        }\n    ]\n}');

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

--
-- Volcado de datos para la tabla `app`
--

INSERT INTO `app` (`id`, `creator`, `client_id`, `client_secret`, `redirect_uri`, `url`, `brief`, `created_at`, `inventory`, `_super`) VALUES
(1, 1, 'f47ebe1ab2f388e549df8570833e18fa', 'a16b39ee4b1df37f5daed29a2918b56e80d7156ac2581fc66c', 'http://cardsandtokens.com', 'http://cardsandtokens.com', 'A place where you can create, trade and collect cards of any topic made by the users themselves.', '2018-07-25 20:56:57', '[]', '{"id":1,"name":"Cards & Tokens","img":{"avatar":"http://cardsandtokens.com/assets/cards-and-tokens.png"},"owner":{"id":1},"publisher_id":2, "slug":"cards-and-tokens"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `card`
--

CREATE TABLE `card` (
  `id` int(11) NOT NULL,
  `slug` varchar(150) DEFAULT '',
  `text` text,
  `_super` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `card`
--

INSERT INTO `card` (`id`, `slug`, `text`, `_super`) VALUES
(1, 'landing-drumpf', '{"title":"Last Week Tonight","subtitle":"Make Donald Drumpf Again"}', '{"id":1,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":1},"deployable":true,"steem":{"author":"gcalvete","permlink":"re-gcalvete-prueba-con-rechazo-e-pago-20180819t225817497z"},"steem_votes":1,"type":"collection"}'),
(2, 'openmic-w89-darrenclaxton-resolve', '{"title":"Steemit Open Mic-week 89","subtitle":"darrenclaxton - Resolve"}', '{"id":2,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":2},"deployable":true,"steem":{"author":"gcalvete","permlink":"re-gcalvete-prueba-con-rechazo-e-pago-20180819t225841288z"},"steem_votes":1,"type":"collection"}'),
(3, 'openmic-w91-juanhobos-atomos', '{"title":"Steemit Open Mic-week 91","subtitle":"juanhobos - Atomos"}', '{"id":3,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":3},"deployable":true,"steem":{"author":"gcalvete","permlink":"re-gcalvete-prueba-con-rechazo-e-pago-20180819t225916775z"},"steem_votes":2,"type":"collection"}'),
(4, 'openmic-w92-drewsmusic-on-my-mind', '{"title":"Steemit Open Mic-week 92","subtitle":"drewsmusic - On my mind"}', '{"id":4,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":4},"deployable":true,"steem":{"author":"gcalvete","permlink":"re-gcalvete-prueba-con-rechazo-e-pago-20180819t230042963z"},"steem_votes":1,"type":"collection"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `collectible`
--

CREATE TABLE `collectible` (
  `id` int(11) NOT NULL,
  `publisher` int(32) DEFAULT '0',
  `creator` int(32) DEFAULT '0',
  `edition` int(32) DEFAULT '0',
  `deployable` tinyint(1) DEFAULT '0',
  `steem` text,
  `steem_votes` int(32) DEFAULT '0',
  `type` varchar(10) DEFAULT '',
  `_sub_table` varchar(40) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `collectible`
--

INSERT INTO `collectible` (`id`, `publisher`, `creator`, `edition`, `deployable`, `steem`, `steem_votes`, `type`, `_sub_table`) VALUES
(1, 1, 1, 1, 1, '{"author":"gcalvete", "permlink":"re-gcalvete-prueba-con-rechazo-e-pago-20180819t225817497z"}', 1, 'collection', 'card'),
(2, 1, 1, 2, 1, '{"author":"gcalvete", "permlink":"re-gcalvete-prueba-con-rechazo-e-pago-20180819t225841288z"}', 1, 'collection', 'card'),
(3, 1, 1, 3, 1, '{"author":"gcalvete", "permlink":"re-gcalvete-prueba-con-rechazo-e-pago-20180819t225916775z"}', 2, 'collection', 'card'),
(4, 1, 1, 4, 1, '{"author":"gcalvete", "permlink":"re-gcalvete-prueba-con-rechazo-e-pago-20180819t230042963z"}', 1, 'collection', 'card');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `collection`
--

CREATE TABLE `collection` (
  `id` int(11) NOT NULL,
  `album` int(32) DEFAULT '0',
  `points` int(32) DEFAULT '0',
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
  `capacity` int(8) DEFAULT '0',
  `empty` int(8) DEFAULT '0',
  `spec` int(32) DEFAULT '0',
  `_sub_table` varchar(40) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `container_spec`
--

CREATE TABLE `container_spec` (
  `id` int(11) NOT NULL,
  `name` varchar(150) DEFAULT '',
  `structure_def` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `copy`
--

CREATE TABLE `copy` (
  `id` int(11) NOT NULL,
  `multiplicity` int(32) DEFAULT '0',
  `collectible` int(32) DEFAULT '0',
  `edition` int(32) DEFAULT '0',
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
-- Estructura de tabla para la tabla `edition`
--

CREATE TABLE `edition` (
  `id` int(11) NOT NULL,
  `collectible` int(32) DEFAULT '0',
  `creator` int(32) DEFAULT '0',
  `url` varchar(250) DEFAULT '',
  `preload` text,
  `preview` text,
  `deploy` text,
  `copies` int(10) DEFAULT '0',
  `released` tinyint(1) DEFAULT '0',
  `released_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `edition`
--

INSERT INTO `edition` (`id`, `collectible`, `creator`, `url`, `preload`, `preview`, `deploy`, `copies`, `released`, `released_time`) VALUES
(1, 1, 1, 'first', '["/assets/backgrounds/lwt.jpg"]', '{\n    "images": {\n        "opengraph": "./assets/cards/landing/images/opengraph/drumpf.png",\n        "fullsize": "./assets/cards/landing/images/fullsize/drumpf.png",\n        "thumbnail": "./assets/cards/landing/images/thumbnail/drumpf.png"\n    },\n    "colors": {\n        "bg": "#131313"\n    }\n}', '{\n    "comp": "root",\n    "children": [\n        {\n            "comp": "grid",\n            "data": {\n                "rows": [\n                    3,\n                    2\n                ]\n            },\n            "children": [\n                {\n                    "comp": "place-holder",\n                    "data": {\n                        "text": "Esto es un moneton de texto que quiero que se muestro correctamente"\n                    }\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "#BFBAB4",\n                        "image": {\n                            "url": "/assets/backgrounds/lwt.jpg",\n                            "position": "left",\n                            "positions": "center | left | right | top | bottom",\n                            "repeat": "no-repeat",\n                            "repeats": "round | repeat | no-repeat",\n                            "size": "contain",\n                            "sizes": "contain | cover"\n                        }\n                    }\n                },\n                {\n                    "comp": "video",\n                    "data": {\n                        "youtube": {\n                            "videoId": "DnpO_RTSNmQ",\n                            "autoplay": false\n                        }\n                    }\n                },\n                {\n                    "comp": "markdown",\n                    "data": {\n                        "markdown": "# Markdown\\n```typescript\\n   const myProp: string = \'value\';\\n```\\n"\n                    }\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "blue"\n                    }\n                }\n            ]\n        }\n    ]\n}', 100, 0, '2018-07-21 16:40:32'),
(2, 2, 1, 'first', '["/assets/backgrounds/maxresdefault.jpg", "/assets/cards/openmic/images/steemit.svg"]', '{\n    "images": {\n        "opengraph": "./assets/cards/openmic/images/opengraph/openmic-w89-darrenclaxton-resolve.png",\n        "fullsize": "./assets/cards/openmic/images/fullsize/openmic-w89-darrenclaxton-resolve.png",\n        "thumbnail": "./assets/cards/openmic/images/thumbnail/openmic-w89-darrenclaxton-resolve.png"\n    },\n    "colors": {\n        "bg": "#898F41"\n    }\n}', '{\n    "comp": "root",\n    "children": [\n        {\n            "comp": "row-three",\n            "data": {\n                "header": {\n                    "min-height": "12vh"\n                },\n                "footer": {\n                    "min-height": "5vh"\n                }\n            },\n            "children": [\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "white",\n                        "image": {\n                            "url": "/assets/cards/openmic/images/steemit.svg",\n                            "position": "left",\n                            "positions": "center | left | right | top | bottom",\n                            "repeat": "no-repeat",\n                            "repeats": "round | repeat | no-repeat",\n                            "size": "contain",\n                            "sizes": "contain | cover"\n                        }\n                    }\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "rgba(72, 72, 72, 0.0)",\n                        "gradient": {\n                            "dir": "top",\n                            "points": [\n                                {\n                                    "color": "rgba(0,0,0,0.6)",\n                                    "percent": 0\n                                },\n                                {\n                                    "color": "rgba(0,0,0,0.0)",\n                                    "percent": 30\n                                },\n                                {\n                                    "color": "rgba(0,0,0,0.0)",\n                                    "percent": 70\n                                },\n                                {\n                                    "color": "rgba(0,0,0,0.6)",\n                                    "percent": 100\n                                }\n                            ]\n                        },\n                        "image": {\n                            "url": "/assets/backgrounds/maxresdefault.jpg",\n                            "repeat": "no-repeat",\n                            "size": "cover",\n                            "blend-mode": "multiply"\n                        }\n                    },\n                    "children": [\n                        {\n                            "comp": "video",\n                            "data": {\n                                "youtube": {\n                                    "videoId": "5xmIg6P1gb4",\n                                    "autoplay": false\n                                }\n                            }\n                        }\n                    ]\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "#FFF"\n                    }\n                }\n            ]\n        }\n    ]\n}', 100, 0, '2018-07-21 16:41:50'),
(3, 3, 1, 'first', '["/assets/cards/openmic/images/steemit.svg", "/assets/backgrounds/bg_pic1.jpg"]', '{\n    "images": {\n        "opengraph": "./assets/cards/openmic/images/opengraph/openmic-w91-juanhobos-atomos.png",\n        "fullsize": "./assets/cards/openmic/images/fullsize/openmic-w91-juanhobos-atomos.png",\n        "thumbnail": "./assets/cards/openmic/images/thumbnail/openmic-w91-juanhobos-atomos.png"\n    },\n    "colors": {\n        "bg": "#898F41"\n    }\n}', '{\n    "comp": "root",\n    "children": [\n        {\n            "comp": "row-three",\n            "data": {\n                "header": {\n                    "min-height": "12vh"\n                },\n                "footer": {\n                    "min-height": "5vh"\n                }\n            },\n            "children": [\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "white",\n                        "image": {\n                            "url": "/assets/cards/openmic/images/steemit.svg",\n                            "position": "left",\n                            "positions": "center | left | right | top | bottom",\n                            "repeat": "no-repeat",\n                            "repeats": "round | repeat | no-repeat",\n                            "size": "contain",\n                            "sizes": "contain | cover"\n                        }\n                    }\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "rgba(72, 72, 72, 0.0)",\n                        "gradient": {\n                            "dir": "top",\n                            "points": [\n                                {\n                                    "color": "rgba(0,0,0,0.6)",\n                                    "percent": 0\n                                },\n                                {\n                                    "color": "rgba(0,0,0,0.0)",\n                                    "percent": 30\n                                },\n                                {\n                                    "color": "rgba(0,0,0,0.0)",\n                                    "percent": 70\n                                },\n                                {\n                                    "color": "rgba(0,0,0,0.6)",\n                                    "percent": 100\n                                }\n                            ]\n                        },\n                        "image": {\n                            "url": "/assets/backgrounds/bg_pic1.jpg",\n                            "repeat": "no-repeat",\n                            "size": "cover",\n                            "blend-mode": "multiply"\n                        }\n                    },\n                    "children": [\n                        {\n                            "comp": "video",\n                            "data": {\n                                "youtube": {\n                                    "videoId": "cEUCN9-A5aw",\n                                    "autoplay": false\n                                }\n                            }\n                        }\n                    ]\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "#FFF"\n                    }\n                }\n            ]\n        }\n    ]\n}', 100, 0, '2018-07-21 16:41:52'),
(4, 4, 1, 'first', '["/assets/cards/openmic/images/steemit.svg", "/assets/backgrounds/tmb_38184_1852.jpg"]', '{\n    "images": {\n        "opengraph": "./assets/cards/openmic/images/opengraph/openmic-w92-drewsmusic-on-my-mind.png",\n        "fullsize": "./assets/cards/openmic/images/fullsize/openmic-w92-drewsmusic-on-my-mind.png",\n        "thumbnail": "./assets/cards/openmic/images/thumbnail/openmic-w92-drewsmusic-on-my-mind.png"\n    },\n    "colors": {\n        "bg": "#898F41"\n    }\n}', '{\n    "comp": "root",\n    "children": [\n        {\n            "comp": "row-three",\n            "data": {\n                "header": {\n                    "min-height": "12vh"\n                },\n                "footer": {\n                    "min-height": "5vh"\n                }\n            },\n            "children": [\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "white",\n                        "image": {\n                            "url": "/assets/cards/openmic/images/steemit.svg",\n                            "position": "left",\n                            "positions": "center | left | right | top | bottom",\n                            "repeat": "no-repeat",\n                            "repeats": "round | repeat | no-repeat",\n                            "size": "contain",\n                            "sizes": "contain | cover"\n                        }\n                    }\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "rgba(72, 72, 72, 0.0)",\n                        "gradient": {\n                            "dir": "top",\n                            "points": [\n                                {\n                                    "color": "rgba(0,0,0,0.6)",\n                                    "percent": 0\n                                },\n                                {\n                                    "color": "rgba(0,0,0,0.0)",\n                                    "percent": 30\n                                },\n                                {\n                                    "color": "rgba(0,0,0,0.0)",\n                                    "percent": 70\n                                },\n                                {\n                                    "color": "rgba(0,0,0,0.6)",\n                                    "percent": 100\n                                }\n                            ]\n                        },\n                        "image": {\n                            "url": "/assets/backgrounds/tmb_38184_1852.jpg",\n                            "repeat": "no-repeat",\n                            "size": "cover",\n                            "blend-mode": "multiply"\n                        }\n                    },\n                    "children": [\n                        {\n                            "comp": "video",\n                            "data": {\n                                "youtube": {\n                                    "videoId": "iSlRSKXGWx4",\n                                    "autoplay": false\n                                }\n                            }\n                        }\n                    ]\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "color": "#FFF"\n                    }\n                }\n            ]\n        }\n    ]\n}', 100, 0, '2018-07-21 16:41:54');

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
  `app` int(32) DEFAULT '0',
  `_super` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `owner` int(32) DEFAULT '0',
  `spec` int(32) DEFAULT '0',
  `_sub_table` varchar(40) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item_spec`
--

CREATE TABLE `item_spec` (
  `id` int(11) NOT NULL,
  `name` varchar(150) DEFAULT '',
  `img` text,
  `cols` int(8) DEFAULT '0',
  `rows` int(8) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `item_spec`
--

INSERT INTO `item_spec` (`id`, `name`, `img`, `cols`, `rows`) VALUES
(1, 'card', '', 3, 4);

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
-- Estructura de tabla para la tabla `oauth_steem`
--

CREATE TABLE `oauth_steem` (
  `id` int(11) NOT NULL,
  `access_token` varchar(500) DEFAULT '',
  `account` varchar(128) DEFAULT '',
  `user` int(32) DEFAULT '0',
  `expires` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
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
  `name` varchar(150) DEFAULT '',
  `slug` varchar(150) DEFAULT '',
  `img` text,
  `owner` int(32) DEFAULT '0',
  `_sub_table` varchar(40) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `publisher`
--

INSERT INTO `publisher` (`id`, `name`, `slug`, `img`, `owner`, `_sub_table`) VALUES
(1, 'Cards & Tokens', 'cards-and-tokens', '{"avatar":"http://cardsandtokens.com/assets/cards-and-tokens.png"}', 1, 'app');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `slot`
--

CREATE TABLE `slot` (
  `id` int(11) NOT NULL,
  `owner` int(32) DEFAULT '0',
  `item` int(32) DEFAULT '0',
  `data` text,
  `container` int(32) DEFAULT '0',
  `_index` int(8) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sticker`
--

CREATE TABLE `sticker` (
  `id` int(11) NOT NULL,
  `text` text,
  `_super` text
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
  `dailyprize` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `app`
--
ALTER TABLE `app`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `collectible`
--
ALTER TABLE `collectible`
  ADD PRIMARY KEY (`id`);

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
-- Indices de la tabla `container_spec`
--
ALTER TABLE `container_spec`
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
-- Indices de la tabla `edition`
--
ALTER TABLE `edition`
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
-- Indices de la tabla `item_spec`
--
ALTER TABLE `item_spec`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `oauth_cache`
--
ALTER TABLE `oauth_cache`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `oauth_steem`
--
ALTER TABLE `oauth_steem`
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
-- Indices de la tabla `slot`
--
ALTER TABLE `slot`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sticker`
--
ALTER TABLE `sticker`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `card`
--
ALTER TABLE `card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `collectible`
--
ALTER TABLE `collectible`
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
-- AUTO_INCREMENT de la tabla `container_spec`
--
ALTER TABLE `container_spec`
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
-- AUTO_INCREMENT de la tabla `edition`
--
ALTER TABLE `edition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
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
-- AUTO_INCREMENT de la tabla `item_spec`
--
ALTER TABLE `item_spec`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `oauth_cache`
--
ALTER TABLE `oauth_cache`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `oauth_steem`
--
ALTER TABLE `oauth_steem`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `slot`
--
ALTER TABLE `slot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `sticker`
--
ALTER TABLE `sticker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
