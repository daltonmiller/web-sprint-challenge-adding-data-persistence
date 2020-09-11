
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {description: 'redo kitchen', project_id:1, resource_id:1},
        {description: 'mow lawn', project_id:2, resource_id:2}
      ])
    });
};
