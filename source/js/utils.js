function parseTranslate(translate) {
  return String(translate).match('%') ? translate : translate + 'px';
}

function build3dTransform(coords) {
  var string = 'translate3d(';

  for (var i = 0; i < 3; i++) {
    string += parseTranslate(coords[i]);
    string += i < 2 ? ',' : '';
  }

  string += ') ';

  return string;
}

// Create css transform string
function transform(transforms) {
  var string = '';

  string += transforms.x ? `translateX(${parseTranslate(transforms.x)}) ` : '';
  string += transforms.y ? `translateY(${parseTranslate(transforms.y)}) ` : '';
  string += transforms.translate3d
    ? build3dTransform(transforms.translate3d)
    : '';
  string += transforms.scale ? `scale(${transforms.scale}) ` : '';
  string += transforms.scaleX ? `scaleX(${transforms.scaleX}) ` : '';
  string += transforms.scaleY ? `scaleY(${transforms.scaleY}) ` : '';
  string += transforms.rotate ? `rotate(${transforms.rotate}deg) ` : '';
  string += transforms.skew ? `skew(${transforms.skew}deg) ` : '';

  return string;
}

export default {
  transform
};