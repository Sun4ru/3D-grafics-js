class Cube {

    constructor(centerPoint, radius, div){

        this.centerPoint = centerPoint;
        this.radius = radius;   //radius is the distance between the centerPoint and a vertex
        this.div = div

        //VERTICES
        //FRONT
        let p1 = new Vec4(this.centerPoint.x - radius, this.centerPoint.y - radius, this.centerPoint.z - radius, 1);
        let p2 = new Vec4(this.centerPoint.x - radius, this.centerPoint.y + radius, this.centerPoint.z - radius, 1);
        let p3 = new Vec4(this.centerPoint.x + radius, this.centerPoint.y - radius, this.centerPoint.z - radius, 1);
        let p4 = new Vec4(this.centerPoint.x + radius, this.centerPoint.y + radius, this.centerPoint.z - radius, 1);

        //BACK
        let p5 = new Vec4(this.centerPoint.x - radius, this.centerPoint.y - radius, this.centerPoint.z + radius, 1);
        let p6 = new Vec4(this.centerPoint.x - radius, this.centerPoint.y + radius, this.centerPoint.z + radius, 1);
        let p7 = new Vec4(this.centerPoint.x + radius, this.centerPoint.y - radius, this.centerPoint.z + radius, 1);
        let p8 = new Vec4(this.centerPoint.x + radius, this.centerPoint.y + radius, this.centerPoint.z + radius, 1);

        this.vertices = [p1,p2,p3,p4,p5,p6,p7,p8];
        this.points = [];
        
        //POINTS
        //FRONT (P1,P2,P3,P4);
        this.FrontPoints = [];
        this.FrontTris = [];
        let v12 = new Vec4(p2.x-p1.x, p2.y-p1.y, p2.z-p1.z, 1);
        let v13 = new Vec4(p3.x-p1.x, p3.y-p1.y, p3.z-p1.z, 1);
        for (let i=0; i < div+2; i++){
        for (let j=0; j < div+2; j++){
            let t12 = i/(div+1);
            let t13 = j/(div+1);  
            let point = new Vec4(v12.x*t12 + v13.x*t13 + p1.x, v12.y*t12 + v13.y*t13 + p1.y, v12.z*t12 + v13.z*t13 + p1.z, 1);
            let center_to_point = new Vec4(point.x-center.x, point.y-center.y, point.z-center.z, 1);
            let normalized_vec = center_to_point.normalizedVec();
            this.FrontPoints.push(new Vec4(normalized_vec.x+center.x, normalized_vec.y+center.y, normalized_vec.z+center.z, 1));
            //this.FrontPoints.push(point)
        }
        }

        //goes through every point to form triangles
        //every point is linked to 2 triangles
        for (let i = 0; i < div+1; i++){
        for (let j = 0; j < div+1; j++){
            let tri1 = new Triangle(this.FrontPoints[j*(div+2) + i], this.FrontPoints[j*(div+2) + i + 1], this.FrontPoints[(j+1)*(div+2) + i + 1] )
            let tri2 = new Triangle(this.FrontPoints[j*(div+2) + i], this.FrontPoints[(j+1)*(div+2) + i + 1], this.FrontPoints[(j+1)*(div+2) + i]);
            this.FrontTris.push(tri1,tri2);
        }
        }

        //LEFT (P1,P2,P5,P6)
        this.LEFTPoints = [];
        this.LEFTTris = [];
        let v51 = new Vec4(p1.x-p5.x, p1.y-p5.y, p1.z-p5.z, 1);
        let v56 = new Vec4(p6.x-p5.x, p6.y-p5.y, p6.z-p5.z, 1);
        for (let i=0; i < div+2; i++){
        for (let j=0; j < div+2; j++){
            let t56 = i/(div+1);
            let t51 = j/(div+1);  
            let point = new Vec4(v51.x*t51 + v56.x*t56 + p5.x, v51.y*t51 + v56.y*t56 + p5.y, v51.z*t51 + v56.z*t56 + p5.z, 1);
            let center_to_point = new Vec4(point.x-center.x, point.y-center.y, point.z-center.z, 1);
            let normalized_vec = center_to_point.normalizedVec();
            this.LEFTPoints.push(new Vec4(normalized_vec.x+center.x, normalized_vec.y+center.y, normalized_vec.z+center.z, 1));
            //this.LEFTPoints.push(point);
        }
        }

        for (let i = 0; i < div+1; i++){
        for (let j = 0; j < div+1; j++){
            let tri1 = new Triangle(this.LEFTPoints[j*(div+2) + i], this.LEFTPoints[j*(div+2) + i + 1], this.LEFTPoints[(j+1)*(div+2) + i + 1] )
            let tri2 = new Triangle(this.LEFTPoints[j*(div+2) + i], this.LEFTPoints[(j+1)*(div+2) + i + 1], this.LEFTPoints[(j+1)*(div+2) + i]);
            this.LEFTTris.push(tri1,tri2);
        }
        }

        //BACK (P5,P6,P7,P8)
        this.BACKPoints = [];
        this.BACKTris = [];
        let v78 = new Vec4(p8.x-p7.x, p8.y-p7.y, p8.z-p7.z, 1);
        let v75 = new Vec4(p5.x-p7.x, p5.y-p7.y, p5.z-p7.z, 1);
        for (let i=0; i < div+2; i++){
        for (let j=0; j < div+2; j++){
            let t78 = i/(div+1);
            let t75 = j/(div+1);  
            let point = new Vec4(v78.x*t78 + v75.x*t75 + p7.x, v78.y*t78 + v75.y*t75 + p7.y, v78.z*t78 + v75.z*t75 + p7.z, 1);
            let center_to_point = new Vec4(point.x-center.x, point.y-center.y, point.z-center.z, 1);
            let normalized_vec = center_to_point.normalizedVec();
            this.BACKPoints.push(new Vec4(normalized_vec.x+center.x, normalized_vec.y+center.y, normalized_vec.z+center.z, 1));
            //this.BACKPoints.push(point);
        }
        }

        for (let i = 0; i < div+1; i++){
        for (let j = 0; j < div+1; j++){
            let tri1 = new Triangle(this.BACKPoints[j*(div+2) + i], this.BACKPoints[j*(div+2) + i + 1], this.BACKPoints[(j+1)*(div+2) + i + 1] )
            let tri2 = new Triangle(this.BACKPoints[j*(div+2) + i], this.BACKPoints[(j+1)*(div+2) + i + 1], this.BACKPoints[(j+1)*(div+2) + i]);
            this.BACKTris.push(tri1,tri2);
        }
        }

        //RIGHT (P3,P4,P7,P8)
        this.RIGHTPoints = [];
        this.RIGHTTris = [];
        let v34 = new Vec4(p4.x-p3.x, p4.y-p3.y, p4.z-p3.z, 1);
        let v37 = new Vec4(p7.x-p3.x, p7.y-p3.y, p7.z-p3.z, 1);
        for (let i=0; i < div+2; i++){
        for (let j=0; j < div+2; j++){
            let t34 = i/(div+1);
            let t37 = j/(div+1);  
            let point = new Vec4(v34.x*t34 + v37.x*t37 + p3.x, v34.y*t34 + v37.y*t37 + p3.y, v34.z*t34 + v37.z*t37 + p3.z, 1);
            let center_to_point = new Vec4(point.x-center.x, point.y-center.y, point.z-center.z, 1);
            let normalized_vec = center_to_point.normalizedVec();
            this.RIGHTPoints.push(new Vec4(normalized_vec.x+center.x, normalized_vec.y+center.y, normalized_vec.z+center.z, 1));
            //this.RIGHTPoints.push(point);
        }
        }

        for (let i = 0; i < div+1; i++){
        for (let j = 0; j < div+1; j++){
            let tri1 = new Triangle(this.RIGHTPoints[j*(div+2) + i], this.RIGHTPoints[j*(div+2) + i + 1], this.RIGHTPoints[(j+1)*(div+2) + i + 1] )
            let tri2 = new Triangle(this.RIGHTPoints[j*(div+2) + i], this.RIGHTPoints[(j+1)*(div+2) + i + 1], this.RIGHTPoints[(j+1)*(div+2) + i]);
            this.RIGHTTris.push(tri1,tri2);
        }
        }

        //TOP (P1,P3,P5,P7)
        this.TOPPoints = [];
        this.TOPTris = [];
        //let v51 = new Vec4(p1.x-p5.x, p1.y-p5.y, p1.z-p5.z, 1); --> already exists
        let v57 = new Vec4(p7.x-p5.x, p7.y-p5.y, p7.z-p5.z, 1);
        for (let i=0; i < div+2; i++){
        for (let j=0; j < div+2; j++){
            let t51 = i/(div+1);
            let t57 = j/(div+1);  
            let point = new Vec4(v51.x*t51 + v57.x*t57 + p5.x, v51.y*t51 + v57.y*t57 + p5.y, v51.z*t51 + v57.z*t57 + p5.z, 1);
            let center_to_point = new Vec4(point.x-center.x, point.y-center.y, point.z-center.z, 1);
            let normalized_vec = center_to_point.normalizedVec();
            this.TOPPoints.push(new Vec4(normalized_vec.x+center.x, normalized_vec.y+center.y, normalized_vec.z+center.z, 1));
            //this.TOPPoints.push(point);
        }
        }

        for (let i = 0; i < div+1; i++){
        for (let j = 0; j < div+1; j++){
            let tri1 = new Triangle(this.TOPPoints[j*(div+2) + i], this.TOPPoints[j*(div+2) + i + 1], this.TOPPoints[(j+1)*(div+2) + i + 1] )
            let tri2 = new Triangle(this.TOPPoints[j*(div+2) + i], this.TOPPoints[(j+1)*(div+2) + i + 1], this.TOPPoints[(j+1)*(div+2) + i]);
            this.TOPTris.push(tri1,tri2);
        }
        }

        //BOTTOM (P2,P4,P6,P8)
        this.BOTTOMPoints = [];
        this.BOTTOMTris = [];
        let v26 = new Vec4(p6.x-p2.x, p6.y-p2.y, p6.z-p2.z, 1);
        let v24 = new Vec4(p4.x-p2.x, p4.y-p2.y, p4.z-p2.z, 1);
        for (let i=0; i < div+2; i++){
        for (let j=0; j < div+2; j++){
            let t26 = i/(div+1);
            let t24 = j/(div+1);  
            let point = new Vec4(v26.x*t26 + v24.x*t24 + p2.x, v26.y*t26 + v24.y*t24 + p2.y, v26.z*t26 + v24.z*t24 + p2.z, 1);
            let center_to_point = new Vec4(point.x-center.x, point.y-center.y, point.z-center.z, 1);
            let normalized_vec = center_to_point.normalizedVec();
            this.BOTTOMPoints.push(new Vec4(normalized_vec.x+center.x, normalized_vec.y+center.y, normalized_vec.z+center.z, 1));
            //this.BOTTOMPoints.push(point);
        }
        }

        for (let i = 0; i < div+1; i++){
        for (let j = 0; j < div+1; j++){
            let tri1 = new Triangle(this.BOTTOMPoints[j*(div+2) + i], this.BOTTOMPoints[j*(div+2) + i + 1], this.BOTTOMPoints[(j+1)*(div+2) + i + 1] )
            let tri2 = new Triangle(this.BOTTOMPoints[j*(div+2) + i], this.BOTTOMPoints[(j+1)*(div+2) + i + 1], this.BOTTOMPoints[(j+1)*(div+2) + i]);
            this.BOTTOMTris.push(tri1,tri2);
        }
        }
    }
    
    show(){
        for (let tri=0; tri < 2*(this.div+1)**2; tri++){
            
            this.FrontTris[tri].drawTriangle();
            this.LEFTTris[tri].drawTriangle();
            this.BACKTris[tri].drawTriangle();
            this.RIGHTTris[tri].drawTriangle();
            this.TOPTris[tri].drawTriangle();
            this.BOTTOMTris[tri].drawTriangle();
        }
    }
}