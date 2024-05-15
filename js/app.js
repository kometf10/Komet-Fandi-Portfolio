
CursorTrailJSInterop = (() => {
    return {
        Init() {
            const svg = document.querySelector("svg.trail")
            const path = svg.querySelector("path");

            let points = [];
            let segments = 50;
            let mouse = {
                x: 0,
                y: 0
            }

            const move = (event) => {
                const x = event.clientX;
                const y = event.clientY;

                mouse.x = x;
                mouse.y = y;

                if (points.length === 0) {
                    for (let i = 0; i < segments; i++) {
                        points.push({
                            x: x,
                            y: y
                        });
                    }
                }

            }

            const animate = () => {

                let px = mouse.x + 20;
                let py = mouse.y + 5;

                points.forEach((point, index) => {
                    point.x = px;
                    point.y = py;

                    let next = points[index + 1];
                    if (next) {
                        px = px - (point.x - next.x) * 0.5;
                        py = py - (point.y - next.y) * 0.5;
                    }
                })

                var pathStr = `M ${points.map(p => `${p.x} ${p.y}`).join(" L ")}`;
                path.setAttribute("d", pathStr);

                requestAnimationFrame(animate);
            }

            const resize = () => {
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;

                svg.style.width = windowWidth + "px";
                svg.style.height = windowHeight + "px";
                svg.setAttribute("viewBox", `0 0 ${windowWidth} ${windowHeight}`);
            }

            document.addEventListener("mousemove", move);
            window.addEventListener("resize", resize);
            animate();
            resize();


        }
    }
})();