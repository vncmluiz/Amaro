
PASSO 1 - INSTALANDO O NODE
=====================================

	1 - Dentro da pasta Server existe uma pasta "bin" com o instalador do NodeJS
		- Instale o NodeJS de forma padrão.
		- Pode ser que seja preciso atualizar a versão do Java na sua máquina
		- O node e o NPM serão adicionados automaticamente ao Path da maquina



PASSO 2 - INSTALANDO O MYSQL
=====================================

	1 - Acesse o site abaixo e faça o download do MySQL

			https://dev.mysql.com/downloads/mysql/

		1.1 - Prosseguir com a instalação padrão da instancia
		1.2 - Definir o usuario como root e uma senha

	2 - Apos o termino, acessar pelo terminal a pasta da instalação do MySQL. No meu computador está em ...

			C:\Program Files\MySQL\MySQL Server 5.7\bin

		2.1 - Adicione essa pasta ao PATH do Windows;
		2.2 - Reinicie o prompt de comando para que ele tenha acesso ao novo Path;

	3 - Agora, no terminal, executar o comando abaixo. Ele vai mostrar a pasta padrão onde a segurança do MySQL permite
		fazer bulk insert para tabelas ...

			// DIGITE SUA SENHA DEFINIDA NO PASSO 1.1 APOS EXECUTAR O COMANDO ABAIXO

			mysql --user=root --password -e "SHOW VARIABLES LIKE \"secure_file_priv\""

		Acesse a pasta encontrada no comando acima e volte 1 nivel. No meu computador o nivel atual é o seguinte ...

			C:\ProgramData\MySQL\MySQL Server 5.7

	4 -	Dentro da pasta do passo 3, você deve encontrar um arquivo chamado "my.cnf".
		Edite com o bloco de notas e procure por uma linha que contenha "secure-file-priv"

		Deixe essa linha conforme abaixo e salve o arquivo na...

			# Secure File Priv.
			secure-file-priv=""

	5 - Agora, aperte a tecla "Windows" e digite "services"
		Vai aparecer o services do windows.
		Clique com o botao direito do mouse e, em seguida, "Executar como Administrador"

		5.1 - Procure por 2 serviços - "MySQL Router" e "MySQL 57"
		5.2 - CLique com o botão direito neles e peça para reiniciar os serviços


	6 - Dentro da pasta do projeto, procure por uma pasta "bin\Scripts"
		Edite com o bloco de notas um arquivo chamado "createDatabase.sql"

		Altere o caminho para onde estão os arquivos ".csv" com a base de dados.
		No meu computador está em ...

			"C:\\Users\\vmartinl\\Desktop\\Amaro\\bin\\Datasets\\sqlTables\\orders.csv"

		Dentro da pasta do projeto, na pasta "\bin" existe uma pasta "Datasets\sqlTables".
		Esses são os arquivos que você vai usar


	7 -	Agora, volte para dentro da pasta do passo 2 e execute o comando abaixo

			// DIGITE SUA SENHA DEFINIDA NO PASSO 1.1 APOS EXECUTAR O COMANDO ABAIXO
			// OBS.: Pode demorar uns 2min +/- para rodar

			mysql --user=root --password ""C:\Users\vmartinl\Desktop"\Amaro\bin\Scripts\createDatabase.sql"




PASSO 3 - EXECUTANDO O NODE
=====================================

 	1. -	Agora, acesse a pasta "Server" do seu projeto pelo terminal.
 			Tem um arquivo chamado "server.js"

 	2. -	No terminal, digite ...

 				node server.js

 	3. -	Abra o navegador no seguinte link ...

 				http://localhost:3000	
