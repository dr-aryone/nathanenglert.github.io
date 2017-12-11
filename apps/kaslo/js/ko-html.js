{
    var overridden = ko.bindingHandlers['html'].update;

    ko.bindingHandlers['html'].update = function (element, valueAccessor) {
        if (element.nodeType === 8) {
            var html = ko.utils.unwrapObservable(valueAccessor());

            ko.virtualElements.emptyNode(element);
            if ((html !== null) && (html !== undefined)) {
                if (typeof html !== 'string') {
                    html = html.toString();
                }

                var parsedNodes = ko.utils.parseHtmlFragment(html);
                if (parsedNodes) {
                    var endCommentNode = element.nextSibling;
                    for (var i = 0, j = parsedNodes.length; i < j; i++)
                        endCommentNode.parentNode.insertBefore(parsedNodes[i], endCommentNode);
                }
            }
        } else { // plain node
            overridden(element, valueAccessor);
        }
    };
}
ko.virtualElements.allowedBindings['html'] = true;