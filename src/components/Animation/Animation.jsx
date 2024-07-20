import React, { useEffect } from "react";
import styles from "./Animation.module.css";
import { gsap } from "gsap";

export default function Animation() {
  useEffect(() => {
    let width, height, largeHeader, canvas, ctx, points, target;
    let animateHeader = true;

    const initHeader = () => {
      width = window.innerWidth;
      height = window.innerHeight / 1.5;
      target = { x: width / 2, y: height / 2 };

      // largeHeader = document.getElementById("large-header");
      // largeHeader.style.height = `${height}px`;

      canvas = document.getElementById("demo-canvas");
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext("2d");

      // create points
      points = [];
      for (let x = 0; x < width; x += width / 20) {
        for (let y = 0; y < height; y += height / 20) {
          let px = x + (Math.random() * width) / 20;
          let py = y + (Math.random() * height) / 20;
          let p = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      // for each point find the 5 closest points
      points.forEach((p1) => {
        let closest = [];
        points.forEach((p2) => {
          if (p1 !== p2) {
            if (closest.length < 5) {
              closest.push(p2);
            } else {
              closest = closest.sort(
                (a, b) => getDistance(p1, a) - getDistance(p1, b)
              );
              if (getDistance(p1, p2) < getDistance(p1, closest[4])) {
                closest[4] = p2;
              }
            }
          }
        });
        p1.closest = closest;
      });

      // assign a circle to each point
      points.forEach((p) => {
        p.circle = new Circle(
          p,
          2 + Math.random() * 2,
          "rgba(255,255,255,0.3)"
        );
      });
    };

    const addListeners = () => {
      if (!("ontouchstart" in window)) {
        window.addEventListener("mousemove", mouseMove);
      }
      window.addEventListener("scroll", scrollCheck);
      window.addEventListener("resize", resize);
    };

    const mouseMove = (e) => {
      target.x =
        e.pageX ||
        e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
      target.y =
        e.pageY ||
        e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
    };

    const scrollCheck = () => {
      animateHeader = document.body.scrollTop <= height;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      largeHeader.style.height = `${height}px`;
      canvas.width = width;
      canvas.height = height;
    };

    const initAnimation = () => {
      animate();
      points.forEach(shiftPoint);
    };

    const animate = () => {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        points.forEach((p) => {
          const distance = getDistance(target, p);
          p.active =
            distance < 4000
              ? 0.3
              : distance < 20000
              ? 0.1
              : distance < 40000
              ? 0.02
              : 0;
          p.circle.active =
            distance < 4000
              ? 0.6
              : distance < 20000
              ? 0.3
              : distance < 40000
              ? 0.1
              : 0;
          drawLines(p);
          p.circle.draw();
        });
      }
      requestAnimationFrame(animate);
    };

    const shiftPoint = (p) => {
      gsap.to(p, {
        duration: 1 + Math.random(),
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: "circ.inOut",
        onComplete: () => shiftPoint(p),
      });
    };

    const drawLines = (p) => {
      if (!p.active) return;
      p.closest.forEach((close) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(close.x, close.y);
        ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
        ctx.stroke();
      });
    };

    class Circle {
      constructor(pos, rad, color) {
        this.pos = pos;
        this.radius = rad;
        this.color = color;
        this.active = 0;
      }

      draw() {
        if (!this.active) return;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(156,217,249,${this.active})`;
        ctx.fill();
      }
    }

    const getDistance = (p1, p2) =>
      Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);

    initHeader();
    initAnimation();
    addListeners();

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("scroll", scrollCheck);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div id="large-header" className={styles.header}>
      <canvas id="demo-canvas"></canvas>
    </div>
  );
}
