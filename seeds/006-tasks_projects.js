exports.seed = function(knex) {
  return knex('task_projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('task_projects').insert([
        {task_id: 1, project_id: 1},
        {task_id: 2, project_id: 1},
        {task_id: 3, project_id: 2}
     
      ]);
    });
};
