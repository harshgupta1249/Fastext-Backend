const client = require("../config/db");

exports.sendMsg = (req, res) => {
  let current = new Date();
  let time = current.toLocaleString();

  const { receiver, message } = req.body;

  client
    .query(
      `INSERT INTO messages (sender, receiver, time, message) VALUES ('${req.email}', '${receiver}', '${time}', '${message}') ;`
    )
    .then((data) => {
      res.status(200).json({
        message: "Message Sent Successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Database Error",
      });
    });
};

exports.getMsg = (req, res) => {
  client
    .query(`SELECT * FROM messages WHERE receiver = '${req.email}';`)
    .then((data) => {
      const userMsg = data.rows.map((msg) => {
        return {
          id: msg.id,
          sender: msg.sender,
          time: msg.time,
          message: msg.message,
        };
      });

      res.status(200).json({
        message: "Refreshed",
        data: userMsg,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Database error",
      });
    });
};

exports.delMsg = (req, res) => {
  client
    .query(`DELETE FROM messages WHERE id = '${req.msgId}';`)
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "Message Deleted Succesfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Database Error",
      });
    });
};
