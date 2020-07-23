export default {
  id: "default",
  url: process.env.DEFAULT_URL || "mongodb://localhost:27017/task-todo-example",
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};
