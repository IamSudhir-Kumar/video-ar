const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    try {
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: './new.mind',
      });
      const { renderer, scene, camera } = mindarThree;

      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      // Function to create a video texture and mesh
      const createVideoMesh = (videoSrc, width, height) => {
        const video = document.createElement('video');
        video.src = videoSrc;
        video.crossOrigin = 'anonymous';
        video.loop = true;
        video.playsInline = true; // Necessary for iOS
        video.muted = true; // Start with muted

        const texture = new THREE.VideoTexture(video);
        const geometry = new THREE.PlaneGeometry(width, height); // Set size to match marker
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);

        return { video, mesh };
      };

      // Manually define the marker dimensions (adjust these values as needed)
      const markerWidth = 1; // Example marker width
      const markerHeight = 0.56; // Example marker height (adjust based on aspect ratio)

      // Create video mesh for the video
      const { video, mesh: videoMesh } = createVideoMesh('./video.mp4', markerWidth, markerHeight); // Replace with your video file

      const videoAnchor = mindarThree.addAnchor(0); // Use the correct anchor index
      videoAnchor.group.add(videoMesh);

      // Add a button to toggle the video sound
      const button = document.createElement('button');
      const speakerOnIcon = '<img src="./speaker.png" alt="Sound On" style="width: 24px; height: 24px;">';
      const speakerOffIcon = '<img src="./off.png" alt="Sound Off" style="width: 24px; height: 24px;">';
      button.innerHTML = speakerOffIcon; // Initially, sound is off
      button.style.position = 'absolute';
      button.style.top = '10px';
      button.style.left = '10px';
      button.style.background = 'transparent';
      button.style.border = 'none';
      button.style.cursor = 'pointer';
      document.body.appendChild(button);

      button.addEventListener('click', () => {
        video.muted = !video.muted;
        button.innerHTML = video.muted ? speakerOffIcon : speakerOnIcon;
      });

      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });

      // Update to pause the video without resetting to the beginning
      videoAnchor.onTargetLost = () => {
        video.pause();
        console.log("Video paused at time:", video.currentTime);
      };

      videoAnchor.onTargetFound = () => {
        video.play();
        console.log("Video resumed at time:", video.currentTime);
      };

      console.log("MindAR started successfully.");
    } catch (error) {
      console.error("Error starting MindAR:", error);
    }
  }
  start();
});
