import express from 'express';
import path from 'path';
import pkg from 'pg';
import listEndpoints from 'express-list-endpoints';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

const { Pool } = pkg;
const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Função para tentar conectar ao banco de dados com retry
const connectWithRetry = () => {
  pool.connect((err) => {
    if (err) {
      console.error('Erro ao adquirir cliente', err.stack);
      setTimeout(connectWithRetry, 5000); // Tenta reconectar após 5 segundos
    } else {
      console.log('Conectado ao banco de dados');
    }
  });
};

connectWithRetry(); // Inicia a tentativa de conexão

// Configuração do CORS
const corsOptions = {
  origin: 'http://127.0.0.1:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Habilita CORS com as opções definidas
app.use(express.json()); // Habilita parsing de JSON no corpo das requisições

// Rota de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Tentativa de login:', { username, password });

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    res.json({ message: 'Login bem-sucedido', user });
  } catch (error) {
    console.error('Erro ao tentar fazer login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Define o diretório estático para servir arquivos do front-end
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../../../Frontend')));

// Rota para listar todos os endpoints disponíveis
app.get('/routes', (req, res) => {
  res.json(listEndpoints(app));
});

// Rota para servir o arquivo index.html para qualquer rota não definida
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../Frontend/index.html'));
});

// Inicia o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

export default pool; // Exporta a pool de conexões para uso em outros módulos