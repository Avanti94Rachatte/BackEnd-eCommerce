import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';

import errorHandler from './middleware/errorHandler.js';

const app = express();

// middleware
app.use(cors());
app.use(express.json()); 
app.use(morgan('dev'));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
      description: 'Ecommerce backend API'
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}` }
    ]
  },

  // scan route files for JSDoc
  apis: ['./routes/*.js'] 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use('/products', productRoutes);        
app.use('/api/cart', cartRoutes);          
app.use('/cart', cartRoutes);              
app.use('/api/favorites', favoriteRoutes); 
app.use('/favorites', favoriteRoutes);     

// health
app.get('/', (req, res) => res.json({ ok: true, message: 'MY SHOP' }));

// error handler
app.use(errorHandler);

export default app;
