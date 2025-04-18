const UNSPLASH_ACCESS_KEY = "M78uMh0mRnSwNANJWHfOwDBSAZ1Bl8Sr5cvGvg1XRvs";
let canvas;
let imageElement;

window.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const imageId = params.get("img");
  if (!imageId) return alert("No image ID provided");

  try {
    const response = await fetch(`https://api.unsplash.com/photos/${imageId}`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    const imageData = await response.json();
    imageElement = new Image();
    imageElement.src = imageData.urls.regular;
    imageElement.alt = imageData.alt_description || "Selected image";
    imageElement.crossOrigin = "anonymous";

    imageElement.onload = () => {
      initCanvas();
    };
  } catch (error) {
    console.error("Error fetching image:", error);
  }
});

function initCanvas() {
  canvas = new fabric.Canvas("imageCanvas", {
    backgroundColor: "white",
    preserveObjectStacking: true,
    width: 600,
    height: 400,
  });

  const img = new fabric.Image(imageElement, {
    left: 0,
    top: 0,
    scaleX: 0.5,
    scaleY: 0.5,
    selectable: true,
    hasBorders: true,
    hasControls: true,
    lockUniScaling: true,
  });

  canvas.add(img);
  canvas.setActiveObject(img);
  canvas.renderAll();
}

function getCurrentColor() {
  return document.getElementById("colorPicker").value;
}

document.getElementById("addTextBtn").addEventListener("click", () => {
  const text = new fabric.Textbox("Click to edit text", {
    left: 100,
    top: 100,
    fontSize: 30,
    fill: getCurrentColor(),
    editable: true,
  });
  canvas.add(text);
  canvas.setActiveObject(text);
});

document.getElementById("addCircleBtn").addEventListener("click", () => {
  const circle = new fabric.Circle({
    left: 100,
    top: 100,
    radius: 50,
    fill: getCurrentColor(),
    selectable: true,
  });
  canvas.add(circle);
});

document.getElementById("addRectBtn").addEventListener("click", () => {
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: getCurrentColor(),
    width: 100,
    height: 100,
    selectable: true,
  });
  canvas.add(rect);
});

document.getElementById("addTriangleBtn").addEventListener("click", () => {
  const triangle = new fabric.Triangle({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    fill: getCurrentColor(),
    selectable: true,
  });
  canvas.add(triangle);
});

document.getElementById("addPolygonBtn").addEventListener("click", () => {
  const polygon = new fabric.Polygon(
    [
      { x: 10, y: 10 },
      { x: 50, y: 10 },
      { x: 50, y: 50 },
      { x: 10, y: 50 },
    ],
    {
      left: 100,
      top: 100,
      fill: getCurrentColor(),
      selectable: true,
    }
  );
  canvas.add(polygon);
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  try {
    const dataURL = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas-image.png";
    link.click();
  } catch (error) {
    alert(
      "Unable to download the image. Make sure the canvas is properly loaded."
    );
  }
});
