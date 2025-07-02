-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2025 at 07:47 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hostelfinder`
--

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `student_id` int(11) NOT NULL,
  `hostel_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hostels`
--

CREATE TABLE `hostels` (
  `hostel_id` int(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `features` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hostels`
--

INSERT INTO `hostels` (`hostel_id`, `image`, `price`, `location`, `features`, `title`) VALUES
(1, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', 1500, 'Nairobi', 'Wi-Fi, Laundry, Shared Kitchen', 'The Urban Retreat Hostel'),
(2, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', 2000, 'Mombasa', 'Swimming Pool, AC, Private Rooms', 'Coastal Breeze Backpackers'),
(3, 'https://images.pexels.com/photos/11295864/pexels-photo-11295864.jpeg', 1200, 'Kisumu', 'Lake View, Bicycle Rental, Garden', 'Lakefront Haven Hostel'),
(4, 'https://images.pexels.com/photos/20725941/pexels-photo-20725941.jpeg', 18000, 'Nakuru', 'Safari Tours, Restaurant, Bar', 'Rift Valley Adventure Hostel'),
(5, 'https://images.pexels.com/photos/20725943/pexels-photo-20725943.jpeg', 1000, 'Eldoret', 'Study Area, Hot Showers, Near University', 'University Hub Hostel');

-- --------------------------------------------------------

--
-- Table structure for table `resevations`
--

CREATE TABLE `resevations` (
  `student_id` int(255) NOT NULL,
  `viewing_date` date NOT NULL,
  `status` char(255) NOT NULL DEFAULT 'Avaliable',
  `hostel_id` int(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(255) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(63) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `users_id` int(64) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` int(255) NOT NULL,
  `role` enum('Student','Hostel Owner','','') NOT NULL DEFAULT 'Student'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_id`, `full_name`, `username`, `email_address`, `password`, `phone_number`, `role`) VALUES
(STD001, 'Chunky', 'Chunky65', 'cfunky65@gmaill.com', '123456', 711223344, 'Student'),
(STD002, 'Dennis', 'Deno', 'Denniss@gmail.com', '112233', 732123212, 'Student'),
(HSOW001, 'John Doe', 'JDoe', 'johndoe@gmail.com', '098765', 712121212, 'Hostel Owner');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `hostels`
--
ALTER TABLE `hostels`
  ADD PRIMARY KEY (`hostel_id`);

--
-- Indexes for table `resevations`
--
ALTER TABLE `resevations`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `hostel_id` (`hostel_id`),
  ADD UNIQUE KEY `hostel_id_2` (`hostel_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

--
-- Constraints for table `resevations`
--
ALTER TABLE `resevations`
  ADD CONSTRAINT `resevations_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  ADD CONSTRAINT `resevations_ibfk_2` FOREIGN KEY (`hostel_id`) REFERENCES `hostels` (`hostel_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
