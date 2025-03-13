function teleportToCoin(){
    worldConfig.myCat.setPosition(worldConfig.rat.getPosition().x, worldConfig.rat.getPosition().y+1, worldConfig.rat.getPosition().z)
}

function becomeRat(){
    worldConfig.myCat = worldConfig.rat
}

function hideCats(){
    worldConfig.otherCats.forEach(x => x.catModel.visible = false)
}

function showCats(){
    worldConfig.otherCats.forEach(x => x.catModel.visible = true)
}

function superSpeedDown(){
    worldConfig.maxCatVelocity = worldConfig.maxCatVelocity - 0.05;
    worldConfig.catRotationSpeed = worldConfig.catRotationSpeed - 0.05;
}

function superSpeedUp(){
    worldConfig.maxCatVelocity = worldConfig.maxCatVelocity + 0.05;
    worldConfig.catRotationSpeed = worldConfig.catRotationSpeed + 0.05;
}