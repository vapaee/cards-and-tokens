-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 29-08-2018 a las 21:21:20
-- Versión del servidor: 5.7.23-0ubuntu0.16.04.1
-- Versión de PHP: 7.1.16-1+ubuntu16.04.1+deb.sury.org+1

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
(1, 1, 'openmic-100-weeks', 1, 0, '["/assets/backgrounds/maxresdefault.jpg"]', '{\n    "images": {\n        "opengraph": "./assets/albums/openmic/preview-opengraph.png",\n        "fullsize": "./assets/albums/openmic/preview-fullsize.png",\n        "thumbnail": "./assets/albums/openmic/preview-thumbnail.png"\n    },\n    "colors": {\n        "bg": "#898F41"\n    }\n}', '{\n    "comp": "root",\n    "children": [\n        {\n            "comp": "row-three",\n            "data": {\n                "header": {\n                    "min-height": "10vh"\n                },\n                "footer": {\n                    "min-height": "6vh"\n                }\n            },\n            "children": [\n                {\n                    "comp": "background",\n                    "data": {\n                        "container": true,\n                        "image": {\n                            "url": "/assets/albums/openmic/marmol.png",\n                            "repeat": "repeat"\n                        },\n                        "gradient": {\n                            "dir": "top",\n                            "points": [\n                                {\n                                    "color": "black",\n                                    "percent": 0\n                                },\n                                {\n                                    "color": "rgba(0,0,0,0)",\n                                    "percent": 50\n                                }\n                            ]\n                        },\n                        "fgcolor": "white"\n                    },\n                    "children": [\n                        {\n                            "comp": "grid",\n                            "data": {\n                                "rows": [\n                                    [\n                                        {\n                                            "grow": 1,\n                                            "rows": [\n                                                [\n                                                    {\n                                                        "grow": 1,\n                                                        "padding": true\n                                                    }\n                                                ],\n                                                [\n                                                    {\n                                                        "grow": 0,\n                                                        "padding": true\n                                                    },\n                                                    {\n                                                        "grow": 0,\n                                                        "padding": true\n                                                    }\n                                                ]\n                                            ]\n                                        },\n                                        {\n                                            "grow": 0,\n                                            "rows": [\n                                                [\n                                                    {\n                                                        "padding": true,\n                                                        "align": "right"\n                                                    }\n                                                ],\n                                                [\n                                                    {\n                                                        "padding": true,\n                                                        "align": "right"\n                                                    }\n                                                ]\n                                            ]\n                                        }\n                                    ]\n                                ]\n                            },\n                            "children": [\n                                {\n                                    "comp": "label",\n                                    "data": {\n                                        "textid": "album-name"\n                                    }\n                                },\n                                {\n                                    "comp": "label",\n                                    "data": {\n                                        "textid": "album-current-page"\n                                    }\n                                },\n                                {\n                                    "comp": "label",\n                                    "data": {\n                                        "textid": "album-page-title"\n                                    }\n                                },\n                                {\n                                    "comp": "label",\n                                    "data": {\n                                        "textid": "album-ranking"\n                                    }\n                                },\n                                {\n                                    "comp": "label",\n                                    "data": {\n                                        "textid": "album-points"\n                                    }\n                                }\n                            ]\n                        }\n                    ]\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "image": {\n                            "url": "/assets/albums/openmic/billartable.png",\n                            "repeat": "repeat"\n                        },\n                        "gradient": {\n                            "dir": "top",\n                            "points": [\n                                {\n                                    "color": "rgba(255,255,255,0.1)",\n                                    "percent": 0\n                                },\n                                {\n                                    "color": "rgba(255,255,255,0.3)",\n                                    "percent": 30\n                                },\n                                {\n                                    "color": "rgba(255,255,255,0.3)",\n                                    "percent": 70\n                                },\n                                {\n                                    "color": "rgba(255,255,255,0.1)",\n                                    "percent": 100\n                                }\n                            ]\n                        }\n                    },\n                    "children": [\n                        {\n                            "comp": "grid",\n                            "data": {\n                                "rows": [\n                                    [\n                                        {\n                                            "grow": 0,\n                                            "padding": true\n                                        },\n                                        {\n                                            "grow": 1\n                                        },\n                                        {\n                                            "grow": 0,\n                                            "padding": true\n                                        }\n                                    ]\n                                ]\n                            },\n                            "children": [\n                                {\n                                    "comp": "menu",\n                                    "data": {\n                                        "menu": [\n                                            {\n                                                "class": "btn btn-floating btn-success",\n                                                "icon": "fa fa-angle-left",\n                                                "section": "openmic-100-weeks",\n                                                "move": -1\n                                            }\n                                        ]\n                                    }\n                                },\n                                {\n                                    "comp": "album",\n                                    "data": {\n                                        "name": "openmic-100-weeks",\n                                        "title": "Steemit OpenMic - 100 weaks commemoration album",\n                                        "pages": [\n                                            {\n                                                "title": "Cover page",\n                                                "background": {\n                                                    "fadein": true,\n                                                    "image": {\n                                                        "url": "/assets/albums/openmic/cover-fullsize.png",\n                                                        "repeat": "no-repeat",\n                                                        "size": "cover"\n                                                    }\n                                                }\n                                            },\n                                            {\n                                                "title": "Steem OpenMic collectible trading cards",\n                                                "background": {\n                                                    "fadesides": true,\n                                                    "image": {\n                                                        "url": "/assets/backgrounds/maxresdefault.jpg",\n                                                        "repeat": "no-repeat",\n                                                        "size": "cover"\n                                                    }\n                                                },\n                                                "slots": [\n                                                    {\n                                                        "position": {\n                                                            "top": "10%",\n                                                            "left": "22%"\n                                                        }\n                                                    },\n                                                    {\n                                                        "position": {\n                                                            "top": "30%",\n                                                            "left": "44%"\n                                                        }\n                                                    },\n                                                    {\n                                                        "position": {\n                                                            "top": "50%",\n                                                            "left": "66%"\n                                                        }\n                                                    }\n                                                ]\n                                            },\n                                            {\n                                                "title": "Steem OpenMic collectible trading cards",\n                                                "background": {\n                                                    "fadesides": true,\n                                                    "image": {\n                                                        "url": "/assets/backgrounds/bg_pic1.jpg",\n                                                        "repeat": "no-repeat",\n                                                        "size": "cover"\n                                                    }\n                                                },\n                                                "slots": [\n                                                    {\n                                                        "position": {\n                                                            "top": "20%",\n                                                            "left": "10%"\n                                                        }\n                                                    },\n                                                    {\n                                                        "position": {\n                                                            "top": "20%",\n                                                            "left": "30%"\n                                                        }\n                                                    },\n                                                    {\n                                                        "position": {\n                                                            "top": "20%",\n                                                            "left": "50%"\n                                                        }\n                                                    }\n                                                ]\n                                            },\n                                            {\n                                                "title": "Steem OpenMic collectible trading cards",\n                                                "background": {\n                                                    "fadesides": true,\n                                                    "image": {\n                                                        "url": "/assets/backgrounds/tmb_38184_1852.jpg",\n                                                        "repeat": "no-repeat",\n                                                        "size": "cover"\n                                                    }\n                                                },\n                                                "slots": [\n                                                    {\n                                                        "position": {\n                                                            "top": "20%",\n                                                            "right": "10%"\n                                                        }\n                                                    },\n                                                    {\n                                                        "position": {\n                                                            "top": "20%",\n                                                            "right": "30%"\n                                                        }\n                                                    },\n                                                    {\n                                                        "position": {\n                                                            "top": "20%",\n                                                            "right": "50%"\n                                                        }\n                                                    }\n                                                ]\n                                            }\n                                        ]\n                                    }\n                                },\n                                {\n                                    "comp": "menu",\n                                    "data": {\n                                        "menu": [\n                                            {\n                                                "class": "btn btn-floating btn-success",\n                                                "icon": "fa fa-angle-right",\n                                                "section": "openmic-100-weeks",\n                                                "move": 1\n                                            }\n                                        ]\n                                    }\n                                }\n                            ]\n                        }\n                    ]\n                },\n                {\n                    "comp": "background",\n                    "data": {\n                        "image": {\n                            "url": "/assets/albums/openmic/marmol.png",\n                            "repeat": "repeat"\n                        },\n                        "gradient": {\n                            "dir": "top",\n                            "points": [\n                                {\n                                    "color": "rgba(0,0,0,0)",\n                                    "percent": 50\n                                },\n                                {\n                                    "color": "black",\n                                    "percent": 100\n                                }\n                            ]\n                        }\n                    },\n                    "children": [\n                        {\n                            "comp": "inventory",\n                            "data": {\n                                "horizontal": true\n                            }\n                        }\n                    ]\n                }\n            ]\n        }\n    ]\n}');

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
(1, 1, 'f47ebe1ab2f388e549df8570833e18fa', 'a16b39ee4b1df37f5daed29a2918b56e80d7156ac2581fc66c', 'http://cardsandtokens.com', 'http://cardsandtokens.com', 'A place where you can create, trade and collect cards of any topic made by the users themselves.', '2018-07-25 23:56:57', '[]', '{"id":1,"name":"Cards & Tokens","img":{"avatar":"http://cardsandtokens.com/assets/cards-and-tokens.png"},"owner":{"id":1},"publisher_id":2, "slug":"cards-and-tokens"}');

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
(1, 'openmic-w98-zipporah-unseen', '{"title":"Unseen (The Good Fight)","subtitle":"by @zipporah for Steemit OpenMic"}', '{"id":1,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":1},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(2, 'openmic-w98-abelfernandez-inherente', '{"title":"Inherente","subtitle":"by @abelfernandez for Steemit OpenMic"}', '{"id":2,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":2},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(3, 'openmic-w98-mariajruizb-costumbres', '{"title":"Costumbres","subtitle":"by @mariajruizb for Steemit OpenMic"}', '{"id":3,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":3},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(4, 'openmic-w98-kimugas23-i-dont-know-my-name', '{"title":"I Don\'t Know My Name","subtitle":"by @kimugas23 for Steemit OpenMic"}', '{"id":4,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":4},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(5, 'openmic-w98-samidbarid-impossible', '{"title":"Impossible","subtitle":"by @samidbarid for Steemit OpenMic"}', '{"id":5,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":5},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(6, 'openmic-w97-mariajruizb-vissi-d-arte', '{"title":"Vissi d`arte","subtitle":"by @mariajruizb for Steemit OpenMic"}', '{"id":6,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":6},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(7, 'openmic-w97-lisamalletart-sensacao-boa', '{"title":"Sensa\\u00e7\\u00e3o Boa","subtitle":"by @lisamalletart for Steemit OpenMic"}', '{"id":7,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":7},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(8, 'openmic-w97-joseacabrerav-inefable', '{"title":"Inefable","subtitle":"by @joseacabrerav for Steemit OpenMic"}', '{"id":8,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":8},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(9, 'openmic-w97-chaifm-dreamkeeper', '{"title":"Dreamkeeper","subtitle":"by @chaifm for Steemit OpenMic"}', '{"id":9,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":9},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(10, 'openmic-w97-paintingangels-swim', '{"title":"Swim","subtitle":"by @paintingangels for Steemit OpenMic"}', '{"id":10,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":10},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(11, 'openmic-w96-daily-musings-little-truthful-one', '{"title":"Little Truthful One","subtitle":"by @daily-musings for Steemit OpenMic"}', '{"id":11,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":11},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(12, 'openmic-w96-pechichemena-reflejosne', '{"title":"Reflejos","subtitle":"by @pechichemena for Steemit OpenMic"}', '{"id":12,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":12},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(13, 'openmic-w96-joseacabrerav-lloro', '{"title":"Lloro","subtitle":"by @joseacabrerav for Steemit OpenMic"}', '{"id":13,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":13},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(14, 'openmic-w96-lillywilton-the-wrong-way', '{"title":"The Wrong Way","subtitle":"by @lillywilton for Steemit OpenMic"}', '{"id":14,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":14},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}'),
(15, 'openmic-w96-silentscreamer-show-must-go-on', '{"title":"Show must go on","subtitle":"by @silentscreamer for Steemit OpenMic"}', '{"id":15,"publisher":{"id":1},"creator":{"id":1},"edition":{"id":15},"deployable":true,"steem":{"empty":true},"steem_votes":0,"type":"collection"}');

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
(1, 1, 1, 1, 1, '{"empty":true}', 0, 'collection', 'card'),
(2, 1, 1, 2, 1, '{"empty":true}', 0, 'collection', 'card'),
(3, 1, 1, 3, 1, '{"empty":true}', 0, 'collection', 'card'),
(4, 1, 1, 4, 1, '{"empty":true}', 0, 'collection', 'card'),
(5, 1, 1, 5, 1, '{"empty":true}', 0, 'collection', 'card'),
(6, 1, 1, 6, 1, '{"empty":true}', 0, 'collection', 'card'),
(7, 1, 1, 7, 1, '{"empty":true}', 0, 'collection', 'card'),
(8, 1, 1, 8, 1, '{"empty":true}', 0, 'collection', 'card'),
(9, 1, 1, 9, 1, '{"empty":true}', 0, 'collection', 'card'),
(10, 1, 1, 10, 1, '{"empty":true}', 0, 'collection', 'card'),
(11, 1, 1, 11, 1, '{"empty":true}', 0, 'collection', 'card'),
(12, 1, 1, 12, 1, '{"empty":true}', 0, 'collection', 'card'),
(13, 1, 1, 13, 1, '{"empty":true}', 0, 'collection', 'card'),
(14, 1, 1, 14, 1, '{"empty":true}', 0, 'collection', 'card'),
(15, 1, 1, 15, 1, '{"empty":true}', 0, 'collection', 'card');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `collection`
--

CREATE TABLE `collection` (
  `id` int(11) NOT NULL,
  `album` int(32) DEFAULT '0',
  `points` int(32) DEFAULT '0',
  `position` int(32) DEFAULT '0',
  `owner` int(32) DEFAULT '0',
  `_super` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `collection`
--

INSERT INTO `collection` (`id`, `album`, `points`, `position`, `owner`, `_super`) VALUES
(2, 1, 0, 0, 1, '{"id":2,"owner":{"id":1},"capacity":9,"empty":9,"spec":{"id":1}}');

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

--
-- Volcado de datos para la tabla `container`
--

INSERT INTO `container` (`id`, `owner`, `capacity`, `empty`, `spec`, `_sub_table`) VALUES
(1, 1, 8, 8, 2, 'inventory'),
(2, 1, 9, 9, 1, 'collection');

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
(1, 1, 1, 'first', '["alone-animal-bird-395196.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w98-zipporah-unseen.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w98-zipporah-unseen.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w98-zipporah-unseen.png"},"colors":{"bg":"rgb(128,179,157)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"Unseen (The Good Fight)"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics"},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@zipporah\\/steemit-open-mic-week-98-unseen-the-good-fight-original"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/alone-animal-bird-395196.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"8vQb2JRloQ8","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":"# Lyrics \\n\\nthere\'s a darkness that plagues my soul  \\nsomething ancient and unkind  \\nlike the gravity of a black hole  \\nit\'s been drawing me in all my life \\n\\nI feel like a star that\'s collapsing  \\nslowly losing my light  \\nbut still...tryin\' to burn bright \\n\\nthere\'s an ocean of shame so deep  \\nthe tears of a thousand lifetimes  \\nlike a riptide, unseen  \\nit\'s been pullin\' me astray all my life \\n\\nit\'s hard to keep my head above water  \\nwhile the current keeps getting stronger  \\nI\'m just tryin\' not to drown \\n\\nso, here I am \\u2013 in the boxing ring  \\nthrowing punches with the shadows  \\nflailing against invisible things  \\nweakened by these unseen battles \\n\\nlike a boxer, in the final round  \\nbroken and pinned to the ground  \\nI\'m just tryin\' not to tap out \\n\\nnow \\u2013 I\'m just so fuckin\' exhausted  \\nbut I\'m still tryin\' so hard to be alright  \\nso \\u2013 please \\u2013 don\'t give up on me yet  \\n\'cause I promise \\u2013 I\'m fighting the good fight \\n\\nI promise....I\'m fightin\' the good fight"}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"week":"98","position":"1","slug":"openmic-w98-zipporah-unseen","youtube":"8vQb2JRloQ8","steemuser":"zipporah","permlink":"steemit-open-mic-week-98-unseen-the-good-fight-original","title":"Unseen (The Good Fight)","bgimage":"alone-animal-bird-395196.jpg","link":"https:\\/\\/steemit.com\\/openmic\\/@zipporah\\/steemit-open-mic-week-98-unseen-the-good-fight-original","original":true,"has_lyrics":true,"lyrics":"Lyrics\\n\\nthere\'s a darkness that plagues my soul\\nsomething ancient and unkind\\nlike the gravity of a black hole\\nit\'s been drawing me in all my life\\n\\nI feel like a star that\'s collapsing\\nslowly losing my light\\nbut still...tryin\' to burn bright\\n\\nthere\'s an ocean of shame so deep\\nthe tears of a thousand lifetimes\\nlike a riptide, unseen\\nit\'s been pullin\' me astray all my life\\n\\nit\'s hard to keep my head above water\\nwhile the current keeps getting stronger\\nI\'m just tryin\' not to drown\\n\\nso, here I am \\u2013 in the boxing ring\\nthrowing punches with the shadows\\nflailing against invisible things\\nweakened by these unseen battles\\n\\nlike a boxer, in the final round\\nbroken and pinned to the ground\\nI\'m just tryin\' not to tap out\\n\\nnow \\u2013 I\'m just so fuckin\' exhausted\\nbut I\'m still tryin\' so hard to be alright\\nso \\u2013 please \\u2013 don\'t give up on me yet\\n\'cause I promise \\u2013 I\'m fighting the good fight\\n\\nI promise....I\'m fightin\' the good fight"}}', 0, 1, '2018-08-29 22:44:33'),
(2, 2, 1, 'first', '["adult-amplifier-band-375893.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w98-abelfernandez-inherente.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w98-abelfernandez-inherente.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w98-abelfernandez-inherente.png"},"colors":{"bg":"rgb(123,172,152)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"Inherente"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics"},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@abelfernandez\\/bvkynxhm"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/adult-amplifier-band-375893.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"5hYtdiBWj9s","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":"# Lyrics \\n\\nInherente, lo creo  \\nalmas perdidas en tiempos  \\ncon su inocencia se pudieron matar  \\nel mundo es injusto, no entiendo mis impulsos  \\naveces aman a quien no deben amar  \\nno se trata de que mereces  \\nlas cicatrices solo reflejan toda mi suerte  \\npero del da\\u00f1o que me hiciste mucho pude entenderte  \\nno se trata de vientos, si no de efectos  \\nderivados de mis males cuales causan mis lamentos  \\nel mundo es perfecto, pero no el pensamiento  \\nque se queja por detalles y anula sus defectos  \\npero es inherente... \\n\\nFrustrado y amado, con ceguera en mi santuario  \\naveces ya olvido a quien debo rezar  \\nmi orgullo no habla, espera las batallas  \\nen las que siente que el no puede ganar  \\ncomo me cambia la mirada  \\npienso las cosas par de veces mas y tengo agallas  \\nla osad\\u00eda de la vida ya no me es tan homicida..."}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"week":"98","position":"2","slug":"openmic-w98-abelfernandez-inherente","youtube":"5hYtdiBWj9s","steemuser":"abelfernandez","permlink":"bvkynxhm","title":"Inherente","link":"https:\\/\\/steemit.com\\/openmic\\/@abelfernandez\\/bvkynxhm","original":true,"has_lyrics":true,"lyrics":"Lyrics\\n\\nInherente, lo creo\\nalmas perdidas en tiempos\\ncon su inocencia se pudieron matar\\nel mundo es injusto, no entiendo mis impulsos\\naveces aman a quien no deben amar\\nno se trata de que mereces\\nlas cicatrices solo reflejan toda mi suerte\\npero del da\\u00f1o que me hiciste mucho pude entenderte\\nno se trata de vientos, si no de efectos\\nderivados de mis males cuales causan mis lamentos\\nel mundo es perfecto, pero no el pensamiento\\nque se queja por detalles y anula sus defectos\\npero es inherente...\\n\\nFrustrado y amado, con ceguera en mi santuario\\naveces ya olvido a quien debo rezar\\nmi orgullo no habla, espera las batallas\\nen las que siente que el no puede ganar\\ncomo me cambia la mirada\\npienso las cosas par de veces mas y tengo agallas\\nla osad\\u00eda de la vida ya no me es tan homicida...","bgimage":"adult-amplifier-band-375893.jpg"}}', 0, 1, '2018-08-29 22:49:46'),
(3, 3, 1, 'first', '["audio-band-black-and-white-9137.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w98-mariajruizb-costumbres.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w98-mariajruizb-costumbres.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w98-mariajruizb-costumbres.png"},"colors":{"bg":"rgb(188,159,195)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"Costumbres"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics"},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@mariajruizb\\/qyvehnbq"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/audio-band-black-and-white-9137.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"iyUDIkpJ6Gg","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":"# Lyrics \\n\\nH\\u00e1blame de t\\u00ed  \\ncu\\u00e9ntame de tu vida  \\nsabes t\\u00fa muy bien  \\nque tu estas convencida,  \\nde que t\\u00fa no puedes  \\naunque intentes olvidarme,  \\nsiempre volver\\u00e1s una y otra vez,  \\nuna y otra vez, siempre volver\\u00e1s. \\n\\nAunque ya no sientas m\\u00e1s amor por m\\u00ed,  \\ns\\u00f3lo rencor,  \\nyo tampoco tengo nada que sentir  \\ny eso es peor,  \\npero te extra\\u00f1o, como te extra\\u00f1o,  \\nno cabe duda que es verdad que la costumbre  \\nes m\\u00e1s fuerte que el amor. \\n\\nSe que t\\u00fa no puedes  \\naunque intentes olvidarme  \\nsiempre volver\\u00e1s una y otra vez,  \\nuna y otra vez, siempre volver\\u00e1s. \\n\\nAunque ya no sientas m\\u00e1s amor por m\\u00ed,  \\ns\\u00f3lo rencor,  \\nyo tampoco tengo nada que sentir  \\ny eso es peor,  \\npero te extra\\u00f1o, como te extra\\u00f1o,  \\nno cabe duda que es verdad que la costumbre  \\nes m\\u00e1s fuerte que el amor. \\n\\nNo cabe duda que es verdad que la costumbre  \\nes m\\u00e1s fuerte que el amor."}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"week":"98","position":"3","slug":"openmic-w98-mariajruizb-costumbres","youtube":"iyUDIkpJ6Gg","permlink":"qyvehnbq","steemuser":"mariajruizb","title":"Costumbres","link":"https:\\/\\/steemit.com\\/openmic\\/@mariajruizb\\/qyvehnbq","has_lyrics":true,"lyrics":"Lyrics\\n\\nH\\u00e1blame de t\\u00ed\\ncu\\u00e9ntame de tu vida\\nsabes t\\u00fa muy bien\\nque tu estas convencida,\\nde que t\\u00fa no puedes\\naunque intentes olvidarme,\\nsiempre volver\\u00e1s una y otra vez,\\nuna y otra vez, siempre volver\\u00e1s.\\n\\nAunque ya no sientas m\\u00e1s amor por m\\u00ed,\\ns\\u00f3lo rencor,\\nyo tampoco tengo nada que sentir\\ny eso es peor,\\npero te extra\\u00f1o, como te extra\\u00f1o,\\nno cabe duda que es verdad que la costumbre\\nes m\\u00e1s fuerte que el amor.\\n\\nSe que t\\u00fa no puedes\\naunque intentes olvidarme\\nsiempre volver\\u00e1s una y otra vez,\\nuna y otra vez, siempre volver\\u00e1s.\\n\\nAunque ya no sientas m\\u00e1s amor por m\\u00ed,\\ns\\u00f3lo rencor,\\nyo tampoco tengo nada que sentir\\ny eso es peor,\\npero te extra\\u00f1o, como te extra\\u00f1o,\\nno cabe duda que es verdad que la costumbre\\nes m\\u00e1s fuerte que el amor.\\n\\nNo cabe duda que es verdad que la costumbre\\nes m\\u00e1s fuerte que el amor.","bgimage":"audio-band-black-and-white-9137.jpg"}}', 0, 1, '2018-08-29 22:55:52'),
(4, 4, 1, 'first', '["steemit-open-mic-week-98-i-don-t-know-my-name.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w98-kimugas23-i-dont-know-my-name.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w98-kimugas23-i-dont-know-my-name.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w98-kimugas23-i-dont-know-my-name.png"},"colors":{"bg":"rgb(175,168,113)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"I Don\'t Know My Name"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics"},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@kimugas23\\/steemit-open-mic-week-98-i-don-t-know-my-name-de-grace-vanderwaal-cover"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/steemit-open-mic-week-98-i-don-t-know-my-name.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"B6AL-vVT_tk","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":"# Lyrics \\n\\nI don\'t know my name  \\nI don\'t play by the rules of the game  \\nSo you say I\'m just trying  \\nJust trying  \\nSo I heard you are my sister\'s friend  \\nYou get along quite nicely  \\nYou ask me why I cut my hair  \\nAnd changed myself completely  \\nI don\'t know my name  \\nI don\'t play by the rules of the game  \\nSo you say I\'m just trying  \\nJust trying  \\nI went from bland and popular  \\nTo joining the marching band  \\nI made the closest friends  \\nI ever have in my lifetime  \\nI am lost trying to get found  \\nIn an ocean of people  \\nPlease don\'t ask me any questions  \\nThere\'ll be a valid answer  \\nOh I\'ll just say  \\nThat I don\'t know my name  \\nI don\'t play by the rules of the game  \\nSo you say I\'m just trying  \\nJust trying  \\nI now know my name!  \\nI don\'t play by the rules of the game  \\nSo you say, I\'m not trying  \\nBut I\'m trying  \\nTo find my way"}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"week":"98","position":"4","link":"https:\\/\\/steemit.com\\/openmic\\/@kimugas23\\/steemit-open-mic-week-98-i-don-t-know-my-name-de-grace-vanderwaal-cover","bgimage":"steemit-open-mic-week-98-i-don-t-know-my-name.jpg","title":"I Don\'t Know My Name","permlink":"steemit-open-mic-week-98-i-don-t-know-my-name-de-grace-vanderwaal-cover","steemuser":"kimugas23","youtube":"B6AL-vVT_tk","slug":"openmic-w98-kimugas23-i-dont-know-my-name","original":false,"has_lyrics":true,"lyrics":"Lyrics\\n\\nI don\'t know my name\\nI don\'t play by the rules of the game\\nSo you say I\'m just trying\\nJust trying\\nSo I heard you are my sister\'s friend\\nYou get along quite nicely\\nYou ask me why I cut my hair\\nAnd changed myself completely\\nI don\'t know my name\\nI don\'t play by the rules of the game\\nSo you say I\'m just trying\\nJust trying\\nI went from bland and popular\\nTo joining the marching band\\nI made the closest friends\\nI ever have in my lifetime\\nI am lost trying to get found\\nIn an ocean of people\\nPlease don\'t ask me any questions\\nThere\'ll be a valid answer\\nOh I\'ll just say\\nThat I don\'t know my name\\nI don\'t play by the rules of the game\\nSo you say I\'m just trying\\nJust trying\\nI now know my name!\\nI don\'t play by the rules of the game\\nSo you say, I\'m not trying\\nBut I\'m trying\\nTo find my way"}}', 0, 1, '2018-08-29 23:01:10'),
(5, 5, 1, 'first', '["D63ECE7E-F1BA-47AA-9B01-1AF63B8A9077.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w98-samidbarid-impossible.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w98-samidbarid-impossible.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w98-samidbarid-impossible.png"},"colors":{"bg":"rgb(148,198,146)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"Impossible"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics","hidden":true},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@samidbarid\\/steemit-openmic-week-98-sami-d-barid-impossible-original-piano-song"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/D63ECE7E-F1BA-47AA-9B01-1AF63B8A9077.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"M-A97KfzJu8","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":""}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"week":"98","position":"5","slug":"openmic-w98-samidbarid-impossible","youtube":"M-A97KfzJu8","steemuser":"samidbarid","permlink":"steemit-openmic-week-98-sami-d-barid-impossible-original-piano-song","title":"Impossible","bgimage":"D63ECE7E-F1BA-47AA-9B01-1AF63B8A9077.jpg","link":"https:\\/\\/steemit.com\\/openmic\\/@samidbarid\\/steemit-openmic-week-98-sami-d-barid-impossible-original-piano-song","original":true}}', 0, 1, '2018-08-29 23:21:25'),
(6, 6, 1, 'first', '["acoustic-acoustic-guitar-chords-66753.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w97-mariajruizb-vissi-d-arte.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w97-mariajruizb-vissi-d-arte.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w97-mariajruizb-vissi-d-arte.png"},"colors":{"bg":"rgb(138,160,155)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"Vissi d`arte"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics"},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@mariajruizb\\/9nxl60a4"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/acoustic-acoustic-guitar-chords-66753.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"gB4SM6LYOu8","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":"# Lyrics  \\n\\nVissi d\'arte, vissi d\'amore  \\nNon feci mai male ad anima viva!  \\nCon man furtiva  \\nQuante miserie conobbi aiutai  \\nSempre con f\\u00e8 sincera  \\nLa mia preghiera  \\nAi santi tabernacoli sal\\u00ec  \\nSempre con f\\u00e8 sincera  \\nDiedi fiori agl\'altar  \\nNell\'ora del dolore  \\nPerch\\u00e8, perch\\u00e8, signore  \\nPerch\\u00e8 me ne rimuneri cos\\u00ec?  \\nDiedi gioielli della madonna al manto  \\nE diedi il canto agli astri, al ciel  \\nChe ne ridean pi\\u00f9 belli  \\nNell\'ora del dolor  \\nPerch\\u00e8, perch\\u00e8, signor  \\nAh, perch\\u00e8 me ne rimuneri cos\\u00ec?"}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"steemuser":"mariajruizb","has_lyrics":true,"lyrics":"Vissi d\'arte, vissi d\'amore\\nNon feci mai male ad anima viva!\\nCon man furtiva\\nQuante miserie conobbi aiutai\\nSempre con f\\u00e8 sincera\\nLa mia preghiera\\nAi santi tabernacoli sal\\u00ec\\nSempre con f\\u00e8 sincera\\nDiedi fiori agl\'altar\\nNell\'ora del dolore\\nPerch\\u00e8, perch\\u00e8, signore\\nPerch\\u00e8 me ne rimuneri cos\\u00ec?\\nDiedi gioielli della madonna al manto\\nE diedi il canto agli astri, al ciel\\nChe ne ridean pi\\u00f9 belli\\nNell\'ora del dolor\\nPerch\\u00e8, perch\\u00e8, signor\\nAh, perch\\u00e8 me ne rimuneri cos\\u00ec?","link":"https:\\/\\/steemit.com\\/openmic\\/@mariajruizb\\/9nxl60a4","title":"Vissi d`arte","permlink":"9nxl60a4","youtube":"gB4SM6LYOu8","slug":"openmic-w97-mariajruizb-vissi-d-arte","week":"97","position":"1","bgimage":"acoustic-acoustic-guitar-chords-66753.jpg"}}', 0, 1, '2018-08-29 23:25:09'),
(7, 7, 1, 'first', '["abstract-abstract-expressionism-abstract-painting-1313413.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w97-lisamalletart-sensacao-boa.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w97-lisamalletart-sensacao-boa.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w97-lisamalletart-sensacao-boa.png"},"colors":{"bg":"rgb(189,108,110)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"Sensa\\u00e7\\u00e3o Boa"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics"},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@lisamalletart\\/openmic-week-97-sensacao-boa-or-lisa-and-rhavi-andre-mata-lucas-siquiera-and-gabriel-machado-s-original-song"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/abstract-abstract-expressionism-abstract-painting-1313413.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"kx8bNRqGEe8","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":"# Lyrics  \\n\\nEu chego cedo em casa todo dia  \\nS\\u00f3 pra te encontrar te sentir no ar poder te namorar  \\nDizer palavras quentes no cantinho do ouvido  \\nE nos meus bra\\u00e7os te fazer mulher  \\nEu largo tudo dou meu mundo  \\nPra ficar contigo se voc\\u00ea quiser \\n\\nS\\u00f3 pra ter  \\naquela sensa\\u00e7\\u00e3o boa de ficar a toa o tempo voa larga tudo e vem pra c\\u00e1 \\n\\nQuase chegando a hora e esse tempo que n\\u00e3o passa  \\nUma saudade que eu vou te contar  \\nEu quero um compromisso com aquele teu sorriso  \\nQue me faz sonhar  \\nMeu bem s\\u00f3 fa\\u00e7o com voc\\u00ea  \\nS\\u00f3 quero com voc\\u00ea  \\nT\\u00f4 indo te encontrar quero te ver \\n\\nS\\u00f3 pra ter  \\naquela sensa\\u00e7\\u00e3o boa de ficar a toa o tempo voa larga tudo e vem pra c\\u00e1 \\n\\nS\\u00f3 pra ter aquela sensa\\u00e7\\u00e3o de sentir bem devagar acelerar o cora\\u00e7\\u00e3o  \\n\\u00danica inigual\\u00e1vel imensur\\u00e1vel  \\nQuando estamos juntos tudo \\u00e9 inacredit\\u00e1vel  \\nEu fico aqui pensando sonhando fazendo planos  \\nQuero ter voc\\u00ea comigo por mais de 1000 anos  \\nEnt\\u00e3o escuta o meu recado larga tudo e vem  \\nPorque se n\\u00e3o vier eu vou meu bem"}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"bgimage":"abstract-abstract-expressionism-abstract-painting-1313413.jpg","link":"https:\\/\\/steemit.com\\/openmic\\/@lisamalletart\\/openmic-week-97-sensacao-boa-or-lisa-and-rhavi-andre-mata-lucas-siquiera-and-gabriel-machado-s-original-song","has_lyrics":true,"title":"Sensa\\u00e7\\u00e3o Boa","permlink":"openmic-week-97-sensacao-boa-or-lisa-and-rhavi-andre-mata-lucas-siquiera-and-gabriel-machado-s-original-song","steemuser":"lisamalletart","youtube":"kx8bNRqGEe8","slug":"openmic-w97-lisamalletart-sensacao-boa","position":"2","week":"97","lyrics":"Eu chego cedo em casa todo dia\\nS\\u00f3 pra te encontrar te sentir no ar poder te namorar\\nDizer palavras quentes no cantinho do ouvido\\nE nos meus bra\\u00e7os te fazer mulher\\nEu largo tudo dou meu mundo\\nPra ficar contigo se voc\\u00ea quiser\\n\\nS\\u00f3 pra ter\\naquela sensa\\u00e7\\u00e3o boa de ficar a toa o tempo voa larga tudo e vem pra c\\u00e1\\n\\nQuase chegando a hora e esse tempo que n\\u00e3o passa\\nUma saudade que eu vou te contar\\nEu quero um compromisso com aquele teu sorriso\\nQue me faz sonhar\\nMeu bem s\\u00f3 fa\\u00e7o com voc\\u00ea\\nS\\u00f3 quero com voc\\u00ea\\nT\\u00f4 indo te encontrar quero te ver\\n\\nS\\u00f3 pra ter\\naquela sensa\\u00e7\\u00e3o boa de ficar a toa o tempo voa larga tudo e vem pra c\\u00e1\\n\\nS\\u00f3 pra ter aquela sensa\\u00e7\\u00e3o de sentir bem devagar acelerar o cora\\u00e7\\u00e3o\\n\\u00danica inigual\\u00e1vel imensur\\u00e1vel\\nQuando estamos juntos tudo \\u00e9 inacredit\\u00e1vel\\nEu fico aqui pensando sonhando fazendo planos\\nQuero ter voc\\u00ea comigo por mais de 1000 anos\\nEnt\\u00e3o escuta o meu recado larga tudo e vem\\nPorque se n\\u00e3o vier eu vou meu bem"}}', 0, 1, '2018-08-29 23:38:43'),
(8, 8, 1, 'first', '["acoustic-acoustic-guitar-bass-258283.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w97-joseacabrerav-inefable.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w97-joseacabrerav-inefable.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w97-joseacabrerav-inefable.png"},"colors":{"bg":"rgb(127,170,136)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"Inefable"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics"},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@joseacabrerav\\/mux6jqx8"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/acoustic-acoustic-guitar-bass-258283.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"sJdZkcvBU64","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":"# Lyrics  \\n\\nNo sabes cu\\u00e1nto desea mi cuerpo a tus besos  \\nEl cuerpo de una guitarra marcada en tu pecho  \\nNo sabes cu\\u00e1nto quisiera conocerte de nuevo  \\nVolver a ser el primero empezar desde cero  \\nTenerte m\\u00e1s de un detalle, aunque siempre llegues tarde  \\nPorque de siempre pensarte te has vuelto mi arte  \\nSusurrarte al o\\u00eddo, decir te quiero bajito  \\nY pintarte de rojo los labios a mordiscos  \\nNo sabes cu\\u00e1nto he pensado buscarte a tu casa  \\nDecirte cuatro verdades solo a ver qu\\u00e9 nos pasa  \\nNo tengo idea del tiempo que he buscado palabras  \\nPara que sea inefable todo lo que nos pasa  \\nDir\\u00e1s que soy un suicida, que no me queda salida  \\nPorque a lo largo del d\\u00eda me tatu\\u00e9 tu sonrisa  \\nTenerte m\\u00e1s de un detalle aunque siempre llegues tarde  \\nPorque de tanto pensarte te has vuelto mi arte\\u2026"}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"link":"https:\\/\\/steemit.com\\/openmic\\/@joseacabrerav\\/mux6jqx8","has_lyrics":true,"original":true,"week":"97","slug":"openmic-w97-joseacabrerav-inefable","position":"3","youtube":"sJdZkcvBU64","steemuser":"joseacabrerav","permlink":"mux6jqx8","title":"Inefable","bgimage":"acoustic-acoustic-guitar-bass-258283.jpg","lyrics":"No sabes cu\\u00e1nto desea mi cuerpo a tus besos\\nEl cuerpo de una guitarra marcada en tu pecho\\nNo sabes cu\\u00e1nto quisiera conocerte de nuevo\\nVolver a ser el primero empezar desde cero\\nTenerte m\\u00e1s de un detalle, aunque siempre llegues tarde\\nPorque de siempre pensarte te has vuelto mi arte\\nSusurrarte al o\\u00eddo, decir te quiero bajito\\nY pintarte de rojo los labios a mordiscos\\nNo sabes cu\\u00e1nto he pensado buscarte a tu casa\\nDecirte cuatro verdades solo a ver qu\\u00e9 nos pasa\\nNo tengo idea del tiempo que he buscado palabras\\nPara que sea inefable todo lo que nos pasa\\nDir\\u00e1s que soy un suicida, que no me queda salida\\nPorque a lo largo del d\\u00eda me tatu\\u00e9 tu sonrisa\\nTenerte m\\u00e1s de un detalle aunque siempre llegues tarde\\nPorque de tanto pensarte te has vuelto mi arte\\u2026"}}', 0, 1, '2018-08-29 23:42:30'),
(9, 9, 1, 'first', '["36741548_10215029460803671_2282981980628844544_n.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w97-chaifm-dreamkeeper.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w97-chaifm-dreamkeeper.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w97-chaifm-dreamkeeper.png"},"colors":{"bg":"rgb(160,138,131)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"Dreamkeeper"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics"},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@chaifm\\/steemit-openmic-week-97-dreamkeeper-original-song"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/36741548_10215029460803671_2282981980628844544_n.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"cFkKUN9-jJ8","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":"# Lyrics  \\n\\nYou ask for love,  \\nand I gave you time alone.  \\nSo, you learn to love yourself,  \\nbefore,  \\nyou share this beautiful soul. \\n\\nChorus:  \\nI am dreamkeeper,  \\nI grant every wish,  \\nit\'s not something you want,  \\nbut it\'s something you need. \\n\\nYou pray for sunshine,  \\nand I gave you rain.  \\nSo, you can grow,  \\nand was away this pain. \\n\\nChorus \\n\\nYou ask for health,  \\nand I gave you strength.  \\nDon\'t you know, you can carry on,  \\nand find hope inside yourself. \\n\\nPlease don\'t ask me,  \\nfor something to have,  \\njust ask for something to feel,  \\nthem give it all away. \\n\\nFeel home,  \\nFeel happy,  \\nAlive,  \\nFeel happy. \\n\\nChorus"}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"link":"https:\\/\\/steemit.com\\/openmic\\/@chaifm\\/steemit-openmic-week-97-dreamkeeper-original-song","original":true,"has_lyrics":true,"title":"Dreamkeeper","permlink":"steemit-openmic-week-97-dreamkeeper-original-song","steemuser":"chaifm","youtube":"cFkKUN9-jJ8","slug":"openmic-w97-chaifm-dreamkeeper","week":"97","position":"4","bgimage":"36741548_10215029460803671_2282981980628844544_n.jpg","lyrics":"You ask for love,\\nand I gave you time alone.\\nSo, you learn to love yourself,\\nbefore,\\nyou share this beautiful soul.\\n\\nChorus:\\nI am dreamkeeper,\\nI grant every wish,\\nit\'s not something you want,\\nbut it\'s something you need.\\n\\nYou pray for sunshine,\\nand I gave you rain.\\nSo, you can grow,\\nand was away this pain.\\n\\nChorus\\n\\nYou ask for health,\\nand I gave you strength.\\nDon\'t you know, you can carry on,\\nand find hope inside yourself.\\n\\nPlease don\'t ask me,\\nfor something to have,\\njust ask for something to feel,\\nthem give it all away.\\n\\nFeel home,\\nFeel happy,\\nAlive,\\nFeel happy.\\n\\nChorus"}}', 0, 1, '2018-08-29 23:47:12'),
(10, 10, 1, 'first', '["art-background-decoration-354939.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w97-paintingangels-swim.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w97-paintingangels-swim.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w97-paintingangels-swim.png"},"colors":{"bg":"rgb(171,126,163)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"Swim"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics"},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@paintingangels\\/ma9hn6nf"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/art-background-decoration-354939.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"dO7vogSFdrg","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":"# Lyrics  \\n\\nDo you believe in love  \\nlike I believe in love?  \\nDo you believe in me  \\nlike I believe in you?  \\nDo you believe we\'ll swim  \\nbeyond this deep sea floor  \\nor baby will we fall through  \\nand sink down into the blue? \\n\\nSink down into the blue \\n\\nDo you believe that time  \\ncan make our heartbeats rhyme?  \\nCan we dance like stars?  \\nCan we heal these scars? \\n\\nCan we dance like stars? \\n\\nHow many times have I really had to ask?  \\nI\'m growing so tired of never knowing that. \\n\\nWe\'re like a broken shell  \\nBaby, we\'ve been through hell  \\nWe could be bullet proof  \\nbut I just don\'t know if you.. \\n\\nIf you believe in love  \\nlike I believe in love  \\nDo you believe in me  \\nlike I believe in you? \\n\\nDo you believe in me?"}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"link":"https:\\/\\/steemit.com\\/openmic\\/@paintingangels\\/ma9hn6nf","title":"Swim","original":true,"has_lyrics":true,"permlink":"ma9hn6nf","steemuser":"paintingangels","youtube":"dO7vogSFdrg","slug":"openmic-w97-paintingangels-swim","week":"97","position":"5","bgimage":"art-background-decoration-354939.jpg","lyrics":"Do you believe in love\\nlike I believe in love?\\nDo you believe in me\\nlike I believe in you?\\nDo you believe we\'ll swim\\nbeyond this deep sea floor\\nor baby will we fall through\\nand sink down into the blue?\\n\\nSink down into the blue\\n\\nDo you believe that time\\ncan make our heartbeats rhyme?\\nCan we dance like stars?\\nCan we heal these scars?\\n\\nCan we dance like stars?\\n\\nHow many times have I really had to ask?\\nI\'m growing so tired of never knowing that.\\n\\nWe\'re like a broken shell\\nBaby, we\'ve been through hell\\nWe could be bullet proof\\nbut I just don\'t know if you..\\n\\nIf you believe in love\\nlike I believe in love\\nDo you believe in me\\nlike I believe in you?\\n\\nDo you believe in me?"}}', 0, 1, '2018-08-29 23:53:13'),
(11, 11, 1, 'first', '["blanket-close-up-comfort-1248583.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w96-daily-musings-little-truthful-one.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w96-daily-musings-little-truthful-one.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w96-daily-musings-little-truthful-one.png"},"colors":{"bg":"rgb(191,123,138)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"Little Truthful One"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics"},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@daily-musings\\/steemit-open-mic-week-96-or-little-truthful-one-or-daily-musings-original-song"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/blanket-close-up-comfort-1248583.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"P8pdkwfD8EI","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":"# Lyrics  \\n\\nOh little truthful one  \\nYou\'re caught up in a lie  \\nSaying that it\'s dark  \\nWhen I see sunlight outside \\n\\nOh little truthful one  \\nYou know you can smile  \\nBut the corners of your mouth  \\nAre turned down at the sides \\n\\nCould you try?  \\nWould it kill you to try?  \\nCould you smile?  \\nWould it kill you to smile? \\n\\nOh little truthful one  \\nGet out of your head  \\nTelling me that your tired  \\nWhen I know you you spent the whole day in bed  \\nMhmm \\n\\nCould you try?  \\nWould it kill you to try?  \\nCould you try?  \\nWould it kill you to try? \\n\\nI\'ll be there soon  \\nIs there anything you\'d like to do?  \\nI\'ll be there soon  \\nCould you tell me what you\'re going through? \\n\\nCould you try?  \\nYou don\'t have to close your eyes  \\nCould you try?  \\nI swear it\'s not always night \\n\\nOh little truthful one  \\nYou\'re caught up in a lie"}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"link":"https:\\/\\/steemit.com\\/openmic\\/@daily-musings\\/steemit-open-mic-week-96-or-little-truthful-one-or-daily-musings-original-song","original":true,"has_lyrics":true,"lyrics":"Oh little truthful one\\nYou\'re caught up in a lie\\nSaying that it\'s dark\\nWhen I see sunlight outside\\n\\nOh little truthful one\\nYou know you can smile\\nBut the corners of your mouth\\nAre turned down at the sides\\n\\nCould you try?\\nWould it kill you to try?\\nCould you smile?\\nWould it kill you to smile?\\n\\nOh little truthful one\\nGet out of your head\\nTelling me that your tired\\nWhen I know you you spent the whole day in bed\\nMhmm\\n\\nCould you try?\\nWould it kill you to try?\\nCould you try?\\nWould it kill you to try?\\n\\nI\'ll be there soon\\nIs there anything you\'d like to do?\\nI\'ll be there soon\\nCould you tell me what you\'re going through?\\n\\nCould you try?\\nYou don\'t have to close your eyes\\nCould you try?\\nI swear it\'s not always night\\n\\nOh little truthful one\\nYou\'re caught up in a lie","week":"96","position":"1","slug":"openmic-w96-daily-musings-little-truthful-one","youtube":"P8pdkwfD8EI","steemuser":"daily-musings","permlink":"steemit-open-mic-week-96-or-little-truthful-one-or-daily-musings-original-song","title":"Little Truthful One","bgimage":"blanket-close-up-comfort-1248583.jpg"}}', 0, 1, '2018-08-29 23:56:51');
INSERT INTO `edition` (`id`, `collectible`, `creator`, `url`, `preload`, `preview`, `deploy`, `copies`, `released`, `released_time`) VALUES
(12, 12, 1, 'first', '["black-and-white-headphones-life-3104.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w96-pechichemena-reflejosne.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w96-pechichemena-reflejosne.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w96-pechichemena-reflejosne.png"},"colors":{"bg":"rgb(159,184,196)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"Reflejos"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics"},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@pechichemena\\/6dgvf0i9"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/black-and-white-headphones-life-3104.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"kDn7LAUaqjs","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":"# Lyrics  \\n\\nUn reflejo  \\nque lento se llev\\u00f3  \\nLa risa  \\nque guardo en un caj\\u00f3n  \\nse escondi\\u00f3  \\nY no ve nada  \\nUn alma asustada  \\nHay cenizas  \\nQue guardo en un jarr\\u00f3n  \\nDe penas  \\nque un dia se perdi\\u00f3  \\nSe escondi\\u00f3  \\nno dijo nada  \\nSer\\u00e1 que hoy... \\n\\n\'\'\\u00bfTe llevar\\u00e1s la vela  \\nsin decir adi\\u00f3s?\'\'  \\nUna voz se eleva  \\nSe apag\\u00f3 \\n\\n\'\'\\u00bfY mover\\u00e1s la tierra  \\nsin pedir perd\\u00f3n?\'\'  \\nUna voz se quiebra  \\nSe apag\\u00f3"}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"link":"https:\\/\\/steemit.com\\/openmic\\/@pechichemena\\/6dgvf0i9","has_lyrics":true,"original":true,"lyrics":"Un reflejo\\nque lento se llev\\u00f3\\nLa risa\\nque guardo en un caj\\u00f3n\\nse escondi\\u00f3\\nY no ve nada\\nUn alma asustada\\nHay cenizas\\nQue guardo en un jarr\\u00f3n\\nDe penas\\nque un dia se perdi\\u00f3\\nSe escondi\\u00f3\\nno dijo nada\\nSer\\u00e1 que hoy...\\n\\n\'\'\\u00bfTe llevar\\u00e1s la vela\\nsin decir adi\\u00f3s?\'\'\\nUna voz se eleva\\nSe apag\\u00f3\\n\\n\'\'\\u00bfY mover\\u00e1s la tierra\\nsin pedir perd\\u00f3n?\'\'\\nUna voz se quiebra\\nSe apag\\u00f3","title":"Reflejos","permlink":"6dgvf0i9","steemuser":"pechichemena","youtube":"kDn7LAUaqjs","slug":"openmic-w96-pechichemena-reflejosne","week":"96","position":"2","bgimage":"black-and-white-headphones-life-3104.jpg"}}', 0, 1, '2018-08-30 00:00:44'),
(13, 13, 1, 'first', '["acoustic-acoustic-guitar-bass-258283.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w96-joseacabrerav-lloro.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w96-joseacabrerav-lloro.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w96-joseacabrerav-lloro.png"},"colors":{"bg":"rgb(172,129,169)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"Lloro"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics"},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@joseacabrerav\\/l3ey06lq"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/acoustic-acoustic-guitar-bass-258283.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"YHPkH-0HtwY","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":"# Lyrics  \\n\\nNo paro de pensar.Aquel momento me dijiste:  \\n\\"Es solo una amistad\\".  \\nY luego vino el golpe duro.  \\n\\"Es todo un gran error\\".  \\nA\\u00fan recuerdo tu mirar.La esquina se nubl\\u00f3,  \\ny hoy ya no recuerdo nada. \\n\\nEl aire mudo est\\u00e1.El techo trata de escapar.  \\nTu cara frente a mi,miro la taza y piens\\u00f3.  \\n\\u00bfC\\u00f3mo salir de ac\\u00e1?Y creer que esto no pas\\u00f3.  \\nY volver a re\\u00edr,y olvidar el dolor.  \\nLlora mi coraz\\u00f3n.  \\nQue vuelva a ser como era antes de decirnos todo.  \\nEspero Cicatrizaci\\u00f3n.\\u00a1Ya no aguanto m\\u00e1s esta tortura!  \\ntengo que creer de nuevo."}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"link":"https:\\/\\/steemit.com\\/openmic\\/@joseacabrerav\\/l3ey06lq","has_lyrics":true,"title":"Lloro","permlink":"l3ey06lq","steemuser":"joseacabrerav","youtube":"YHPkH-0HtwY","slug":"openmic-w96-joseacabrerav-lloro","week":"96","position":"3","lyrics":"No paro de pensar.Aquel momento me dijiste:\\n\\"Es solo una amistad\\".\\nY luego vino el golpe duro.\\n\\"Es todo un gran error\\".\\nA\\u00fan recuerdo tu mirar.La esquina se nubl\\u00f3,\\ny hoy ya no recuerdo nada.\\n\\nEl aire mudo est\\u00e1.El techo trata de escapar.\\nTu cara frente a mi,miro la taza y piens\\u00f3.\\n\\u00bfC\\u00f3mo salir de ac\\u00e1?Y creer que esto no pas\\u00f3.\\nY volver a re\\u00edr,y olvidar el dolor.\\nLlora mi coraz\\u00f3n.\\nQue vuelva a ser como era antes de decirnos todo.\\nEspero Cicatrizaci\\u00f3n.\\u00a1Ya no aguanto m\\u00e1s esta tortura!\\ntengo que creer de nuevo.","bgimage":"acoustic-acoustic-guitar-bass-258283.jpg"}}', 0, 1, '2018-08-30 00:03:21'),
(14, 14, 1, 'first', '["amazing-balance-blur-312839.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w96-lillywilton-the-wrong-way.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w96-lillywilton-the-wrong-way.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w96-lillywilton-the-wrong-way.png"},"colors":{"bg":"rgb(193,170,170)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"The Wrong Way"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics"},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@lillywilton\\/v6lx5unx"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/amazing-balance-blur-312839.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"03T7n8m0bco","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":"# Lyrics  \\n\\nI see that look in your eye-  \\nLike you\'ve left something behind.  \\nIf you look closely, you\'ll see it in mine.  \\nI have left something behind. \\n\\nI\'ve been underground for so long.  \\nThe sunlight hurts my eyes,  \\nAnd it burns, but I like it. \\n\\nEvery way I know has always been the wrong way.  \\nAnd now that I\'m with you, I like going the wrong way.  \\nSo love me down the wrong way. \\n\\nHey there, sailor.  \\nI know just how to hit you.  \\nI\'ve been at this thing for years.  \\nBut I never knew that you\'d find my weakness, too.  \\nCome closer to me. \\n\\nCuz now I feel sunlight,  \\nAnd it burns, but I like it. \\n\\nEvery way I know has always been the wrong way.  \\nAnd now that I\'m with you, I like going the wrong way.  \\nSo love me down the wrong way. \\n\\nAnd now I, I feel sunlight,  \\nAnd it burns, but I like it. \\n\\nEvery way I know has always been the wrong way.  \\nAnd now that I\'m with you, I like going the wrong way.  \\nSo take me down,  \\nSo show me down,  \\nSo love me down the wrong way."}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"has_lyrics":true,"original":true,"link":"https:\\/\\/steemit.com\\/openmic\\/@lillywilton\\/v6lx5unx","title":"The Wrong Way","permlink":"v6lx5unx","steemuser":"lillywilton","youtube":"03T7n8m0bco","slug":"openmic-w96-lillywilton-the-wrong-way","position":"4","week":"96","lyrics":"I see that look in your eye-\\nLike you\'ve left something behind.\\nIf you look closely, you\'ll see it in mine.\\nI have left something behind.\\n\\nI\'ve been underground for so long.\\nThe sunlight hurts my eyes,\\nAnd it burns, but I like it.\\n\\nEvery way I know has always been the wrong way.\\nAnd now that I\'m with you, I like going the wrong way.\\nSo love me down the wrong way.\\n\\nHey there, sailor.\\nI know just how to hit you.\\nI\'ve been at this thing for years.\\nBut I never knew that you\'d find my weakness, too.\\nCome closer to me.\\n\\nCuz now I feel sunlight,\\nAnd it burns, but I like it.\\n\\nEvery way I know has always been the wrong way.\\nAnd now that I\'m with you, I like going the wrong way.\\nSo love me down the wrong way.\\n\\nAnd now I, I feel sunlight,\\nAnd it burns, but I like it.\\n\\nEvery way I know has always been the wrong way.\\nAnd now that I\'m with you, I like going the wrong way.\\nSo take me down,\\nSo show me down,\\nSo love me down the wrong way.","bgimage":"amazing-balance-blur-312839.jpg"}}', 0, 1, '2018-08-30 00:07:12'),
(15, 15, 1, 'first', '["macro-mic-microphone-164829.jpg"]', '{"images":{"opengraph":".\\/assets\\/cards\\/openmic\\/images\\/opengraph\\/openmic-w96-silentscreamer-show-must-go-on.png","fullsize":".\\/assets\\/cards\\/openmic\\/images\\/fullsize\\/openmic-w96-silentscreamer-show-must-go-on.png","thumbnail":".\\/assets\\/cards\\/openmic\\/images\\/thumbnail\\/openmic-w96-silentscreamer-show-must-go-on.png"},"colors":{"bg":"rgb(159,189,199)"}}', '{"comp":"root","children":[{"comp":"grid","data":{"rows":[[{"height":"10vh"}],{"grow":0,"cols":[1]},[{"grow":1}],[{"height":"3vh"}]]},"children":[{"comp":"background","data":{"color":"white","image":{"url":"\\/assets\\/cards\\/openmic\\/images\\/steemit.svg","position":"left","repeat":"no-repeat","size":"contain"}}},{"comp":"background","data":{"color":"grey","padding-sm":true,"container":true},"children":[{"comp":"grid","data":{"rows":[[{"grow":1},{"grow":0}]]},"children":[{"comp":"label","data":{"class":"text-xl-left white-text","text":"Show must go on"}},{"comp":"menu","data":{"menu":[{"text":"Video","class":"btn btn-sm btn-outline-white","section":"main","value":"Video"},{"text":"Lyrics","class":"btn btn-sm btn-outline-white","section":"main","value":"Lyrics","hidden":true},{"text":"Steemit post","class":"btn btn-sm btn-outline-white","link":"https:\\/\\/steemit.com\\/openmic\\/@silentscreamer\\/mvf8xt6t"}]}}]}]},{"comp":"background","data":{"color":"rgba(72, 72, 72, 0.0)","gradient":{"dir":"top","points":[{"color":"rgba(0,0,0,0.6)","percent":0},{"color":"rgba(0,0,0,0.0)","percent":30},{"color":"rgba(0,0,0,0.0)","percent":70},{"color":"rgba(0,0,0,0.6)","percent":100}]},"image":{"url":"\\/assets\\/backgrounds\\/macro-mic-microphone-164829.jpg","repeat":"no-repeat","size":"cover","position":"center","blend-mode":"multiply"}},"children":[{"comp":"section","data":{"name":"main","current":"Video","sections":["Video","Lyrics"]},"children":[{"comp":"video","data":{"youtube":{"videoId":"JtwOZfJ1s7U","autoplay":false}}},{"comp":"background","data":{"container":true,"padding":true},"children":[{"comp":"background","data":{"color":"rgba(0,0,0,0.3)","fgcolor":"white","padding":true,"expand":true},"children":[{"comp":"scrolleable","children":[{"comp":"markdown","data":{"markdown":""}}]}]}]}]}]},{"comp":"background","data":{"color":"#FFF"}}]}],"data":{"link":"https:\\/\\/steemit.com\\/openmic\\/@silentscreamer\\/mvf8xt6t","title":"Show must go on","permlink":"mvf8xt6t","steemuser":"silentscreamer","youtube":"JtwOZfJ1s7U","slug":"openmic-w96-silentscreamer-show-must-go-on","position":"5","week":"96","bgimage":"macro-mic-microphone-164829.jpg"}}', 0, 1, '2018-08-30 00:19:26');

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

--
-- Volcado de datos para la tabla `inventory`
--

INSERT INTO `inventory` (`id`, `owner`, `app`, `_super`) VALUES
(1, 1, 1, '{"id":1,"owner":{"id":1},"capacity":8,"empty":8,"spec":{"id":2}}');

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

--
-- Volcado de datos para la tabla `oauth_steem`
--

INSERT INTO `oauth_steem` (`id`, `access_token`, `account`, `user`, `expires`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBwIiwicHJveHkiOiJ2YXBhZWUiLCJ1c2VyIjoidml0ZXJibyIsInNjb3BlIjpbImxvZ2luIiwib2ZmbGluZSIsInZvdGUiLCJjb21tZW50IiwiZGVsZXRlX2NvbW1lbnQiLCJjb21tZW50X29wdGlvbnMiXSwiaWF0IjoxNTM1NTc5OTYxLCJleHAiOjE1MzYxODQ3NjF9.Yssn57T01t4dePxlh1aZaIURFD0UVsO78kOaymj_bts', 'viterbo', 1, '2018-08-29 22:43:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pending`
--

CREATE TABLE `pending` (
  `id` int(11) NOT NULL,
  `owner` varchar(70) DEFAULT '',
  `task` varchar(100) DEFAULT '',
  `params` text,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pending`
--

INSERT INTO `pending` (`id`, `owner`, `task`, `params`, `created`) VALUES
(1, 'steem@zipporah', 'claim-openmic-card', '{"card":1,"edition":1}', '2018-08-29 22:44:33'),
(2, 'steem@abelfernandez', 'claim-openmic-card', '{"card":2,"edition":2}', '2018-08-29 22:49:46'),
(3, 'steem@mariajruizb', 'claim-openmic-card', '{"card":3,"edition":3}', '2018-08-29 22:55:52'),
(4, 'steem@kimugas23', 'claim-openmic-card', '{"card":4,"edition":4}', '2018-08-29 23:01:11'),
(5, 'steem@samidbarid', 'claim-openmic-card', '{"card":5,"edition":5}', '2018-08-29 23:21:25'),
(6, 'steem@mariajruizb', 'claim-openmic-card', '{"card":6,"edition":6}', '2018-08-29 23:25:09'),
(7, 'steem@lisamalletart', 'claim-openmic-card', '{"card":7,"edition":7}', '2018-08-29 23:38:44'),
(8, 'steem@joseacabrerav', 'claim-openmic-card', '{"card":8,"edition":8}', '2018-08-29 23:42:31'),
(9, 'steem@chaifm', 'claim-openmic-card', '{"card":9,"edition":9}', '2018-08-29 23:47:12'),
(10, 'steem@paintingangels', 'claim-openmic-card', '{"card":10,"edition":10}', '2018-08-29 23:53:13'),
(11, 'steem@daily-musings', 'claim-openmic-card', '{"card":11,"edition":11}', '2018-08-29 23:56:51'),
(12, 'steem@pechichemena', 'claim-openmic-card', '{"card":12,"edition":12}', '2018-08-30 00:00:44'),
(13, 'steem@joseacabrerav', 'claim-openmic-card', '{"card":13,"edition":13}', '2018-08-30 00:03:21'),
(14, 'steem@lillywilton', 'claim-openmic-card', '{"card":14,"edition":14}', '2018-08-30 00:07:12'),
(15, 'steem@silentscreamer', 'claim-openmic-card', '{"card":15,"edition":15}', '2018-08-30 00:19:26');

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

--
-- Volcado de datos para la tabla `profile`
--

INSERT INTO `profile` (`id`, `name`, `owner`, `_super`) VALUES
(2, 'Viterbo RodrÃ­guez', 1, '{"id":2,"name":"Viterbo Rodr\\u00edguez","slug":"ctn8d2725c06cd187f5577e7f4308d28","img":{"avatar":"\\/assets\\/noavatar.png"},"owner":{"id":1},"publisher_id":2}');

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
(1, 'Cards & Tokens', 'cards-and-tokens', '{"avatar":"http://cardsandtokens.com/assets/cards-and-tokens.png"}', 1, 'app'),
(2, 'Viterbo RodrÃ­guez', 'ctn8d2725c06cd187f5577e7f4308d28', '{"avatar":"\\/assets\\/noavatar.png"}', 1, 'profile');

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
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `vapaee_id`, `name`, `profile`, `dailyprize`) VALUES
(1, 0, 'Viterbo RodrÃ­guez', 2, '2000-01-01 03:00:00');

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
-- Indices de la tabla `pending`
--
ALTER TABLE `pending`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `collectible`
--
ALTER TABLE `collectible`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `collection`
--
ALTER TABLE `collection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `container`
--
ALTER TABLE `container`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `envelop`
--
ALTER TABLE `envelop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `pending`
--
ALTER TABLE `pending`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `publisher`
--
ALTER TABLE `publisher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
