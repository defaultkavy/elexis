import type { $Element } from "../node/$Element";

export function _scrollTo($element: $Element | undefined, options?: {threshold?: number, behavior?: ScrollBehavior | undefined}) {
    if (!$element) return;
    const {scrollTop, scrollLeft} = document.documentElement;
    const {threshold = 0, behavior} = options ?? {threshold: 0, behavior: undefined};
    const position = $.call(() => {
        const rect = $element.dom.getBoundingClientRect()
        return {
            left: rect.left + scrollLeft,
            top: rect.top + scrollTop,
            right: rect.right + scrollLeft,
            bottom: rect.bottom + scrollTop,
            height: rect.height,
            width: rect.width
        }
    })
    if (scrollTop > position.top - threshold // scroll after item threshold
        || scrollTop > position.bottom + threshold
    ) document.documentElement.scrollTo({left: position.left - threshold, top: position.top - threshold, behavior});
    if (scrollTop + innerHeight < position.top + threshold // scroll before item
        || scrollTop + innerHeight < position.bottom + threshold
    ) document.documentElement.scrollTo({left: position.left - threshold, top: (position.bottom - innerHeight) + threshold, behavior});
}