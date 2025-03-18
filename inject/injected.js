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

function teleportToCoin() {
    worldConfig.myCat.setPosition(
        worldConfig.rat.getPosition().x,
        worldConfig.rat.getPosition().y,
        worldConfig.rat.getPosition().z
    );
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
