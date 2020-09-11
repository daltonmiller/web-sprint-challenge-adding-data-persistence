

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {project_name: 'Remodel home', description: 'remodel kitechen'},
        {project_name: 'mow lawn', description: 'cut grass'},
        {project_name: 'clean fridge', description: 'make it clean'}
      ]);
    });
};
