-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2017 at 07:40 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `erp`
--

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id` int(10) NOT NULL,
  `shift` varchar(10) NOT NULL,
  `program` varchar(6) NOT NULL,
  `year` varchar(4) NOT NULL,
  `section` varchar(1) NOT NULL,
  `added_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id`, `shift`, `program`, `year`, `section`, `added_on`) VALUES
(1, 'Evening', 'BSCS', '1st', 'A', '2017-12-14 22:04:54'),
(2, 'Evening', 'BSCS', '1st', 'B', '2017-12-16 22:19:39');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `course_id` int(10) NOT NULL,
  `color` varchar(20) NOT NULL,
  `day` varchar(15) NOT NULL,
  `start_time` varchar(10) NOT NULL,
  `end_time` varchar(10) NOT NULL,
  `teacher` int(10) NOT NULL,
  `type` varchar(10) NOT NULL,
  `location` varchar(10) NOT NULL,
  `tt_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `course_id`, `color`, `day`, `start_time`, `end_time`, `teacher`, `type`, `location`, `tt_id`) VALUES
(1, 1, '#3f7427', 'Monday', '03:30 pm', '06:00 pm', 2, 'T', 'SF-22', 1),
(2, 2, '#282057', 'Friday', '06:00 pm', '08:30 pm', 3, 'T', 'ff-07', 1),
(3, 1, '#562e44', 'Tuesday', '06:00 pm', '08:30 pm', 2, 'T', 'gf-16', 2);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `number` varchar(50) NOT NULL,
  `year` varchar(50) NOT NULL,
  `program` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `credit` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `number`, `year`, `program`, `title`, `credit`) VALUES
(1, '301', '1', 'BSCS', 'Introduction to Computer Science - I', '2+1'),
(2, '303', '1', 'BSCS', 'Mathematics - I (Calculus)', '3+0'),
(3, '305', '1', 'BSCS', 'Mathematics - I (Calculus)', '3+0'),
(4, '307', '1', 'BSCS', 'Physics - I (General Physics)', '2+1'),
(5, '309', '1', 'BSCS', 'English', '3'),
(6, '311', '1', 'BSCS', 'Islamiat/Pak Studies', '3'),
(7, '301', '1', 'BSSE', 'Calculus and Analytical Geometry - I', '3'),
(8, '303', '1', 'BSSE', 'Computer Logic Design and Computer Organization', '3'),
(9, '305', '1', 'BSSE', 'Introduction to C/C++ Language', '3+1'),
(10, '307', '1', 'BSSE', 'Islamic Studies', '2'),
(11, '309', '1', 'BSSE', 'Probability and Statistics', '3+0'),
(12, '401', '2', 'BSCS', 'Digital Computer Design Fundamentals', '2+1'),
(13, '403', '2', 'BSCS', 'Assembly Language Programming', '2+1'),
(14, '405', '2', 'BSCS', 'Mathematics - III', '3+0'),
(15, '409', '2', 'BSCS', 'Materials, Semiconductors and Devices', '2+1'),
(16, '411', '2', 'BSCS', 'Discrete Mathematics', '3+0'),
(17, '413', '2', 'BSCS', 'Object Oriented Programming', '2+1'),
(18, '401', '2', 'BSSE', 'Advanced JAVA', '3+1'),
(19, '403', '2', 'BSSE', 'Relational Database Management System', '2+1'),
(20, '405', '2', 'BSSE', 'Data Structure using JAVA', '3+1'),
(21, '407', '2', 'BSSE', 'Operations Research', '3'),
(22, '409', '2', 'BSSE', 'Discrete Mathematics', '3'),
(23, '411', '2', 'BSSE', 'Ordinary Differential Equations', '3');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` varchar(20) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `first_name`, `last_name`, `class_id`) VALUES
('EP1449035', 'Haris', 'Muhammad Jamil', 1),
('EP1449119', 'Syed', 'Muhammad Ahsan', 1),
('EP1449141', 'Zahid', 'Abdul Aziz', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `userName`, `password`, `role`) VALUES
(1, 'admin', 'admin', 'admin', 'fc5e038d38a57032085441e7fe7010b0', 'admin'),
(2, 'Badar', 'Sami', 'badarsami', '202cb962ac59075b964b07152d234b70', 'teacher'),
(3, 'Fawad', 'Alam', 'fawadalam', '202cb962ac59075b964b07152d234b70', 'teacher');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
