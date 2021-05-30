-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 15, 2021 at 08:50 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `koder`
--

-- --------------------------------------------------------

--
-- Table structure for table `fees_types`
--

CREATE TABLE `fees_types` (
  `id` int(11) NOT NULL,
  `type` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fees_types`
--

INSERT INTO `fees_types` (`id`, `type`, `description`, `date_created`) VALUES
(1, 'HOSTEL', 'PER TERM FEE', '2021-04-11 13:12:26'),
(2, 'TUITION FEE', 'PER TERM FEE', '2021-04-11 13:12:57'),
(3, 'LUNCH', 'DAILY FEED FOR A TERM', '2021-04-21 21:19:44');

-- --------------------------------------------------------

--
-- Table structure for table `financial_institutions`
--

CREATE TABLE `financial_institutions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `financial_institutions`
--

INSERT INTO `financial_institutions` (`id`, `name`, `category_id`, `date_created`) VALUES
(1, 'ECOBANK', 1, '2021-04-11 13:19:59'),
(2, 'MTN', 2, '2021-04-15 17:07:52'),
(3, 'VODAFONE', 2, '2021-04-15 17:08:05');

-- --------------------------------------------------------

--
-- Table structure for table `financial_institution_categories`
--

CREATE TABLE `financial_institution_categories` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `financial_institution_categories`
--

INSERT INTO `financial_institution_categories` (`id`, `category`, `date_created`) VALUES
(1, 'BANK', '2021-04-11 13:19:11'),
(2, 'TELCO', '2021-04-11 13:19:30');

-- --------------------------------------------------------

--
-- Table structure for table `general_public`
--

CREATE TABLE `general_public` (
  `user_id` int(11) NOT NULL,
  `user_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `general_public`
--

INSERT INTO `general_public` (`user_id`, `user_type_id`) VALUES
(7, 1),
(8, 1),
(9, 1),
(2, 2),
(14, 2),
(15, 2),
(16, 2),
(17, 2),
(18, 2),
(31, 2),
(32, 2),
(33, 2),
(34, 2),
(36, 2),
(37, 2),
(38, 2),
(39, 2),
(40, 2),
(41, 2),
(42, 2),
(43, 2),
(44, 2),
(45, 2),
(46, 2),
(47, 2),
(48, 2),
(49, 2),
(50, 2),
(51, 2),
(52, 2),
(53, 2),
(54, 2),
(55, 2),
(56, 2),
(57, 2),
(58, 2),
(59, 2),
(60, 2),
(61, 2),
(62, 2),
(64, 2);

-- --------------------------------------------------------

--
-- Table structure for table `merchant_addresses`
--

CREATE TABLE `merchant_addresses` (
  `line_1` varchar(255) NOT NULL,
  `line_2` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postcode` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(150) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `merchant_addresses`
--

INSERT INTO `merchant_addresses` (`line_1`, `line_2`, `city`, `postcode`, `state`, `country`, `id`) VALUES
('Ogba', 'Ogba', 'Accra', '233', 'Accra', 'Ghana', 1);

-- --------------------------------------------------------

--
-- Table structure for table `merchant_card_terminals`
--

CREATE TABLE `merchant_card_terminals` (
  `id` int(11) NOT NULL,
  `account` varchar(255) NOT NULL,
  `ccy` varchar(50) NOT NULL,
  `financial_inst_id` int(11) NOT NULL,
  `scheme_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `terminal_number` varchar(120) NOT NULL,
  `card_number` varchar(140) NOT NULL,
  `fullname` varchar(400) NOT NULL,
  `mm_yy` varchar(12) NOT NULL,
  `cvv` varchar(10) NOT NULL,
  `sub_registration_code` varchar(100) DEFAULT NULL,
  `bin` varchar(30) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `merchant_card_terminals`
--

INSERT INTO `merchant_card_terminals` (`id`, `account`, `ccy`, `financial_inst_id`, `scheme_id`, `username`, `password`, `merchant_id`, `terminal_number`, `card_number`, `fullname`, `mm_yy`, `cvv`, `sub_registration_code`, `bin`, `date_created`) VALUES
(1, '0540040405', 'GHS', 1, 1, 'kodkdk01', '09201#@', 1, '00093939022', '11991202091900', 'Koder International Schools', '88_23', '300', NULL, NULL, '2021-04-24 09:20:45'),
(2, '0540040405', 'GHS', 1, 2, 'kodkdk01', '09201#@', 1, '00093939022', '11991202091900', 'Koder International Schools', '88_23', '300', NULL, NULL, '2021-04-24 09:20:45');

-- --------------------------------------------------------

--
-- Table structure for table `merchant_info`
--

CREATE TABLE `merchant_info` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `nationality` varchar(150) NOT NULL,
  `mobile_no` varchar(50) NOT NULL,
  `mcc` varchar(50) DEFAULT NULL,
  `business_type` varchar(250) NOT NULL,
  `registration_code` varchar(250) NOT NULL,
  `merchant_name` varchar(250) NOT NULL,
  `address_id` int(11) NOT NULL,
  `status` varchar(30) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `merchant_info`
--

INSERT INTO `merchant_info` (`id`, `first_name`, `middle_name`, `last_name`, `date_of_birth`, `email`, `nationality`, `mobile_no`, `mcc`, `business_type`, `registration_code`, `merchant_name`, `address_id`, `status`, `created_date`) VALUES
(1, 'Koder', 'Koder', 'Koder', '2021-04-13', 'koder@gmail.com', 'Ghanaian', '089342900', '211', 'School', '30039393939', 'Koder Payments Platform', 1, 'ACTIVE', '2021-04-24 05:17:55');

-- --------------------------------------------------------

--
-- Table structure for table `merchant_wallet_terminals`
--

CREATE TABLE `merchant_wallet_terminals` (
  `id` int(11) NOT NULL,
  `account` varchar(255) NOT NULL,
  `ccy` varchar(50) NOT NULL,
  `financial_inst_id` int(11) NOT NULL,
  `scheme_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `terminal_number` varchar(120) NOT NULL,
  `msisdn` varchar(150) NOT NULL,
  `telco` varchar(150) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `merchant_wallet_terminals`
--

INSERT INTO `merchant_wallet_terminals` (`id`, `account`, `ccy`, `financial_inst_id`, `scheme_id`, `username`, `password`, `merchant_id`, `terminal_number`, `msisdn`, `telco`, `date_created`) VALUES
(1, '002020202020', 'GHS', 1, 4, 'kdwlie', '32o3232', 1, '00202023932', '09087564', 'MTN', '2021-04-21 22:58:48');

-- --------------------------------------------------------

--
-- Table structure for table `payment_schemes`
--

CREATE TABLE `payment_schemes` (
  `id` int(11) NOT NULL,
  `scheme` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment_schemes`
--

INSERT INTO `payment_schemes` (`id`, `scheme`) VALUES
(1, 'MASTERCARD'),
(2, 'VISACARD'),
(3, 'VODAFONECASH'),
(4, 'MTNMOMO');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `user_id` int(11) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `registration_number` varchar(100) NOT NULL,
  `class` varchar(100) NOT NULL,
  `semester` varchar(50) NOT NULL,
  `program_start_date` date NOT NULL,
  `program_end_date` date NOT NULL,
  `department_id` int(11) NOT NULL,
  `status` varchar(30) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`user_id`, `user_type_id`, `registration_number`, `class`, `semester`, `program_start_date`, `program_end_date`, `department_id`, `status`, `created_date`, `modified_date`) VALUES
(1, 1, '04303404300403', 'SS1', 'ONE', '2020-01-06', '2023-10-06', 1, 'GRADUATE', '2021-04-21 21:23:50', '0000-00-00 00:00:00'),
(13, 1, '00232929', 'SS1', '2', '2018-02-01', '2018-02-01', 1, 'ACTIVE', '2021-04-22 08:38:28', '0000-00-00 00:00:00'),
(14, 1, '00232929', 'SS1', '2', '2018-02-01', '2018-02-01', 1, 'ACTIVE', '2021-04-22 08:40:09', '0000-00-00 00:00:00'),
(15, 1, '00232929', 'SS1', '2', '2018-02-01', '2018-02-01', 1, 'ACTIVE', '2021-04-22 08:40:35', '0000-00-00 00:00:00'),
(19, 1, '00232929', 'SS1', '2', '2018-02-01', '2018-02-01', 1, 'ACTIVE', '2021-04-22 14:08:57', '0000-00-00 00:00:00'),
(26, 1, '00232929', 'SS1', '2', '2018-02-01', '2018-02-01', 1, 'ACTIVE', '2021-04-27 01:48:13', '2021-04-27 01:48:13'),
(35, 1, '00232929', 'SS1', '2', '2018-02-01', '2018-02-01', 1, 'ACTIVE', '2021-05-01 14:47:55', '2021-05-01 14:47:55'),
(63, 1, '00232929', 'SS1', '2', '2018-02-01', '2018-02-01', 1, 'ACTIVE', '2021-05-07 06:19:04', '2021-05-07 06:19:04');

-- --------------------------------------------------------

--
-- Table structure for table `students_department`
--

CREATE TABLE `students_department` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students_department`
--

INSERT INTO `students_department` (`id`, `name`) VALUES
(1, 'Science and Technology');

-- --------------------------------------------------------

--
-- Table structure for table `student_fees_due`
--

CREATE TABLE `student_fees_due` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `fees_status` varchar(30) NOT NULL,
  `fees_id` int(11) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `due_date` date NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_fees_due`
--

INSERT INTO `student_fees_due` (`id`, `student_id`, `fees_status`, `fees_id`, `amount`, `due_date`, `created_date`, `modified_date`, `comment`) VALUES
(2, 1, 'PAID', 2, '200', '2021-04-22', '2021-05-15 13:50:52', '2021-04-14 21:27:00', NULL),
(3, 1, 'PAID', 3, '150', '2021-04-14', '2021-04-23 18:22:12', '2021-04-14 21:27:00', NULL),
(4, 1, 'PAID', 1, '300', '2021-04-13', '2021-04-23 18:21:43', '2021-04-14 21:27:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_fees_payments`
--

CREATE TABLE `student_fees_payments` (
  `id` int(11) NOT NULL,
  `fee_id` int(11) NOT NULL,
  `transaction_reference` varchar(120) DEFAULT NULL,
  `is_card` tinyint(4) NOT NULL,
  `transaction_status` varchar(30) DEFAULT NULL,
  `merchant_id` int(11) NOT NULL,
  `merchant_card_terminal_id` int(11) DEFAULT NULL,
  `merchant_wallet_terminal_id` int(11) DEFAULT NULL,
  `paid_by` int(11) NOT NULL,
  `payer_wallet_no` varchar(255) DEFAULT NULL,
  `payer_wallet_telco` varchar(255) DEFAULT NULL,
  `payer_card_no` varchar(255) DEFAULT NULL,
  `payer_name_on_card` varchar(255) DEFAULT NULL,
  `payer_card_expiry` varchar(255) DEFAULT NULL,
  `processor_payment_reference` varchar(225) DEFAULT NULL,
  `processor_status_code` varchar(50) DEFAULT NULL,
  `processor_status_message` text DEFAULT NULL,
  `amount` decimal(10,0) NOT NULL,
  `ccy` varchar(10) NOT NULL,
  `comment` text DEFAULT NULL,
  `refunded` tinyint(4) DEFAULT 0,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_fees_payments`
--

INSERT INTO `student_fees_payments` (`id`, `fee_id`, `transaction_reference`, `is_card`, `transaction_status`, `merchant_id`, `merchant_card_terminal_id`, `merchant_wallet_terminal_id`, `paid_by`, `payer_wallet_no`, `payer_wallet_telco`, `payer_card_no`, `payer_name_on_card`, `payer_card_expiry`, `processor_payment_reference`, `processor_status_code`, `processor_status_message`, `amount`, `ccy`, `comment`, `refunded`, `transaction_date`) VALUES
(448, 4, NULL, 1, 'SUCCESS', 1, 1, NULL, 1, NULL, NULL, '5555XXXXXXXXXXX4', 'James Oni', '30033', '2273253285', '0', 'Transaction Accepted', '300', 'GHS', NULL, 0, '2021-05-15 12:39:51');

-- --------------------------------------------------------

--
-- Table structure for table `student_fees_refunds`
--

CREATE TABLE `student_fees_refunds` (
  `id` int(11) NOT NULL,
  `transaction_payment_id` int(11) NOT NULL,
  `reason` text NOT NULL,
  `processor_payment_reference` varchar(225) DEFAULT NULL,
  `processor_status_code` varchar(50) DEFAULT NULL,
  `processor_status_message` varchar(50) DEFAULT NULL,
  `transaction_status` varchar(30) DEFAULT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_fees_refunds`
--

INSERT INTO `student_fees_refunds` (`id`, `transaction_payment_id`, `reason`, `processor_payment_reference`, `processor_status_code`, `processor_status_message`, `transaction_status`, `transaction_date`) VALUES
(272, 448, 'Just give me my money back pleas', NULL, NULL, NULL, NULL, '2021-05-15 14:58:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `surname` varchar(150) NOT NULL,
  `middle_name` varchar(150) DEFAULT NULL,
  `first_name` varchar(150) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `phone` varchar(150) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_address_id` int(11) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `surname`, `middle_name`, `first_name`, `username`, `password`, `phone`, `email`, `user_address_id`, `user_type_id`, `date`) VALUES
(1, 'Dela', 'Emanuel', 'Mensah', 'DelEma33', '30039399393', '0501234563', 'delaema33@gmail.com', 1, 1, '2021-04-24 09:22:49'),
(2, 'Efram', 'Ebel', 'Odinka', 'OdinkaEb01', '0019329832', '0654509765', 'OdinkaEb01@gmail.com', 1, 2, '2021-04-24 09:22:49'),
(3, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(4, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(5, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(6, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(7, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(8, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(9, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(10, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(11, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(12, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(13, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(14, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(15, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(16, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 2, '2021-04-24 09:22:49'),
(17, 'James', 'Akua', 'Donkor', 'Donkor11', '23020302', '0299002020', 'llssl@dls.com', 1, 2, '2021-04-24 09:22:49'),
(18, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$VxgAk90Eiyx0tYTcO5.LmeS8k84z7CRK.zIZUGz8UkJ1mI.iU2uxu', '0299002020', 'llssl@dls.com', 1, 2, '2021-04-24 09:22:49'),
(19, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$k8enirNEN3JA4ZcfaQRTU.xzxL.9WOE6fa79RMj55VcMR0ZPX9y3e', '0299002020', 'llssl@dls.com', 1, 1, '2021-04-24 09:22:49'),
(20, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$3ezl3XX.ky5QYSRhts2gY.UkWXfktBU4msx4J8VhQiq2cxWZlwbGK', '0299002020', 'llssl@dls.com', 6, 1, '2021-04-27 01:42:24'),
(21, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$Dvl7lIyTGV/LFaD6vZR2f./8uyuEU/68PTTT2Z/QNC/lMwPwL9IKq', '0299002020', 'llssl@dls.com', 7, 1, '2021-04-27 01:43:10'),
(22, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$mAsxTac8OTLKLyd1sv1PyejoSHpqXhGq3WDUM4E0hor9hXW13bBtq', '0299002020', 'llssl@dls.com', 8, 1, '2021-04-27 01:43:52'),
(23, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$Le8IGyLQ1G5KAzrpjVKTYOqvvJ3IjnpuCMS9cbNg0x.lIA3asBtui', '0299002020', 'llssl@dls.com', 9, 1, '2021-04-27 01:44:56'),
(24, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$64kGmiqFgsVZ8BjutszIlO5XZ7DzWZAP1qmKJ4Rb.3WiU8gtRX2y.', '0299002020', 'llssl@dls.com', 10, 1, '2021-04-27 01:45:28'),
(25, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$NMJab96TmpsnqHQYm1y.HOoEClLLSa9BoExc9tZDkyAV0RbPlUPwG', '0299002020', 'llssl@dls.com', 11, 1, '2021-04-27 01:47:16'),
(26, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$y03J3IraYa3raoFrCVZP8ulFCOohc7Ax7eYLJUnaMopgNhWMyM.QK', '0299002020', 'llssl@dls.com', 12, 1, '2021-04-27 01:48:13'),
(27, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$Em3DhLmB9.NC2pPNMuFbyuRDfDmOuIwoHAN3DrBEtPOyn/tCYsOGi', '0299002020', 'llssl@dls.com', 13, 2, '2021-04-27 01:48:26'),
(28, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$yNFIAdAT5Py6.ZXuM2ZNjOPUXfzKc665RLWL.ajH2ECJBn0Vfvcm.', '0299002020', 'llssl@dls.com', 14, 2, '2021-04-27 01:49:57'),
(29, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$31dyFGcJ3u53bPJludkH6.Q8NLvJT4IQR3uLScj91gpPAAFMmrtUO', '0299002020', 'llssl@dls.com', 15, 2, '2021-04-27 05:44:07'),
(30, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$ZDPRbtPF0921kV6DR/l3Yu/nwbpFvxIor.WyFe0np34ZgF8doTtxe', '0299002020', 'llssl@dls.com', 16, 2, '2021-04-27 07:52:27'),
(31, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$ry6AkLyvv3SZKBJPwUe/v.pdV.BBq2Rwdnr3RqhZ8neTIkczTkXGu', '0299002020', 'llssl@dls.com', 17, 2, '2021-04-27 07:53:50'),
(32, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$2moxnDR3TpefBXrmuUcfRO6/qxYErYOA2RJMaOAfZ2p84umW5HdK2', '0299002020', 'llssl@dls.com', 18, 2, '2021-04-27 07:54:00'),
(33, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$wZlrsyy3e05o9TjM.lIXT.8da.2h7t.54RQ9uPQ6SUc6cOKB7c.Fm', '0299002020', 'llssl@dls.com', 19, 2, '2021-04-27 08:01:54'),
(34, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$GNevnOxgGPIUMARBjSppHeDooJuIuG4qcx7CFZeAaOitd5mS0E.Yq', '0299002020', 'llssl@dls.com', 20, 2, '2021-05-01 14:47:08'),
(35, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$eS7dyxT2JxQjI0nP41GRWuGRutWCq9ov8LokxOooLVALqGN5DSdZy', '0299002020', 'llssl@dls.com', 21, 1, '2021-05-01 14:47:55'),
(36, 'SANOH', 'LAMINE', 'MOHAMED', 'kjdfjgdsjg', '$2b$10$1PnyNCRqd5QOvEKaK/WHD.alQsX5acMEW/7zyx..vsput5CadKTbu', '0541276007', 'lamine408@gmail.com', 22, 2, '2021-05-01 15:53:54'),
(37, 'SANOH', 'LAMINE', 'MOHAMED', 'kjdfjgdsjg', '$2b$10$c8lXia064/TZAWuQej9GVOtOpFnRxn8Cuxkv/BIrMubc62CboafDG', '0541276007', 'lamine408@gmail.com', 23, 2, '2021-05-01 15:54:13'),
(38, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$mDJ8jQ8B39wGRrYRQKoPCuydU63Y0TWkNqvC0/Y0Gnht9waWkF28y', '0541276007', 'lamine408@gmail.com', 24, 2, '2021-05-02 19:01:49'),
(39, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$4rD2Pv58C8iIDNa.SG1R8OpKMZLT6jlgL.fxCvPD8/q4dA8EsArQm', '0541276007', 'lamine408@gmail.com', 25, 2, '2021-05-02 19:01:49'),
(40, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$UqJ3lPFiYJSIBE6IsvIC8uVkTY.rBm0DONqJ8eK6Lp7.A.qiSWNOy', '0541276007', 'lamine408@gmail.com', 26, 2, '2021-05-02 19:01:50'),
(41, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$PHGrGim2Kvnic1o7gybXTueSKnXL1EzOU2MySGi08p/lFjm3dkQE6', '0541276007', 'lamine408@gmail.com', 27, 2, '2021-05-02 19:01:50'),
(42, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$HWrIsRPpytGSX6ZDjD1IROgSJh6DvnZv.nlIA.wmu2Nx5nAgpnaKS', '0541276007', 'lamine408@gmail.com', 28, 2, '2021-05-02 19:01:51'),
(43, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$u1WiU/hwyPvZDeL5g2Spmu.1w9/qu.hhhmDBkWV.xoD0heM2mUyYy', '0541276007', 'lamine408@gmail.com', 29, 2, '2021-05-02 19:01:51'),
(44, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$sJuw154b0qXJhhow9I.rSeQAxTZDfHtULCGkJ5NjAgeNF8/SyCHAK', '0541276007', 'lamine408@gmail.com', 30, 2, '2021-05-02 19:01:52'),
(45, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$JYHKZ7D3K/N3ouBAqKg5..GQ4ZIe0ml1Rv6IB2fbF9DnTF/XOybsy', '0541276007', 'lamine408@gmail.com', 31, 2, '2021-05-02 19:01:52'),
(46, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$83wBtj/jBGi2fec3mHF4YePOMa23z0LfVeCw46vbzb4VZydjBEMiC', '0541276007', 'lamine408@gmail.com', 32, 2, '2021-05-02 19:01:52'),
(47, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$3Cr4UhWvqvgyj0dwTFTUtODQNg/SaIFVsFWIhhLXfyS3tpBLjuKt6', '0541276007', 'lamine408@gmail.com', 33, 2, '2021-05-02 19:01:53'),
(48, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$k59mCGY8.k2WUUBte5x2yubIGPkS92/5HrCFUAn3rTmt6IjAwmUNW', '0541276007', 'lamine408@gmail.com', 34, 2, '2021-05-02 19:01:57'),
(49, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$IzBggOpN9jcK3p4KBfz3xeXS8fvcPLSuiuRAAxq.ssw1SZtCEB/iC', '0541276007', 'lamine408@gmail.com', 35, 2, '2021-05-02 19:01:57'),
(50, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$NWGVNSS8EgopmTqDtPqvvedTVFSbYuaDxSpxULkfAwdvcgGyQh47y', '0541276007', 'lamine408@gmail.com', 36, 2, '2021-05-02 19:01:57'),
(51, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$VToxp6WN8wjf9zH48iW.puLqvEYfqNwW8b8MnJd1p07ghYT0zys3.', '0541276007', 'lamine408@gmail.com', 37, 2, '2021-05-02 19:01:58'),
(52, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$JJVK1lQJWIrZX/3bbmsihOjD57Y6d8f8f00ylhAASdQ1EagNz.I5y', '0541276007', 'lamine408@gmail.com', 38, 2, '2021-05-02 19:01:59'),
(53, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$ch1BVo6W.y1.XsFX0SUZru4Q/kwKjmZsV7mM8IV3y4oCVV16H.vL6', '0541276007', 'lamine408@gmail.com', 39, 2, '2021-05-02 19:01:59'),
(54, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$M1DksD6w/Lxrjd49u/K7yem6jnxGkYOLkkIV76V7Ye7s6GviwMaQi', '0541276007', 'lamine408@gmail.com', 40, 2, '2021-05-02 19:01:59'),
(55, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$doNG2IbDgDI7JfQLecNcp.P5Y34Ugje77PO2UyrtunvWOFECVjQKG', '0541276007', 'lamine408@gmail.com', 41, 2, '2021-05-02 19:01:59'),
(56, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfs', '$2b$10$Dc.478pXGT.dopJnULsQiO3UjszblUnCiHLeAo6bxPOU4VeokDnqq', '0541276007', 'lamine408@gmail.com', 42, 2, '2021-05-02 19:02:00'),
(57, 'SANOH', 'LAMINE', 'MOHAMED', 'SANOH', '$2b$10$pzRZuw42ojJ/jFeJMJ3Nhu10xuDVR9ahCjXZSX1jsMSbMR8JrieCW', '0541276007', 'lamine408@gmail.com', 43, 2, '2021-05-02 19:10:54'),
(58, 'SANOH', 'LAMINE', 'MOHAMED', 'asdfsdfsdfsd', '$2b$10$cSaKk/ajckPbgZ5JggKFau9K4.CUeObrzs66SXIeYjTGAIXXrZu9C', '0541276007', 'lamine408@gmail.com', 44, 2, '2021-05-02 19:17:13'),
(59, 'SANOH', 'LAMINE', 'MOHAMED', 'dsfsadfsdfsdfsd', '$2b$10$qRdJIprIUV.H1VnrX4cjqek.adKrqZIEw2d61Pd/eh1f1p8/Rg4gq', '0541276007', 'lamine408@gmail.com', 45, 2, '2021-05-02 19:20:59'),
(60, 'SANOHd', 'LAMINE', 'MOHAMED', 'sdfasdfds', '$2b$10$NbuL/faxhv5E5Xyr0LHPA.cIPBrFEoWyNj098w6nSVZ7xtCEfzqgy', '0541276007', 'lamine408@gmail.com', 46, 2, '2021-05-02 19:22:27'),
(61, 'SANOH', 'LAMINE', 'MOHAMED', 'dsafsdfsdsfadsf', '$2b$10$nk3kgMkubwv55N9gw.OmUOCboUCxkBFzB3mYuJJzxUYtuetoYyDr2', '0541276007', 'lamine408@gmail.com', 47, 2, '2021-05-02 19:23:08'),
(62, 'SANOH', 'LAMINE', 'MOHAMED', 'sadfsdfsda', '$2b$10$xQgwiJVd85/DsWyiSo5X3uWikeYJ/yoAXxAwDXkMHC.iecaEbvE.a', '0541276007', 'lamine408@gmail.com', 48, 2, '2021-05-02 19:24:39'),
(63, 'James', 'Akua', 'Donkor', 'D900Uee11', '$2b$10$4IT1qVjjdKHXZGLyDj1Z9.rP20sHtZGC3IBU3uz.g7KNVHVEP2YDO', '0299002020', 'llssl@dls.com', 49, 1, '2021-05-07 06:19:04'),
(64, 'Lamine', 'SANOH', 'Jame', 'Userwer', '$2b$10$UmXj3SdTMqRAFTHO69.pouEr5kH1rgDkSuSm1146olBFfglshWY5W', '30030302323333233', '4994944@gmail.com', 50, 2, '2021-05-15 10:43:44');

-- --------------------------------------------------------

--
-- Table structure for table `user_addresses`
--

CREATE TABLE `user_addresses` (
  `line_1` varchar(255) NOT NULL,
  `line_2` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postcode` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(150) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_addresses`
--

INSERT INTO `user_addresses` (`line_1`, `line_2`, `city`, `postcode`, `state`, `country`, `id`) VALUES
('Ogba', 'Ogba', 'Accra', '233', 'Accra', 'Ghana', 1),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'dd', 2),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 3),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 4),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 5),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 6),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 7),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 8),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 9),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 10),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 11),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 12),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 13),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 14),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 15),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 16),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 17),
('dd', 'dd', 'dd', 'ddd', 'ddd', 'gg', 18),
('djjjjjjjjd', 'djjjjjjjjd', 'accra', 'ddd', 'ddd', 'Ghana', 19),
('djjjjjjjjd', 'djjjjjjjjd', 'accra', 'ddd', 'ddd', 'Ghana', 20),
('djjjjjjjjd', 'djjjjjjjjd', 'accra', 'ddd', 'ddd', 'Ghana', 21),
('ahdhahsdasdahdhasd', 'ahdhahsdasdahdhasd', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 22),
('asdfghjklo', 'asdfghjklo', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 23),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 24),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 25),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 26),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 27),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 28),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 29),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 30),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 31),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 32),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 33),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 34),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdgsdgdfgdfdfdfgd', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 35),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdgsdgdfgdfdfdfgd', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 36),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdgsdgdfgdfdfdfgd', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 37),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdgsdgdfgdfdfdfgd', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 38),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdgsdgdfgdfdfdfgd', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 39),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdgsdgdfgdfdfdfgd', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 40),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdgsdgdfgdfdfdfgd', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 41),
('fsgsdfgdfgfsdgdfsgfdsgdsdgfsdg', 'fsgsdfgdfgfsdgdfsgfdsgdsdgfsdgsdgdfgdfdfdfgd', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 42),
('dfgsddfgddddddddddddd', 'dfgsddfgddddddddddddd', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 43),
('dfgsddfgsadfdsfsdfsdfasfsd', 'dfgsddfgsadfdsfsdfsdfasfsd', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 44),
('asdfsdfsdfadsfsdfsdfsdfsdfasd', 'asdfsdfsdfadsfsdfsdfsdfsdfasd', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 45),
('safsdfdsfdsafdsafdsafsdfds', 'safsdfdsfdsafdsafdsafsdfds', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 46),
('dfgsddfgasdfsdfsdfsdf', 'dfgsddfgasdfsdfsdfsdf', 'Greater-Accra', '1982', 'sfgdfgdsgsad', 'Ghana', 47),
('dfgsddfgsadfsadfsdfasddfgsddfgsadfsadfsdfasd', 'dfgsddfgsadfsadfsdfasddfgsddfgsadfsadfsdfasd', 'Greater-Accra', '1982', 'sfgdfgdsg', 'Ghana', 48),
('djjjjjjjjd', 'djjjjjjjjd', 'accra', 'ddd', 'ddd', 'Ghana', 49),
('1201202kekaskdksdfkdskfskfaskdfasf', '1201202kekaskdksdfkdskfskfaskdfasf', 'Accra', '20202', 'Greater Accra', 'Ghana', 50);

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE `user_types` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`id`, `type`, `description`, `date`) VALUES
(1, 'ST', 'Student', '2021-04-15 19:35:36'),
(2, 'GP', 'General Public', '2021-04-15 19:35:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fees_types`
--
ALTER TABLE `fees_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `financial_institutions`
--
ALTER TABLE `financial_institutions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_financial_institutions_financial_institution_categories` (`category_id`);

--
-- Indexes for table `financial_institution_categories`
--
ALTER TABLE `financial_institution_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `general_public`
--
ALTER TABLE `general_public`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `FK_general_public_users_user_types` (`user_type_id`);

--
-- Indexes for table `merchant_addresses`
--
ALTER TABLE `merchant_addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merchant_card_terminals`
--
ALTER TABLE `merchant_card_terminals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_merchant_card_terminals_financial_institutions` (`financial_inst_id`),
  ADD KEY `FK_merchant_card_terminals_payment_schemes` (`scheme_id`),
  ADD KEY `FK_merchant_card_terminals_payment_merchant_info` (`merchant_id`);

--
-- Indexes for table `merchant_info`
--
ALTER TABLE `merchant_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_merchant_info_merchant_addresses` (`address_id`);

--
-- Indexes for table `merchant_wallet_terminals`
--
ALTER TABLE `merchant_wallet_terminals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_merchant_wallet_terminals_financial_institutions` (`financial_inst_id`),
  ADD KEY `FK_merchant_wallet_terminals_payment_schemes` (`scheme_id`),
  ADD KEY `FK_merchant_wallet_terminals_merchant_info` (`merchant_id`);

--
-- Indexes for table `payment_schemes`
--
ALTER TABLE `payment_schemes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `FK_students_users` (`user_type_id`,`user_id`),
  ADD KEY `FK_students_students_department` (`department_id`);

--
-- Indexes for table `students_department`
--
ALTER TABLE `students_department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_fees_due`
--
ALTER TABLE `student_fees_due`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_student_fees_due_fees_types` (`fees_id`),
  ADD KEY `FK_student_fees_due_student` (`student_id`);

--
-- Indexes for table `student_fees_payments`
--
ALTER TABLE `student_fees_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_student_fees_payments_student_fees_due` (`fee_id`),
  ADD KEY `FK_student_fees_payments_merchant_info` (`merchant_id`),
  ADD KEY `FK_student_fees_payments_merchant_card_terminals` (`merchant_card_terminal_id`),
  ADD KEY `FK_student_fees_payments_merchant_wallet_terminals` (`merchant_wallet_terminal_id`),
  ADD KEY `FK_student_fees_payments_users` (`paid_by`);

--
-- Indexes for table `student_fees_refunds`
--
ALTER TABLE `student_fees_refunds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_student_fees_refunds_student_fees_payments` (`transaction_payment_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`,`user_type_id`),
  ADD KEY `FK_user_types_users` (`user_type_id`),
  ADD KEY `FK_users_user_addresses` (`user_address_id`);

--
-- Indexes for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fees_types`
--
ALTER TABLE `fees_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `financial_institutions`
--
ALTER TABLE `financial_institutions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `financial_institution_categories`
--
ALTER TABLE `financial_institution_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `merchant_addresses`
--
ALTER TABLE `merchant_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `merchant_card_terminals`
--
ALTER TABLE `merchant_card_terminals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `merchant_info`
--
ALTER TABLE `merchant_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `merchant_wallet_terminals`
--
ALTER TABLE `merchant_wallet_terminals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payment_schemes`
--
ALTER TABLE `payment_schemes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `students_department`
--
ALTER TABLE `students_department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student_fees_due`
--
ALTER TABLE `student_fees_due`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `student_fees_payments`
--
ALTER TABLE `student_fees_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=449;

--
-- AUTO_INCREMENT for table `student_fees_refunds`
--
ALTER TABLE `student_fees_refunds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=273;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `financial_institutions`
--
ALTER TABLE `financial_institutions`
  ADD CONSTRAINT `FK_financial_institutions_financial_institution_categories` FOREIGN KEY (`category_id`) REFERENCES `financial_institution_categories` (`id`);

--
-- Constraints for table `general_public`
--
ALTER TABLE `general_public`
  ADD CONSTRAINT `FK_general_public_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FK_general_public_users_user_types` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`id`);

--
-- Constraints for table `merchant_card_terminals`
--
ALTER TABLE `merchant_card_terminals`
  ADD CONSTRAINT `FK_merchant_card_terminals_financial_institutions` FOREIGN KEY (`financial_inst_id`) REFERENCES `financial_institutions` (`id`),
  ADD CONSTRAINT `FK_merchant_card_terminals_payment_merchant_info` FOREIGN KEY (`merchant_id`) REFERENCES `merchant_info` (`id`),
  ADD CONSTRAINT `FK_merchant_card_terminals_payment_schemes` FOREIGN KEY (`scheme_id`) REFERENCES `payment_schemes` (`id`);

--
-- Constraints for table `merchant_info`
--
ALTER TABLE `merchant_info`
  ADD CONSTRAINT `FK_merchant_info_merchant_addresses` FOREIGN KEY (`address_id`) REFERENCES `merchant_addresses` (`id`);

--
-- Constraints for table `merchant_wallet_terminals`
--
ALTER TABLE `merchant_wallet_terminals`
  ADD CONSTRAINT `FK_merchant_wallet_terminals_financial_institutions` FOREIGN KEY (`financial_inst_id`) REFERENCES `financial_institutions` (`id`),
  ADD CONSTRAINT `FK_merchant_wallet_terminals_merchant_info` FOREIGN KEY (`merchant_id`) REFERENCES `merchant_info` (`id`),
  ADD CONSTRAINT `FK_merchant_wallet_terminals_payment_schemes` FOREIGN KEY (`scheme_id`) REFERENCES `payment_schemes` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `FK_students_students_department` FOREIGN KEY (`department_id`) REFERENCES `students_department` (`id`);

--
-- Constraints for table `student_fees_due`
--
ALTER TABLE `student_fees_due`
  ADD CONSTRAINT `FK_student_fees_due_fees_types` FOREIGN KEY (`fees_id`) REFERENCES `fees_types` (`id`),
  ADD CONSTRAINT `FK_student_fees_due_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`user_id`);

--
-- Constraints for table `student_fees_payments`
--
ALTER TABLE `student_fees_payments`
  ADD CONSTRAINT `FK_student_fees_payments_merchant_card_terminals` FOREIGN KEY (`merchant_card_terminal_id`) REFERENCES `merchant_card_terminals` (`id`),
  ADD CONSTRAINT `FK_student_fees_payments_merchant_info` FOREIGN KEY (`merchant_id`) REFERENCES `merchant_info` (`id`),
  ADD CONSTRAINT `FK_student_fees_payments_merchant_wallet_terminals` FOREIGN KEY (`merchant_wallet_terminal_id`) REFERENCES `merchant_wallet_terminals` (`id`),
  ADD CONSTRAINT `FK_student_fees_payments_student_fees_due` FOREIGN KEY (`fee_id`) REFERENCES `student_fees_due` (`id`),
  ADD CONSTRAINT `FK_student_fees_payments_users` FOREIGN KEY (`paid_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `student_fees_refunds`
--
ALTER TABLE `student_fees_refunds`
  ADD CONSTRAINT `FK_student_fees_refunds_student_fees_payments` FOREIGN KEY (`transaction_payment_id`) REFERENCES `student_fees_payments` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_user_types_users` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`id`),
  ADD CONSTRAINT `FK_users_user_addresses` FOREIGN KEY (`user_address_id`) REFERENCES `user_addresses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
