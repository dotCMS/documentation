import visit from 'unist-util-visit';
import { Node } from 'unist';
import { transform } from 'h2x-core';
import jsx from 'h2x-plugin-jsx';

interface CustomNode extends Node {
    value: string;
}

export default function () {
    return function (node: CustomNode): void {
        visit(node, 'jsx', (node: CustomNode) => {
            if (node && node.type === 'jsx') {
                const inlineTags = new RegExp(/<(img|br|hr)[^>]*>/gi);
                const styleAttr = new RegExp(/(<[^>]+) style=".*?"/gi);
                const value = node.value;
                node.value = value
                    .replace(styleAttr, '$1')
                    .replace(inlineTags, (match) => transform(match, { plugins: [jsx] }));
            }
        });
    };
}
