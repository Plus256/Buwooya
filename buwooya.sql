-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2015 at 07:45 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `buwooya`
--

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE IF NOT EXISTS `country` (
  `id` tinyint(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `alpha2` char(2) NOT NULL,
  `alpha3` char(3) NOT NULL,
  `ncode` char(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`,`alpha2`,`alpha3`,`ncode`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=122 ;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `name`, `alpha2`, `alpha3`, `ncode`) VALUES
(121, 'Angola', 'AO', 'AGO', '024'),
(120, 'Antarctica', 'AQ', 'ATA', '010'),
(119, 'Argentina', 'AR', 'ARG', '032'),
(118, 'Australia', 'AU', 'AUS', '036'),
(117, 'Austria', 'AT', 'AUT', '040'),
(116, 'Bahamas', 'BS', 'BHS', '044'),
(115, 'Belgium', 'BE', 'BEL', '056'),
(114, 'Bermuda', 'BM', 'BMU', '060'),
(113, 'Canada', 'CA', 'CAN', '124'),
(112, 'Chile', 'CL', 'CHL', '152'),
(111, 'China', 'CN', 'CHN', '156'),
(110, 'Christmas Island', 'CX', 'CXR', '162'),
(109, 'Colombia', 'CO', 'COL', '170'),
(108, 'Comoros', 'KM', 'COM', '174'),
(107, 'Costa Rica', 'CR', 'CRI', '188'),
(106, 'Cote d''Ivoire', 'CI', 'CIV', '384'),
(105, 'Croatia', 'HR', 'HRV', '191'),
(104, 'Cuba', 'CU', 'CUB', '192'),
(103, 'Cyprus', 'CY', 'CYP', '196'),
(102, 'Czech Republic', 'CZ', 'CZE', '203'),
(101, 'Denmark', 'DK', 'DNK', '208'),
(100, 'Ethiopia', 'ET', 'ETH', '231'),
(99, 'Fiji', 'FJ', 'FJI', '242'),
(98, 'Finland', 'FI', 'FIN', '246'),
(97, 'France', 'FR', 'FRA', '250'),
(96, 'Georgia', 'GE', 'GEO', '268'),
(95, 'Germany', 'DE', 'DEU', '276'),
(94, 'Greece', 'GR', 'GRC', '300'),
(93, 'Hong Kong', 'HK', 'HKG', '344'),
(92, 'Hungary', 'HU', 'HUN', '348'),
(91, 'India', 'IN', 'IND', '356'),
(90, 'Israel', 'IL', 'ISR', '376'),
(89, 'Italy', 'IT', 'ITA', '380'),
(88, 'Jamaica', 'JM', 'JAM', '388'),
(87, 'Japan', 'JP', 'JPN', '392'),
(86, 'Jordan', 'JO', 'JOR', '400'),
(85, 'Kenya', 'KE', 'KEN', '404'),
(84, 'Luxembourg', 'LU', 'LUX', '442'),
(83, 'Macedonia', 'MK', 'MKD', '807'),
(82, 'Maldives', 'MV', 'MDV', '462'),
(81, 'Mauritania', 'MR', 'MRT', '478'),
(80, 'Mauritius', 'MU', 'MUS', '480'),
(79, 'Mexico', 'MX', 'MEX', '484'),
(78, 'Myanmar', 'MM', 'MMR', '104'),
(77, 'Netherlands', 'NL', 'NLD', '528'),
(76, 'New Zealand', 'NZ', 'NZL', '554'),
(75, 'Nigeria', 'NG', 'NGA', '566'),
(74, 'Norway', 'NO', 'NOR', '578'),
(73, 'Philippines', 'PH', 'PHL', '608'),
(72, 'Poland', 'PL', 'POL', '616'),
(71, 'Portugal', 'PT', 'PRT', '620'),
(70, 'Romania', 'RO', 'ROU', '642'),
(69, 'Seychelles', 'SC', 'SYC', '690'),
(68, 'Singapore', 'SG', 'SGP', '702'),
(67, 'South Africa', 'ZA', 'ZAF', '710'),
(66, 'Spain', 'ES', 'ESP', '724'),
(65, 'Sweden', 'SE', 'SWE', '752'),
(64, 'Switzerland', 'CH', 'CHE', '756'),
(63, 'Uganda', 'UG', 'UGA', '800'),
(62, 'United Kingdom', 'GB', 'GBR', '826'),
(61, 'United States of America', 'US', 'USA', '840');

-- --------------------------------------------------------

--
-- Table structure for table `interest`
--

CREATE TABLE IF NOT EXISTS `interest` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `interest`
--

INSERT INTO `interest` (`id`, `name`) VALUES
(2, 'Administration'),
(4, 'Community'),
(8, 'Computer Science'),
(15, 'Construction'),
(9, 'Education'),
(10, 'Evangelism'),
(7, 'Film'),
(1, 'Finance'),
(12, 'Fundraising'),
(13, 'Graphic Design'),
(6, 'Health'),
(14, 'Music'),
(3, 'Non-profit'),
(5, 'Public Relations'),
(11, 'Sports');

-- --------------------------------------------------------

--
-- Table structure for table `month`
--

CREATE TABLE IF NOT EXISTS `month` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `days` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `month`
--

INSERT INTO `month` (`id`, `name`, `days`) VALUES
(1, 'January', 31),
(2, 'February', 29),
(3, 'March', 31),
(4, 'April', 30),
(5, 'May', 31),
(6, 'June', 30),
(7, 'July', 31),
(8, 'August', 31),
(9, 'September', 30),
(10, 'October', 31),
(11, 'November', 30),
(12, 'December', 31);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
