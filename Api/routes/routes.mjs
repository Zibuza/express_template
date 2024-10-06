

import userController from "../controllers/userController.mjs"

import adminCheck from '../middlewares/isAdmin.mjs';

const routes = (app) => {
    app.route("/api/user")
    .post( userController.register)

    app.route("/api/staff_user")
    .post(adminCheck, userController.register_staff)

    app.route("/api/change_role")
    .post(adminCheck, userController.change_role )
}
 
    
export {routes}