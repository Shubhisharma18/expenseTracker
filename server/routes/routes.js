const routes=require('express').Router();  //allows us to create diff routes 
//calling controllers
const controller= require('../controller/controller');

routes.route('/api/category')
  .post(controller.create_category)
  .get(controller.get_Categories)


routes.route('/api/transaction')
  .post(controller.create_Transaction)
  .get(controller.get_Transaction)
  .delete(controller.delete_Transaction)


routes.route('/api/labels')
   .get(controller.get_Labels)
module.exports = routes;