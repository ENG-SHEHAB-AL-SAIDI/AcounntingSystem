'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Load modules
require('./modules/contacts')(app);
require('./modules/incomes')(app);
// require('./modules/accounts')(app);
// ...other modules

// Global error handler
app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Route not found' } });
});


// Global error handler (must come after all routes)
const globalErrorHandler = require('./middlewares/globalErrorHandler');
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
