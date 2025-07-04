const db = require("../app");
const express = require("express");
const router = express.Router();    


const storage = {
  // ✅ Get a user by ID
  getUser: (id) => new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  }),

  // ✅ User growth stats (simple count for now)
  getUserGrowthStats: () => new Promise((resolve, reject) => {
    db.query("SELECT COUNT(*) AS total FROM users", (err, results) => {
      if (err) return reject(err);
      resolve({ total: results[0].total, weeklyGrowth: 7 }); // Replace with real logic
    });
  }),

  // ✅ Total revenue stats (placeholder)
  getRevenueStats: () => new Promise((resolve, reject) => {
    db.query("SELECT SUM(price) AS total FROM hostels", (err, results) => {
      if (err) return reject(err);
      resolve({ total: results[0].total || 0, weeklyGrowth: 10 }); // Replace logic
    });
  }),

  // ✅ System metrics
  getSystemHealthMetrics: () => new Promise((resolve, reject) => {
    db.query("SELECT COUNT(*) AS activeProperties FROM hostels", (err, results) => {
      if (err) return reject(err);
      resolve({
        activeProperties: results[0].activeProperties,
        uptime: "99.9%",
        avgResponseTime: "110ms"
      });
    });
  }),

  getActiveBookingsCount: () => Promise.resolve(5), // Implement bookings table later
  getPendingReportsCount: () => Promise.resolve(2), // Implement reports table later

  // ✅ Users
  getAllUsers: () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  }),

  searchUsers: (search) => new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE username LIKE ?", [`%${search}%`], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  }),

  filterUsers: (type, status) => new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE role = ? AND status = ?", [type, status], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  }),

  updateUserStatus: (id, status) => new Promise((resolve, reject) => {
    db.query("UPDATE users SET status = ? WHERE id = ?", [status, id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  }),

  // ✅ Properties
  getAllProperties: () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM hostels", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  }),

  searchProperties: (search) => new Promise((resolve, reject) => {
    db.query("SELECT * FROM hostels WHERE title LIKE ?", [`%${search}%`], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  }),

  filterProperties: (status, type) => new Promise((resolve, reject) => {
    db.query("SELECT * FROM hostels WHERE features LIKE ? AND title LIKE ?", [`%${status}%`, `%${type}%`], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  }),

  updatePropertyStatus: (id, status, adminId) => new Promise((resolve, reject) => {
    db.query("UPDATE hostels SET features = CONCAT(features, ', status: ', ?) WHERE hostel_id = ?", [status, id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  }),

  // ✅ Admin Logs (future feature)
  logAdminAction: (action) => {
    console.log("Admin Action Logged:", action);
    return Promise.resolve();
  },

  getRecentAdminActions: (limit) => Promise.resolve([
    { id: 1, action: "property_verified", description: "Sample action", timestamp: new Date() }
  ]),

  // ✅ Platform settings (optional)
  getPlatformSettings: () => Promise.resolve([
    { key: "support_email", value: "admin@hostelfinder.com" }
  ]),

  updatePlatformSetting: (key, value, adminId) => {
    console.log(`Setting updated by admin ${adminId}: ${key} => ${value}`);
    return Promise.resolve();
  }
};

module.exports = { storage };
