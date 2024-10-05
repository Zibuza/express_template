

import userController from "../controllers/userController.mjs"

import adminCheck from '../middlewares/isAdmin.mjs';

const routes = (app) => {
    app.route("/api/user")
    .post(userController.register)
}

    
export {routes}    