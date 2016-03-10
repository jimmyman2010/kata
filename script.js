var c = document.getElementById('c');
var ctx = c.getContext('2d');
c.width = 640;
c.height = 360;
var holeHeight,
    holeWidth;

var bound = {
        left: null,
        top: null,
        bottom: null,
        right: null
    },
    x, y;

var img = new Image();

var faceImg = new Image();
faceImg.src = 'images/face.jpg';

faceImg.width = 40;
faceImg.height = 38;




img.onload = function() {
	ctx.clearRect(0, 0, c.width, c.height);   
	
	var c2 = document.createElement('canvas');
	var copy = c2.getContext('2d');
	c2.width = 640;
	c2.height = 360;
	
	copy.drawImage(img, 0, 0, c.width, c.height, 0, 0, c.width, c.height);

    var pixels = copy.getImageData(0, 0, c.width, c.height),
        l = pixels.data.length;

	bound = {
        left: null,
        top: null,
        bottom: null,
        right: null
    };
	
    for (i = 0; i < l; i += 4) {
        if (pixels.data[i + 3] === 0) {
            x = (i / 4) % c2.width;
            y = ~~ ((i / 4) / c2.width);

            if (bound.top === null) {
                bound.top = y;
            } else if (y < bound.top) {
                bound.top = y;
            }

            if (bound.left === null) {
                bound.left = x;
            } else if (x < bound.left) {
                bound.left = x;
            }

            if (bound.right === null) {
                bound.right = x;
            } else if (bound.right < x) {
                bound.right = x;
            }

            if (bound.bottom === null) {
                bound.bottom = y;
            } else if (bound.bottom < y) {
                bound.bottom = y;
            }
        }
    }

	console.log(bound);

    holeWidth = bound.right - bound.left;
    holeHeight = bound.bottom - bound.top;
	var ratio = holeWidth/holeHeight;

	ctx.drawImage(faceImg, 0, 0, 40, 38, bound.left - 2, bound.top - 2, holeWidth + 4, ~~((holeHeight+4)*ratio));
	ctx.drawImage(img, 0, 0, c.width, c.height);
	
	delete c2;
}


for(var i = 1; i <= 150; i++) {
	
	(function(i){
		setTimeout(function(){
			var fileName = i;
			
			if(i > 15) {
				fileName = (i % 15) + 1;
			}
			
			if(fileName < 10) {
				fileName = '0' + fileName;
			}
			
			img.src = 'images/' + fileName + '.png';
		}, i * 1000/5);
	})(i);
	
}



