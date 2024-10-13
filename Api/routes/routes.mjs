

import userController from "../controllers/userController.mjs"
import gameController from "../controllers/gameController.mjs"

import adminCheck from '../middlewares/isAdmin.mjs';
import managerCheck from '../middlewares/isManager.mjs';

const routes = (app) => {
    app.route("/api/user")
    .post( userController.register)

    app.route("/api/staff_user")
    .post( userController.register_staff)

    app.route("/api/change_role")
    .post(adminCheck, userController.change_role )

    app.route("/api/games")
    .get( managerCheck, gameController.fetch_games)

    app.route("/api/game")
    .get(managerCheck, gameController.fetch_game)

}

 
    
export {routes}