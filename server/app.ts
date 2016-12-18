import * as express    from 'express';
import * as path       from 'path';
import * as logger     from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose   from 'mongoose';

//import routes
import router from './router';

const app = express();
process.env.MONGODB_URI = 'mongodb://localhost/todolist';
mongoose.connect(process.env.MONGODB_URI);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));

// define routes
app.use(router);

// catch 404 and forward to angular2
app.use((req: express.Request, res: express.Response): void => {
  console.log(`Redirecting Server 404 request: ${req.originalUrl}`);
  res.status(200).sendFile(path.resolve(__dirname, 'client/index.html'));
});

// error handler
app.use((
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  // only providing error details in development
  err = req.app.get('env') === 'development'
    ? err
    : { message: 'Internal Server Error' };

  // send error
  res.json({ err: err.message });
});

export = app;
