import visit from 'unist-util-visit';
import { transform } from 'h2x-core';
import jsx from 'h2x-plugin-jsx';

export default function () {
    return function (node): void {
        visit(node, 'jsx', (node) => {
            if (node && node.type === 'jsx') {
                const inlineTags = new RegExp(/<[img|br|hr][^>]*>/gi);
                const styleAttr = new RegExp(/(<[^>]+) style=".*?"/gi);
                const value = node.value as string;
                const matched = value.match(inlineTags);
                if (matched) {
                    let data = value.replace(inlineTags, (match) => {
                        return transform(match, { plugins: [jsx] });
                    });
                    data = data.match(styleAttr) ? data.replace(styleAttr, '$1') : data;
                    node.value = data;
                } else if (value.match(styleAttr)) {
                    node.value = value.replace(styleAttr, '$1');
                }
            }
        });
    };
}
