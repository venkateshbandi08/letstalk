const Messages = require("../models/messageModel");

const formatDateTimeIST = (isoDate) => {
  const date = new Date(isoDate);

  // Convert to Indian Standard Time (IST)
  const options = { 
    timeZone: 'Asia/Kolkata', 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: true 
  };
  
  const localeDateString = date.toLocaleString('en-IN', options);

  // Split date and time from locale string
  const [formattedDate, formattedTime] = localeDateString.split(', ');

  // Format date from 'dd/mm/yyyy' to 'dd/mm/yyyy'
  const [day, month, year] = formattedDate.split('/');

  return `${day}/${month}/${year} ${formattedTime}`;
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        msgTime: formatDateTimeIST(msg.createdAt),
      };
    });
    // console.log()
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
