var currentSpeed = 0.05;
var showHideToggle = true;

var zoomiesLabelElement = document.getElementById("zoomiesLabel");

var chungusModeToggle = true;
var defaultCatScale = worldConfig.myCat.catModel.children[0].scale;

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        flyUp();
    }
    if (event.code === "ShiftLeft") {
        flyDown();
    }
    if (event.key === "q") {
        superSpeedUp();
    }
    if (event.key === "e") {
        superSpeedDown();
    }
});

function RotateTowards(cat1, cat2) {
    // Get world positions
    const pos1 = new THREE.Vector3();
    cat1.getWorldPosition(pos1);

    const pos2 = new THREE.Vector3();
    cat2.getWorldPosition(pos2);

    // Calculate the direction vector
    const direction = new THREE.Vector3().subVectors(pos2, pos1).normalize();

    // Create a look-at quaternion
    const up = new THREE.Vector3(0, 0, 1);  // Z-up axis
    const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);

    // Apply the quaternion to the cat
    cat1.object.quaternion.copy(targetQuaternion);
}

function teleportToCoin() {
    //worldConfig.myCat.setPosition(
    //    worldConfig.rat.getPosition().x,
    //    worldConfig.rat.getPosition().y,
    //    worldConfig.rat.getPosition().z
    //);

    RotateTowards(myCat, rat);

    const intervalId = setInterval(function () {
        if (getDistance(myCat.getWorldPosition(), rat.getWorldPosition()) > 1) {
            myCat.translateZ(1);
        } else {
            clearInterval(intervalId);
        }
    }, 100);

    // Stop after 20 seconds
    setTimeout(() => {
        clearInterval(intervalId);
        console.log("Stopped function execution.");
    }, 20000);
}

function becomeRat() {
    worldConfig.myCat = worldConfig.rat;
}

function toggleCatVis() {
    showHideToggle = !showHideToggle;
    worldConfig.otherCats.forEach((x) => (x.catModel.visible = showHideToggle));
}

function superSpeedDown() {
    currentSpeed = currentSpeed - 0.05;
    zoomiesLabelElement.innerHTML = "Zoomies (" + currentSpeed + "):";
    worldConfig.maxCatVelocity = worldConfig.maxCatVelocity - 0.05;
    worldConfig.myCat.rockSpeed = worldConfig.myCat.rockSpeed - 0.25;
    //worldConfig.catRotationSpeed = worldConfig.catRotationSpeed - 0.05;
}

function superSpeedUp() {
    currentSpeed = currentSpeed + 0.05;
    zoomiesLabelElement.innerHTML = "Zoomies (" + currentSpeed + "):";
    worldConfig.maxCatVelocity = worldConfig.maxCatVelocity + 0.05;
    worldConfig.myCat.rockSpeed = worldConfig.myCat.rockSpeed + 0.25;
    //worldConfig.catRotationSpeed = worldConfig.catRotationSpeed + 0.05;
}

function flyUp() {
    worldConfig.myCat.setPosition(
        worldConfig.myCat.getPosition().x,
        worldConfig.myCat.getPosition().y + 1,
        worldConfig.myCat.getPosition().z
    );
}

function flyDown() {
    worldConfig.myCat.setPosition(
        worldConfig.myCat.getPosition().x,
        worldConfig.myCat.getPosition().y - 1,
        worldConfig.myCat.getPosition().z
    );
}

function chungusMode() {
    if (chungusModeToggle) {
        setCatModelScale(worldConfig.myCat.catModel.children[0], 1, 1, 1);

        worldConfig.otherCats.forEach((x) =>
            setCatModelScale(x.catModel.children[0], 1, 1, 1)
        );

        setCatModelScale(worldConfig.rat.catModel.children[0], 100, 100, 100);
        worldConfig.cameraDistance = 20; // Setting this too high causes the camera to bug out.
    } else {
        setCatModelScale(worldConfig.myCat.catModel.children[0], 0.1, 0.1, 0.1);

        worldConfig.otherCats.forEach((x) =>
            setCatModelScale(x.catModel.children[0], 0.1, 0.1, 0.1)
        );

        setCatModelScale(worldConfig.rat.catModel.children[0], 1, 1, 1);
    }
    chungusModeToggle = !chungusModeToggle;
}

function setCatModelScale(catModelChild, x, y, z) {
    catModelChild.scale.x = x;
    catModelChild.scale.y = y;
    catModelChild.scale.z = z;
}

function newSpawnsRat() {
    worldConfig.catObject = worldConfig.ratObject;
}

function getDistance(posA, posB) {
    return Math.sqrt(
        (posB.x - posA.x) ** 2 +
        (posB.y - posA.y) ** 2 +
        (posB.z - posA.z) ** 2
    );
}

