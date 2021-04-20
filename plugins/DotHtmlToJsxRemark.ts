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
<<<<<<< HEAD
                node.value = value
                    .replace(styleAttr, '$1')
=======

                node.value = value
                    .replace(styleAttr, '')
>>>>>>> c6cd2ab0b516a014a49ae62bd03c38da327db55e
                    .replace(inlineTags, (match) => transform(match, { plugins: [jsx] }));
            }
        });
    };
}
