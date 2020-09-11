const express = require('express')
const knex = require('knex')
const db = require("./config")
const Projects = require('./project-model')

const router = express.Router()

router.get('/projects', (req, res) => {
    Projects.find()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });
  });

  router.get('/resources', (req, res) => {
    Projects.getResources()
    .then(resource => {
      res.json(resource);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get resource' });
    });
  });

  router.get('/tasks', (req, res) => {
    Projects.getTasks()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks' });
    });
  });

  router.get('/projects/:id', (req, res) => {
    const { id } = req.params;
  
    Projects.findById(id)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });
  });

  router.post("/projects", (req, res) => {
    const projectData = req.body

    db("projects")
    .insert(projectData)
    .returning("id")
    .then(ids => {
        res.status(200).json({data: ids})
    })
    .catch(error => {
        res.status(500).json({message: error.message})
    })
})

router.post("/resources", (req, res) => {
    const resourceData = req.body

    db("resources")
    .insert(resourceData)
    .returning("id")
    .then(ids => {
        res.status(200).json({data: ids})
    })
    .catch(error => {
        res.status(500).json({message: error.message})
    })
})

router.post("/tasks", (req, res) => {
    const taskData = req.body

    db("tasks")
    .insert(taskData)
    .returning("id")
    .then(ids => {
        res.status(200).json({data: ids})
    })
    .catch(error => {
        res.status(500).json({message: error.message})
    })
})

router.get('/tasks', (req, res) => {
    db('tasks')
    .where('tasks.project_id')
    .leftJoin('projects', '')
    .select('tasks.description')
})

router.get('/task_projects/:id', (req, res) => {
    // get a list of project resources
    db('tasks as t')
      .where('t.project_id', req.params.id)
      .select('t.description as Task_Description')
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  });

  router.get('/projects_resources/:id', (req, res) => {
    // get a list of project resources
    db('projects_resources as pr')
      .where('pr.project_id', req.params.id)
      .leftJoin('projects as p', 'p.id', 'pr.project_id')
      .leftJoin('resources as r', 'r.id', 'pr.resource_id')
      .select('p.project_name as projectName', 'r.resource_name as resourceName')
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  });

  router.get('/task_projects', (req, res) => {
      db('tasks')
      .where('tp.project_id')
      .join('projects.name as p', 'tasks.project_id', 'p.id')
      .select('p.project_name as projectName', 't.description as taskdesc')
      .then(resources => {
        res.status(200).json(resources);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  })

module.exports = router