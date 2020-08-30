const { dateToString } = require("../../helpers/date");
const Event = require("../../models/events");
const { transformEvent } = require("./help");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },

  createEvent: async (args) => {
    const event = new Event({
      title: args.input.title,
      description: args.input.description,
      price: +args.input.price,
      date: dateToString(args.input.date),
      creator: "5f4b9b002288f129081f62a3",
    });
    let createdEvent;

    try {
      const result = await event.save();

      createdEvent = transformEvent(result);
      const creator = await User.findById("5f4b9b002288f129081f62a3");

      if (!creator) {
        throw new Error("User not found");
      }

      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
};
