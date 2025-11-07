// ====================================================
// API LearnFlix - Cadastro de Usuário
// ====================================================

const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Permite conexões do app
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados SQL Server
const dbConfig = {
  user: 'sa',
  password: 'rafalucavini',
  server: 'localhost',
  database: 'learnflix',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// ====================================================
// Rota: Cadastrar Usuário 
// ====================================================
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha, tipoUsuario } = req.body;

  console.log('📥 Dados recebidos do app:', req.body);

  if (!nome || !email || !senha || !tipoUsuario) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os campos são obrigatórios.'
    });
  }

  try {
    const pool = await sql.connect(dbConfig);

    await pool.request()
      .input('nome', sql.VarChar, nome)
      .input('email', sql.VarChar, email)
      .input('senha', sql.VarChar, senha)
      .input('tipoUsuario', sql.VarChar, tipoUsuario)
      .query(`
        INSERT INTO NEW_TB_USUARIO (ds_nome, ds_email, ds_senha, ds_tipoUsuario)
        VALUES (@nome, @email, @senha, @tipoUsuario)
      `);

    res.json({ sucesso: true, mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error('❌ Erro ao cadastrar usuário:', err);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar usuário.' });
  }
});




// ====================================================
// Inicializa o servidor
// ====================================================
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://192.168.15.4:${port}`);
});



// ====================================================
// Rota: Login de Usuário
// ====================================================
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.json({ sucesso: false, mensagem: "Preencha todos os campos." });
  }

  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("senha", sql.VarChar, senha)
      .query("SELECT * FROM Usuarios WHERE email = @email AND senha = @senha");

    if (result.recordset.length === 0) {
      return res.json({ sucesso: false, mensagem: "Email ou senha incorretos." });
    }

    const usuario = result.recordset[0];
    res.json({
      sucesso: true,
      tipoUsuario: usuario.tipoUsuario, // Retorna se é Admin ou User
      nome: usuario.nome,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.json({ sucesso: false, mensagem: "Erro no servidor." });
  }
});
