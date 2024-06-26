import { DefaultLoader, ImageSource, Loader } from 'excalibur';

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Gunman: new ImageSource('images/gunman.png'),
    Plane: new ImageSource('images/plane.png'),
    Bullet: new ImageSource('images/bullet.png'),
    Enemy: new ImageSource('images/enemy.png'),
};
const ResourceLoader = new DefaultLoader({
    fullscreenAfterLoad: true, // todo not possible in DefaultLoader
});
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };