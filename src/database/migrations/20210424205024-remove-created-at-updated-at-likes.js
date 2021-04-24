"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("likes", "created_at", { transaction: t }),
        queryInterface.removeColumn("likes", "updated_at", { transaction: t }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn("likes", "created_at", {
          type: Sequelize.DATE,
          allowNull: false,
        }, { transaction: t }),
        queryInterface.addColumn("likes", "updated_at", {
          type: Sequelize.DATE,
          allowNull: false,
        }, { transaction: t }),
      ]);
    });
  },
};
