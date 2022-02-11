# Api Rest do projeto NovaMusic

# Tecnologias utilizadas 
![JavaScript Badge]( https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Nodemailer Badge](data:image/png;base64,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)
[![NPM](https://nodei.co/npm/twilio.png?downloads=true&stars=true)](https://nodei.co/npm/twilio/)
# Sobre o projeto 

O Projeto é uma plataforma de Marketing Musical, na qual é especifica para os artista de Nova Andradina - MS, Brasil. 
O projeto está em operação de atualização, com o planejamento futuro de validação no mercado, a presente fase consiste em um projeto de estudo.
