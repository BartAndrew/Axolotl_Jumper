Axolotl Jumper Game Documentation
Overview of the Game

Axolotl Jumper is an endless‑jumping game inspired by classics like Doodle Jump. The player guides a cheerful axolotl through an underwater world filled with lily‑pad platforms. The goal is to climb as high as possible by landing on platforms, collecting power‑ups and avoiding danger. Each jump earns points, and the highest point reached becomes the high score. A lighthearted art style and simple controls make the game friendly for children, while the underlying physics and code structure provide learning opportunities for computer science students.

Key features

Auto‑jumping axolotl: The axolotl continuously jumps upward. Players steer left and right to land on platforms.

Different platform types: There are three lily‑pad platforms: normal pads that carry the axolotl, cracked pads that break after one use, and spring pads that launch the axolotl higher.

Infinite scrolling: As you climb, new platforms are generated above while old ones disappear below, giving a sense of an endless journey.

Score and high score: Your score increases as you climb. The best score is saved using localStorage so it persists across sessions.

Progressive difficulty: The spacing between platforms increases as you ascend, requiring more precise jumps.

Cross‑platform: The game works on desktop (arrow keys) and mobile (touch), and it’s packaged as a Progressive Web App (PWA) so it can be installed on phones or tablets and played offline.

Game Characters and Assets

The protagonist is a pixel‑art axolotl, designed with a friendly face and animated flippers. The game uses a small sprite sheet to animate four frames of the axolotl’s jump cycle, shown below:

Platforms are drawn to resemble lily pads. Each pad has its own sprite: a solid pad (green), a cracked pad (brown cracks), and a spring pad with a coil of seaweed. The background is a seamless underwater scene with bubbles and soft gradients. All artwork is kept small and tileable so the game can run efficiently on low‑powered devices.

How the Game Works (for Kids)

The game is simple to play:

Start the game. When the axolotl appears, it immediately starts jumping.

Move left or right. On a keyboard, press the left (←) or right (→) arrow keys. On a touch screen, tap the left or right side of the screen. The axolotl will drift in that direction while jumping.

Land on lily pads. Each lily pad carries you upward. Some pads break after you land on them once (they crack and disappear), while spring pads make you bounce extra high.

Keep climbing! Your score increases the higher you go. Try to beat your best score.

Watch out for falling. If you miss a pad and fall off the bottom of the screen, the game ends. You can play again right away.

This gameplay encourages hand–eye coordination and timing. Because the axolotl moves with a gentle “floaty” feel, even young players can steer it successfully. The colorful art and friendly character create an inviting environment, while the high score encourages friendly competition.

How the Game Works (for Computer Science Students)

Under the hood, Axolotl Jumper demonstrates several important programming concepts:

Game loop and physics

The game uses an HTML5 <canvas> element and a requestAnimationFrame loop to update at ~60 frames per second. Each frame performs the following steps:

Update physics. The axolotl’s vertical velocity is decreased by gravity, and its position is updated. When the player presses left or right (or touches the screen), a small horizontal velocity is applied.

Collision detection. The game iterates through the list of platforms to check if the axolotl’s feet intersect a platform. If the axolotl is falling and collides with a platform from above, its vertical velocity is set to a negative value (jump), which depends on the platform type. Cracked platforms are marked as used and removed after one collision; spring platforms impart a larger jump velocity.

Scroll and platform generation. When the axolotl climbs past a certain height, the entire world scrolls downward. Platforms that fall below the screen are removed, and new platforms are generated with random x‑positions and types at the top. The vertical gap between platforms increases gradually to add difficulty.

Score and state management. The player’s score is proportional to the cumulative height climbed. If the axolotl falls below the bottom edge of the canvas, the game state changes to “game over,” and the current score is compared with the saved high score in localStorage.

Rendering. The background, platforms and axolotl sprite are drawn. The sprite sheet is cycled through four frames to animate the axolotl’s movement.

Input handling

Keyboard: Event listeners for keydown and keyup read the left and right arrow keys. When a key is pressed, a flag is set, causing horizontal acceleration; releasing the key clears the flag.

Touch: Event listeners for touchstart and touchend check the horizontal position of the touch relative to the canvas. Touching the left half moves the axolotl left; touching the right half moves it right.

Data structures

Platforms: Stored in an array of objects. Each platform object holds its x and y coordinates, its type (0 = normal, 1 = cracked, 2 = spring) and a used flag for cracked pads. New platforms are created by pushing objects into the array and removed by filtering them out when they move off screen.

Sprite animation: The axolotl’s sprite sheet is divided into equal‑sized frames. A frameIndex increments every few frames to cycle through the four images. When drawing, the code uses drawImage with source coordinates offset by the frameIndex * frameWidth.

Progressive Web App (PWA)

To make the game installable and playable offline, two additional files support the PWA features:

manifest.json: This file defines metadata for the app—its name ("Axolotl Jumper"), short name, start URL ("index.html"), display mode ("standalone") and icons (the axolotl sprite scaled to 192×192 and 512×512). When a user chooses “Add to Home Screen,” the browser reads the manifest to create an icon on the device.

service-worker.js: A service worker runs in the background. During installation, it caches the HTML page, JavaScript, images and manifest. Afterwards, fetch events are intercepted: if a resource exists in the cache, it is served immediately; otherwise, it is fetched from the network and cached. This cache‑first strategy allows the game to load quickly and work without an internet connection.

Intended Outcome

The goal of creating Axolotl Jumper is twofold:

A fun, accessible game for children. The straightforward mechanics, colorful art and friendly character encourage playful experimentation. Children learn to time their jumps and practice left‑right steering without complicated controls. The game can be replayed endlessly, promoting perseverance and small improvements.

An educational example for budding developers. For computer science students, the project demonstrates how to build a simple game engine from scratch using JavaScript. Concepts include the game loop, basic kinematics, collision detection, event handling, random level generation and persistent storage. The PWA packaging shows how to add a manifest and service worker for offline play and app‑like installation.

By combining these elements, Axolotl Jumper aims to be the best axolotl‑themed jumper game for “kids of all ages”—delivering entertainment while sparking curiosity about how games are made.

Running and Modifying the Game

Download or clone the project. The game consists of a single index.html file plus supporting assets (sprite sheet, platforms and background) and two PWA files (manifest.json, service-worker.js). Place these files in the same directory.

Serve over HTTP (recommended). Modern browsers restrict some features (like service workers) when loading directly from the filesystem. Use a simple local server—e.g. python -m http.server—and open http://localhost:8000/index.html in your browser.

Play and install. On desktop, use the arrow keys; on mobile, tap left/right. In supporting browsers, you can choose “Add to Home Screen” to install the PWA.

Customize. Because the code is in a single HTML file, you can open it in a text editor and experiment. Try adjusting gravity, platform spacing, or adding new power‑ups. Replace the sprites with your own art or change the colors in the CSS. You can also modify the service-worker.js to experiment with different caching strategies.

Conclusion

Axolotl Jumper showcases how a small idea can become a fully fledged, cross‑platform game. It balances the playful spirit of an endless jumper with clear, well‑structured code. Kids can enjoy the challenge of climbing higher, while students can study and expand the code to learn about game development and web technologies. Whether you’re guiding an axolotl to new heights or exploring how service workers cache resources, this project offers something fun and instructive for everyone.
