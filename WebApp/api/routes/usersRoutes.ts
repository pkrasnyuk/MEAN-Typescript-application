import controller from "./../controllers/usersDbController"

var routes = (app: any) => {
    var usersController = new controller();

    app.route("/api/users")
        .get(usersController.getUsers)
        .post(usersController.addUser);

    app.route("/api/users/:id")
        .get(usersController.getUser)
        .put(usersController.updateUser)
        .delete(usersController.deleteUser);

    app.route("/api/authenticate")
        .post(usersController.loginUser);
};

export default routes;