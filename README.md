# Nossa Aventura ❤️

Jogo de plataforma 2D personalizado para uma experiência de pedido de casamento.

## Executar
1. Extraia o ZIP e abra a pasta no VS Code.
2. Instale a extensão Live Server.
3. Abra `index.html` com Live Server.

## Controles
- A / D ou setas esquerda/direita: movimentar.
- W, seta para cima ou espaço: pular.
- S ou seta para baixo: acelerar a descida enquanto estiver no ar.
- ESC: pausar.
- Celular: botões na tela.

## Mecânicas
- Fase longa com plataformas e saltos progressivamente mais difíceis.
- Lírios como colecionáveis.
- Cinco pets patrulhando a fase: gato branco, gato cinza, Border Collie preto e branco, cachorro marrom e gata rajada.
- Encostar em um pet ou cair reinicia a fase desde o início.
- Papagaio voando no cenário.
- No final, a protagonista encontra o personagem masculino ajoelhado, com uma caixinha de anel.
- O botão de entrada leva à página do pedido.

## Personalizar o fundo
O jogo tenta carregar `game/assets/backgrounds/pinterest-reference.jpg`.
Salve a imagem de referência nesse caminho para usá-la como fundo. Se o arquivo não existir, o jogo usa o cenário pixel-art integrado.
Use apenas uma imagem que você tenha direito de utilizar.

## Personalizar a protagonista e os pets
Os desenhos atuais são formas pixel-art feitas no Canvas. Para aproximar os personagens das pessoas e animais reais, envie fotos de referência e podemos criar sprites originais.

## Arquivos principais
- `index.html`: entrada e interface.
- `game/js/game.js`: motor, fase, controles, personagens, pets e colisões.
- `game/css/game.css`: visual do jogo.
- `proposal/proposal.html`: página de pedido.
- `proposal/js/proposal.js`: botões e comemoração.
