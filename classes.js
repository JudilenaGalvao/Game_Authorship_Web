class Sprite{
    constructor({posicion, image}){
        this.posicion = posicion
        this.image = image
    }
    draw(){
        c.drawImage(this.image, this.posicion.x, this.posicion.y)
    }
}

class Boundary{
    static width = 16*4
    static height = 16*4
    constructor({posicion}){
        this.posicion = posicion
        this.width = 16*4
        this.height = 16*4
    }
    draw(){
        c.fillStyle = 'rgba(255,255,255,0)'
        c.fillRect(this.posicion.x, 
        this.posicion.y, 
        this.width, 
        this.height)
    }
}

class Npc{
    constructor({posicion, image}){
        this.posicion = posicion
        this.image = image
    }

    draw(){
        c.drawImage(this.image, this.posicion.x, this.posicion.y)
    }
}

class Jogador{
    constructor({posicion, velocity, image, frames = {max:1}}){
        this.posicion = posicion
        this.image = image
        this.frames = {...frames, val:0,elapsed:0}

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }

        this.moving = false
    }

    draw(){
        c.drawImage(this.image, 
            this.frames.val * this.width, //inicio do corte x
            0, //inicio do corte y
            this.image.width/this.frames.max, //onde será cortado x
            this.image.height, //onde será cortado y
            this.posicion.x,
            this.posicion.y,
            this.image.width/this.frames.max,
            this.image.height)
        
        if(!this.moving) return    
        if(this.frames.max>1){
            this.frames.elapsed++
        }

        if(this.frames.elapsed % 10 ===0){
            if(this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }

}