
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {resource_name: 'hammer', description: 'smash the old kitechen out'},
        {resource_name: 'lawnmower', description: 'used to cut grass'},
        {resource_name: 'cleaner', description: 'wipe down fridge'}
      ]);
    });
};
