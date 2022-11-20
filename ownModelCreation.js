var ownModelCreation = ( function() {

	function createVertexData() {
		var n = 50;
        var m = 2*n;
        R=10
        r=3;
        var du = (2*Math.PI)/n;
        var dv = (2*Math.PI)/m;

        // Positions.
        this.vertices = new Float32Array(3 * (n + 1) * (m + 1));
        var vertices = this.vertices;
        // Normals.
        this.normals = new Float32Array(3 * (n + 1) * (m + 1));
        var normals = this.normals;
        // Index data.
        this.indicesLines = new Uint16Array(2 * 2 * n * m);
        var indicesLines = this.indicesLines;
        this.indicesTris = new Uint16Array(3 * 2 * n * m);
        var indicesTris = this.indicesTris;

        // Counter for entries in index array.
        var iLines = 0;
        var iTris = 0;

        // Loop angle u.
        for (var i = 0, u = 0; i <= n; i++ , u += du) {
            // Loop height v.
            for (var j = 0, v = 0; j <= m; j++ , v += dv) {

                var iVertex = i * (m + 1) + j;

                var z = (R + r * Math.cos(v)) * Math.cos(u);
                var y = (r * Math.sin(v)) **2 -3;
                var x = Math.sqrt((R + r * Math.cos(v)) * Math.sin(u)) ;


                // Set vertex positions.
                vertices[iVertex * 3] = x *0.25;
                vertices[iVertex * 3 + 1] = y*0.25 -3 ;
                vertices[iVertex * 3 + 2] = z*0.25 ;

                // Calc and set normals.
                var nx = Math.cos(u) * Math.cos(v);
                var ny = Math.cos(u) * Math.sin(v);
                var nz = Math.sin(u);
                normals[iVertex * 3] = nx;
                normals[iVertex * 3 + 1] = ny;
                normals[iVertex * 3 + 2] = nz;

                // Set index.
                // Line on beam.
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - 1;
                    indicesLines[iLines++] = iVertex;
                }
                // Line on ring.
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - (m + 1);
                    indicesLines[iLines++] = iVertex;
                }

                // Set index.
                // Two Triangles.
                if (j > 0 && i > 0) {
                    indicesTris[iTris++] = iVertex;
                    indicesTris[iTris++] = iVertex - 1;
                    indicesTris[iTris++] = iVertex - (m + 1);

                    indicesTris[iTris++] = iVertex - 1;
                    indicesTris[iTris++] = iVertex - (m + 1) - 1;
                    indicesTris[iTris++] = iVertex - (m + 1);
                }
            }
        }
	}

	return {
		createVertexData : createVertexData
	}

}());
