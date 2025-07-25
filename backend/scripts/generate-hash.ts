import * as bcrypt from 'bcryptjs';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function generateHash() {
  try {
    rl.question('Digite a senha que deseja gerar o hash: ', (password) => {
      if (!password) {
        console.error('Por favor, forneça uma senha.');
        rl.close();
        return;
      }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      console.log('\nHash gerado com sucesso!');
      console.log('Copie o hash abaixo para o seu arquivo .env:');
      console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);

      rl.close();
    });
  } catch (error) {
    console.error('Erro ao gerar hash:', error);
    process.exit(1);
  }
}

generateHash();

process.on('SIGINT', () => {
  console.log('\nOperação cancelada pelo usuário');
  process.exit(0);
});
