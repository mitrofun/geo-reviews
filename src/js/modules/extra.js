function toPx(val) {
    return val + 'px';
}

function getPosition(clientLength, widgetLength, clickPosition) {

    if ((clickPosition + widgetLength) >= clientLength) {
                if ((clickPosition - widgetLength) < 0) {
                    return toPx(clientLength - widgetLength);
                } else {
                    return toPx(clickPosition - widgetLength);
                }
            } else {
                return toPx(clickPosition);
            }
}

export { getPosition }
