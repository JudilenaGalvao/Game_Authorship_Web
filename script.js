const canvas = document.getElementById("canvas")
const c = canvas.getContext('2d')
//canvas.width = 1050
//canvas.height = 600
canvas.width = 1210
canvas.height = 559

let speed = 3

const collisionsMap = []

for(let i = 0; i<collisions.length;i+=48){
   collisionsMap.push(collisions.slice(i,48+i))
}

const boundaries = []
const offset = {
    x: -1600,
    y: -2000
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1161){
            boundaries.push(
                new Boundary({
                    posicion: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
        
    })
})

//Mapa
const image = new Image()
image.src = 'img/mapa/mapa.png'
//Declaração das imagens
const playerDown = new Image()
const playerUp = new Image()
const playerLeft = new Image()
const playerRight = new Image()
const foregroundImage = new Image()
const ale = new Image()
const taniro = new Image()
const rose = new Image()
const falataniro = new Image()
const falataniro2 = new Image()
const falataniro3 = new Image()
const falaalessandra = new Image()
const falaalessandra2 = new Image()
const falaalessandra3 = new Image()
const falaalessandra4 = new Image()
const falaalessandra5 = new Image()
const falaalessandra6 = new Image()
const falaalessandra7 = new Image()
const falaalessandra8 = new Image()
const falaalessandra9 = new Image()
const falaalessandra10 = new Image()
const falarose1 = new Image()
const falarose2 = new Image()
//Falas com Taniro 
falataniro.src = 'img/taniro/taniroFala1.png'
falataniro2.src = 'img/taniro/taniroFala2.png'
falataniro3.src = 'img/taniro/taniroFala3.png'
//Falas com Rose
falarose1.src = 'img/rose/rose1.png'
falarose2.src = 'img/rose/rose2.png'
//Falas com Alessandra
falaalessandra.src = 'img/alessandra/fala1.png'
falaalessandra2.src = 'img/alessandra/fala2.png'
falaalessandra3.src = 'img/alessandra/fala3.png'
falaalessandra4.src = 'img/alessandra/fala4.png'
falaalessandra5.src = 'img/alessandra/fala5.png'
falaalessandra6.src = 'img/alessandra/fala6.png'
falaalessandra7.src = 'img/alessandra/fala7.png'
falaalessandra8.src = 'img/alessandra/fala8.png'
falaalessandra9.src = 'img/alessandra/fala9.png'
falaalessandra10.src = 'img/alessandra/fala10.png'
//Imagens personagens
rose.src = 'img/rose/rose.png'
taniro.src = 'img/taniro/taniro.png'
ale.src = 'img/alessandra/alessandra.png'
//Imagens movimento personagem
playerDown.src = 'img/zaniah/zaniahDown.png'
playerUp.src = 'img/zaniah/zaniahUp.png'
playerLeft.src = 'img/zaniah/zaniahLeft.png'
playerRight.src = 'img/zaniah/zaniahRight.png'
//Imagem mapa passagem
foregroundImage.src = 'img/mapa/mapaPassagem.png'

const keys = {
    w: {
        prossed: false
    },
    a: {
        prossed: false
    },
    s: {
        prossed: false
    },
    d: {
        prossed: false
    },
    q: {
        prossed: false
    }
}

let background = new Sprite({
        posicion: {
            x: offset.x,
            y: offset.y
        },
        image: image

})

let foreground = new Sprite({
    posicion: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage

})

let Alessandra = new Npc({
    posicion: {
        x: 500 ,
        y: -550 
    },
    image: ale
})

let Taniro = new Npc({
    posicion: {
        x: -350 ,
        y: 150
    },
    image: taniro
})

let Rose = new Npc({
    posicion: {
        x: -560 ,
        y: -1450 
    },
    image: rose
})

let player = new Jogador({
    posicion: {
        x: (canvas.width/2) - (184 / 4) / 2,
        y: (canvas.height/2) - (93 / 4) / 2
    },
    image: playerDown,
    frames: {
        max:4
    }
})

let taniroD = new Boundary({
    posicion: {
        x: -360 ,
        y: 200
    },
})

let alessandraD = new Boundary({
    posicion: {
        x: 500 ,
        y: -500
    },
})

let roseD = new Boundary({
    posicion: {
        x: -570,
        y: -1400
    },
})

const movables = [background, ...boundaries, foreground, Alessandra, Taniro, Rose, taniroD, alessandraD, roseD]

function retanguloColisao({retangulo1, retangulo2}){
    return(
        retangulo1.posicion.x + retangulo1.width >= retangulo2.posicion.x &&
        retangulo1.posicion.x <= retangulo2.posicion.x + retangulo2.width &&
        retangulo1.posicion.y <= retangulo2.posicion.y + retangulo2.height &&
        retangulo1.posicion.y + retangulo1.height >= retangulo2.posicion.y
    )
}
let cont1 = 0
let cont2 = 0
let cont3 = 0
let bool = false
function animate(){
    window.requestAnimationFrame(animate)

    background.draw()
    taniroD.draw()
    alessandraD.draw()
    roseD.draw()
    Alessandra.draw()
    Taniro.draw()
    Rose.draw()
    player.draw()
    foreground.draw()
   
    boundaries.forEach(boundary =>{
        boundary.draw()
        
    })

    let moving = true
    player.moving = false

    if(keys.w.prossed){
       player.moving = true
       player.image = playerUp
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(
                retanguloColisao({
                    retangulo1: player,
                    retangulo2: {
                        ...boundary,
                        posicion: {
                            x: boundary.posicion.x,
                            y: boundary.posicion.y + speed
                        }
                    }
                })
            ){
            console.log('colidindo')
            moving = false
            break
            }
        }
        if(moving)
        movables.forEach((movables)=>{
            movables.posicion.y += speed
        })   

    }else if(keys.a.prossed){
        player.moving = true
        player.image = playerLeft
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(
                retanguloColisao({
                    retangulo1: player,
                    retangulo2: {
                        ...boundary,
                        posicion: {
                            x: boundary.posicion.x + speed,
                            y: boundary.posicion.y 
                        }
                    }
                })
            ){
            console.log('colidindo')
            moving = false
            break
            }
        }
        if(moving)
        movables.forEach((movables)=>{
            movables.posicion.x += speed
        })

    }else if(keys.s.prossed){
        player.moving = true
        player.image = playerDown
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(
                retanguloColisao({
                    retangulo1: player,
                    retangulo2: {
                        ...boundary,
                        posicion: {
                            x: boundary.posicion.x,
                            y: boundary.posicion.y - speed
                        }
                    }
                })
            ){
            moving = false
            break
            }
        }
        if(moving)
        movables.forEach((movables)=>{
            movables.posicion.y -= speed
        })

    }else if(keys.d.prossed){
        player.moving = true
        player.image = playerRight
        for(let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i]
            if(
                retanguloColisao({
                    retangulo1: player,
                    retangulo2: {
                        ...boundary,
                        posicion: {
                            x: boundary.posicion.x - speed,
                            y: boundary.posicion.y 
                        }
                    }
                })
                ){
                console.log('colidindo')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach((movables)=>{
            movables.posicion.x -= speed
        })
      
    }

    if(keys.q.prossed){
        if(
            player.posicion.x + player.width >= taniroD.posicion.x &&
            player.posicion.x <= taniroD.posicion.x + taniroD.width &&
            player.posicion.y <= taniroD.posicion.y + taniroD.height &&
            player.posicion.y + player.height >= taniroD.posicion.y
        ){
            if(cont1===0){
                c.drawImage(falataniro, 10, -100, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)  
            }else if(cont1===1){
                c.drawImage(falataniro2, 10, -100, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)  
            }else if(cont1 === 2){
                c.drawImage(falataniro3, 130, 0, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)
                bool = true  
            }
        }
       
        if(
            player.posicion.x + player.width >= roseD.posicion.x &&
            player.posicion.x <= roseD.posicion.x + roseD.width &&
            player.posicion.y <= roseD.posicion.y + roseD.height &&
            player.posicion.y + player.height >= roseD.posicion.y
        ){
            if(cont3===0){
                c.drawImage(falarose1, 10, -100, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)   
            }
        }

        if(
            player.posicion.x + player.width >= alessandraD.posicion.x &&
            player.posicion.x <= alessandraD.posicion.x + alessandraD.width &&
            player.posicion.y <= alessandraD.posicion.y + alessandraD.height &&
            player.posicion.y + player.height >= alessandraD.posicion.y
        ){
            if(cont2===0){
                c.drawImage(falaalessandra, 100, 0, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)    
            }else if(cont2===1){
                c.drawImage(falaalessandra2, 10, -100, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)
            }else if(cont2 === 2){
                c.drawImage(falaalessandra3, 130, 0, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)
            }else if(cont2 === 3){
                c.drawImage(falaalessandra4, 0, -120, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)
            }else if(cont2 === 4){
                c.drawImage(falaalessandra5, 130, 0, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)
            }else if(cont2 === 5){
                c.drawImage(falaalessandra6, 0, -120, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)
            }
            else if(cont2 === 6){
                c.drawImage(falaalessandra7, 130, 0, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)
            }
            else if(cont2 === 7){
                c.drawImage(falaalessandra8, 0, -120, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)
            }else if(cont2 === 8){
                c.drawImage(falaalessandra9, 130, 0, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)
            }
            else if(cont2 === 9){
                c.drawImage(falaalessandra10, 130, 0, canvas.width/2, canvas.height/2, 0, 0, canvas.width, canvas.height)
            }
        }
    }
}

animate()

window.addEventListener('keydown', (e) =>{
    switch(e.key){
        case 'w':
            keys.w.prossed = true
        break;
        case 'a':
            keys.a.prossed = true    
        break;
        case 's':
            keys.s.prossed = true    
        break;
        case 'd':
            keys.d.prossed = true    
        break;
        case 'q':
            keys.q.prossed = true
        break;
        case 'r':
            keys.r.prossed = true
        break;
    }
})

window.addEventListener('keyup', (e) =>{
    switch(e.key){
    case 'w':
        keys.w.prossed = false
    break;
    case 'a':
        keys.a.prossed = false    
    break;
    case 's':
        keys.s.prossed = false    
    break;
    case 'd':
        keys.d.prossed = false    
    break;
    case 'q':
        keys.q.prossed = false
        if(cont1<3)
            cont1++
        else if(cont3<1)
            cont3++
        else if(cont2<10)
            cont2++   
    break;
    case 'r':
        keys.r.prossed = false
    break;
    }
})