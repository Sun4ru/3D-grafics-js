
class Vec4 {
    
    constructor(x,y,z,w, color="white"){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        this.color = color;
    }

    to3D(){ 
        this.x = this.x/this.w;
        this.y = this.y/this.w;
        this.z = this.z/this.w;
        this.w = this.w/this.w;
    }

    static get3DScalarProduct(vec1, vec2){
        let product = vec1.x*vec2.x + vec1.y*vec2.y + vec1.z*vec2.z;
        return product;  
    }

    draw_Point(){
        let p = matxVec(mat4x4, this);
        p.to3D();
        drawPoint(p.x*1000 + 500, p.y*800 + 400, this.color);
    }

    getLength(){
        return Math.sqrt(this.x**2 + this.y**2 + this.z**2);
    }

    normalizedVec(){
        let length = this.getLength();
        return new Vec4(this.x/length, this.y/length, this.z/length, 1); 
    }
}

class Triangle {

    constructor(p1,p2,p3){
        this.p1 = p1; //A
        this.p2 = p2; //B
        this.p3 = p3; //C
    }

    getNormal(){
        let v1 = new Vec4(this.p1.x - this.p2.x, this.p1.y - this.p2.y, this.p1.z - this.p2.z, 1);
        let v2 = new Vec4(this.p1.x - this.p3.x, this.p1.y - this.p3.y, this.p1.z - this.p3.z, 1);

        let x = v1.y*v2.z - v1.z*v2.y;
        let y = v1.z*v2.x - v1.x*v2.z;
        let z = v1.x*v2.y - v1.y*v2.x;

        return new Vec4(x,y,z, 1);
    }

    drawTriangle(){

            this.tp1 = matxVec(mat4x4, this.p1);
            this.tp2 = matxVec(mat4x4, this.p2);
            this.tp3 = matxVec(mat4x4, this.p3);

            this.tp1.to3D();
            this.tp2.to3D();
            this.tp3.to3D();
        
        if (Vec4.get3DScalarProduct(this.getNormal(), this.tp1) > 0){

            this.tp1.x = (this.tp1.x*1000 + 500);
            this.tp2.x = (this.tp2.x*1000 + 500);
            this.tp3.x = (this.tp3.x*1000 + 500);

            this.tp1.y = this.tp1.y*800 + 400;
            this.tp2.y = this.tp2.y*800 + 400;
            this.tp3.y = this.tp3.y*800 + 400;

            line(this.tp1.x, this.tp1.y, this.tp2.x, this.tp2.y);
            line(this.tp1.x, this.tp1.y, this.tp3.x, this.tp3.y);
            line(this.tp2.x, this.tp2.y, this.tp3.x, this.tp3.y);
        }
    }

    fillTriangle(){

        this.tp1 = matxVec(mat4x4, this.p1);
        this.tp2 = matxVec(mat4x4, this.p2);
        this.tp3 = matxVec(mat4x4, this.p3);
        
        if (Vec4.get3DScalarProduct(this.getNormal(), this.tp1) > 0){
            this.tp1.to3D();
            this.tp2.to3D();
            this.tp3.to3D();

            let tx = this.topX();
            let ty = this.topY();
            let lx = this.lowX();
            let ly = this.lowY();

            //creating a box around the triangle and going over every pixel within the box
            for (let row = lx; row < tx; row++){
            for (let col = ly; col < ty; col++){

                //Checking if the pixel is within the triangle ABC
                let Ax = this.tp1.x*1000+500;
                let Ay = this.tp1.y*800+400;
                let Bx = this.tp2.x*1000+500;
                let By = this.tp2.y*800+400;
                let Cx = this.tp3.x*1000+500;
                let Cy = this.tp3.y*800+400;


                if (Cy != Ay){
                    var w1 = Ax*(Cy-Ay) + (col-Ay)*(Cx-Ax) - row*(Cy-Ay);
                    w1 = w1/((By-Ay)*(Cx-Ax) - (Bx-Ax)*(Cy-Ay));

                    var w2 = col - Ay - w1*(By-Ay);
                    w2 = w2/(Cy-Ay);
                    //console.log("Cy != Ay --> ", w1, w2)
                }

                else if (By != Ay){
                    var w1 = Ax*(Cy-Ay) + (col-Ay)*(Cx-Ax) - row*(Cy-Ay);
                    w1 = w1/((By-Ay)*(Cx-Ax) - (Bx-Ax)*(Cy-Ay));

                    var w2 = col - Ay - w1*(By-Ay);
                    w2 = w2/(Cy-Ay);
                    //console.log("Cy == Ay --> ", w1, w2)
                }

                if (w1 >= 0 && w2 >= 0 && (w1 + w2) <= 1){
                    drawPixel(row, col, 1, this.getColor(255,255,255));
                    //console.log(row, col)
                    //console.log("Pixel Drawn")
                }
            }
            }
        }
    }

    topX(){

        if (this.tp1.x >= this.tp2.x && this.tp1.x >= this.tp3.x){
            return this.tp1.x*1000+500;
        }
        else if (this.tp2.x >= this.tp3.x){
            return this.tp2.x*1000+500;
        }
        return this.tp3.x*1000+500;
    }

    lowX(){

        if (this.tp1.x <= this.tp2.x && this.tp1.x <= this.tp3.x){
            return this.tp1.x*1000+500;
        }
        else if (this.tp2.x <= this.tp3.x){
            return this.tp2.x*1000+500;
        }
        return this.tp3.x*1000+500;
    }

    topY(){

        if (this.tp1.y >= this.tp2.y && this.tp1.y >= this.tp3.y){
            return this.tp1.y*800+400;
        }
        else if (this.tp2.y >= this.tp3.y){
            return this.tp2.y*800+400;
        }
        return this.tp3.y*800+400;
    }

    lowY(){

        if (this.tp1.y <= this.tp2.y && this.tp1.y <= this.tp3.y){
            return this.tp1.y*800+400;
        }
        else if (this.tp2.y <= this.tp3.y){
            return this.tp2.y*800+400;
        }
        return this.tp3.y*800+400;
    }

    getColor(r,g,b){
        let dark = 255-(r+g+b)/3;
        let shade = dark * Vec4.get3DScalarProduct(this.getNormal().normalizedVec(), ligthRay)// (this.p1.getLength() * this.getNormal().getLength()));

        let nr = r - shade;
        let ng = g - shade;
        let nb = b - shade;
        //console.log(this.p1.getLength())

        return "rgb(" + nr.toString() + "," +  ng.toString() + "," + nb.toString() + ")"; 
    }
}