module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Searches", [
      {
        termSearched: "orange",
        results: JSON.stringify([
          {
            id: "04eEQhDfAL8l5nt3",
            tags: ["two", "double", "black"],
            mimetype: "image/jpeg",
            createdAt: "2022-07-18T11:28:29.596Z",
          },
          {
            id: "05Xd4JtN14983pns",
            tags: ["Cute"],
            mimetype: "image/jpeg",
            createdAt: "2024-05-27T17:55:08.552Z",
          },
          {
            id: "09wFxpacQzvf9jfM",
            tags: ["Maskcat"],
            mimetype: "image/jpeg",
            createdAt: "2021-08-17T06:26:37.959Z",
          },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Searches", null, {});
  },
};
