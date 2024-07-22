const fileUpload = require("express-fileupload");
const errorHandler = require("../middlewares/error-handler.middlewares");
const authRoutes = require("../routes/auth.route");
const adminRoute = require("../routes/admin.route");
const courseRoute = require("../routes/course.route");
const lessonRoute = require("../routes/lesson.route");
const enrollmentRoute = require("../routes/enrollment.route");

const modules = async (app, express) => {
    app.use(express.json());
    app.use(fileUpload()); 
    app.use(express.static('uploads'));

    app.use('/api/auth', authRoutes);
    app.use(`/api/admin`, adminRoute);
    app.use('/api/course', courseRoute);
    app.use('/api/lesson', lessonRoute);
    app.use('/api/enrollment', enrollmentRoute);

    app.use(errorHandler);
};

module.exports = modules;