//......................Importing db from "./db.config.js"
const db = require("../db/db.config");

//......................Get Request to Get All Users.
exports.getUsers = (req, res) => {
  try {
    db.query("SELECT * FROM users", (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({
        users: results,
      });
    });
  } catch (error) {
    return res.status(400).json({ errors: error.message });
  }
};

//......................Get Request to Get a Single User By Id.
exports.getSingleUserById = (req, res) => {
  let { id } = req.params;
  try {
    if (!Number(id)) {
      return res.status(400).json({ error: "Invalid parameters" });
    }
    let num = parseInt(id);
    db.query("SELECT * FROM users WHERE id =? ", [num], (err, results) => {
      if (err) {
        return res.status(500).json({ errors: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      const { name, username, email } = results[0];
      return res.status(200).json({
        user: {
          id: num,
          name,
          username,
          email,
        },
      });
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//...........................Post Request to Insert a New User In The Database
exports.insertNewUser = (req, res) => {
  const { name, username, email } = req.body;
  try {
    if (!name || !username || !email)
      return res.status(400).json({ error: "all fields required" });
    db.query(
      "SELECT * FROM users WHERE username =? OR email =?",
      [username, email],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        if (results.length > 0) {
          return res.status(409).json({
            error: "User already exists with this username or email",
          });
        }
        db.query(
          "INSERT INTO users SET ?",
          { name: name, username: username, email: email },
          (err, results) => {
            if (err) {
              return res.status(400).json({
                error: err.message,
              });
            }
            let user_id = results.insertId;
            return res.status(201).json({
              message: "user successfully created",
              user: {
                id: user_id,
                name,
                username,
                email,
              },
            });
          }
        );
      }
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
//........................Put Request to Update the user By Using There Id.
exports.updateSingleUser = (req, res) => {
  let { id } = req.params;
  try {
    if (!Number(id)) {
      return res.status(400).json({ error: "Invalid parameters" });
    }

    let num = parseInt(id);
    db.query(
      "UPDATE users SET ? WHERE id = ?",
      [req.body, num],
      (err, results) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        if (results.affectedRows === 0) {
          return res.status(400).json({ error: "User Not Found" });
        }

        return res.json({
          message: "user updated successfully",
          affected: results.message,
        });
      }
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//......................Delete Request to Delete a single user by there Id.
exports.deleteUser = (req, res) => {
  let { id } = req.params;
  try {
    if (!Number(id)) {
      return res.status(400).json({ error: "Invalid parameters" });
    }
    let num = parseInt(id);

    db.query("DELETE FROM users WHERE id = ?", [num], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(200).json({ error: "user not found" });
      }

      return res.status(200).json({ message: "User successfully deleted" });
    });
  } catch (error) {
    return res.status(400).json({ errors: error.message });
  }
};
