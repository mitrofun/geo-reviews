import {toPx} from './helpers'

function showNode(ev, node) {

    node.classList.remove('is_hide');

    let clientWidth = window.innerWidth,
        clientHeight = window.innerHeight,
        nodeWidth = node.offsetWidth,
        nodeHeight = node.offsetHeight,
        clickX = ev.get('pagePixels')[0],
        clickY = ev.get('pagePixels')[1];

    if ((clickX + nodeWidth) >= clientWidth) {
        node.style.left = toPx(clickX-nodeWidth) ;
    } else {
        node.style.left = toPx(clickX);
    }

    if ((clickY + nodeHeight) >= clientHeight) {
        if ((clickY-nodeHeight) < 0) {
            node.style.top = toPx(clientHeight-nodeHeight)
        } else {
            node.style.top = toPx(clickY-nodeHeight);
        }
    } else {
        node.style.top = toPx(clickY);
    }

}

function hideNode(node) {
    node.classList.add('is_hide');
}



export { showNode, hideNode }
