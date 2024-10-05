

import userController from "../controllers/userController.mjs"

import adminCheck from '../middlewares/isAdmin.mjs';

const routes = (app) => {
    app.route("/api/user")
    .post(adminCheck, userController.register)

    app.route("/api/user_manage")
    .post(adminCheck, userController.change_role )
}

    
export {routes}