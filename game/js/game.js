(() => {
  "use strict";

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const coinCount = document.getElementById("coinCount");
  const progressLabel = document.getElementById("progress");
  const startScreen = document.getElementById("startScreen");
  const pauseScreen = document.getElementById("pauseScreen");
  const finishScreen = document.getElementById("finishScreen");
  const toast = document.getElementById("toast");

  const W = canvas.width;
  const H = canvas.height;
  const WORLD_WIDTH = 6500;
  const GRAVITY = 0.62;
  const keys = { left: false, right: false, jump: false, down: false };

  let state = "ready";
  let cameraX = 0;
  let liliesCollected = 0;
  let lastTime = 0;
  let toastTimer = 0;
  let parrotX = -100;
  let parrotY = 105;


  const backgroundImage = new Image();
let backgroundReady = false;

backgroundImage.onload = () => {
    backgroundReady = true;
};

backgroundImage.src = "game/assets/backgrounds/fase-1-background.gif";



const groundImage = new Image();
let groundReady = false;

groundImage.onload = () => {
    groundReady = true;
};

groundImage.src = "game/assets/backgrounds/ground-texture.png";
  
  
  const player = {
    x: 70, y: 350, w: 42, h: 62,
    vx: 0, vy: 0, speed: 4.15, jump: -14.2,
    grounded: false, facing: 1, invulnerable: 0,
    anim: 0
  };

  const lilyImage = new Image();
let lilyImageReady = false;

lilyImage.onload = () => {
    lilyImageReady = true;
    console.log("Lírio rosa carregado!");
};

lilyImage.onerror = () => {
    console.error("Erro ao carregar o lírio rosa. Verifique o caminho.");
};

lilyImage.src = "game/assets/lirio-rosa.png";

  const castleImage = new Image();
let castleReady = false;

castleImage.onload = () => {
    castleReady = true;
    console.log("Castelo medieval carregado!");
};

castleImage.onerror = () => {
    console.error("Erro ao carregar o castelo medieval.");
};

castleImage.src = "game/assets/castelo-medieval.png";

  
  const platforms = [
    {x:0,y:470,w:620,h:70}, {x:710,y:470,w:430,h:70},
    {x:1240,y:470,w:470,h:70}, {x:1810,y:470,w:430,h:70},
    {x:2340,y:470,w:440,h:70}, {x:2880,y:470,w:430,h:70},
    {x:3410,y:470,w:470,h:70}, {x:3980,y:470,w:430,h:70},
    {x:4510,y:470,w:440,h:70}, {x:5050,y:470,w:500,h:70},
    {x:5650,y:470,w:850,h:70},

    {x:225,y:365,w:125,h:18}, {x:430,y:300,w:125,h:18},
    {x:780,y:370,w:130,h:18}, {x:990,y:300,w:120,h:18},
    {x:1320,y:365,w:130,h:18}, {x:1535,y:295,w:120,h:18},
    {x:1900,y:370,w:125,h:18}, {x:2110,y:305,w:125,h:18},
    {x:2450,y:360,w:130,h:18}, {x:2660,y:285,w:125,h:18},
    {x:3000,y:365,w:125,h:18}, {x:3210,y:295,w:130,h:18},
    {x:3540,y:355,w:130,h:18}, {x:3760,y:280,w:125,h:18},
    {x:4100,y:360,w:130,h:18}, {x:4310,y:295,w:125,h:18},
    {x:4630,y:360,w:130,h:18}, {x:4840,y:285,w:130,h:18},
    {x:5200,y:360,w:140,h:18}, {x:5450,y:300,w:140,h:18},
    {x:5900,y:370,w:150,h:18}
  ];

  const lilySpots = [
    [270,330],[475,265],[825,335],[1035,265],[1365,330],
    [1580,260],[1940,335],[2150,270],[2490,325],[2700,250],
    [3040,330],[3250,260],[3580,320],[3800,245],[4140,325],
    [4350,260],[4670,325],[4880,250],[5240,325],[5490,265],
    [5940,335]
  ];
  const lilies = lilySpots.map(([x,y]) => ({x,y,taken:false}));

 
const pets = [
   
    {type:"creamCat",x:820,y:438,start:750,end:1090,dir:1,speed:1.15},

    
    {type:"grayCat",x:1430,y:438,start:1280,end:1650,dir:-1,speed:1.3},

    
    {type:"borderCollie",x:2480,y:425,start:2380,end:2720,dir:1,speed:1.45},

    
    {type:"brownDog",x:3650,y:425,start:3480,end:3820,dir:-1,speed:1.5},

    
    {type:"tortieCat",x:4930,y:438,start:4580,end:4900,dir:1,speed:1.35}
];


  const protagonistImage = new Image();
let protagonistImageReady = false;

protagonistImage.onload = () => {
    protagonistImageReady = true;
    console.log("Personagem rock carregada!");
};

protagonistImage.onerror = () => {
    console.error("Erro ao carregar personagem-rock.png");
};

protagonistImage.src = "game/assets/personagem-rock.png";

  const borderCollieImage = new Image();
let borderCollieReady = false;

borderCollieImage.onload = () => {
    borderCollieReady = true;
};
borderCollieImage.src = "game/assets/cachorro-preto-branco.png";


const brownDogImage = new Image();
let brownDogReady = false;

brownDogImage.onload = () => {
    brownDogReady = true;
};
brownDogImage.src = "game/assets/cachorro-marrom.png";




const tortieCatImage = new Image();
let tortieCatReady = false;
tortieCatImage.onload = () => tortieCatReady = true;
tortieCatImage.src = "game/assets/gata-escaminha.png";

const creamCatImage = new Image();
let creamCatReady = false;
creamCatImage.onload = () => creamCatReady = true;
creamCatImage.src = "game/assets/gato-creme-olhos-azuis.png";

const grayCatImage = new Image();
let grayCatReady = false;
grayCatImage.onload = () => grayCatReady = true;
grayCatImage.src = "game/assets/gato-cinza-olhos-verdes.png";


  function overlap(a,b) {
    return a.x < b.x+b.w && a.x+a.w > b.x &&
           a.y < b.y+b.h && a.y+a.h > b.y;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 1500);
  }

  function resetLevel() {
    player.x=70; player.y=350; player.vx=0; player.vy=0;
    player.grounded=false; player.invulnerable=0; player.anim=0;
    cameraX=0; liliesCollected=0; parrotX=-100;
    lilies.forEach(l => l.taken=false);
    pets[0].x=820; pets[1].x=1430; pets[2].x=2480; pets[3].x=3650; pets[4].x=4930;
    pets.forEach((p,i) => p.dir = i%2 ? -1 : 1);
    coinCount.textContent="00";
    progressLabel.textContent="0%";
    Object.keys(keys).forEach(k => keys[k]=false);
  }

  function drawCloud(x,y,s=1) {
    ctx.fillStyle="rgba(255,255,255,.84)";
    ctx.beginPath();
    ctx.arc(x,y,18*s,0,Math.PI*2);
    ctx.arc(x+23*s,y-10*s,24*s,0,Math.PI*2);
    ctx.arc(x+49*s,y,18*s,0,Math.PI*2);
    ctx.fill();
  }

  function drawBackground() {
    if (backgroundReady) {
      
      const scale=Math.max(W/backgroundImage.width,H/backgroundImage.height);
      const sw=W/scale, sh=H/scale;
      const sx=(backgroundImage.width-sw)/2;
      const sy=(backgroundImage.height-sh)/2;
      ctx.drawImage(backgroundImage,sx,sy,sw,sh,0,0,W,H);
      ctx.fillStyle="rgba(18,38,54,.05)";
      ctx.fillRect(0,0,W,H);
    } else {
      const sky=ctx.createLinearGradient(0,0,0,H);
      sky.addColorStop(0,"#6abfe8"); sky.addColorStop(.65,"#c4e9e9"); sky.addColorStop(1,"#e8edc7");
      ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
      ctx.fillStyle="#ffe6a1"; ctx.beginPath(); ctx.arc(790-cameraX*.08,100,48,0,Math.PI*2); ctx.fill();
      for(let i=0;i<15;i++){
        const x=((i*360-cameraX*.2)%(W+400))-120;
        drawCloud(x,75+(i%4)*48,.75+(i%2)*.2);
      }
      for(let i=0;i<20;i++){
        const x=i*340-cameraX*.28;
        ctx.fillStyle=i%2?"#9acb9b":"#7fb98e";
        ctx.beginPath(); ctx.moveTo(x-100,470); ctx.lineTo(x+120,210+(i%3)*32); ctx.lineTo(x+340,470); ctx.fill();
      }
      
      for(let i=0;i<24;i++){
        const x=i*280-cameraX*.45;
        ctx.fillStyle="#4d916e"; ctx.fillRect(x+35,400,18,70);
        ctx.beginPath(); ctx.arc(x+43,390,39,0,Math.PI*2); ctx.fill();
        ctx.fillStyle="#70b67d"; ctx.beginPath(); ctx.arc(x+20,378,22,0,Math.PI*2); ctx.fill();
      }
    }
    drawParrot();
  }

  function drawParrot() {
    parrotX += 2.0;

    if (parrotX > W + 100) {
        parrotX = -100;
        parrotY = 70 + Math.random() * 120;
    }

    const now = performance.now();

    
    const frame = Math.floor(now / 160) % 2;

    
    const x = parrotX;
    const y = parrotY + Math.sin(now / 260) * 8;

    if (parrotReady) {
        const frameWidth = parrotImage.width / 2;
        const frameHeight = parrotImage.height;
        const size = 58;

        ctx.drawImage(
            parrotImage,
            frame * frameWidth,
            0,
            frameWidth,
            frameHeight,
            x - size / 2,
            y - size / 2,
            size,
            size
        );
    }
}

  function drawPlatforms() {
    platforms.forEach(p => {
        const x = p.x - cameraX;

        if (x + p.w < -20 || x > W + 20) return;

        if (groundReady) {
            const tileHeight = 64;
            const tileWidth = tileHeight * (groundImage.width / groundImage.height);

            for (let offset = 0; offset < p.w; offset += tileWidth) {
                const width = Math.min(tileWidth, p.w - offset);

                ctx.save();
                ctx.beginPath();
                ctx.rect(x + offset, p.y, width, tileHeight);
                ctx.clip();

                ctx.drawImage(
                    groundImage,
                    x + offset,
                    p.y,
                    tileWidth,
                    tileHeight
                );

                ctx.restore();
            }

            if (p.h > tileHeight) {
                ctx.fillStyle = "#65452f";
                ctx.fillRect(x, p.y + tileHeight, p.w, p.h - tileHeight);
            }
        } else {
            ctx.fillStyle = "#8e6049";
            ctx.fillRect(x, p.y, p.w, p.h);

            ctx.fillStyle = "#68a96b";
            ctx.fillRect(x, p.y, p.w, 12);
        }
    });
}

  const parrotImage = new Image();
let parrotReady = false;

parrotImage.onload = () => {
    parrotReady = true;
};

parrotImage.src = "game/assets/papagaio-verde.png";

  function drawLily(lily) {
    if (lily.taken) return;

    const x = lily.x - cameraX;
    const y = lily.y;

    if (!lilyImageReady) return;

    const size = 38;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(performance.now() / 350 + x) * 0.08);

    ctx.drawImage(
        lilyImage,
        -size / 2,
        -size / 2,
        size,
        size
    );

    ctx.restore();
}

  



function drawPet(pet) {
    const x = pet.x - cameraX;
    const bob = Math.sin(performance.now() / 110 + x) * 1.2;

    let image;
    let ready;
    let height;

    
    if (pet.type === "borderCollie" || pet.type === "brownDog") {
        image = pet.type === "borderCollie"
            ? borderCollieImage
            : brownDogImage;

        ready = pet.type === "borderCollie"
            ? borderCollieReady
            : brownDogReady;

        height = 48;

        if (!ready || !image.naturalWidth) return;

        const width = height * (
            image.naturalWidth / image.naturalHeight
        );

        ctx.save();
        ctx.translate(x + 21, 0);

        if (pet.dir < 0) {
            ctx.scale(-1, 1);
        }

        ctx.drawImage(
            image,
            -width / 2,
            pet.y + 45 - height + bob,
            width,
            height
        );

        ctx.restore();
        return;
    }

    
    if (pet.type === "creamCat") {
        image = creamCatImage;
        ready = creamCatReady;
    } else if (pet.type === "grayCat") {
        image = grayCatImage;
        ready = grayCatReady;
    } else if (pet.type === "tortieCat") {
        image = tortieCatImage;
        ready = tortieCatReady;
    } else {
        return;
    }

    if (!ready || !image.naturalWidth) return;

    height = 38;

    const width = height * (
        image.naturalWidth / image.naturalHeight
    );

    ctx.save();
    ctx.translate(x + 21, 0);

    if (pet.dir < 0) {
        ctx.scale(-1, 1);
    }

    ctx.drawImage(
        image,
        -width / 2,
        pet.y + 32 - height + bob,
        width,
        height
    );

    ctx.restore();
}


function drawProtagonist() {
    if (!protagonistImageReady) return;

    const x = Math.round(player.x - cameraX);
    const y = Math.round(player.y);

    const height = player.h + 12;
    const width = height * (
        protagonistImage.naturalWidth /
        protagonistImage.naturalHeight
    );

    const drawX = x + (player.w - width) / 2;
    const drawY = y + player.h - height;

    ctx.save();

    if (player.facing < 0) {
        ctx.translate(x + player.w, 0);
        ctx.scale(-1, 1);

        ctx.drawImage(
            protagonistImage,
            (player.w - width) / 2,
            drawY,
            width,
            height
        );
    } else {
        ctx.drawImage(
            protagonistImage,
            drawX,
            drawY,
            width,
            height
        );
    }

    ctx.restore();
}




  function drawKneelingPartner() {
    
    const x=5900-cameraX, y=398;
    ctx.fillStyle="#49332f";ctx.fillRect(x+12,y-31,24,17);
    ctx.fillStyle="#f0c19e";ctx.fillRect(x+15,y-20,20,20);
    ctx.fillStyle="#263b5d";ctx.fillRect(x+10,y,28,20);
    ctx.fillStyle="#263b5d";ctx.fillRect(x+8,y+16,13,8);
    ctx.fillStyle="#263b5d";ctx.fillRect(x+22,y+18,19,6);
    ctx.fillStyle="#f0c19e";ctx.fillRect(x+36,y+3,13,5);
    // Pequena caixa do anel oferecida.
    ctx.fillStyle="#8e3155";ctx.fillRect(x+46,y-3,12,10);
    ctx.fillStyle="#f5d36f";ctx.fillRect(x+49,y-6,6,4);
    ctx.fillStyle="#fff";ctx.font="bold 16px Arial";ctx.fillText("♥",x+19,y-45);
  }

  function drawCastle() {
    if (!castleReady) return;

    const x = 6050 - cameraX;
    const y = 189;
    const width = 450;
    const height = 300;

    ctx.drawImage(
        castleImage,
        x,
        y,
        width,
        height
    );
}

  function draw() {
    drawBackground();
    drawPlatforms();
    lilies.forEach(drawLily);
    pets.forEach(drawPet);
    drawCastle();
    drawProtagonist();
  }

  function die() {
    if(state!=="playing")return;
    state="respawning";
    showToast("Você caiu! Vamos recomeçar a aventura. ♥");
    setTimeout(()=>{
      resetLevel();
      if(state==="respawning"){
        state="playing";lastTime=performance.now();requestAnimationFrame(loop);
      }
    },850);
  }

  function movePlayer(dt) {
    const oldY=player.y;
    player.vx=0;
    if(keys.left){player.vx=-player.speed;player.facing=-1;}
    if(keys.right){player.vx=player.speed;player.facing=1;}
    if(keys.jump&&player.grounded){player.vy=player.jump;player.grounded=false;}
    if(keys.down&&!player.grounded) player.vy=Math.min(17,player.vy+0.75*dt);
    player.x=Math.max(0,Math.min(WORLD_WIDTH-player.w,player.x+player.vx*dt));
    player.vy=Math.min(17,player.vy+GRAVITY*dt);
    player.y+=player.vy*dt;
    player.grounded=false;

    platforms.forEach(p=>{
      const horizontal=player.x+player.w>p.x&&player.x<p.x+p.w;
      const crossed=oldY+player.h<=p.y+5&&player.y+player.h>=p.y;
      if(horizontal&&crossed&&player.vy>=0&&!keys.down){
        player.y=p.y-player.h;player.vy=0;player.grounded=true;
      }
    });

    if(player.y>H+100){die();return;}
    player.anim+=Math.abs(player.vx)*.08;
    cameraX=Math.max(0,Math.min(WORLD_WIDTH-W,player.x-W*.34));
  }

  function updateWorld(dt) {
    movePlayer(dt);
    if(state!=="playing")return;

    lilies.forEach(l=>{
      if(l.taken)return;
      const dx=player.x+player.w/2-l.x,dy=player.y+player.h/2-l.y;
      if(Math.hypot(dx,dy)<30){
        l.taken=true;liliesCollected++;
        coinCount.textContent=String(liliesCollected).padStart(2,"0");
        showToast("Lírio coletado! 🌸");
      }
    });

    pets.forEach(p => {
    p.x += p.dir * p.speed * dt;

    if (p.x >= p.end) {
        p.x = p.end;
        p.dir = -1;
    } else if (p.x <= p.start) {
        p.x = p.start;
        p.dir = 1;
    }

    const box = {
        x: p.x + 3,
        y: p.y + 5,
        w: 42,
        h: 31
    };

    if (overlap(player, box)) die();
});

    progressLabel.textContent=Math.min(100,Math.floor(player.x/(6300-player.w)*100))+"%";
    if(player.x>6200){
      state="finished";
      finishScreen.classList.remove("hidden");
      document.getElementById("pauseButton").disabled=true;
    }
  }

  function loop(time=0) {
    if(state!=="playing")return;
    const dt=Math.min((time-lastTime)/16.667||1,2);
    lastTime=time;
    updateWorld(dt);
    draw();
    if(state==="playing")requestAnimationFrame(loop);
  }

  function startGame() {
    if(state==="playing")return;
    resetLevel();state="playing";
    startScreen.classList.add("hidden");
    pauseScreen.classList.add("hidden");
    finishScreen.classList.add("hidden");
    document.getElementById("pauseButton").disabled=false;
    lastTime=performance.now();requestAnimationFrame(loop);
  }

  function togglePause() {
    if(state==="playing"){
      state="paused";pauseScreen.classList.remove("hidden");
      Object.keys(keys).forEach(k=>keys[k]=false);
    } else if(state==="paused"){
      state="playing";pauseScreen.classList.add("hidden");
      lastTime=performance.now();requestAnimationFrame(loop);
    }
  }

  document.getElementById("startButton").addEventListener("click",startGame);
  document.getElementById("resumeButton").addEventListener("click",togglePause);
  document.getElementById("pauseButton").addEventListener("click",togglePause);
  document.getElementById("enterCastleButton").addEventListener("click",()=>{
    window.location.href="proposal/proposal.html";
  });

  
  const keyMap={
    ArrowLeft:"left",a:"left",A:"left",
    ArrowRight:"right",d:"right",D:"right",
    ArrowUp:"jump",w:"jump",W:"jump"," ":"jump",
    ArrowDown:"down",s:"down",S:"down"
  };
  document.addEventListener("keydown",e=>{
    if(keyMap[e.key]){e.preventDefault();keys[keyMap[e.key]]=true;}
    if(e.key==="Escape")togglePause();
  });
  document.addEventListener("keyup",e=>{
    if(keyMap[e.key]){e.preventDefault();keys[keyMap[e.key]]=false;}
  });
  window.addEventListener("blur",()=>{
    if(state==="playing")togglePause();
    Object.keys(keys).forEach(k=>keys[k]=false);
  });

  document.querySelectorAll("[data-control]").forEach(button=>{
    const control=button.dataset.control;
    const down=e=>{e.preventDefault();keys[control]=true;};
    const up=e=>{e.preventDefault();keys[control]=false;};
    button.addEventListener("pointerdown",down);
    ["pointerup","pointercancel","pointerleave","lostpointercapture"].forEach(name=>button.addEventListener(name,up));
  });

  draw();
})();