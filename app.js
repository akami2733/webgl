var vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    '',
    'void main() {',
    'gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
].join('\n')

var fragmentShaderText = [
    'precision mediump float;',
    '',
    'void main() {',
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
    '}'
].join('\n')

var InitDemo = function() {
    console.log('333')
    var canvas = document.getElementById('game_surface')
    var gl = canvas.getContext('webgl')
    if (!gl) {
        gl = canvas.getContext('experimental-webgl')
    }
    if (!gl) {
        alert('your browser does not support webgl')
    }

    gl.clearColor(1, 0, 0, 0.5)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    var vertexShader = gl.createShader(gl.VERTEX_SHADER)
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    
    gl.shaderSource(vertexShader, vertexShaderText)
    gl.shaderSource(fragmentShader, fragmentShaderText)

    gl.compileShader(vertexShader)
    gl.compileShader(fragmentShader)

    
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('error compiling vertex shader', gl.getShaderInfoLog(vertexShader))
        return
    }

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('error compiling fragment shader', gl.getShaderInfoLog(fragmentShader))
        return
    }

    var program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('error linking program', gl.getProgramInfoLog(program))
        return
    }

    gl.validateProgram(program)
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('error linking program', gl.getProgramInfoLog(program))
        return
    }

    var triangleVertices = [
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ]
    var triangleVertexBufferObject = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW)

    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition')
    gl.vertexAttribPointer(
        positionAttribLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0
    )

    gl.enableVertexAttribArray(positionAttribLocation)
    
    gl.useProgram(program)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
}
