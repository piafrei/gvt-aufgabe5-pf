var sphere = ( function() {

    function createVertexData() {
        var recursionLevel = document.getElementById('recursionLevel').value;
        var vertices = [];
        var normals = [];
        var indicesLines = [];
        var indicesTris = [];

        var t = (1.0 + Math.sqrt(5.0)) / 2.0;

        addVertex({x: -1, y: t, z: 0});
        addVertex({x: 1, y: t, z: 0});
        addVertex({x: -1, y: -t, z: 0});
        addVertex({x: 1, y: -t, z: 0});

        addVertex({x: 0, y: -1, z: t});
        addVertex({x: 0, y: 1, z: t});
        addVertex({x: 0, y: -1, z: -t});
        addVertex({x: 0, y: 1, z: -t});

        addVertex({x: t, y: 0, z: -1});
        addVertex({x: t, y: 0, z: 1});
        addVertex({x: -t, y: 0, z: -1});
        addVertex({x: -t, y: 0, z: 1});

        addIndicesTris(indicesTris, indicesLines, {v1: 0, v2: 11, v3: 5});
        addIndicesTris(indicesTris, indicesLines, {v1: 0, v2: 5, v3: 1});
        addIndicesTris(indicesTris, indicesLines, {v1: 0, v2: 1, v3: 7});
        addIndicesTris(indicesTris, indicesLines, {v1: 0, v2: 7, v3: 10});
        addIndicesTris(indicesTris, indicesLines, {v1: 0, v2: 10, v3: 11});

        addIndicesTris(indicesTris, indicesLines, {v1: 1, v2: 5, v3: 9});
        addIndicesTris(indicesTris, indicesLines, {v1: 5, v2: 11, v3: 4});
        addIndicesTris(indicesTris, indicesLines, {v1: 11, v2: 10, v3: 2});
        addIndicesTris(indicesTris, indicesLines, {v1: 10, v2: 7, v3: 6});
        addIndicesTris(indicesTris, indicesLines, {v1: 7, v2: 1, v3: 8});
        
        addIndicesTris(indicesTris, indicesLines, {v1: 3, v2: 9, v3: 4});
        addIndicesTris(indicesTris, indicesLines, {v1: 3, v2: 4, v3: 2});
        addIndicesTris(indicesTris, indicesLines, {v1: 3, v2: 2, v3: 6});
        addIndicesTris(indicesTris, indicesLines, {v1: 3, v2: 6, v3: 8});
        addIndicesTris(indicesTris, indicesLines, {v1: 3, v2: 8, v3: 9});
        
        addIndicesTris(indicesTris, indicesLines, {v1: 4, v2: 9, v3: 5});
        addIndicesTris(indicesTris, indicesLines, {v1: 2, v2: 4, v3: 11});
        addIndicesTris(indicesTris, indicesLines, {v1: 6, v2: 2, v3: 10});
        addIndicesTris(indicesTris, indicesLines, {v1: 8, v2: 6, v3: 7});
        addIndicesTris(indicesTris, indicesLines, {v1: 9, v2: 8, v3: 1});

        for (var i = 0; i < recursionLevel; i++) {
            var newTris = [];
            var newLines = [];

            for (var j = 0; j < indicesTris.length; j += 3) {
                var v1 = getMiddlePoint(indicesTris[j], indicesTris[j + 1]);
                var v2 = getMiddlePoint(indicesTris[j + 1], indicesTris[j + 2]);
                var v3 = getMiddlePoint(indicesTris[j + 2], indicesTris[j]);

                addIndicesTris(newTris, newLines, {v1: indicesTris[j], v2: v1, v3: v3});
                addIndicesTris(newTris, newLines, {v1: indicesTris[j + 1], v2: v2, v3: v1});
                addIndicesTris(newTris, newLines, {v1: indicesTris[j + 2], v2: v3, v3: v2});
                addIndicesTris(newTris, newLines, {v1: v1, v2: v2, v3: v3});
            }

            indicesTris = newTris;
            indicesLines = newLines;
        }

        this.vertices = Float32Array.from(vertices);
        this.normals = Float32Array.from(normals);
        this.indicesLines = Uint16Array.from(indicesLines);
        this.indicesTris = Uint16Array.from(indicesTris);

        function addVertex(vert) {
            var vertexLength = Math.sqrt(Math.pow(vert.x, 2) + Math.pow(vert.y, 2) + Math.pow(vert.z, 2));

            vertices.push(vert.x / vertexLength);
            vertices.push(vert.y / vertexLength);
            vertices.push(vert.z / vertexLength);

            normals.push(vert.x / vertexLength);
            normals.push(vert.y / vertexLength);
            normals.push(vert.z / vertexLength);
            
            return (vertices.length / 3) - 1;
        }

        function getMiddlePoint(p1, p2) {
            
            var midX = (vertices[3 * p1] + vertices[3 * p2]) / 2.0;
            var midY = (vertices[3 * p1 + 1] + vertices[3 * p2 + 1]) / 2.0;
            var midZ = (vertices[3 * p1 + 2] + vertices[3 * p2 + 2]) / 2.0;

            for (var i = 0; i < vertices.length; i += 3) {
                if ((vertices[i] === midX) && (vertices[i + 1] === midY) && (vertices[i + 2] === midZ)) {
                    return i / 3;
                }
            }

            return addVertex({x: midX, y: midY, z: midZ});
        }

        function addIndicesTris(triangle, lines, triangleVertices) {
            triangle.push(triangleVertices.v1);
            triangle.push(triangleVertices.v2);
            triangle.push(triangleVertices.v3);
            lines.push(triangleVertices.v1);
            lines.push(triangleVertices.v2);
            lines.push(triangleVertices.v2);
            lines.push(triangleVertices.v3);
            lines.push(triangleVertices.v3);
            lines.push(triangleVertices.v1);
        }
    }

    return {
        createVertexData : createVertexData
    }

}());
