const express = require('express');
const { userRoutes,
  loginRoute,
  recipesRoutes,
  uploadRoute } = require('./routes');

const app = express();

const PORT = '3000';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(loginRoute);
app.use(userRoutes);
app.use(recipesRoutes);
app.use(uploadRoute);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });