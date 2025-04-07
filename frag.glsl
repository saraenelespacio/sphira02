precision highp float;

varying vec2 vTexCoord;
varying vec4 vVertexColor;
varying vec3 vNormal;

uniform vec3 color0;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;  // your 5 gradient colors
uniform float stops[5];   // e.g. [0.0, 0.25, 0.5, 0.75, 1.0]

void main() {
    // normalize the normal
    vec3 normal = normalize(vNormal);

    // pick a value to drive the gradient (here using Y-axis)
    float gradientPos = normal.y * 0.5 + 0.5; // map from [-1,1] to [0,1]

    // spherical like gradient
//    float gradientPos = (abs(vNormal.x) + abs(vNormal.y) + abs(vNormal.z)) / 3.0; // [0, 1]

    vec3 finalColor = color0;

    if (gradientPos <= stops[1]) {
        float t = (gradientPos - stops[0]) / (stops[1] - stops[0]);
        finalColor = mix(color0, color1, t);
    } else if (gradientPos <= stops[2]) {
        float t = (gradientPos - stops[1]) / (stops[2] - stops[1]);
        finalColor = mix(color1, color2, t);
    } else if (gradientPos <= stops[3]) {
        float t = (gradientPos - stops[2]) / (stops[3] - stops[2]);
        finalColor = mix(color2, color3, t);
    } else {
        float t = (gradientPos - stops[3]) / (stops[4] - stops[3]);
        finalColor = mix(color3, color4, t);
    }

    gl_FragColor = vec4(finalColor, 1.0);
}