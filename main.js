const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './new.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // Function to create a video texture and mesh
    const createVideoMesh = (videoSrc, width, height) => {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true;
      video.play();

      const texture = new THREE.VideoTexture(video);
      const geometry = new THREE.PlaneGeometry(width, height); // Set size to match marker
      const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geometry, material);

      return mesh;
    };

    // Manually define the marker dimensions (adjust these values as needed)
    const markerWidth = 1; // Example marker width
    const markerHeight = 0.56; // Example marker height (adjust based on aspect ratio)

    // Create video mesh for the video
    const videoMesh = createVideoMesh('./Delhi.mp4', markerWidth, markerHeight); // Replace with your video file

    const videoAnchor = mindarThree.addAnchor(1);
    videoAnchor.group.add(videoMesh);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
