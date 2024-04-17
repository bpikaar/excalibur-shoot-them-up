import {ImageSource, Loader} from 'excalibur';

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Gunman: new ImageSource('images/gunman.png'),
    Plane: new ImageSource('images/plane.png'),
    Bullet: new ImageSource('images/bullet.png'),
    Enemy: new ImageSource('images/enemy.png'),
};
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Gunman,
    Resources.Plane,
    Resources.Bullet,
    Resources.Enemy
]);

export {Resources, ResourceLoader};