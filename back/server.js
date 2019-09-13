const express = require('express');
const morgan = require('morgan');
const path = require('path');
const usersRouter = require('./routes/users');
const dealsRouter = require('./routes/deals');
// const articlesRouter = require('./routes/articles');
// const regiterRouter = require('./routes/register');
const cors = require('cors')
const PORT = 4000;
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const FileStore = require("session-file-store")(session);
// const { cookiesCleaner, sessionChecker } = require("./middleware/auth");
const router = express.Router();

const app = express();

// app.use(cookieParser());
// const fileStoreOptions = {};
// app.use(
//   session({
//     store: new FileStore(fileStoreOptions),
//     key: "user_sid",
//     secret: "anything here",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 600000
//     }
//   })
// );

//192.168.1.197
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
  // {
  //   origin: 'http://localhost:8080',
  //   credentials:true,
  // }
));
app.use(morgan('dev'));

// Подключаем mongoose.
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/bankex", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// app.use(cookiesCleaner);

// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.static('public'));

// Подключаем импортированные маршруты с определенным url префиксом.
app.use('/users/', usersRouter);
app.use('/deals/', dealsRouter);
// app.use('/register/', regiterRouter);
// app.use('/articles/', articlesRouter);


// Обработка ошибок.
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(PORT, () => console.log(`Started on port: ${PORT}`));